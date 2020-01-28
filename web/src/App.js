import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
// Propriedades: Informaciones que un componente PAI passa para un componente FILHO.
// Estado: Infomações mantidas pelo componente (Lembrar: inmutabilidade)

function App() {  // Es un componente

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      
      setDevs(response.data);
    }

    loadDevs();
  });

  async function handleAddDev(data){

    const response = api.post('/devs',data)

    setDevs([...devs, response.data]);  // asi se hace una adicion en react
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
