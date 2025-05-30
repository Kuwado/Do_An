import pandas as pd
import os


def preprocess(hotel_id: int, df: pd.DataFrame):
    df = df.copy()
    print(df.shape[1])

    # Chuyển Date về datetime
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    # Tách ngày và năm
    df["day"] = df["date"].dt.day
    df["year"] = df["date"].dt.year

    # Bỏ các cột không cần
    df.drop(columns=["date", "lunar_date"], inplace=True, errors="ignore")

    df = df[
        [
            "day",
            "month",
            "year",
            "day_of_week",
            "is_holiday",
            "weather_condition",
            "temperature",
            "voucher_active",
            "number_of_guests",
        ]
    ]

    df = df.dropna()

    # Tạo thư mục lưu nếu chưa có
    save_folder = os.path.join(os.getcwd(), "data", "processed")
    os.makedirs(save_folder, exist_ok=True)

    # Đặt tên file đầu ra
    save_path = os.path.join(save_folder, f"processed_data_{hotel_id}.csv")

    # Lưu file CSV
    df.to_csv(save_path, index=False)
