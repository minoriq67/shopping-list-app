const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const { name } = req.body;
  if (typeof name === "string" && name.trim() !== "") {
    items.push(name.trim());
  }
  res.json({ items });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
