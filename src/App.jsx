import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';

function App() {
  

  return (
    
   <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/add" element={<AddItem />} />
    <Route path="/edit/:id" element={<EditItem />} />
   </Routes>
   
  )
}

export default App;
