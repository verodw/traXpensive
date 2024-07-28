import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true,
    signOut: async () => {} 
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoading(true);
            if (!user) {
                setAuthUser(null);
                setIsLoading(false);
                return;
            }
            setAuthUser({
                uid: user.uid,
                email: user.email
            });
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            await authSignOut(auth);
            setAuthUser(null);
            setIsLoading(true); 
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { authUser, isLoading, signOut };
}

export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
    return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext);

