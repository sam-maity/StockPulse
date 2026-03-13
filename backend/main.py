from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

from analytics import get_market_status
from models import FinbertDashboardOut
from finbert import analyze_headlines, aggregate
from stock import get_price_data, get_price_change_pct, get_headlines, POPULAR_STOCKS
from analytics import sentiment_price_divergence

app = FastAPI(title="StockPulse API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/market-status")
def market_status():
    return get_market_status()

@app.get("/")
def root():
    return {"message": "StockPulse API is running"}

@app.get("/popular")
def popular_stocks():
    return {"results": POPULAR_STOCKS}

@app.get("/search")
def search_stocks(q: str):
    if not q or len(q.strip()) < 1:
        return {"results": []}

    query = q.strip()
    results = []

    try:
        ticker_obj = yf.Search(query, max_results=10)
        quotes = ticker_obj.quotes or []

        for item in quotes:
            symbol = item.get("symbol", "")
            name   = item.get("longname") or item.get("shortname") or symbol
            exch   = item.get("exchange", "")
            type_  = item.get("quoteType", "")
            if not symbol:
                continue
            if type_ in ["EQUITY", "ETF", "MUTUALFUND"]:
                results.append({
                    "symbol":   symbol,
                    "name":     name,
                    "exchange": exch,
                    "type":     type_,
                })
    except Exception as e:
        print(f"[Search Error] {e}")

    return {"results": results}


@app.get("/stock/{ticker}/finbert", response_model=FinbertDashboardOut)
def finbert_dashboard(ticker: str):

    ticker = ticker.upper().strip()

    try:

        price_data = get_price_data(ticker)
        price_change = get_price_change_pct(ticker)

        headlines = get_headlines(ticker)

        headline_count = len(headlines)

        news_warning = None
        if headline_count < 5:
            news_warning = "Low news volume — sentiment may be unreliable."

        enriched = analyze_headlines(headlines)
        agg = aggregate(enriched)

        divergence = sentiment_price_divergence(
            agg.get("overall_score", 0),
            price_change
        )

        return {
            "ticker": ticker,
            **price_data,
            **agg,
            "divergence_comment": divergence,
            "headlines": enriched,
            "headline_count": headline_count,
            "news_warning": news_warning
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
