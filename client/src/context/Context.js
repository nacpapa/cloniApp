import { createContext, useEffect, useReducer } from 'react';
import Reducer from './Reducer';

// TOMAMOS EL USUARIO DEL LOCALSTORAGE
// FETCHING NOS INDICARA MOMENTOS DE CARGA
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  // VAMOS A GUARDAR EL USUARIO EN LOCALSTORAGE CADA VEZ QUE SE MODIFIQUE
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  // RETORNAMOS EL CONTEXTO QUE USAREMOS EN APP PARA NUESTROS COMPONENTES Y PAGINAS
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
