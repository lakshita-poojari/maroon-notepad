import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/notes/noteContext';
import NotesItem from './NotesItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
    navigate("/login")
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle: '', edescription: '', etag: '' });


  const updateNote = (currentNote) => {
    setShowModal(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  
  const handleUpdateClick = () => {
    setShowModal(false);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    // props.showAlert('Logged in Successfully', 'success');
        // setNote({
    //   etitle: '',
    //   edescription: '',
    //   etag: '',
    // });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <AddNote showAlert = {props.ShowAlert}/> */}
      <AddNote/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => setShowModal(true)}
      >
        Launch demo modal
      </button>

      {showModal && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      onChange={onChange}
                      value={note.etitle}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                      value={note.edescription}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      onChange={onChange}
                      value={note.etag}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>

                <button disabled={note.etitle.length<=1 || note.edescription.length<=1} type="button" className="btn btn-primary" onClick={handleUpdateClick}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <h1>Your Notes</h1>
        <div className='container my-2'>
        {notes.length===0 && 'No notes to display'}       </div> 
        {notes.map((note) => (
          // <NotesItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          <NotesItem key={note._id} updateNote={updateNote} note={note} />
        ))}

      </div>
    </>
  );
};
export default Notes;