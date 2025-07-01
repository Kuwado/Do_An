import os
from flask import Blueprint, request, jsonify
import pandas as pd
from src.predict import predict_guests

predict_bp = Blueprint("predict_api", __name__, url_prefix="/api")


@predict_bp.route("/predict/<int:hotel_id>", methods=["POST"])
def predict(hotel_id):
    try:
        input_data = request.get_json()["input"]
        print(input_data)
        result = predict_guests(hotel_id, input_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
