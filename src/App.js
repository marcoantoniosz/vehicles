import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New'; 
import Edit from './pages/Edit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path='/edit/:id' element={<Edit />} />
    </Routes>
  );
}

export default App;
