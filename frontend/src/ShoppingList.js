import React, { useState, useEffect } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  // サーバーから一覧を取得
  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // 新しいアイテムを追加
   const addItem = async () => {
    if (newItem.trim() !== "") {
      const res = await fetch("http://localhost:8000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newItem, quantity }),
      });
      const data = await res.json();
      setItems(data.items);
      setNewItem("");
      setQuantity(1);
    }
  };

  // アイテム削除
  const deleteItem = async (id) => {
  const res = await fetch(`http://localhost:8000/items/${id}`, { method: "DELETE" });
  const data = await res.json();
  setItems(data.items);
};

  // 全削除
  const deleteAllItems = async () => {
  const res = await fetch("http://localhost:8000/items", {
    method: "DELETE",
  });
  const data = await res.json();
  setItems(data.items); // フロントエンドの状態も空に
};



  // ✅ チェック切り替え
  const toggleCheck = async (id) => {
  const res = await fetch(`http://localhost:8000/items/${id}`, { method: "PUT" });
  const data = await res.json();
  setItems(data.items);
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>買い物リスト</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="商品名を入力"
      />
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ width: "60px", marginLeft: "8px" }}
      />
      <button onClick={addItem} style={{ marginLeft: "10px" }}>
        追加
      </button>

      <button
       onClick={deleteAllItems}
       style={{ marginLeft: "10px", background: "blue", color: "white" }}
      >
        全削除
      </button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              textDecoration: item.checked ? "line-through" : "none",
              marginBottom: "8px",
            }}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleCheck(index)}
              style={{ transform: "scale(1.5)", marginRight: "8px" }}
            />
            {item.name} （×{item.quantity}）
            <button
              onClick={() => deleteItem(index)}
              style={{ marginLeft: "10px" }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;