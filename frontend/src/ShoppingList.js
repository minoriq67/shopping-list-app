import React, { useState, useEffect } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("食品");

  // サーバーから一覧を取得
  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  }, []);

  // 新しいアイテムを追加
  const addItem = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newItem,
        quantity,
        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => setItems(data.items));
    setNewItem("");
    setQuantity(1);
    setCategory("食品");
  };

  // アイテム削除
  const deleteItem = (id) => {
    fetch(`http://localhost:8000/items/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  };

  // 全削除
 const deleteAllItems = () => {
    fetch("http://localhost:8000/items", { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  };

  // ✅ チェック切り替え
  const toggleCheck = (id) => {
    const item = items.find((i) => i.id === id);
    fetch(`http://localhost:8000/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: !item.checked }),
    })
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  };

  //　カテゴリ分け
  const categories = ["食品", "日用品", "飲料", "その他"];

  //　カテゴリ色分け
  const categoryColors = {
  食品: "#e6f7e6",
  日用品: "#e6f0ff",
  飲料: "#fff2e6",
  その他: "#f9f9f9",
};

 return (
    <div>
      <h1>🛒 買い物リスト</h1>

      <form onSubmit={addItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="アイテム名"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="数量"
          min="1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit">追加</button>
      </form>

      <button onClick={deleteAllItems} style={{ marginTop: "10px",backgroundColor:"blue",color:"white"}}>
        全削除
      </button>

      {categories.map((cat) => (
        <div
          key={cat}
          style={{
          backgroundColor: categoryColors[cat],  // カテゴリごとに色付け
          borderRadius: "13px",
          padding: "5px 20px",
          marginBottom: "12px", //　文字下に余白
          boxShadow: "0 2px 5px rgba(0,1,4,0.12)",
         }}
        >
         <h3 style={{ fontSize: "1.1rem", color: "#444", marginBottom: "8px",
          fontWeight: "650",  // 字の太さ 
          }}>
          　{cat}
         </h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {items
              .filter((item) => item.category === cat)
              .map((item) => (
                <li
                  key={item.id}
                  style={{
                    textDecoration: item.checked ? "line-through" : "none",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                    style={{ transform: "scale(1.5)", marginRight: "8px" }}
                  />
                  {item.name} （×{item.quantity}）
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{ marginLeft: "10px"}}
                  >
                    削除
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ShoppingList;