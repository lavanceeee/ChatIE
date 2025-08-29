import os
from openai import OpenAI
from flask import Flask, request, Response
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app, resources= {
    r"/api/call_doubao": {
        "origins": ["http://localhost:5173", ]
    }
})

DOUBAO_KEY = os.environ.get("DOUBAO_API_KEY")

@app.route("/api/call_doubao", methods=["POST"])
def call_doubao_api():
    try:
        
        data = request.get_json()
        messages = data.get("messages", [])
        users_api_key = data.get("apiKey", "")

        API_Key = users_api_key if users_api_key != "" else DOUBAO_KEY

        if not API_Key:
            error_msg = {"error": "还未设置APIKEY到环境变量"}
            print(error_msg)

            return Response(
                json.dumps(error_msg, ensure_ascii=False),
                mimetype="application/json",
                status=500
            )
        
        client = OpenAI(
            base_url="https://ark.cn-beijing.volces.com/api/v3",
            api_key=API_Key
        )

        completion = client.chat.completions.create(
            model="doubao-1-5-pro-32k-250115",
            messages=messages
        )

        result = completion.choices[0].message.content

        return Response(
            json.dumps({"result": result}),
            mimetype="application/json",
            status=200
        )

    except Exception as e:
         
         print(e)

         return Response(
            json.dumps({"error": f"服务器端出错了：{str(e)}"}, ensure_ascii=False),
            mimetype="application/json",
            status=500
        )
    
if __name__ == "__main__":
    app.run(debug=True)

        

