import { useState, useEffect } from "react";
import AxiosPersons from "./services/persons";

const Filter = ({ newNameFilter, handleNoteChangeNameFilter }) => {
  return (
    <div>
      find countries:{""}
      <input value={newNameFilter} onChange={handleNoteChangeNameFilter} />
    </div>
  );
};

const Persons = ({ personsFiltered }) => {
  return (
    <ul>
      {personsFiltered.map((filteredPerson) => (
        <div key={filteredPerson.name.common}>
          <li> {filteredPerson.name.common}</li>
        </div>
      ))}
    </ul>
  );
};

const SingleCountry = ({ country }) => {
  // country will no be able to grab properties from the object if it doesnt exist yet
  if (country.length === 0) {
    return null;
  }
  return (
    <div>
      <h1>{country[0].name.common}</h1>
      <p>capital: {country[0].capital}</p>
      <p>population: {country[0].population}</p>
      <h4>languages:</h4>
      <ul>
        {Object.entries(country[0].languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country[0].flags.png} alt="flag" width="100" />
    </div>
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
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [singlePerson, setSinglePerson] = useState([]);
  const [newNameFilter, setNewNameFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  // capture the input value as you type
  const handleNoteChangeNameFilter = (event) => {
    console.log(event.target.value);
    setNewNameFilter(event.target.value);
  };

  useEffect(() => {
    console.log("effect"); // useful for tracking when exactly this effect fires
    AxiosPersons.getAll().then((response) => {
      console.log("getAll() promise fulfilled");
      setPersons(response);
    });
  }, []); // empty array [] means this effect will only run after the first render

  useEffect(() => {
    console.log("effect newNameFilter"); // useful for tracking when exactly this effect fires
    // if (newNameFilter === "") {
    //   return;
    // } else {
    const filter_persons = persons.filter((each) =>
      each.name.common.toLowerCase().includes(newNameFilter.toLowerCase())
    );
    console.log("filter_persons.length", filter_persons.length);
    if (filter_persons.length > 10) {
      console.log("filter_persons.length > 10");
      setErrorMessage(
        `Results = ${filter_persons.length}, More than 10 results, change the search to be more specific`
      );
      setPersonsFiltered([]);
      setSinglePerson([]);
    } else if (filter_persons.length === 1) {
      setErrorMessage(null);
      setPersonsFiltered([]);
      setSinglePerson(filter_persons);
      console.log("filter_persons[0]", filter_persons[0]);
    } else {
      console.log("filter_persons.length is else");
      setErrorMessage(null);
      setPersonsFiltered(filter_persons);
      setSinglePerson([]);
    }
    // }
  }, [newNameFilter]); // this effect will run every time newNameFilter changes

  return (
    <div>
      <Filter
        newNameFilter={newNameFilter}
        handleNoteChangeNameFilter={handleNoteChangeNameFilter}
      />
      <h3>Countries</h3>
      <Notification message={errorMessage} />
      <Persons
        persons={persons}
        newNameFilter={newNameFilter}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        personsFiltered={personsFiltered}
      />
      <SingleCountry country={singlePerson} />
    </div>
  );
};

export default App;
