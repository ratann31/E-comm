import Nav from './components/Nav';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Plist from './components/Plist';
import UpdateComponent from './components/UpdateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}> {/* FIXED JSX format */}
            <Route path="/" element={<Plist></Plist>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateComponent/>} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
