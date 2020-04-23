import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  
  const [ movieCount, setMovieCount ] = useState(0);
  const [ editCount, setEditCount ] = useState(0);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data);
        setMovieCount(res.data.length);
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  const decreaseMovieCount = () => {
    setMovieCount(movieCount - 1);
  }
  const handleEditCount = () => {
    setEditCount(editCount + 1);
  }

  useEffect(() => {
    getMovieList();
  }, [movieCount, editCount]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie decreaseMovieCount={decreaseMovieCount} addToSavedList={addToSavedList} />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovie handleEditCount={handleEditCount}/>
      </Route>
    </>
  );
};

export default App;
