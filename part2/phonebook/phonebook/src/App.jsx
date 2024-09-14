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
const Persons = ({ persons, newNameFilter, setPersons, setErrorMessage }) => {
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
                  const tempName = filteredPerson.name;
                  AxiosPersons.deleteEntry(filteredPerson.id)
                    .then((response) => {
                      console.log("delete() promise fulfilled");
                      setPersons(
                        persons.filter(
                          (person) => person.id !== filteredPerson.id
                        )
                      );
                    })
                    .catch((error) => {
                      if (error.response && error.response.status === 404) {
                        console.log("delete() promise rejected");
                        setErrorMessage(
                          `Information on ${filteredPerson.name}'s has already been removed from the server`
                        );
                        setTimeout(() => {
                          setErrorMessage(null);
                        }, 3000);
                      }
                    });
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

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with new?`
        )
      ) {
        const tempId = persons.find((person) => person.name === newName).id;
        const noteObject = {
          name: newName,
          number: newNumber,
          id: tempId,
        };
        AxiosPersons.update(noteObject.id, noteObject).then((response) => {
          console.log("update() promise fulfilled");
        });
        setPersons(
          persons.map((person) =>
            person.name !== newName ? person : noteObject
          )
        );
        setNewName("");
        setNewNumber("");

        setErrorMessage(
          `Updated ${noteObject.name}'s number to ${noteObject.number}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`number ${newNumber} is already added to phonebook`);
      return;
    } else {
      const generateId = () => {
        return Math.floor(Math.random() * 4294967295);
      };
      let random_id = generateId();
      console.log(random_id);
      while (persons.find((item) => item.id === random_id)) {
        random_id = generateId();
        console.log(random_id);
      }
      //* TO DO: change ID to number (non-string) type after making sure frontend id generation functionality works with backend for all API requests types
      let noteObject = {
        name: newName,
        number: newNumber,
        id: random_id.toString(), //* this is not used since mongoDB generates its own id, but may be useful for other databases like SQL
      };
      console.log("noteObject", noteObject);

      setNewName("");
      setNewNumber("");

      AxiosPersons.create(noteObject).then((response) => {
        console.log("create() promise fulfilled");
        noteObject.id = response.id;
        console.log("noteObject.id = response.id=", noteObject.id);
      });

      setPersons(persons.concat(noteObject));
      console.log("persons new", persons);
      setErrorMessage(`Added ${noteObject.name} to the phonebook`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    console.log("effect"); // useful for tracking when exactly this effect fires
    AxiosPersons.getAll().then((response) => {
      console.log("getAll() promise fulfilled");
      setPersons(response);
    });
  }, []);

  console.log("render", persons.length, "persons"); // useful for tracking how many times this component renders and current number of persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
