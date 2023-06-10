import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetch('/api/auth/user');
      const response = await data.json();

      if (!response.error) {
        setUser(response.user);
      }

      setUserLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const data = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await data.json();

    if (!response.error) {
      setUser(response.user);
    } else {
      throw new Error(response.message);
    }
  };

  const register = async (email, password) => {
    const data = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await data.json();

    if (!response.error) {
      setUser(response.user);
    } else {
      throw new Error(response.message);
    }
  };

  const logOut = async () => {
    const data = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    const response = await data.json();

    if (!response.error) {
      setUser(null);
    } else {
      throw new Error(response.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, register, logOut, user, userLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
