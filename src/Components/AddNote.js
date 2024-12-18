import React, { useContext, useState } from 'react';
import noteContext from "../Context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag); // Assuming addNote expects a note object
    setNote({ title: "", description: "", tag: "" }); // Clearing the form after submission
    // props.showAlert('Added Note Successfully', 'success');

  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-5">
        <h1>Add your notes:</h1>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Title should contain at least 3 characters"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Description should contain at least 5 characters"
              onChange={onChange}
              value={note.description}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button disabled={note.title.length<=1 || note.description.length<=1} type="submit" className="btn btn-primary my-2 mb-5" onClick={handleClick}>
            Add Note
          </button>
          <hr></hr>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
