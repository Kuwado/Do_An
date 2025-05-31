from flask import Flask, request, jsonify, send_file
from groq import Groq
from flask_cors import CORS
from flask_cors import cross_origin
import asyncio

from gtts import gTTS
import os

from api.train_api import train_bp
from api.predict_api import predict_bp


# Tạo ứng dụng Flask
app = Flask(__name__)
CORS(app)


# Endpoint API
app.register_blueprint(train_bp)
app.register_blueprint(predict_bp)


# Chạy ứng dụng Flask
if __name__ == "__main__":
    app.run(port=5000, debug=True)
