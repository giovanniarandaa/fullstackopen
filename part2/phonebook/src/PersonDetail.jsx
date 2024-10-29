const PersonDetail = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};
export default PersonDetail;
