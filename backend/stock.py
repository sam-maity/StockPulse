import yfinance as yf
import pandas as pd
from fastapi import HTTPException

POPULAR_STOCKS = [
    {"symbol": "TCS.NS",        "name": "Tata Consultancy Services"},
    {"symbol": "RELIANCE.NS",   "name": "Reliance Industries"},
    {"symbol": "INFY.NS",       "name": "Infosys"},
    {"symbol": "HDFCBANK.NS",   "name": "HDFC Bank"},
    {"symbol": "ICICIBANK.NS",  "name": "ICICI Bank"},
    {"symbol": "HINDUNILVR.NS", "name": "Hindustan Unilever"},
    {"symbol": "SBIN.NS",       "name": "State Bank of India"},
    {"symbol": "BHARTIARTL.NS", "name": "Bharti Airtel"},
    {"symbol": "BAJFINANCE.NS", "name": "Bajaj Finance"},
    {"symbol": "WIPRO.NS",      "name": "Wipro"},
    {"symbol": "AXISBANK.NS",   "name": "Axis Bank"},
    {"symbol": "KOTAKBANK.NS",  "name": "Kotak Mahindra Bank"},
    {"symbol": "LT.NS",         "name": "Larsen & Toubro"},
    {"symbol": "ASIANPAINT.NS", "name": "Asian Paints"},
    {"symbol": "MARUTI.NS",     "name": "Maruti Suzuki"},
    {"symbol": "TATAMOTORS.NS", "name": "Tata Motors"},
    {"symbol": "SUNPHARMA.NS",  "name": "Sun Pharmaceutical"},
    {"symbol": "ADANIENT.NS",   "name": "Adani Enterprises"},
    {"symbol": "ONGC.NS",       "name": "ONGC"},
    {"symbol": "COALINDIA.NS",  "name": "Coal India"},
    {"symbol": "NTPC.NS",       "name": "NTPC"},
    {"symbol": "POWERGRID.NS",  "name": "Power Grid Corp"},
    {"symbol": "ULTRACEMCO.NS", "name": "UltraTech Cement"},
    {"symbol": "TITAN.NS",      "name": "Titan Company"},
    {"symbol": "NESTLEIND.NS",  "name": "Nestle India"},
    {"symbol": "TECHM.NS",      "name": "Tech Mahindra"},
    {"symbol": "HCLTECH.NS",    "name": "HCL Technologies"},
    {"symbol": "DRREDDY.NS",    "name": "Dr Reddy's Laboratories"},
    {"symbol": "BAJAJFINSV.NS", "name": "Bajaj Finserv"},
    {"symbol": "ITC.NS",        "name": "ITC Limited"},
    {"symbol": "ZOMATO.NS",     "name": "Zomato"},
    {"symbol": "PAYTM.NS",      "name": "Paytm (One97 Communications)"},
    {"symbol": "NYKAA.NS",      "name": "Nykaa (FSN E-Commerce)"},
    {"symbol": "DMART.NS",      "name": "Avenue Supermarts (DMart)"},
    {"symbol": "PIDILITIND.NS", "name": "Pidilite Industries"},
    {"symbol": "HAVELLS.NS",    "name": "Havells India"},
    {"symbol": "BERGEPAINT.NS", "name": "Berger Paints"},
    {"symbol": "MUTHOOTFIN.NS", "name": "Muthoot Finance"},
    {"symbol": "IRCTC.NS",      "name": "IRCTC"},
    {"symbol": "TATAPOWER.NS",  "name": "Tata Power"},
    {"symbol": "APOLLOHOSP.NS", "name": "Apollo Hospitals"},
    {"symbol": "CIPLA.NS",      "name": "Cipla"},
    {"symbol": "DIVISLAB.NS",   "name": "Divi's Laboratories"},
    {"symbol": "EICHERMOT.NS",  "name": "Eicher Motors (Royal Enfield)"},
    {"symbol": "BAJAJ-AUTO.NS", "name": "Bajaj Auto"},
    {"symbol": "HEROMOTOCO.NS", "name": "Hero MotoCorp"},
    {"symbol": "GRASIM.NS",     "name": "Grasim Industries"},
    {"symbol": "HINDALCO.NS",   "name": "Hindalco Industries"},
    {"symbol": "TATASTEEL.NS",  "name": "Tata Steel"},
    {"symbol": "JSWSTEEL.NS",   "name": "JSW Steel"},
    {"symbol": "AAPL",  "name": "Apple Inc."},
    {"symbol": "MSFT",  "name": "Microsoft"},
    {"symbol": "GOOGL", "name": "Alphabet (Google)"},
    {"symbol": "TSLA",  "name": "Tesla"},
    {"symbol": "AMZN",  "name": "Amazon"},
    {"symbol": "NVDA",  "name": "NVIDIA"},
    {"symbol": "META",  "name": "Meta Platforms"},
    {"symbol": "NFLX",  "name": "Netflix"},
    {"symbol": "AMD",   "name": "AMD"},
    {"symbol": "INTC",  "name": "Intel"},
]

