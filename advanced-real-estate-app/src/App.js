import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //add token
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJleGFtcGxlLm9yZyIsInN1YiI6ImFkbWluIiwiZXhwIjoxNzI4NDU3NzQ3LCJpYXQiOjE3Mjg0NTQxNDcsImp0aSI6IjZmYWJhN2MzLWY3OWEtNGVjMi05ZjNjLTllNmNjYmIyZjkzYyIsInNjb3BlIjoiUk9MRV9BRE1JTiJ9.2AbYmkxm7Sn5rWmexylB33q-V9ef0uqvXT8lmCvn51prSstqb7XgFYYDuh6NG7lw9vAuXiPM2ULl1ZWF0sfsFg";

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/services', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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
