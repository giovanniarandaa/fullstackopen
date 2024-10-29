import { useEffect, useState } from "react";
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";
import { create, destroy, getAll, update } from "./persons.js";
import NotificationSuccess from "./NotificationSuccess.jsx";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existsName = persons.find((person) => person.name === newName);

    const person = {
      name: newName,
      number: newPhone,
    };

    if (existsName) {
      const response = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`,
      );
      if (response) {
        update(existsName.id, person).then((responsePerson) => {
          const newPersons = persons.map((person) =>
            person.id !== existsName.id ? person : responsePerson.data,
          );

          setPersons(newPersons);
          setSuccessMessage(`Updated ${person.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });
      }
      return;
    }

    create(person).then(({ data }) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewPhone("");
      setSuccessMessage(`Added ${data.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
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
      {successMessage && <NotificationSuccess message={successMessage} />}
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
