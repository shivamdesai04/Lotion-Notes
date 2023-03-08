import React from "react";
import { Link } from "react-router-dom";

export default function NoteCard ({id, title, date, content}) {
    
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
    const activeDate = formatDate(date)

    if (content == "") {
        content = "..."
    }

    return (
        <>
        <Link to={`/${id}`}>
        <div className="cardItems my-3 mx-3 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl ">
            <a className="block rounded-xl bg-white p-2 sm:p-3 lg:p-4 focus:ring-4 focus:outline-none " href="">
                <h4 className="cardContentTitle">{title}</h4>
                <p className="cardDate">{activeDate}</p>
                <div className="cardSmallContent" dangerouslySetInnerHTML={{ __html: content }}></div>
            </a>
        </div>
        </Link>
        </>
    )
}