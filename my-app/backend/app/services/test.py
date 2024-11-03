from flask import Flask, jsonify
from flask_cors import CORS
import datetime
import re
import json
import googleapiclient.discovery
import google.auth
from get_google_calendar import fetch_today_event
from llama_cpp import Llama

app = Flask(__name__)

# CORSの設定: フロントエンドからのアクセスを許可
CORS(app, origins=["http://localhost:3000"])

# 今日のイベントを取得する関数
def fetch_today_event():
    SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
    
    # Google Calendar APIの資格情報の読み込み
    try:
        with open('credentials.json', 'r') as json_open:
            json_load = json.load(json_open)
        calendar_id = json_load['calendar_id']
        gapi_creds = google.auth.load_credentials_from_file('credentials.json', SCOPES)[0]
        service = googleapiclient.discovery.build('calendar', 'v3', credentials=gapi_creds)
    except Exception as e:
        print("Error loading Google API credentials:", e)
        return {"error": "Failed to load credentials"}

    # 今日の開始時刻と終了時刻の取得
    today_start = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0).isoformat() + 'Z'
    today_end = datetime.datetime.now().replace(hour=23, minute=59, second=59, microsecond=999999).isoformat() + 'Z'

    try:
        # Google Calendar APIで当日のイベントを取得
        events_result = service.events().list(
            calendarId=calendar_id,
            timeMin=today_start,
            timeMax=today_end,
            maxResults=10,
            singleEvents=True,
            orderBy='startTime'
        ).execute()
    except Exception as e:
        print("Error fetching events:", e)
        return {"error": "Failed to fetch events"}

    events = events_result.get('items', [])
    formatted_events = []

    # イベント情報の整形
    i = 1
    for event in events:
        if re.match(r'^\d{4}-\d{2}-\d{2}$', event['start'].get('dateTime', event['start'].get('date'))):
            # 終日イベント
            start_date = event['start'].get('date')
            formatted_events.append({
                "number": i,
                "date": start_date,
                "time": "終日",
                "event": event['summary']
            })
        else:
            # 時間指定イベント
            start_datetime = datetime.datetime.strptime(event['start']['dateTime'], '%Y-%m-%dT%H:%M:%S+09:00')
            end_datetime = datetime.datetime.strptime(event['end']['dateTime'], '%Y-%m-%dT%H:%M:%S+09:00')
            formatted_events.append({
                "number": i,
                "date": start_datetime.strftime('%Y-%m-%d'),
                "time": f"{start_datetime.strftime('%H:%M')}~{end_datetime.strftime('%H:%M')}",
                "event": event['summary']
            })
        i += 1

    return formatted_events

# /api/today_eventsエンドポイントの作成
@app.route('/api/today_events', methods=['GET'])
def today_events():
    events = fetch_today_event()
    
    # エラーレスポンスの処理
    if isinstance(events, dict) and "error" in events:
        return jsonify(events), 500
    
    return jsonify(events)


def fetch_today_quiz():
    today_event = fetch_today_event()
    load_example = open('example.json', 'r')
    event_example = json.load(load_example)

    llm = Llama.from_pretrained(
        repo_id="elyza/Llama-3-ELYZA-JP-8B-GGUF",
        filename="Llama-3-ELYZA-JP-8B-q4_k_m.gguf",
        verbose=False
    )
    
    response = llm.create_chat_completion(
        messages = [
            {   
                "role": "system", "content": "あなたは優秀なクイズ作成者です"
            },
            {
                "role": "user", "content": f"まず初めに、{today_event}に含まれているそれぞれの予定の時間と内容を的確に把握してください。次に、把握した情報をもとに予定の内容や時間に関する4択のクイズを必ず1つだけ生成してください。その際、正しい選択肢は1つのみで、他3つは全て誤りの選択肢となるようにすることを徹底してください。また、各選択肢の文字数は10文字以下となるように工夫して問題を作成してください。そして、次の例と同じように括弧を含めて確実に正しいjson形式で出力を行ってください。なお、jsonのみを出力し、その他の文章は一切出力しないようにしてください。出力の例 : {event_example}"
            }
        ],
        temperature = 0.9,
    )

    return response["choices"][0]["message"]["content"]

@app.route('/api/today_quiz', methods=['GET'])
def today_quiz():
    quiz = fetch_today_quiz()
    
    # エラーレスポンスの処理
    if isinstance(quiz, dict) and "error" in quiz:
        return jsonify(quiz), 500
    
    return quiz
if __name__ == "__main__":
    app.run(port=5000)