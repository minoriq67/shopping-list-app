const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

let items = [];
let nextId = 1;

// アイテム一覧
app.get("/items", (req, res) => {
  res.json({ items });
});

// アイテム追加
app.post("/items", (req, res) => {
  const { name, quantity, category } = req.body;
  if (typeof name === "string" && name.trim() !== "") {
    items.push({
      id: nextId++,
      name: name.trim(),
      quantity: parseInt(quantity) || 1,
      checked: false,
      category: category || "その他",
    });
  }
  res.json({ items });
});


// チェック状態を切り替え
app.patch("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (item) {
    if (req.body.hasOwnProperty("checked")) {
      item.checked = req.body.checked;
    }
  }
  res.json({ items });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// DELETE: 指定したインデックスのアイテムを削除
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((i) => i.id !== id);
  res.json({ items });
});

// すべてのアイテムを削除
app.delete("/items", (req, res) => {
  items = [];
  res.json({ items });
});
