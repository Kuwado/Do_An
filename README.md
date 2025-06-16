# 🏨 HỆ THỐNG QUẢN LÝ VÀ ĐẶT PHÒNG KHÁCH SẠN TÍCH HỢP DỰ ĐOÁN LƯỢNG KHÁCH

## 📌 Mô tả dự án

Đây là hệ thống quản lý và đặt phòng khách sạn tích hợp tính năng dự đoán lượng khách hàng mỗi ngày bằng học máy. Hệ thống hỗ trợ quản lý phòng, đặt phòng, dịch vụ, voucher, thống kê doanh thu và bao gồm frontend (React) và backend (Express, MySQL) tách biệt, cùng một mô hình học máy triển khai bằng Flask API.

---

## 🛠️ Công nghệ sử dụng

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Machine Learning:** Python (Flask API)
- **Thanh toán:** Tích hợp VNPay (Sandbox)

---

## 🚀 Cách chạy hệ thống

### 1. Clone repository

```bash
git clone https://github.com/Kuwado/Do_An.git
cd your-repo
```

### 2. Thiết lập và chạy Backend

```bash
cd backend
npm install
```

Cấu hình biến môi trường .env từ file .env.example

Khởi tạo database

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Chạy server

```bash
npm start
```

### 3. Thiết lập và chạy Backend

```bash
cd frontend
npm install
npm run dev
```

Cấu hình biến môi trường .env từ file .env.example

### 4. Thiết lập và chạy Machine Learning

```bash
cd machine_learning
pip install -r requirements.txt
python app.py
```

### 5. Chạy

Truy cập link: http://localhost:5173/
