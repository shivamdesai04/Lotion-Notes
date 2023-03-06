import React, { useState } from "react";
import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

// Importing Components
// import Navbar from "./Navbar";
import Editor from "./Editor";
import NoteCard from "./NoteCard";
import DefaultPage from "./DefaultPage";
import ViewNotes from "./ViewNotes";

export default function AppLayout() {
  const[cardList, setCardList] = useState([]);
  const AddCard = () => {
    // setCardList(cardList.concat(<NoteCard key={cardList.length} />));
    // console.log(cardList)
    const temp = [...cardList, generateCardContents()]
    setCardList(temp)
  }

  const generateCardContents = () => {
    const defaultCard = {
      id: uuidv4(),
      title: "Vishnu da dumbo",
      date: "23-03-04 10:59 PM",
      content: "Shivam ipsum dolor sit amet consectetur, adipisicing elit. LollipopOOO"
    }
    return defaultCard;
  }

  // const updateText = (valueToChange, i) => {
  //   const inputData = [...cardList];
  //   inputData[i] = onChange.target.value;
  //   setCardList(inputData)
  // }

  return (
    <>
    {/* Navbar */}
    <nav className="navbar">
        <div id="navDivs" className="menuContainer">
            <div className="menuButton">&#9776;</div>
        </div>

        <div id="navDivs" className="navHeading">
            <h1>Lotion</h1>
            <h2>Like Notion, but worse.</h2>
        </div>
        <div id="navDivs"></div>    
    </nav>

    <div className="contentContainer">
      {/* SideBar */}
      <div className="sidebar">
        <div className="sidebarHeader">
          <div id="sidebarItems" className="sidebarHeading"><h3>Notes</h3></div>
          <div id="sidebarItems" className="sidebarPlus">
            <button type="buttton" onClick={AddCard}>
              <h3 className="plusButton">+</h3>
            </button>
            
          </div>
        </div>
        <div className="sidebarContent">
          {/* <NoteCard /> */}
          {cardList.map((card)=> {
              return (
              <>
                <NoteCard key={card.id} id={card.id} title={card.title} date={card.date} content={card.content} />
              </>
              )
            })}
        </div>  
      </div>
      {/* Editing Area */}
      {/* <ViewNotes /> */}
      <Outlet context={cardList}/>
    </div>
    </>
  )
}
