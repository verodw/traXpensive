import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import { AuthUserProvider } from './firebase/auth';
import './App.css';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase/firebase';
import FirebaseAuthUI from './firebase/FirebaseAuthUI';
import Dialog from '@mui/material/Dialog';

const REDIRECT_PAGE = '/home';

// Configure firebaseUI
const uiConfig = {
    signInFlow: 'popup', // Sign-in flow with popup rather than redirect flow
    signInSuccessUrl: REDIRECT_PAGE,
    signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
    ]
};

const App = () => {
    const [login, setLogin] = useState(false);

    // Function to open the login dialog
    const openLoginDialog = () => setLogin(true);

    return (
        <Router>
            <AuthUserProvider>
                <div className="app-container">
                    <Header openLoginDialog={openLoginDialog} />
                    <div className="app-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                        <Dialog open={login} onClose={() => setLogin(false)}>
                            <FirebaseAuthUI uiConfig={uiConfig} firebaseAuth={auth} />
                        </Dialog>
                    </div>
                    <Footer />
                </div>
            </AuthUserProvider>
        </Router>
    );
};

export default App;

