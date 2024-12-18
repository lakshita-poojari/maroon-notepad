import React, { useContext } from 'react';
import noteContext from "../Context/notes/noteContext"


const NotesItem = props => {
  const context = useContext(noteContext);

  const { deleteNote } = context;
  const { note, updateNote } = props;

  const iconStyle = {
    float: 'right',
    cursor: 'pointer',
  };

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} </p>
          <i className="fa-solid fa-trash my-1 mx-2" style={iconStyle} onClick={()=>{deleteNote(note._id); 
            // props.showAlert('Deleted Successfully', 'success');
          }}></i>         
          <i className="fa-solid fa-pen-to-square my-1 mx-2" style={iconStyle} onClick={()=>{updateNote(note)}}></i>
            </div>
      </div>
    </div>
  );
};

export default NotesItem;
