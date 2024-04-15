const generate_response = (id, text) => {
  const response = "Hello, " + id + "!";
  return { id, response };
};

module.exports = { generate_response };
