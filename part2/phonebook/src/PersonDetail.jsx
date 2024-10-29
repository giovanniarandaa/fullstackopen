const PersonDetail = ({ person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button type="button" onClick={onDelete}>
        delete
      </button>
    </li>
  );
};
export default PersonDetail;
