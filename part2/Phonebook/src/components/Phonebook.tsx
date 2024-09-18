import Person from "./Person";

const Phonebook = ({ persons, handleRemove }: any) => {
  return (
    <ul>
      {persons.map((person: any) => (
        <Person key={person.id} person={person} handleRemove={handleRemove} />
      ))}
    </ul>
  );
};

export default Phonebook;
