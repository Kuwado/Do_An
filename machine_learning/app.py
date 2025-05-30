from flask import Flask, request, jsonify, send_file
from groq import Groq
from flask_cors import CORS
from flask_cors import cross_origin
import asyncio

from gtts import gTTS
import os

from api.train_api import train_bp


# Tạo ứng dụng Flask
app = Flask(__name__)
CORS(app)


# Endpoint API
app.register_blueprint(train_bp)


# @app.route("/train", methods=["POST"])
# def train_model():
#     print("helo")
#     return jsonify({"message": "Training started"})


# @app.route("/text-to-image", methods=["POST"])
# def image():
#     return generate_image()


# Chạy ứng dụng Flask
if __name__ == "__main__":
    app.run(port=5000, debug=True)
