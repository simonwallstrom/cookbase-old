import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from './supabase';
import { useRouter } from 'next/router';

export const UserContext = createContext({ user: null, session: null });

export const UserContextProvider = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const getUserDetails = async () => {
    let { data: userDetails, error } = await supabase
      .from('users')
      .select('*')
      .single();

    if (error) console.log('error', error);
    setUserDetails(userDetails);
  };

  useEffect(() => {
    if (user) {
      getUserDetails();
      setUserLoaded(true);
    }
  }, [user]);

  const value = {
    session,
    user,
    userDetails,
    userLoaded,
    signIn: (options) => supabase.auth.signIn(options),
    signOut: () => {
      setUserDetails(null);
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
