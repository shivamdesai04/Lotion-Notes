import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useOutletContext, Link, useParams, useNavigate } from "react-router-dom";

export default function Editor () {
    const cardList = useOutletContext();
    const {id} = useParams();

    const editingNote = cardList.find(note => note.id === id);
    
    const [title, setTitle] = useState(editingNote.title);
    const [date, setDate] = useState(editingNote.date);
    const [value, setValue] = useState(editingNote.content); 

    const SaveContents = () => {
        editingNote.title = title;
        editingNote.date = date;
        editingNote.content = value;
        localStorage.setItem('notesStorage', JSON.stringify(cardList));
    }

    const findIndex = (array, uniquedId) => {
        for (let i=0 ; i < array.length; i++) {
            if ((array[i].id) === uniquedId) {
                return i;
            }
        }
    }

    const navigate = useNavigate();
    const deleteNote = () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            if (cardList.length > 1) {
                const index = findIndex(cardList, id)
                cardList.splice(index, 1);
                localStorage.setItem('notesStorage', JSON.stringify(cardList));
                navigate(`/${cardList[0].id}`, {replace : true})
            }
            else {
                cardList.splice(0, 1);
                localStorage.setItem('notesStorage', JSON.stringify(cardList));
                navigate(`/`, {replace : true})
            }
        }
    }

    return (
        <div className="editorComponent">
            <div className="noteHeader">
                <div className="editorInfo">
                    <input className="noteTitle" type="text" placeholder="Untitled" value={title} onChange={e => {setTitle(e.target.value)}}/>
                    <input type="datetime-local" className="dateInput" value={date} onChange={e => {setDate(e.target.value)}}/>
                </div>
                
                <div className="editorButtons">
                    {/* SAVE BUTTON */}
                    <Link to={`/${id}`}>
                    <button onClick={() => {SaveContents()}} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Save
                        </span>
                    </button>
                    </Link>
                    {/* DELETE BUTTON */}
                    <button onClick={() => deleteNote()} className="deleteButton relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Delete
                        </span>
                    </button>
                </div>
            </div>
            
            <ReactQuill placeholder="Your text here" theme="snow" value={value} onChange={setValue} /> 
        </div>
    )
}