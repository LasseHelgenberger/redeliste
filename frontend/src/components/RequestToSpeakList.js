import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const RequestToSpeakList = () => {
    const [requeststospeak, setRequeststospeak] = useState([]);

    useEffect(() => {
        getRequestsToSpeak();
    }, []);

    const getRequestsToSpeak = async () => {
        const response = await axios.get('http://localhost:5000/requesttospeak/');
        setRequeststospeak(response.data);
    }

    const deleteRequesttospeak = (id) => {
        console.log("ToDo Delete");
    }

    return (
        <div>
            <Link to="/add" className="button is-primary mt-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>user id</td>
                        <td>request</td>
                        <td>actions</td>
                    </tr>
                </thead>
                <tbody>
                    { requeststospeak.map((requesttospeak, index) => (
                        <tr key={ requesttospeak.id }>
                            <td>{ index + 1 }</td>
                            <td>{ requesttospeak.uid }</td>
                            <td>{ requesttospeak.request }</td>
                            <td>
                                <Link to={'/edit/${requesttospeak.id'} className="button is-small is-info">Edit</Link>
                                <button onClick={ () => deleteRequesttospeak(requesttospeak.id) } className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default RequestToSpeakList