import React from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";

export default function ViewNotes () {
    const {id} = useParams();
    const cardList = useOutletContext();
    
    const activeNote = cardList.find(note => note.id === id);
    return (
        <div className="viewComponent">
            <div className="noteHeader">
                <div className="editorInfo">
                    {/* <input className="noteTitle" type="text" placeholder="Untitled" /> */}
                    <div className="viewTitle"><h3>{activeNote.title}</h3></div>
                    <div className="viewDate">{activeNote.date}</div>
                    {/* <input type="datetime-local" className="dateInput"/> */}
                </div>
                
                <div className="editorButtons">
                    {/* EDIT BUTTON */}
                    <Link to={`/${id}/edit`}>
                    <button className="saveButton relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Edit
                        </span>
                    </button>
                    </Link>
                    {/* DELETE BUTTON */}
                    <button className="deleteButton relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Delete
                        </span>
                    </button>
                </div>
            </div>

            <div className="viewContent">
                {activeNote.content}
            </div>

        </div>
    )
}