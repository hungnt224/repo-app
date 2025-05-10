const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const DB_FILE = "db.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Đọc dữ liệu từ db.json
function readDB() {
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
}

// Ghi dữ liệu vào db.json
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// API: Lấy danh sách user
app.get("/users", (req, res) => {
    const db = readDB();
    res.json(db.users);
});

// API: Thêm user mới
app.post("/users", (req, res) => {
    const db = readDB();
    const newUser = req.body;
    newUser.id = db.users.length + 1;
    db.users.push(newUser);
    writeDB(db);
    res.json({ message: "User added!", user: newUser });
});

// API: Xóa user
app.delete("/users/:id", (req, res) => {
    const db = readDB();
    db.users = db.users.filter(user => user.id !== parseInt(req.params.id));
    writeDB(db);
    res.json({ message: "User deleted!" });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
