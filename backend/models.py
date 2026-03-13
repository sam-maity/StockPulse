from pydantic import BaseModel
from typing import Dict, List, Optional

class HeadlineDetail(BaseModel):
    headline: str
    label: str           # positive / neutral / negative
    confidence: float    # 0–1
    score: int           # +1 / 0 / -1
    topics: List[str]
    hype_score: int
    risk_flags: List[str]

class ConfidenceBuckets(BaseModel):
    high: int
    medium: int
    low: int

class FinbertDashboardOut(BaseModel):
    ticker: str
    price: float
    change: float
    change_percent: float
    ma20: Optional[float]
    ma50: Optional[float]
    overall_score: float
    overall_label: str
    label_counts: Dict[str, int]
    confidence_buckets: ConfidenceBuckets
    topic_sentiment: Dict[str, float]
    hype_ratio: float
    hype_level: str
    risk_terms: Dict[str, int]
    divergence_comment: str
    headlines: List[HeadlineDetail]
    headline_count: int | None = None
    news_warning: str | None = None
