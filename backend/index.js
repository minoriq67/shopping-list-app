const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

let items = [];
let nextId = 0;

// アイテム一覧
app.get("/items", (req, res) => {
  res.json(items);
});

// アイテム追加
app.post("/items", (req, res) => {
  const { name, quantity } = req.body;
  if (typeof name === "string" && name.trim() !== "") {
    const q = parseInt(quantity) || 1; //数字がなければ1にする
    items.push({ id: nextId++, name: name.trim(), quantity: q, checked: false });
  }
  res.json({ items });
});

// チェック状態を切り替え
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((it) => it.id === id);
  if (item) item.checked = !item.checked;
  res.json({ items });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// DELETE: 指定したインデックスのアイテムを削除
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((it) => it.id !== id);
  res.json({ items });
});

// すべてのアイテムを削除
app.delete("/items", (req, res) => {
  items = [];
  res.json({ items });
});
