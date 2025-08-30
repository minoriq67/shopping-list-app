import React, { useState, useEffect } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // サーバーから一覧を取得
  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // 新しいアイテムを追加
  const addItem = async () => {
    if (!input.trim()) return;

    const res = await fetch("http://localhost:8000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });

    const data = await res.json();
    setItems(data.items);
    setInput("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 買い物リスト</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="商品名を入力"
      />
      <button onClick={addItem}>追加</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
