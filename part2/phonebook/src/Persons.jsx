import PersonDetail from "./PersonDetail.jsx";

const Persons = ({ persons = [], onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonDetail
          person={person}
          key={person.id}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </ul>
  );
};
export default Persons;
