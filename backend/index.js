const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// アイテムを { name, checked } 形式で管理
let items = [];

// 一覧取得
app.get("/items", (req, res) => {
  res.json(items);
});

// アイテム追加
app.post("/items", (req, res) => {
  const { name } = req.body;
  if (typeof name === "string" && name.trim() !== "") {
    items.push({ name: name.trim(), checked: false }); // ← checked追加
  }
  res.json({ items });
});

// チェック状態を切り替え
app.put("/items/:index", (req, res) => {
  const idx = parseInt(req.params.index);
  if (!isNaN(idx) && idx >= 0 && idx < items.length) {
    items[idx].checked = !items[idx].checked; // ← 状態反転
  }
  res.json({ items });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


// DELETE: 指定したインデックスのアイテムを削除
app.delete("/items/:index", (req, res) => {
  const idx = parseInt(req.params.index);
  if (!isNaN(idx) && idx >= 0 && idx < items.length) {
    items.splice(idx, 1);
  }
  res.json({ items });
});
