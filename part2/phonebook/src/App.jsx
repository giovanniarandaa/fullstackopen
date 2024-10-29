import { useEffect, useState } from "react";
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";
import axios from "axios";
import { create, destroy, getAll } from "./persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existsName = persons.find((person) => person.name === newName);

    if (existsName) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = {
      name: newName,
      number: newPhone,
    };

    create(person).then((res) => {
      setPersons(persons.concat(res.data));
      setNewName("");
      setNewPhone("");
    });
  };

  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const result = window.confirm(`Delete ${person.name} ?`);

    if (result) {
      destroy(person.id).then((res) => {
        setPersons((prev) => prev.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
