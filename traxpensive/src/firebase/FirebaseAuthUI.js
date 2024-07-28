import React, { useEffect, useRef } from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const FirebaseAuthUI = ({ uiConfig, firebaseAuth }) => {
    const uiRef = useRef(null);

    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
        ui.start(uiRef.current, uiConfig);
    }, [uiConfig, firebaseAuth]);

    return <div ref={uiRef}></div>;
};

export default FirebaseAuthUI;


