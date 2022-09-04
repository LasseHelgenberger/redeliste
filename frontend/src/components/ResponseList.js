import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ResponseList = (parameters) => {
    const [responses, setResponses] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();


    useEffect(() => {
        getResponses();
    }, []);

    useEffect(() => {
        setInterval(() => {
            getResponses();
        }, 1000);
    }, [])

    const getResponses = async () => {
        const response = await axios.get(`http://localhost:5000/requesttospeak/responses/${parameters.id}`);
        setResponses(response.data);
    }

    const deleteResponse = async (id) => {
        await axios.patch(`http://localhost:5000/requesttospeak/${id}`, {
            state: "deleted"
        });
        getResponses();
    }

    const cancelResponse = async (id) => {
        await axios.patch(`http://localhost:5000/requesttospeak/${id}`, {
            state: "canceled"
        });
        getResponses();
    }

    return (
        <div>
            { responses.length > 0 && responses.map((response, index) => (
                    <div className="resContainer" key={index}>
                        <div className={response.state == "active" ? "rActive" : undefined}>
                            <span className="resName">{response.user}</span>
                            <div className="resActionBtns">
                                {cookies.user === response.user && response.state != "active" &&
                                    <button className="actionBtn deleteBtn" onClick={() => {
                                        deleteResponse(response.id);
                                    }}>Löschen</button>
                                }
                                {parameters.moderator && 
                                    <button className="actionBtn cancelBtn" onClick={() => {
                                        cancelResponse(response.id);
                                    }}>Abbrechen</button>
                                }
                            </div>
                        </div>
                    </div>
            )) }
        </div>
    );
}

export default ResponseList