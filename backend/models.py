from pydantic import BaseModel
from typing import Dict, List, Optional

class HeadlineDetail(BaseModel):
    headline: str
    label: str           
    confidence: float   
    score: int           
    topics: List[str]
    hype_score: int
    risk_flags: List[str]
    url: Optional[str] = None

    title: Optional[str] = None
    url: Optional[str] = None
    source: Optional[str] = None
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
