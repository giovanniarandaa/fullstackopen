import PersonDetail from "./PersonDetail.jsx";

const Persons = ({ persons = [] }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonDetail person={person} key={person.id} />
      ))}
    </ul>
  );
};
export default Persons;
