import axios from 'axios';
import { useContext, useRef } from 'react';
import { Context } from '../../context/Context';
import './login.css';

export default function Login() {
  const userRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  // HACEMOS LA SOLICITUD DE LOGIN AL BACK A TRAVES DE AXIOS
  // VAMOS DEFINIENDO LOS ESTADOS DEL LOGIN A TRAVES DEL CONTEXTO
  // USAMOS EL VALOR DE USERNAME INGRESADO POR EL USUARIO DE LA APLICACION
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };

  return (
    <div className="login">
      <img src="./img/login.svg" className="loginImg" alt="login" />
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
    </div>
  );
}
