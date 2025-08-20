import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim() !== "") {
      setItems([...items, input]);
      setInput("");
    }
  };

  return (
    <div>
      <h1>買い物リスト</h1>   
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="商品名を入力"
      />
      <button onClick={addItem}>追加</button>

      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>  
    </div>
  );
}

export default App;
