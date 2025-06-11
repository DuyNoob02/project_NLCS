
# Tài liệu hướng dẫn sử dụng  
## Ứng dụng web Bất động sản ALPHA

---

## Cài đặt môi trường

### 1. Clone dự án về máy cá nhân

- Đảm bảo đã cài đặt Git: [https://git-scm.com/downloads](https://git-scm.com/downloads)  
- Đảm bảo đã cài đặt MongoDB: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

- Tạo thư mục lưu dự án, ví dụ: `D:\Projects`, và mở Terminal tại thư mục vừa tạo
  ![](https://imagizer.imageshack.com/img924/6681/g1U7Qb.png)
- Sau đó chạy lệnh sau
```bash
git clone https://github.com/DuyNoob02/project_NLCS.git
```
- Sau khi chạy sẽ thấy thư mục dự án được tạo như bên dưới
  ![](https://imagizer.imageshack.com/img924/9913/Wm0PIN.png)

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

Redis chỉ có thể cài đặt trong môi trường Linux, nên cần cài đặt Ubuntu qua WSL, Ubuntu có thể cài đặt qua Microsoft Store:

- Mở Command Prompt với quyền Admin và chạy:

```bash
wsl --install
```

- Sau khi cài đặt Ubuntu, mở terminal hỗ trợ wsl như sau:
  ![](https://imagizer.imageshack.com/img924/2159/H0fQ3k.png)
- Thực hiện chạy các lệnh sau để cài đặt redis server:
```bash
sudo apt update
sudo apt install redis-server -y
sudo service redis-server start
```

- Kiểm tra cài đặt thành công Redis, chạy lệnh redis-cli và nhập vào ping, nếu server phản hồi lại là PONG thì thành công:
  ![](https://imagizer.imageshack.com/img923/3807/sIAmad.png)
---

## Chạy chương trình

### 1. Server

Tại thư mục `project_NLCS/server`, chạy:

```bash
npm run start
```
  ![](https://imagizer.imageshack.com/img923/3159/m5pmxg.png)

### 2. Giao diện (Client)

Tại thư mục `project_NLCS/client`, chạy:

```bash
npm run build
npm run preview
```

Sau đó mở trình duyệt và truy cập: [http://localhost:3000/](http://localhost:3000/), sẽ thấy trang web như sau
![](https://imagizer.imageshack.com/img923/9224/gSt5ok.png)

---

## Sử dụng ứng dụng

### Người dùng

#### ✅ Xem bất động sản

- Xem các bài đăng ngay tại trang chủ mà không cần đăng nhập.
  ![](https://imagizer.imageshack.com/img923/5409/WFw3fX.png)
- Có thể lọc theo loại hình bất động sản.
  ![](https://imagizer.imageshack.com/img924/1525/FOalVt.png)
- Nhấp vào bài đăng để xem chi tiết (thông tin liên hệ, vị trí...).
  ![](https://imagizer.imageshack.com/img924/7503/y0Tcdp.png)

#### ✅ Tạo tài khoản

- Nhấn "Đăng ký" ở đầu trang sau đó điền các thông tin yêu cầu, nhấn "Đăng ký".
  ![](https://imagizer.imageshack.com/img924/4011/tKzoe7.png)
- Sau khi được quản trị viên duyệt, người dùng sẽ nhận email xác nhận.
  ![](https://imagizer.imageshack.com/img923/1832/mmEnFY.png)

#### ✅ Nhắn tin

- Sau khi đăng nhập, có thể nhắn tin bằng cách nhấn biểu tượng tin nhắn trong chi tiết bài đăng.
  ![](https://imagizer.imageshack.com/img924/6877/SpJG9d.png)
- Xem tin nhắn tại mục **Liên hệ**.
  ![](https://imagizer.imageshack.com/img923/613/epteSb.png)

#### ✅ Đăng bài

- Nhấn "Đăng bài", điền thông tin cần thiết cho bài đăng, chọn `Create`.
  ![](https://imagizer.imageshack.com/img923/4084/gBk8g6.png)
- Sau khi quản trị viên duyệt, bài đăng sẽ hiển thị trên trang web.
  ![](https://imagizer.imageshack.com/img924/9413/f1ScZB.png)

#### ✅ Cập nhật tài khoản

- Người dùng có thể cập nhật thông tin cá nhân.
  ![](https://imagizer.imageshack.com/img924/3641/J4H4x6.png)
- Có thể xem trang cá nhân được hiển thị cho người khác.
  ![](https://imagizer.imageshack.com/img923/8426/W1hy1w.png)

---

### Quản trị viên

- Sau khi đăng nhập, quản trị viên sẽ thấy trang quản lý với thống kê bài đăng.
  ![](https://imagizer.imageshack.com/img924/2650/hNBnUA.png)

#### ✅ Quản lý bài đăng

- Duyệt hoặc xóa bài đăng.
  ![](https://imagizer.imageshack.com/img924/9007/879agy.png)
- Bài bị xóa sẽ vào danh sách "chờ xóa", có thể xóa vĩnh viễn sau đó.
  ![](https://imagizer.imageshack.com/img924/3264/EfjyTJ.png)

#### ✅ Quản lý thông tin người dùng
![](https://imagizer.imageshack.com/img924/4651/6vqJmM.png)

#### ✅ Quản lý tài khoản

- Duyệt hoặc xóa yêu cầu tạo tài khoản.
  ![](https://imagizer.imageshack.com/img923/2179/vcWEg6.png)
---

**Hết**
