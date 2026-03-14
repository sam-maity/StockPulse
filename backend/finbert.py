from transformers import BertTokenizer, BertForSequenceClassification, pipeline
from collections import Counter, defaultdict
import statistics

print("Loading FinBERT model...")
tokenizer = BertTokenizer.from_pretrained("ProsusAI/finbert")
model     = BertForSequenceClassification.from_pretrained("ProsusAI/finbert")

finbert = pipeline(
    "sentiment-analysis",
    model=model,
    tokenizer=tokenizer
)
print("FinBERT ready")

LABEL_TO_SCORE = {"positive": 1, "neutral": 0, "negative": -1}

TOPIC_KEYWORDS = {
    "earnings":    ["earnings", "q1", "q2", "q3", "q4", "results", "profit", "loss", "revenue", "margin"],
    "management":  ["ceo", "cfo", "chairman", "leadership", "resigns", "steps down", "appoints"],
    "regulatory":  ["sebi", "regulator", "fine", "penalty", "probe", "investigation", "compliance", "fraud"],
    "competition": ["rival", "competitor", "market share", "price war", "beat", "outperform"],
    "expansion":   ["launch", "expansion", "new market", "partnership", "contract", "deal", "acquisition"],
}

HYPE_WORDS = [
    "soar", "soars", "soaring", "soared",
    "surge", "surges", "surging", "surged",
    "skyrocket", "skyrockets", "skyrocketing", "skyrocketed",
    "explode", "explodes", "exploding", "exploded", "explosive",
    "rally", "rallies", "rallying", "rallied",
    "boom", "booming", "boomed",
    "monster", "massive", "huge", "enormous",
    "breakout", "breakthrough", "blockbuster",
    "record", "milestone", "historic", "landmark",
    "crash", "crashes", "crashing", "crashed",
    "plunge", "plunges", "plunging", "plunged",
    "collapse", "collapses", "collapsing", "collapsed",
    "tank", "tanks", "tanking", "tanked",
    "tumble", "tumbles", "tumbling", "tumbled",
    "freefall", "free fall", "nosedive",
    "bloodbath", "carnage", "wipeout", "meltdown",
    "panic", "fear", "terror", "chaos",
    "devastate", "devastated", "devastating",
    "catastrophe", "catastrophic", "disaster",
]

RISK_WORDS = [
    "scrutiny", "probe", "investigation", "default", "fraud",
    "scam", "downgrade", "lawsuit", "penalty", "fine", "concern",
    "warning", "risk", "slump", "collapse",
    "sec", "sebi", "sanction", "violation", "indicted", "seized",
]

def classify_topics(text: str) -> list[str]:
    text_l = text.lower()
    topics = [t for t, words in TOPIC_KEYWORDS.items() if any(w in text_l for w in words)]
    return topics or ["general"]


def get_hype_score(text: str) -> int:
    """Count how many hype words appear in a single headline."""
    lower = text.lower()
    return sum(1 for w in HYPE_WORDS if w in lower)


def get_risk_flags(text: str) -> list[str]:
    lower = text.lower()
    return [w for w in RISK_WORDS if w in lower]

def compute_hype(headlines: list[str]) -> tuple[float, str]:
    """
    Returns (hype_ratio, hype_level).
    hype_ratio = total hype word hits / number of headlines
    """
    if not headlines:
        return 0.0, "calm"

    total = sum(get_hype_score(h) for h in headlines)
    ratio = round(total / len(headlines), 3)

    if ratio >= 1.0:
        level = "high hype"
    elif ratio >= 0.3:
        level = "mild hype"
    else:
        level = "calm"

    return ratio, level

def analyze_headlines(headlines: list) -> list[dict]:
    if not headlines:
        return []

    enriched = []

    texts = []
    urls  = []

    for h in headlines:
        if isinstance(h, dict):
            text = h.get("title") or h.get("headline") or ""
            url  = (
                h.get("url")
                or h.get("link")
                or h.get("article_url")
                or h.get("news_url")
                or (h.get("source") or {}).get("url")
                or ""
            )
        else:
            text = str(h)
            url  = ""

        texts.append(text)
        urls.append(url)

    results = finbert(texts)

    for text, url, r in zip(texts, urls, results):
        label = r["label"].lower()
        conf  = float(r["score"])
        score = LABEL_TO_SCORE.get(label, 0)

        enriched.append({
            "title": text,
            "headline": text,
            "url": url,
            "label": label,
            "confidence": conf,
            "score": score,
            "topics": classify_topics(text),
            "hype_score": get_hype_score(text),
            "risk_flags": get_risk_flags(text),
        })

    return enriched

def aggregate(enriched: list[dict]) -> dict:
    if not enriched:
        return {
            "overall_score":      0.0,
            "overall_label":      "neutral",
            "label_counts":       {"positive": 0, "neutral": 0, "negative": 0},
            "confidence_buckets": {"high": 0, "medium": 0, "low": 0},
            "topic_sentiment":    {},
            "hype_ratio":         0.0,
            "hype_level":         "calm",
            "risk_terms":         {},
        }

    scores     = [h["score"] for h in enriched]
    mean_score = statistics.mean(scores)

    if mean_score > 0.2:
        overall_label = "bullish"
    elif mean_score < -0.2:
        overall_label = "bearish"
    else:
        overall_label = "neutral"

    hi  = sum(1 for h in enriched if h["confidence"] >= 0.9)
    mid = sum(1 for h in enriched if 0.7 <= h["confidence"] < 0.9)
    lo  = sum(1 for h in enriched if h["confidence"] < 0.7)

    topic_scores = defaultdict(list)
    for h in enriched:
        for t in h["topics"]:
            topic_scores[t].append(h["score"])
    topic_sentiment = {
        t: round(statistics.mean(v), 3)
        for t, v in topic_scores.items()
    }
    raw_headlines        = [h["headline"] for h in enriched]
    hype_ratio, hype_level = compute_hype(raw_headlines)

    all_risks  = [rf for h in enriched for rf in h["risk_flags"]]
    risk_terms = dict(Counter(all_risks))

    label_counts = dict(Counter(h["label"] for h in enriched))
    label_counts.setdefault("positive", 0)
    label_counts.setdefault("neutral",  0)
    label_counts.setdefault("negative", 0)

    return {
        "overall_score":      round(mean_score, 3),
        "overall_label":      overall_label,
        "label_counts":       label_counts,
        "confidence_buckets": {"high": hi, "medium": mid, "low": lo},
        "topic_sentiment":    topic_sentiment,
        "hype_ratio":         hype_ratio,
        "hype_level":         hype_level,
        "risk_terms":         risk_terms,
    }
