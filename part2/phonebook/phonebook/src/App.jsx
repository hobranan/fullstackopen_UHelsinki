import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  // capture the input value as you type
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault(); // prevents refreshing the page
    // reference: https://www.geeksforgeeks.org/how-to-check-if-an-array-includes-an-object-in-javascript/
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      const noteObject = {
        name: newName,
      };
      setPersons(persons.concat(noteObject));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((each) => (
          <li key={each.name}> {each.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
