import { useState, useEffect, useRef } from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';

const MenuBar = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const inputName = useRef(null);

    const onClick = () => {
        removeCookie('user', { path: '/' });
    }
    return (
        <div id="menuBar">
            {cookies.user && <span style={{ marginRight: '30px'}}>Angemeldet als {cookies.user} </span>} 
            <button className="logoutBtn" onClick={onClick}>Abmelden</button>
        </div>
    );
}

export default MenuBar