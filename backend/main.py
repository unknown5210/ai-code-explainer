import os
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse
from groq import Groq

app = FastAPI(title="AI Code Explainer Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str
    language: str

@app.get("/")
def health_check():
    return {"status": "online"}

@app.post("/api/explain")
async def explain_code(request: CodeRequest):
    api_key = "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"
    client = Groq(api_key=api_key)

    async def event_generator():
        prompt = f"""
        Analyze the following {request.language} code precisely and provide a response in Markdown with these exact sections:
        ### 📖 Summary
        ### 📄 Line-by-Line Explanation
        ### ⚡ Complexity
        ### 💡 Suggestions
        ### 📚 Concepts Used
        ### 🚀 Optimized Version

        Code:
        {request.code}
        """

        try:
            print("DEBUG: Attempting to call Groq API...")
            stream = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                stream=True,
            )
            for chunk in stream:
                content = chunk.choices[0].delta.content
                if content:
                    yield {
                        "event": "message",
                        "data": json.dumps({"text": content})
                    }
        except Exception as e:
            print(f"❌ GROQ API ERROR DETAILS: {str(e)}")
            error_msg = f"\n\n### Error\nFailed to fetch AI response: {str(e)}"
            for char in error_msg:
                yield {
                    "event": "message",
                    "data": json.dumps({"text": char})
                }

    return EventSourceResponse(event_generator())