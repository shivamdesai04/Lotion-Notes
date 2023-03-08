import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

// Importing Components
import NoteCard from "./NoteCard";

export default function AppLayout() {
  // const data = JSON.parse(localStorage.getItem('vishnu'));
  console.log("APP LAYOUT")
  const[cardList, setCardList] = useState([]);
  // useEffect(() => {
  //   localStorage.setItem('vishnu', JSON.stringify(cardList));
  // }, [cardList])

  const navigation = useNavigate();
  
  console.log(); // alice

  const AddCard = () => {
    const newCard = generateCardContents()
    const temp = [...cardList, newCard]
    setCardList(temp)
    navigation(`${newCard.id}/edit`, {replace : true})
  }

  const generateCardContents = () => {
    const defaultCard = {
      id: uuidv4(),
      title: "Untitled",
      date: "",
      content: "..."
    }
    return defaultCard;
  }

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
          {
          cardList.map((card)=> {
              return (
              <>
                <NoteCard key={card.id} id={card.id} title={card.title} date={card.date} content={card.content} />
              </>
              )
            })}
        </div>  
      </div>

      <Outlet context={cardList}/>
    </div>
    </>
  )
}
