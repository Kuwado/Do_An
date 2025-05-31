import os
from flask import Blueprint, request, jsonify
import pandas as pd
from src.preprocess import preprocess
from src.train_random_forest import train_random_forest
from src.train_xgboost import train_xgboost
from src.train_sarima import train_sarima
from src.predict import predict_guests
import traceback


train_bp = Blueprint("train_api", __name__, url_prefix="/api")


@train_bp.route("/train", methods=["POST"])
def train_model():
    if "file" not in request.files:
        return jsonify({"error": "No file part in request"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    hotel_id = request.form.get("hotel_id", type=int)
    if hotel_id is None:
        return jsonify({"error": "Missing hotel_id"}), 400

    try:
        # Tạo folder nếu chưa tồn tại
        save_folder = os.path.join(os.getcwd(), "data", "raw")
        os.makedirs(save_folder, exist_ok=True)

        # Đường dẫn lưu file
        save_path = os.path.join(save_folder, file.filename)

        # Lưu file
        file.save(save_path)

        # Đọc CSV từ file vừa lưu
        df = pd.read_csv(save_path)
        num_rows = len(df)
        print(f"File saved to {save_path}, rows: {num_rows}")

        preprocess(hotel_id, df)
        rf_result = train_random_forest(hotel_id)
        xgb_result = train_xgboost(hotel_id)
        sarima_result = train_sarima(hotel_id)

        return jsonify(
            {
                "success": True,
                "message": "Training thành công models",
                "random_forest": rf_result,
                "xgboost": xgb_result,
                "sarima": sarima_result,
            }
        )

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
