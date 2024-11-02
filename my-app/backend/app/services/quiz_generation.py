#LLMを使って当日の予定に関するクイズを4択で生成、答えもLLMに生成してもらう
from get_google_calendar import fetch_today_event
import json
from llama_cpp import Llama

def generate_quiz():
    today_event = fetch_today_event()
    load_example = open('example.json', 'r')
    event_example = json.load(load_example)

    llm = Llama.from_pretrained(
        repo_id="elyza/Llama-3-ELYZA-JP-8B-GGUF",
        filename="Llama-3-ELYZA-JP-8B-q4_k_m.gguf",
        verbose=False
    )

    generation_params = {
    #"do_sample": True,
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 40,
    "max_tokens": 100,
    }

    
    response = llm.create_chat_completion(
        messages = [
            {   
                "role": "system", "content": "あなたは優秀なクイズ作成者です"
            },
            {
                "role": "user", "content": f"まず初めに、{today_event}に含まれているそれぞれの予定の時間と内容を的確に把握してください。次に、把握した情報をもとに予定の内容や時間に関する4択のクイズを必ず1つだけ生成してください。その際、正しい選択肢は1つのみで、他3つは全て誤りの選択肢となるようにすることを徹底してください。また、各選択肢の文字数は10文字以下となるように工夫して問題を作成してください。そして、次の例と同じように括弧を含めて確実に正しいjson形式で出力を行ってください。なお、jsonのみを出力し、その他の文章は一切出力しないようにしてください。出力の例 : {event_example}"
            }
        ],
        temperature = 0.6,
        max_tokens = 256,
        response_format = {
            "type":"json_object",
        }
    )

    return response["choices"][0]["message"]["content"]

