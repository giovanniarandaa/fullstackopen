// eslint-disable-next-line react/prop-types
const PersonForm = ({
  newName,
  setNewName,
  newPhone,
  setNewPhone,
  handleSubmit,
}) => {
  return (
    <form>
      <div>
        name:{" "}
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="tel"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};
export default PersonForm;
