const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { generate_response } = require("./llm/llmUtils");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint
app.post("/generate", (req, res) => {
  const { id, text } = req.body;
  const response = generate_response(id, text);
  res.send(response);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
