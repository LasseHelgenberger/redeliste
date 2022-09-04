import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ResponseList from './ResponseList';

const RequestToSpeakList = (parameters) => {
    const [requeststospeak, setRequeststospeak] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();


    useEffect(() => {
        getRequestsToSpeak();
    }, []);

    useEffect(() => {
        setInterval(() => {
            getRequestsToSpeak();
        }, 1000);
    }, [])

    const getRequestsToSpeak = async () => {
        const response = await axios.get('http://localhost:5000/requesttospeak/activenew/');
        setRequeststospeak(response.data);
    }

    const deleteAll = async () => {
        if(window.confirm("Sicher, dass du alle Meldungen abbrechen willst?")) {
            requeststospeak.forEach(requesttospeak => {
                cancelRequestToSpeak(requesttospeak.id);
            });
        }
    }

    const deleteRequesttospeak = async (id) => {
        const response = await axios.get(`http://localhost:5000/requesttospeak/responses/${id}`);
        if(response.data.length == 0) {
            await axios.patch(`http://localhost:5000/requesttospeak/${id}`, {
                state: "deleted"
            });
            getRequestsToSpeak();
        } else {
            alert("Cannot delete Request if there are active Responses.")
        }
    }

    const cancelRequestToSpeak = async (id) => {
        await axios.patch(`http://localhost:5000/requesttospeak/cancel/${id}`, {
            state: "canceled"
        });
        getRequestsToSpeak();
    }


    const respondToRequestToSpeak = async (id) => {
        const currentDate = new Date().getDate();
        await axios.post("http://localhost:5000/requesttospeak", {
            user: cookies.user,
            createdAt: currentDate,
            updatedAt: currentDate,
            request: id,
            state: "new"
        });
        setRequeststospeak([]);
        getRequestsToSpeak();
    }

    const btnNewRequest = async () => {
        const currentDate = new Date().getDate();
        await axios.post("http://localhost:5000/requesttospeak", {
            user: cookies.user,
            createdAt: currentDate,
            updatedAt: currentDate,
            request: "new",
            state: "new"
        });
        getRequestsToSpeak();
    }

    const btnNextRequest = async () => {
        await axios.post("http://localhost:5000/requesttospeak/next", {
            
        });
        getRequestsToSpeak();
    }

    return (
        <div className="RequestToSpeakList">
            {parameters.moderator && 
                <button className="deleteAllBtn" onClick={deleteAll}>Alle Meldungen löschen</button>
            }
            {parameters.moderator && 
                <button className="newBtn" onClick={btnNextRequest}>Dran nehmen</button>
            }
            <button className="newBtn" onClick={btnNewRequest}>Neue Meldung</button>
            <h1>Redeliste</h1>
            { requeststospeak.map((requesttospeak, index) => (
                    <div className="rtsContainer" key={index}>
                        <div className={requesttospeak.state == "active" ? "rActive" : undefined}>
                            <span className="rtsName">{requesttospeak.user}</span>
                            <div className="rtsActionBtns">
                                {cookies.user === requesttospeak.user && requesttospeak.state != "active" &&
                                    <button className="actionBtn deleteBtn" onClick={() => {
                                        deleteRequesttospeak(requesttospeak.id);
                                    }}>Löschen</button>
                                }
                                {(requesttospeak.state == "active" || requesttospeak.state == "responding") &&
                                    <button className="actionBtn respondBtn" onClick={() => {
                                        respondToRequestToSpeak(requesttospeak.id);
                                    }}>Antworten</button>
                                }
                                {parameters.moderator && 
                                    <button className="actionBtn cancelBtn" onClick={() => {
                                        cancelRequestToSpeak(requesttospeak.id);
                                    }}>Abbrechen</button>
                                }
                            </div>
                        </div>
                        <ResponseList id={requesttospeak.id} moderator={parameters.moderator}/>
                    </div>
            )) }
        </div>
    );
}

export default RequestToSpeakList