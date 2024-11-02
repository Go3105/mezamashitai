from flask import Flask, jsonify
from get_google_calendar import fetch_today_event

app = Flask(__name__)

@app.route('/api/today_events', methods=['GET'])
def get_today_events():
    """今日のイベントを取得するAPIエンドポイント"""
    events = fetch_today_event()
    if not events:
        return jsonify({"message": "No events found for today."}), 404
    return jsonify(events), 200

# @app.route('/api/quiz', methods=['GET'])
# def get_quiz():
#     return "Hello world"

if __name__ == '__main__':
    app.run(debug=True)
