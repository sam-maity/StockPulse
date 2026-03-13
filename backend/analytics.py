def sentiment_price_divergence(sentiment_score: float, price_change_pct: float) -> str:

    score = round(sentiment_score, 3)
    pct   = round(price_change_pct, 2)

    if score > 0.2:
        sent_label = "positive"
    elif score < -0.2:
        sent_label = "negative"
    else:
        sent_label = "neutral"

    if pct > 1.5:
        price_label = "strong_up"
    elif pct > 0.2:
        price_label = "mild_up"
    elif pct < -1.5:
        price_label = "strong_down"
    elif pct < -0.2:
        price_label = "mild_down"
    else:
        price_label = "flat"

    direction = "rose" if pct >= 0 else "fell"
    abs_pct   = abs(pct)

    matrix = {
        ("strong_up", "positive"): (
            f"Price surged {abs_pct}% and FinBERT sentiment is strongly positive. "
            f"News and market are aligned. Momentum may continue but watch for "
            f"overbought conditions near resistance levels."
        ),
        ("strong_up", "neutral"): (
            f"Price jumped {abs_pct}% while news sentiment is neutral. This suggests "
            f"the rally is driven by technical factors or broader market moves rather "
            f"than fundamental news. Proceed with caution."
        ),
        ("strong_up", "negative"): (
            f"Sharp divergence detected. Price surged {abs_pct}% but news sentiment "
            f"is negative. This could indicate a short squeeze, insider buying, or "
            f"momentum traders ignoring fundamentals. High risk setup."
        ),
        ("mild_up", "positive"): (
            f"Price edged up {abs_pct}% with positive news sentiment. A healthy "
            f"news-backed gain with no divergence detected. Fundamentals and price "
            f"are moving in the same direction."
        ),
        ("mild_up", "neutral"): (
            f"Price gained {abs_pct}% on neutral news. Likely a technical bounce "
            f"or broad market tailwind. No strong fundamental catalyst visible "
            f"in recent headlines."
        ),
        ("mild_up", "negative"): (
            f"Mild divergence. Price rose {abs_pct}% despite negative news sentiment. "
            f"The market may be pricing in a recovery, or negative headlines could "
            f"drag the price down in coming sessions."
        ),
        ("flat", "positive"): (
            f"Price is flat at {pct}% but sentiment is positive. The market has not "
            f"reacted to good news yet. This could be a lagging signal worth watching "
            f"as a breakout may follow."
        ),
        ("flat", "neutral"): (
            f"Price and sentiment are both neutral with no strong signals either way. "
            f"The stock is in a consolidation phase. Wait for a clearer catalyst "
            f"before taking a position."
        ),
        ("flat", "negative"): (
            f"Price is flat at {pct}% despite negative news sentiment. Either the "
            f"bad news is already priced in, or a delayed sell-off could materialise. "
            f"Monitor closely over the next few sessions."
        ),
        ("mild_down", "positive"): (
            f"Divergence detected. Price dipped {abs_pct}% but sentiment is positive. "
            f"This may be a buy-the-dip opportunity if the positive news is credible, "
            f"or the market knows something the headlines do not."
        ),
        ("mild_down", "neutral"): (
            f"Price slipped {abs_pct}% on neutral news. Likely profit-taking or "
            f"broader sector weakness rather than a stock-specific issue. "
            f"No major fundamental concern detected."
        ),
        ("mild_down", "negative"): (
            f"Price fell {abs_pct}% in line with negative sentiment. News and "
            f"market are aligned bearishly. Avoid catching the falling knife and "
            f"wait for sentiment to stabilise before re-entering."
        ),
        ("strong_down", "positive"): (
            f"Strong divergence detected. Price crashed {abs_pct}% despite positive news. "
            f"Possible institutional selling, macro headwinds, or the positive "
            f"headlines may not reflect actual fundamentals. Stay cautious."
        ),
        ("strong_down", "neutral"): (
            f"Price dropped sharply by {abs_pct}% with neutral news sentiment. "
            f"The sell-off appears driven by market-wide factors or technicals. "
            f"Check index and sector performance for context."
        ),
        ("strong_down", "negative"): (
            f"Price fell {abs_pct}% and sentiment is deeply negative. A full "
            f"bearish alignment with elevated risk. Look for stabilising volume "
            f"and a sentiment shift before considering any long position."
        ),
    }

    return matrix.get(
        (price_label, sent_label),
        f"Price {direction} {abs_pct}% with a sentiment score of {score}. "
        f"No strong divergence pattern detected."
    )

from datetime import datetime
import pytz

def get_market_status():

    ist = pytz.timezone("Asia/Kolkata")
    est = pytz.timezone("US/Eastern")

    now_ist = datetime.now(ist)
    now_est = datetime.now(est)

    # NSE
    nse_open = False
    if now_ist.weekday() < 5:
        if (now_ist.hour > 9 or (now_ist.hour == 9 and now_ist.minute >= 15)) and \
           (now_ist.hour < 15 or (now_ist.hour == 15 and now_ist.minute <= 30)):
            nse_open = True

    # US market
    us_open = False
    if now_est.weekday() < 5:
        if (now_est.hour > 9 or (now_est.hour == 9 and now_est.minute >= 30)) and \
           now_est.hour < 16:
            us_open = True

    return {
        "Indian Market": "OPEN" if nse_open else "CLOSED",
        "US Market": "OPEN" if us_open else "CLOSED"
    }
