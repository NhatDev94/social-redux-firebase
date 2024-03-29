import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
