require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(morgan("tiny"));

morgan.token("post", (request) => {
  if (request.method === "POST") return JSON.stringify(request.body);
  else return "";
});

morgan.format(
  "postFormat",
  ":method :url :status :res[content-length] - :response-time ms :post",
);

app.use(morgan("postFormat"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function generateId() {
  return Math.floor(Math.random() * 1e15);
}

app.get("/api/persons", (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>  
    `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
