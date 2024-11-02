import datetime
import re
import json
import googleapiclient.discovery
import google.auth

# Preparation for Google API
def fetch_today_event():
    SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

    # calendar_idをjsonファイルから取得
    json_open = open('credentials.json', 'r')
    json_load = json.load(json_open)
    calendar_id = json_load['calendar_id']
    gapi_creds = google.auth.load_credentials_from_file('credentials.json', SCOPES)[0]
    service = googleapiclient.discovery.build('calendar', 'v3', credentials=gapi_creds)

    # Get the start and end of the current day in ISO format
    today_start = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0).isoformat() + 'Z'
    today_end = datetime.datetime.now().replace(hour=23, minute=59, second=59, microsecond=999999).isoformat() + 'Z'

    # Get events from Google Calendar API for the current day only
    events_result = service.events().list(
        calendarId=calendar_id,
        timeMin=today_start,
        timeMax=today_end,
        maxResults=10,
        singleEvents=True,
        orderBy='startTime'
    ).execute()

    # Pick up only start time, end time, and summary info
    events = events_result.get('items', [])
    formatted_events = []

    i = 1
    for event in events:
        if re.match(r'^\d{4}-\d{2}-\d{2}$', event['start'].get('dateTime', event['start'].get('date'))):
            # All-day event
            start_date = event['start'].get('date')
            formatted_events.append({
                "number": i,
                "date": start_date,
                "time": "終日",
                "event": event['summary']
            })
            i += 1
        else:
            # Time-based event
            start_datetime = datetime.datetime.strptime(event['start']['dateTime'], '%Y-%m-%dT%H:%M:%S+09:00')
            end_datetime = datetime.datetime.strptime(event['end']['dateTime'], '%Y-%m-%dT%H:%M:%S+09:00')
            formatted_events.append({
                "number": i,
                "date": start_datetime.strftime('%Y-%m-%d'),
                "time": f"{start_datetime.strftime('%H:%M')}~{end_datetime.strftime('%H:%M')}",
                "event": event['summary']
            })
            i += 1

    # Return formatted events as JSON
    return formatted_events