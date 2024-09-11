import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ newNameFilter, handleNoteChangeNameFilter }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={newNameFilter} onChange={handleNoteChangeNameFilter} />
    </div>
  );
};

const PersonForm = ({
  newName,
  handleNoteChange,
  newNumber,
  handleNoteChangeNumber,
  addNote,
}) => {
  return (
    <form onSubmit={addNote}>
      <div>
        name: <input value={newName} onChange={handleNoteChange} /> <br></br>
        number: <input value={newNumber} onChange={handleNoteChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, newNameFilter }) => {
  return (
    <ul>
      {persons
        .filter((each) =>
          each.name.toLowerCase().includes(newNameFilter.toLowerCase())
        )
        .map((filteredPerson) => (
          <li key={filteredPerson.name}>
            {filteredPerson.name} at {filteredPerson.number}
          </li>
        ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");

  // capture the input value as you type
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNoteChangeNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleNoteChangeNameFilter = (event) => {
    console.log(event.target.value);
    setNewNameFilter(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault(); // prevents refreshing the page
    // reference: https://www.geeksforgeeks.org/how-to-check-if-an-array-includes-an-object-in-javascript/
    if (persons.some((person) => person.name === newName)) {
      alert(`name ${newName} is already added to phonebook`);
      return;
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`number ${newNumber} is already added to phonebook`);
      return;
    } else {
      const noteObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(noteObject));
      setNewName("");
      setNewNumber("");
    }
  };

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "persons");

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        newNameFilter={newNameFilter}
        handleNoteChangeNameFilter={handleNoteChangeNameFilter}
      />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        handleNoteChange={handleNoteChange}
        newNumber={newNumber}
        handleNoteChangeNumber={handleNoteChangeNumber}
        addNote={addNote}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} newNameFilter={newNameFilter} />
    </div>
  );
};

export default App;
