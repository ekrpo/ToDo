import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./components/Register/Register";
import TaskBoard from "./components/TaskBoard/TaskBoard";

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path ="/login" element={<Login/>}/>
          <Route path="/" exact element={<TaskBoard/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
