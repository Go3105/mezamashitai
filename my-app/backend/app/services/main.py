from flask import Flask, jsonify
from flask_cors import CORS
from get_google_calendar import fetch_today_event
from quiz_generation import generate_quiz

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"]) # CORSを有効にする

@app.route('/api/today_events', methods=['GET'])
def get_today_events():
    """今日のイベントを取得するAPIエンドポイント"""
    events = fetch_today_event()
    if not events:
        return jsonify({"message": "No events found for today."}), 404
    return jsonify(events), 200

@app.route('/api/today_quiz', methods=['GET'])
def get_today_quiz():
    """今日の予定から作成したクイズを取得するAPIエンドポイント"""
    quiz = generate_quiz()
    if not quiz:
        return jsonify({"message": "No quiz generated for today."}), 404
    return quiz, 200

if __name__ == '__main__':
    app.run(port=5000)