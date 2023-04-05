import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import numberService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [failMessage, setFailMessage] = useState(null);

  useEffect(() => {
    numberService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  const Del = (id) => {
    const person = persons.find((n) => n.id === id);
    console.log(person, 'was deleted');

    numberService.delEntry(person.id).then((initialPerson) => {
      setPersons(initialPerson);
    });
  };

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === nameObject.name)) {
      if (
        window.confirm(
          `${nameObject.name} is already a contact, would you like to change their number?`
        )
      ) {
        const personExist = persons.find(
          (person) => person.name === nameObject.name
        );
        const id = personExist.id;
        const changedPerson = { ...personExist, number: newNumber };
        numberService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            // alert(`the note '${persons.name}' was already deleted from server`);
            setFailMessage(
              `${nameObject.name} was previously deleted, the number change was unsuccesful!`
            );
            setTimeout(() => {
              setFailMessage(null);
            }, 3000);
            setPersons(persons.filter((n) => n.id !== id));
          });
      }
    } else {
      numberService.create(nameObject).then((returnedNumber) => {
        setPersons(persons.concat(returnedNumber));
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`${nameObject.name} was added to the Phonebook!`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      });
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook!</h1>
      <Notification message1={successMessage} message2={failMessage} />

      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={addName}
        onChangeName={handleNameChange}
        onChangeNum={handleNumChange}
      />

      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person) => (
            <Persons
              key={person.id}
              person={person}
              onClick={() => Del(person.id)}
            />
          ))}
      </ul>
    </div>
  );
};

export default App;
