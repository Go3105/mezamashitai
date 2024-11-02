#LLMを使って当日の予定に関するクイズを4択で生成、答えもLLMに生成してもらう
from transformers import pipeline
#from get_google_calendar import fetch_today_event


pipe = pipeline("text-generation", model="tokyotech-llm/Llama-3-Swallow-8B-v0.1")

# 生成したいテキストのプロンプトを入力
prompt = "明日の天気は"

# テキスト生成
result = pipe(prompt, max_new_tokens=50, num_return_sequences=1)

# 結果を表示
print(result[0]["generated_text"])
def generate_quiz():
    return
