import React, { useState } from 'react';
import Editor from './components/editor/Editor';
import './App.css';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Player from './components/player/Player';

function App() {
  const [bodies, setBodies] = useState([]);
  const [constraints, setConstraints] = useState({});

  return (
    <MemoryRouter initialEntries={["/editor"]}>
      <Routes>
        <Route path='editor' element={
          <Editor
            worldBodies={bodies}
            worldConstraints={constraints}
            setWorldBodies={setBodies}
            setWorldConstraints={setConstraints}
          />
        }/>
        <Route path='player' element={<Player worldBodies={bodies} worldConstraints={constraints}/>} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
