
# Tài liệu hướng dẫn sử dụng  
## Ứng dụng web Bất động sản ALPHA

---

## Cài đặt môi trường

### 1. Clone dự án về máy cá nhân

- Đảm bảo đã cài đặt Git: [https://git-scm.com/downloads](https://git-scm.com/downloads)  
- Đảm bảo đã cài đặt MongoDB: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

- Tạo thư mục lưu dự án, ví dụ: `D:\Projects`  
- Mở Terminal tại thư mục đó và chạy:

```bash
git clone https://github.com/DuyNoob02/project_NLCS.git
```

---

### 2. Cài đặt các gói phụ thuộc

- Mở Terminal tại `../Projects/project_NLCS/server` và chạy:

```bash
npm install
```

- Tại `../Projects/project_NLCS/client` cũng chạy:

```bash
npm install
```

---

### 3. Cài đặt Ubuntu 22.04.5 LTS và Redis

Redis chỉ có thể cài đặt trong môi trường Linux, nên cần cài đặt Ubuntu qua WSL:

- Mở Command Prompt với quyền Admin và chạy:

```bash
wsl --install
```

- Mở Ubuntu sau khi cài xong và chạy:

```bash
sudo apt update
sudo apt install redis-server -y
sudo service redis-server start
```

- Kiểm tra Redis:

```bash
redis-cli
ping
```

Nếu kết quả là `PONG` => thành công.

---

## Chạy chương trình

### 1. Server

Tại thư mục `project_NLCS/server`, chạy:

```bash
npm run start
```

### 2. Giao diện (Client)

Tại thư mục `project_NLCS/client`, chạy:

```bash
npm run build
npm run preview
```

Sau đó mở trình duyệt và truy cập: [http://localhost:3000/](http://localhost:3000/)

---

## Sử dụng ứng dụng

### Người dùng

#### ✅ Xem bất động sản

- Xem các bài đăng ngay tại trang chủ mà không cần đăng nhập.
- Có thể lọc theo loại hình bất động sản.
- Nhấp vào bài đăng để xem chi tiết (thông tin liên hệ, vị trí...).

#### ✅ Tạo tài khoản

- Nhấn "Đăng ký", điền thông tin, nhấn "Đăng ký".
- Sau khi được quản trị viên duyệt, người dùng sẽ nhận email xác nhận.

#### ✅ Nhắn tin

- Sau khi đăng nhập, có thể nhắn tin bằng cách nhấn biểu tượng tin nhắn trong chi tiết bài đăng.
- Xem tin nhắn tại mục **Liên hệ**.

#### ✅ Đăng bài

- Nhấn "Đăng bài", điền thông tin, chọn `Create`.
- Sau khi quản trị viên duyệt, bài đăng sẽ hiển thị trên trang web.

#### ✅ Cập nhật tài khoản

- Người dùng có thể cập nhật thông tin cá nhân.
- Có thể xem trang cá nhân được hiển thị cho người khác.

---

### Quản trị viên

- Sau khi đăng nhập, quản trị viên sẽ thấy trang quản lý với thống kê bài đăng.

#### ✅ Quản lý bài đăng

- Duyệt hoặc xóa bài đăng.
- Bài bị xóa sẽ vào danh sách "chờ xóa", có thể xóa vĩnh viễn sau đó.

#### ✅ Quản lý tài khoản

- Duyệt hoặc xóa yêu cầu tạo tài khoản.
- Gửi email thông báo đến người dùng sau khi được duyệt.

---

**Hết**
