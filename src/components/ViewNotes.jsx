import React from "react";
import { useOutletContext, useParams, Link, useNavigate } from "react-router-dom";

export default function ViewNotes () {
    const {id} = useParams();
    const cardList = useOutletContext();
    console.log(cardList)

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }

        return formatted;
    };

    const activeNote = cardList.find(note => note.id === id);

    const activeDate = formatDate(activeNote.date)

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
        <div className="viewComponent">
            <div className="noteHeader">
                <div className="editorInfo">
                    <div className="viewTitle"><h3>{activeNote.title}</h3></div>
                    <div className="viewDate">{activeDate}</div>
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
                    <button onClick={() => deleteNote()} className="deleteButton relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Delete
                        </span>
                    </button>
                </div>
            </div>

            <div id="contentArea" className="viewContent" dangerouslySetInnerHTML={{ __html: activeNote.content }} ></div>

        </div>
    )
}