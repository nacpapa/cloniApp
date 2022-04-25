import Home from './pages/home/Home';
import TopBar from './components/topbar/TopBar';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Welcome from './pages/welcome/Welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';
import './App.css';
function App() {
  const { user } = useContext(Context);
  return (
    <div>
      {/* INDICAMOS LAS RUTAS,
      DEPENDIENDO SI TENEMOS USUARIO O NO EN EL CONTEXTO RENDERIZAREMOS 
      LOS COMPONENTES */}
      <Router>
        <TopBar />
        <div className="app">
          <Routes>
            <Route exact path="/welcome" element={<Welcome />} />
            <Route exact path="/" element={user ? <Home /> : <Welcome />} />
            <Route path="/register" element={user ? <Home /> : <Register />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/write" element={user ? <Write /> : <Register />} />
            <Route
              path="/post/:postId"
              element={user ? <Single /> : <Login />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
