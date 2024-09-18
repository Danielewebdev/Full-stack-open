import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Phonebook from "./components/Phonebook";
import axios from "axios";
import contactService from "./services/Contacts";
import Notification from "./components/Notification";

type PersonType = {
  id: number;
  content: string;
  number: string;
};

type NotificationType = {
  message: string | null;
  type: "success" | "error";
};

const App = () => {
  const [persons, setPersons] = useState<PersonType[]>([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<NotificationType>({
    message: null,
    type: "success",
  });

  useEffect(() => {
    contactService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: "success" });
    }, 5000);
  };

  const addPerson = (event: any) => {
    event.preventDefault();

    const existingContact = persons.find(
      (person) => person.content === newName
    );

    if (existingContact) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const updatedNumber = { ...existingContact, number: newNumber };
        contactService
          .update(updatedNumber.id, updatedNumber)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");

            showNotification(`Updated ${newName}'s number`, "success");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
    } else {
      const personObject = {
        content: newName,
        number: newNumber,
      };

      contactService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");

        showNotification(`Added ${newName}`, "success");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const handleRemove = (id: number | string) => {
    // Find the person by ID before removal
    const personToRemove = persons.find((person) => person.id === id)?.content;

    contactService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        if (personToRemove) {
          showNotification(
            `Information for '${personToRemove}' has already been removed from the server`,
            "error"
          );
        }
        setTimeout(() => {
          setNotification(null);
        }, 5000);

        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const handlePersonChange = (event: any) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event: any) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <h2>Add a new contact</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Phonebook persons={filteredPersons} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
