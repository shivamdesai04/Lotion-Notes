import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

// Importing Components
import NoteCard from "./NoteCard";

export default function AppLayout() {
  const data = JSON.parse(localStorage.getItem('notesStorage'));
  const[cardList, setCardList] = useState(data || []);
  useEffect(() => {
    localStorage.setItem('notesStorage', JSON.stringify(cardList));
  }, [cardList])

  const navigation = useNavigate();

  const AddCard = () => {
    const newCard = generateCardContents()
    const temp = [...cardList, newCard]
    setCardList(temp)
    navigation(`${newCard.id}/edit`, {replace : true})
  }

  const generateCardContents = () => {
    let  now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let date = now.toISOString().slice(0,16);
    const defaultCard = {
      id: uuidv4(),
      title: "Untitled",
      date: date,
      content: ""
    }
    return defaultCard;
  }

  const [hideSidebar, setHideSidebar] = useState(false)
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  }
  const classNames = ` sidebar ${hideSidebar ? 'hideSidebar' : ''}`;

  return (
    <>
    {/* Navbar */}
    <nav className="navbar">
        <div id="navDivs" className="menuContainer">
            <button id="toggleButton" className="menuButton" onClick={toggleSidebar}>&#9776;</button>
        </div>

        <div id="navDivs" className="navHeading">
            <h1>Lotion</h1>
            <h2>Like Notion, but worse.</h2>
        </div>
        <div id="navDivs"></div>    
    </nav>

    <div className="contentContainer">
      {/* SideBar */}
      <div id="targetElement" className={classNames}>
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
                <NoteCard key={card.id} cardId={card.id} title={card.title} date={card.date} content={card.content} />
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
