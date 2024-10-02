import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/services')
            .then((response) => {
                setServices(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Services</h1>
            <ul>
                {services?.data?.map((service, index) => (
                    <li key={index}>{service.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
