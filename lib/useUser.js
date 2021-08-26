import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase';
import { useRouter } from 'next/router';

export const UserContext = createContext({ user: null, session: null });

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = supabase.auth.user();

    if (user) {
      setUser(user);
      setUserLoading(false);
      setLoggedIn(true);
    } else {
      setUserLoading(false);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event, session);
        const user = session?.user ?? null;
        setUserLoading(false);
        if (user) {
          setUser(user);
          setLoggedIn(true);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const value = {
    user,
    userLoading,
    loggedIn,
    signUp: (options) => supabase.auth.signUp(options),
    signIn: (options) => supabase.auth.signIn(options),
    signOut: () => {
      router.replace('/');
      return supabase.auth.signOut();
    },
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
