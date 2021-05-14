const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

//Middlewares
const checksExistsUserAccount = (request, response, next) => {
  const { username } = request.headers;

  const userAlreadyExists = users.find((user) => username === user.username);

  if (!userAlreadyExists) {
    return response.status(404).json({ error: "User not found!" });
  }
  request.user = userAlreadyExists;

  return next();
};

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some((user) => user.username === username);
  if (userAlreadyExists) {
    return response.status(400).json({ error: "User already exist" });
  }
  const user = {
    id: uuid(),
    name,
    username,
    todos: [],
  };
  users.push(user);

  return response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const {
    user: { todo },
  } = request;
  return response.status(200).json(todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
