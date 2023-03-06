import React from "react";
import { Link } from "react-router-dom";

export default function NoteCard ({id, title, date, content}) {
    // console.log(id)
    return (
        <>
        {/* <h4>Title</h4>
        <p className="cardDate">2023-03-02 11:35 PM</p>
        <p className="cardPreview">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            */}
        {/* <Link to={id} element={AppLayout}> */}
        <Link to={`/${id}`}>
        <div className="cardItems my-3 mx-3 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl ">
            <a className="block rounded-xl bg-white p-2 sm:p-3 lg:p-4 focus:ring-4 focus:outline-none  dark:focus:ring-pink-800" href="">
                <h4>{title}</h4>
                <p className="cardDate">{date}</p>
                <p className="cardPreview">{content}</p>
            </a>
        </div>
        </Link>
        
        {/* </Link> */}
        </>
    )
}