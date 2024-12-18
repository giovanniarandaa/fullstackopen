const NoteForm = ({ addNote, setForm, form }) => {
  return (
    <form onSubmit={addNote}>
      <h2>create a new blog</h2>
      <div>
        title
        <input
          type="text"
          value={form.title}
          onChange={({ target }) => setForm({ ...form, title: target.value })}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={form.author}
          onChange={({ target }) => setForm({ ...form, author: target.value })}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={form.url}
          onChange={({ target }) => setForm({ ...form, url: target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
export default NoteForm;
