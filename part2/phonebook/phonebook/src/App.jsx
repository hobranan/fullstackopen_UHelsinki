import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault(); // prevents refreshing the page
    const noteObject = {
      name: newName,
    };
    setPersons(persons.concat(noteObject));
    setNewName("");
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