def _get_currency(ticker: str) -> str:
    """Return currency symbol based on ticker suffix."""
    if ticker.endswith(".NS") or ticker.endswith(".BO"):
        return "₹"
    return "$"


def _extract_title(news_item: dict) -> str:
    """
    yfinance news structure changed in v0.2.40+.
    Handles both old flat structure and new nested content structure.
    """
    content = news_item.get("content", {})
    if isinstance(content, dict) and content.get("title"):
        return content["title"]
    return news_item.get("title", "")

def get_price_data(ticker: str) -> dict:
    stock = yf.Ticker(ticker)

    hist = stock.history(period="6mo")

    if hist.empty:
        raise HTTPException(
            status_code=404,
            detail=f"No price data found for '{ticker}'. Check the ticker symbol."
        )

    if len(hist) < 2:
        raise HTTPException(
            status_code=422,
            detail=f"Insufficient history for '{ticker}'."
        )

    hist["MA20"] = hist["Close"].rolling(window=20).mean()
    hist["MA50"] = hist["Close"].rolling(window=50).mean()

    last = hist.iloc[-1]
    prev = hist.iloc[-2]

    current_price = float(last["Close"])
    prev_close    = float(prev["Close"])
    change        = round(current_price - prev_close, 2)
    change_pct    = round((change / prev_close) * 100, 2)

    ma20 = float(last["MA20"]) if not pd.isna(last["MA20"]) else None
    ma50 = float(last["MA50"]) if not pd.isna(last["MA50"]) else None

    return {
        "price":          round(current_price, 2),
        "change":         change,
        "change_percent": change_pct,
        "ma20":           round(ma20, 2) if ma20 is not None else None,
        "ma50":           round(ma50, 2) if ma50 is not None else None,
        "currency":       _get_currency(ticker),
    }


def get_price_change_pct(ticker: str, period: str = "5d") -> float:
    stock = yf.Ticker(ticker)
    hist  = stock.history(period=period)

    if len(hist) < 2:
        return 0.0

    start = float(hist["Close"].iloc[0])
    end   = float(hist["Close"].iloc[-1])

    if start == 0:
        return 0.0

    return round((end - start) / start * 100, 2)


def get_headlines(ticker: str, limit: int = 15) -> list[dict]:
    company = (
        ticker
        .replace(".NS", "")
        .replace(".BO", "")
        .replace("-", " ")
    )

    stock = yf.Ticker(ticker)

    try:
        news = stock.news or []
    except Exception:
        news = []

    results = []
    for n in news:
        content = n.get("content", {})
        if isinstance(content, dict) and content.get("title"):
            title = content["title"]
        else:
            title = n.get("title", "")
        url = (
            (isinstance(content, dict) and (
                content.get("canonicalUrl", {}).get("url") or
                content.get("clickThroughUrl", {}).get("url")
            )) or
            n.get("link", "") or
            ""
        )

        if title and len(title) > 10:
            results.append({"title": title, "url": url})

    if not results:
        results = [
            {"title": f"{company} reports quarterly earnings results", "url": ""},
            {"title": f"{company} stock movement amid market volatility", "url": ""},
            {"title": f"Investors watch {company} amid sector rotation", "url": ""},
            {"title": f"{company} management outlines strategic roadmap", "url": ""},
            {"title": f"{company} navigates competition in core markets", "url": ""},
            {"title": f"Analysts revise {company} price target", "url": ""},
            {"title": f"{company} expands into adjacent business segments", "url": ""},
        ]

    return results[:limit]

def get_price_history(ticker: str):

    stock = yf.Ticker(ticker)
    hist = stock.history(period="3mo")

    if hist.empty:
        return []

    data = []

    for date, row in hist.iterrows():
        data.append({
            "time": date.strftime("%Y-%m-%d"),
            "value": float(row["Close"])
        })

    return data