import React, { useState } from 'react';
import Editor from './components/editor/Editor';
import './App.css';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Player from './components/player/Player';

function App() {
  const [bodies, setBodies] = useState([]);

  return (
    <MemoryRouter initialEntries={["/editor"]}>
      <Routes>
        <Route path='editor' element={<Editor worldBodies={bodies} setWorldBodies={setBodies} />} />
        <Route path='player' element={<Player worldBodies={bodies} />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
