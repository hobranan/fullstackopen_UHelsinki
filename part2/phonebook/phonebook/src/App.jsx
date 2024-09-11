import { useState, useEffect } from "react";
import AxiosPersons from "./services/persons";

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

// added another prop to remove a person from the list
const Persons = ({ persons, newNameFilter, removePerson }) => {
  return (
    <ul>
      {persons
        .filter((each) =>
          each.name.toLowerCase().includes(newNameFilter.toLowerCase())
        )
        .map((filteredPerson) => (
          <div key={filteredPerson.id}>
            <li>
              {filteredPerson.name} at {filteredPerson.number}
            </li>
            <button
              onClick={() => {
                if (window.confirm("Delete " + filteredPerson.name + "?")) {
                  AxiosPersons.deleteEntry(filteredPerson.id).then(
                    (response) => {
                      console.log("delete() promise fulfilled");
                      removePerson(filteredPerson.id);
                    }
                  );
                }
              }}
            >
              delete
            </button>
          </div>
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
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new?`)) {
        const tempId = persons.find((person) => person.name === newName).id;
        const noteObject = {
          name: newName,
          number: newNumber,
          id: tempId,
        };
        AxiosPersons.update(noteObject.id, noteObject ).then(
          () => {
            console.log("update() promise fulfilled");
          }
        );
        setPersons(persons.map((person) => (person.name !== newName ? person : noteObject)));
      }
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`number ${newNumber} is already added to phonebook`);
      return;
    } else {
      const noteObject = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      };
      console.log("noteObject", noteObject);
      setPersons(persons.concat(noteObject)); // was told to use concat instead of push, as this doesnt not change existing arrays directly
      console.log("persons new", persons);
      setNewName("");
      setNewNumber("");

      AxiosPersons.create(noteObject).then((response) => {
        console.log("create() promise fulfilled");
      });
    }
  };

  useEffect(() => {
    console.log("effect"); // useful for tracking when exactly this effect fires
    AxiosPersons.getAll().then((response) => {
      console.log("getAll() promise fulfilled");
      setPersons(response);
    });
  }, []);

  console.log("render", persons.length, "persons");

  // had to make a separate function to remove/filter a person from the list
  const removePerson = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

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

      <Persons
        persons={persons}
        newNameFilter={newNameFilter}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
