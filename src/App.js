import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { client } from './apolloClient';
import { flowersQuery, createFlowerQuery } from './Queries/flowerQueries';

import logo from './logo.svg';
import './App.css';

function App() {

  const [flowers, setFlowers] = useState([]);
  const [createFlowerMutation] = useMutation(createFlowerQuery)

  useEffect(() => {
    client.query({query: flowersQuery})
      .then(result => {
        console.log('flowers result', result);
        setFlowers(result.data.flowers)
      });

  }, [])

  const createFlower = () => {
    const flowerName = "whatever"
    const flowerPetals = 5

    createFlowerMutation({variables: {
      kind: "whatever",
      petals: 5
    }})
      .then(result => {
        console.log('create flower result', result);
        setFlowers([...flowers, result.data.createFlower])
      })
      .catch(error => console.error(error));
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
