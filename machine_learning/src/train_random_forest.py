import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib
import matplotlib.pyplot as plt


def train_random_forest(hotel_id: int):
    # Đường dẫn file processed
    file_path = os.path.join(
        os.getcwd(), "data", "processed", f"processed_data_{hotel_id}.csv"
    )

    # Đọc dữ liệu
    df = pd.read_csv(file_path)

    # One-hot encoding các cột categorical
    df_encoded = pd.get_dummies(
        df,
        columns=[
            "day_of_week",
            "weather_condition",
        ],
    )

    X = df_encoded.drop(columns=["number_of_guests"])
    y = df_encoded["number_of_guests"]

    # Chia train-test 8-2
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Khởi tạo model
    model = RandomForestRegressor(n_estimators=100, random_state=42)

    # Huấn luyện
    model.fit(X_train, y_train)

    # Dự đoán trên test set
    y_pred = model.predict(X_test)

    # Đánh giá
    def Accuracy_Score(orig, pred):
        mask = orig != 0
        mape = np.mean(100 * np.abs(orig[mask] - pred[mask]) / orig[mask])
        return 100 - mape

    # Đánh giá model
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)
    accuracy = Accuracy_Score(y_test, y_pred)

    print(f"MAE of Random Forest: {mae}")
    print(f"RMSE of Random Forest: {rmse}")
    print(f"R2 of Random Forest: {r2}")
    print(f"Accuracy (100 - MAPE): {accuracy}%")

    # Lưu model ra file để dùng sau
    model_folder = os.path.join(os.getcwd(), "models")
    os.makedirs(model_folder, exist_ok=True)
    joblib.dump(
        X.columns.tolist(),
        os.path.join(model_folder, "model_columns.pkl"),
    )

    # Lưu model
    model_subfolder = os.path.join(model_folder, "random_forest")
    os.makedirs(model_subfolder, exist_ok=True)
    model_path = os.path.join(model_subfolder, f"rf_model_{hotel_id}.joblib")
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

    # Vẽ biểu đồ so sánh giá trị thực và dự đoán
    plt.figure(figsize=(10, 6))
    plt.plot(y_test.values, label="Actual", marker="o")
    plt.plot(y_pred, label="Predicted", marker="x")
    plt.title("Comparison of Actual vs Predicted Number of Guests")
    plt.xlabel("Sample index")
    plt.ylabel("Number of Guests")
    plt.legend()
    plt.grid(True)
    # plt.show()

    return {
        "model": "Random Forest",
        "mae": mae,
        "rmse": rmse,
        "r2": r2,
        "accuracy": accuracy,
    }
