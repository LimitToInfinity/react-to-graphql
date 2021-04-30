import { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';

const graphqlFetch = (query) => {
  return fetch('http://localhost:9001/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }).then(response => response.json());
}

function App() {

  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const flowersQuery = `{
      flowers {
        _id
        kind
        petals
      }
    }`

    graphqlFetch(flowersQuery)
      .then(({ data }) => setFlowers(data.flowers));

  }, [])

  const createFlower = () => {
    const flowerName = "whatever"
    const flowerPetals = 5
    const createFlowerQuery = `mutation {
      createFlower(flower: 
        { kind: "${flowerName}", petals: ${flowerPetals} }
      ) {
        _id
        kind
        petals
      }
    }`

    graphqlFetch(createFlowerQuery)
      .then(({ data }) => setFlowers([...flowers, data.createFlower]));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={createFlower}>Create Flower</button>
      </header>
    </div>
  );
}

export default App;
