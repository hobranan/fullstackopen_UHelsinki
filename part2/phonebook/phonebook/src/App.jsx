import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "123 4567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  // capture the input value as you type
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
    const handleNoteChangeNumber = (event) => {
      console.log(event.target.value);
      setNewNumber(event.target.value);
    };

  const addNote = (event) => {
    event.preventDefault(); // prevents refreshing the page
    // reference: https://www.geeksforgeeks.org/how-to-check-if-an-array-includes-an-object-in-javascript/
    if (persons.some(person => person.name === newName)) {
      alert(`name ${newName} is already added to phonebook`);
      return;
    } else if (persons.some(person => person.number === newNumber)) {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
        name: <input value={newName} onChange={handleNoteChange} /> <br></br>
        number: <input value={newNumber} onChange={handleNoteChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((each) => (
          <li key={each.name}>{each.name} at {each.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
