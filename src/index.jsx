import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/index.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing Components
import DefaultPage from './components/DefaultPage';
import AppLayout from './components/AppLayout';
import Editor from './components/Editor';
import ViewNotes from './components/ViewNotes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />} >
        <Route exact path="/" element={<DefaultPage />} ></Route>
        <Route path="/:noteId" element={<ViewNotes />}></Route>
        <Route path="/:noteId/edit" element={<Editor />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();