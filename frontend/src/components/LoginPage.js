import { useState, useEffect, useRef } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';

const LoginPage = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const inputName = useRef(null);

    const onClick = () => {
        setCookie('user', inputName.current.value, { path: '/' });
    }
    return (
        <div id="loginform">
            <input ref={inputName} className="loginFormElement loginInp" type={"text"} placeholder="Wie ist dein Name?" />
            <button className="loginFormElement loginBtn" onClick={onClick}>Anmelden</button>
        </div>
    );
}

export default LoginPage