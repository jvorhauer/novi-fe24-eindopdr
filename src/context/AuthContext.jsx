import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import cfg from '../config.json';

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
  const [ isAuth, toggleIsAuth ] = useState( {
    isAuth: false,
    user: null,
    status: 'pending',
  } );
  const navigate = useNavigate();

  useEffect( () => {
    const token = localStorage.getItem( 'token' );
    if (token) {
      const decoded = jwt_decode( token );
      void fetchUserData( decoded.sub, token );
    } else {
      toggleIsAuth( {
        isAuth: false,
        user: null,
        status: 'done',
      } );
    }
  }, [] );

  function login( JWT ) {
    localStorage.setItem( 'token', JWT );
    const decoded = jwt_decode( JWT );
    void fetchUserData(decoded.uid, JWT, "/");
  }

  function logout() {
    localStorage.clear();
    toggleIsAuth({
      isAuth: false,
      user: null,
      status: 'done',
    });
    console.log('Gebruiker is uitgelogd!');
    navigate( '/' );
  }

  async function fetchUserData(id, token, redirectUrl ) {
    try {
      const result = await axios.get(`${cfg.backend}/api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token }`,
        },
      });

      toggleIsAuth( {
        ...isAuth,
        isAuth: true,
        user: {
          username: result.data.name,
          email: result.data.email,
          id: result.data.id,
          joined: result.data.joined,
          gravatar: result.data.gravatar,
        },
        status: 'done',
      } );

      if ( redirectUrl ) {
        navigate( redirectUrl );
      }

    } catch ( e ) {
      console.error( e );
      toggleIsAuth( {
        isAuth: false,
        user: null,
        status: 'done',
      } );
    }
  }

  const contextData = {
    ...isAuth,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={ contextData }>
      { isAuth.status === 'done' ? children : <p>Loading...</p> }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
