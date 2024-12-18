import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    try {
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);

    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tag }),
      });

  
      if (!response.ok) {
        throw new Error('Failed to add a new note');
      }
  
      const json = await response.json();
      console.log(json);
  
      console.log("Adding a new note");
      const newNote = {
        "_id": json._id, // Replace this with the response ID if available
        "user": json.user,
        "title": title,
        "description": description,
        "tag": tag,
        "date": "1701515790635",
        "__v": 0
      };
  
      // Assuming notes is an array and setNotes is a function to update state
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
  

  //Delete a note
  const deleteNote = async(id)=> {
     //API call
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem('token') ,
        "Content-Type": "application/json",
      },
    });
    const json = response.json();
    console.log(json)
    console.log("deleteing note with id."+id);
    const newNotes = notes.filter((note)=> {return note._id!==id})
    setNotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag)=> {

    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
        headers: {
          "auth-token": localStorage.getItem('token') ,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title,description, tag}), 
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id ===id){
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
      setNotes(newNotes);
    }
  }

  useEffect(() => {
    getNotes(); // Fetch notes when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};


export default NoteState;
