const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = []; # メモリに保存（再起動すると消える）

# アイテム一覧取得
app.get("/items", (req, res) => {
  res.json(items);
});

# アイテム追加
app.post("/items", (req, res) => {
  const { name } = req.body;
  if (name && name.trim() !== "") {
    items.push(name);
  }
  res.json({ items });
});

# サーバー起動
app.listen(8000, () => {
  console.log("✅ Server running on http://localhost:8000");
});
