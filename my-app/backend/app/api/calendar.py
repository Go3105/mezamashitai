# backend/app/api/calendar.py

from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from typing import List
from app.services.get_google_calendar import get_events  # Google Calendarのイベント取得関数
from app.db.schemas import EventSchema  # Pydanticスキーマ
from app.core.config import settings  # 環境設定の取得

router = APIRouter()

@router.get("/calendar", response_model=List[EventSchema])
async def get_daily_events(date: str):
    """
    指定された日付のGoogle Calendarのイベントを取得するエンドポイント。
    
    Args:
        date (str): YYYY-MM-DD形式の日付（例: '2024-11-06'）

    Returns:
        List[EventSchema]: 当日の予定リストを返す
    """
    try:
        # 日付をdatetime形式に変換
        date_obj = datetime.strptime(date, "%Y-%m-%d")

        # Google Calendarからイベントを取得
        events = get_events(date_obj)

        # 取得したイベントが空なら404エラー
        if not events:
            raise HTTPException(status_code=404, detail="No events found for this date")

        return events
    except ValueError:
        # 日付が不正な場合
        raise HTTPException(status_code=400, detail="Invalid date format. Please use YYYY-MM-DD format.")
