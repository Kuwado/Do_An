import os
import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def train_sarima(hotel_id: int):
    # Đường dẫn file processed
    file_path = os.path.join(
        os.getcwd(), "data", "processed", f"processed_data_{hotel_id}.csv"
    )
    df = pd.read_csv(file_path)

    # Chuyển cột ngày thành datetime, giả sử có cột 'year', 'month', 'day'
    df["date"] = pd.to_datetime(df[["year", "month", "day"]])
    df = df.sort_values("date").set_index("date")

    # Lấy chuỗi số khách (target)
    y = df["number_of_guests"]

    # Chia dữ liệu theo thời gian (80% train, 20% test)
    split_index = int(len(y) * 0.8)
    y_train, y_test = y.iloc[:split_index], y.iloc[split_index:]

    # Khởi tạo model SARIMA (tham số ví dụ, bạn có thể tinh chỉnh)
    # (p,d,q) = (1,1,1), seasonal (P,D,Q,s) = (1,1,1,7) cho tuần
    model = SARIMAX(y_train, order=(1, 1, 1), seasonal_order=(1, 1, 1, 7))
    model_fit = model.fit(disp=False)

    # Dự đoán trên test set
    y_pred = model_fit.predict(
        start=y_test.index[0], end=y_test.index[-1], dynamic=False
    )

    # Đánh giá model
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    def Accuracy_Score(orig, pred):
        mask = orig != 0
        mape = np.mean(100 * np.abs(orig[mask] - pred[mask]) / orig[mask])
        return 100 - mape

    accuracy = Accuracy_Score(y_test.values, y_pred.values)

    print(f"MAE of SARIMA: {mae}")
    print(f"RMSE of SARIMA: {rmse}")
    print(f"R2 of SARIMA: {r2}")
    print(f"Accuracy (100 - MAPE): {accuracy}%")

    # Lưu model
    model_folder = os.path.join(os.getcwd(), "models", "sarima")
    os.makedirs(model_folder, exist_ok=True)
    model_path = os.path.join(model_folder, f"sarima_model_{hotel_id}.pkl")
    joblib.dump(model_fit, model_path)
    print(f"Model saved to {model_path}")

    # Vẽ biểu đồ so sánh Actual vs Predicted
    plt.figure(figsize=(10, 6))
    plt.plot(y_test.index, y_test.values, label="Actual", marker="o")
    plt.plot(y_pred.index, y_pred.values, label="Predicted", marker="x")
    plt.title("SARIMA: Actual vs Predicted Number of Guests")
    plt.xlabel("Date")
    plt.ylabel("Number of Guests")
    plt.legend()
    plt.grid(True)
    plt.show()

    return {
        "model": "SARIMA",
        "mae": mae,
        "rmse": rmse,
        "r2": r2,
        "accuracy": accuracy,
    }
