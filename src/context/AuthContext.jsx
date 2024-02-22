import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {urlBuilder} from '../helpers/UrlBuilder.js';

export const AuthContext = createContext( {} );

const AuthContextProvider = ({ children }) => {
  const [isAuth, toggleIsAuth] = useState( {
    isAuth: false,
    user: null,
    status: 'pending',
  } );
  const navigate = useNavigate();

  const fetchUserData = async (id, token, redirectUrl) => {
    axios.get(urlBuilder("/api/users/me"), requestHeaders())
    .then(result => {
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
        navigate(redirectUrl);
      }
    }).catch(err => {
      console.error(err);
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      });
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode( token );
      void fetchUserData( decoded.sub, token );
    } else {
      toggleIsAuth({
        isAuth: false,
        user: null,
        status: 'done',
      });
    }
  }, []);

  const login = jwt => {
    localStorage.setItem('token', jwt);
    const decoded = jwt_decode(jwt);
    void fetchUserData(decoded.uid, jwt, "/taken");
  };

  const logout = () => {
    localStorage.clear();
    toggleIsAuth({
      isAuth: false,
      user: null,
      status: 'done',
    });
    navigate('/login');
  };

  const requestHeaders = () => {
    const token = localStorage.getItem( 'token' );
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    };
  };


  const contextData = {
    ...isAuth,
    login,
    logout,
    requestHeaders
  };

  return (
    <AuthContext.Provider value={ contextData }>
      { isAuth.status === 'done' ? children : <p>Loading...</p> }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
