import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';

function UpdateMovie({ handleEditCount }){
    const [ newValue, setNewValue ] = useState()
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const id = match.params.id;
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
            res.data = {
                ...res.data,
                stars: res.data.stars.toString()
            }
            setNewValue(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [match.params.id]);

    const handleChange = e => {
        setNewValue({
            ...newValue,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        // Set to proper value
        newValue.metascore = newValue.metascore * 1;
        newValue.stars = newValue.stars.split(',');

        const id = match.params.id;
        axios.put(`http://localhost:5000/api/movies/${id}`, newValue)
        .then(() => {
            handleEditCount();
            history.push(`/movies/${id}`);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div >
            {newValue && (
                <form onSubmit={handleSubmit}>

                    <p>Title</p>
                    <div className="EditInput">
                        <input
                            type='text'
                            name='title'
                            value={newValue.title}
                            onChange={handleChange}
                        />
                    </div>

                    <p>Director</p>
                    <div className="EditInput">
                        <input
                            type='text'
                            name='director'
                            value={newValue.director}
                            onChange={handleChange}
                        />
                    </div>

                    <p>Metascore</p>
                    <div className="EditInput">
                        <input
                            type='text'
                            name='metascore'
                            value={newValue.metascore}
                            onChange={handleChange}
                        />
                    </div>

                    <p>Stars</p>
                        <input
                            type='text'
                            name='stars'
                            value={newValue.stars}
                            onChange={handleChange}
                        />
                    <button type='submit'>Submit</button>
                </form>
            )}
        </div>
    );
}

export default UpdateMovie; 