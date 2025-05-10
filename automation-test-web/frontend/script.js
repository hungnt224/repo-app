const API_URL = "http://localhost:3000/users";

// Lấy danh sách user từ server
async function fetchUsers() {
    const res = await fetch(API_URL);
    const users = await res.json();
    renderUsers(users);
}

// Hiển thị user lên bảng
function renderUsers(users) {
    const table = document.getElementById("userTable");
    table.innerHTML = "";
    users.forEach(user => {
        let row = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><button onclick="deleteUser(${user.id})">Xóa</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}

// Thêm user mới
document.getElementById("userForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    });

    document.getElementById("userForm").reset();
    fetchUsers();
});

// Xóa user
async function deleteUser(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
}

// Load user khi trang mở
fetchUsers();
