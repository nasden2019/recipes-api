import React, { useState } from 'react';
import './App.css'
import Axios from 'axios';
import Recipe from './components/Recipe'
import { v4 as uuidv4 } from 'uuid'
import Alert from './components/Alert';


function App() {

  // BLOCK TWO:

  // query is a piece of data that should be updated!!!! this case food: pizza, chicken etc
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')


  // BLOCK ONE:

  // got it from edamam.com
  const APP_ID = "428f30dc"
  // this too
  const APP_KEY = "46ae347a89f6d1754c615b5aaec9706c	"
  // by default it gives us chicken, but we can change it
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(url);

      // if we type in an unexisting food:
      if (!result.data.more) {
        return setAlert('No food with such name')
      }

      setRecipes(result.data.hits)

      console.log(result)

      setAlert("")
      // clear input:
      setQuery('')
    } else {
      setAlert('Please fill the Form')
    }
  }

  const onChange = (e) => {
    // console.log(e.target.value)
    setQuery(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
      <h1>Food Recipes App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input type="text" placeholder="Search for food" autoComplete="off" onChange={onChange} value={query} />
        <input type="submit" value="search" />
      </form>

      <div className="recipes">
        {
          recipes !== [] && recipes.map(recipe =>
            <Recipe key={uuidv4()} recipe={recipe} />)
        }
      </div>
    </div>
  );
}

export default App;
