import os
import pandas as pd
import joblib
from xgboost import XGBRegressor
from sklearn.ensemble import RandomForestRegressor
from statsmodels.tsa.statespace.sarimax import SARIMAXResults


def predict_guests(hotel_id: int, input_data: dict):
    # Load model columns để đồng nhất thứ tự input
    model_folder = os.path.join(os.getcwd(), "models")
    model_columns_path = os.path.join(model_folder, "model_columns.pkl")
    model_columns = joblib.load(model_columns_path)

    # Chuyển input thành DataFrame
    input_df = pd.DataFrame([input_data])

    # One-hot encoding tương tự lúc training
    input_encoded = pd.get_dummies(input_df)

    # Thêm cột thiếu (nếu có) để khớp thứ tự cột
    for col in model_columns:
        if col not in input_encoded.columns:
            input_encoded[col] = 0

    # Đảm bảo đúng thứ tự cột
    input_encoded = input_encoded[model_columns]

    results = {}

    ### --- 1. Random Forest ---
    rf_path = os.path.join("models", "random_forest", f"rf_model_{hotel_id}.joblib")
    if os.path.exists(rf_path):
        rf_model: RandomForestRegressor = joblib.load(rf_path)
        rf_pred = rf_model.predict(input_encoded)[0]
        results["random_forest"] = float(rf_pred)
    else:
        results["random_forest"] = "Model not found"

    ### --- 2. XGBoost ---
    xgb_path = os.path.join(model_folder, "xgboost", f"xgb_model_{hotel_id}.joblib")
    if os.path.exists(xgb_path):
        xgb_model: XGBRegressor = joblib.load(xgb_path)
        xgb_pred = xgb_model.predict(input_encoded)[0]
        results["xgboost"] = float(xgb_pred)
    else:
        results["xgboost"] = "Model not found"

    ### --- 3. SARIMA ---
    sarima_path = os.path.join(model_folder, "sarima", f"sarima_model_{hotel_id}.pkl")
    if os.path.exists(sarima_path):
        sarima_model: SARIMAXResults = joblib.load(sarima_path)
        sarima_pred = sarima_model.forecast(steps=1).iloc[0]
        results["sarima"] = float(sarima_pred)
    else:
        results["sarima"] = "Model not found"

    print("Ket qua du doan: ")
    print(results)

    ### --- Trung bình của Random Forest và XGBoost ---
    if (
        results["random_forest"] != "Model not found"
        and results["xgboost"] != "Model not found"
    ):
        avg_pred = round((results["random_forest"] + results["xgboost"]) / 2)
        results["avg"] = int(avg_pred)

    return results
