import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useOutletContext, Link, useParams } from "react-router-dom";

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
        console.log("Saving...")
    }

    const deleteNote = () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            // cardList = cardList.filter(obj => obj.id !== id);
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
                    <button onClick={() => {SaveContents()}} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Save
                        </span>
                    </button>
                    </Link>
                    {/* DELETE BUTTON */}
                    <button onClick={() => deleteNote()} className="deleteButton relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Delete
                        </span>
                    </button>
                </div>
            </div>
            
            <ReactQuill theme="snow" value={value} onChange={setValue} /> 
        </div>
    )
}