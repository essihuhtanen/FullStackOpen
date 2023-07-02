import { useState, useEffect } from "react";
import {
  getNumbers,
  addNumber,
  deleteNumber,
  updateNumber,
} from "./services/contacts";

const SearchFilter = ({ filterString, handleFilterChange }) => {
  return (
    <div>
      <p>Filter contacts</p>
      <input value={filterString} onChange={handleFilterChange} />
    </div>
  );
};

const ContactForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Add new contact:</h3>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Person = ({ person, onDelete }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => onDelete(person)}>Delete</button>
    </div>
  );
};

const ContactList = ({ persons, filterString, onDelete }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterString.toLowerCase())
        )
        .map((person) => (
          <Person key={person.id} person={person} onDelete={onDelete} />
        ))}
    </div>
  );
};

const Notification = ({ message, type }) => {
  return message ? <div className={type}>{message}</div> : null;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => setFilterString(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.findIndex((person) => person.name === newName) > -1) {
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      ) && handleUpdate();
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.reduce(
          (largestId, curr) => (curr > largestId ? curr : largestId),
          0
        ),
      };
      setNewName("");
      setNewNumber("");
      addNumber(newPerson).then((res) => setPersons(persons.concat(res)));
      showNotification(`Added ${newPerson.name}`, "confirmation");
    }
  };

  const handleDelete = (personToDelete) => {
    window.confirm(`Delete ${personToDelete.name}?`) &&
      deleteNumber(personToDelete.id)
        .then(
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          )
        )
        .catch(() => {
          showNotification(
            `Information of ${personToDelete.name} has already been deleted from the server`,
            "error"
          );
        });
  };

  const handleUpdate = () => {
    const personToUpdate = persons.find((person) => person.name === newName);
    const updatedPerson = { ...personToUpdate, number: newNumber };
    updateNumber(updatedPerson).then(
      setPersons(
        persons.map((person) =>
          person.id === updatedPerson.id ? updatedPerson : person
        )
      )
    );
    setNewName("");
    setNewNumber("");
    showNotification(`Updated ${updatedPerson.name}`, "confirmation");
  };

  const showNotification = (message, type) => {
    setNotification({ message: message, type: type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  useEffect(() => {
    getNumbers().then((res) => setPersons(res));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <ContactForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <SearchFilter
        filterString={filterString}
        handleFilterChange={handleFilterChange}
      />
      <ContactList
        persons={persons}
        filterString={filterString}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
