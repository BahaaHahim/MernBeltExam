import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './components/Home';
import PollForm from './components/PollForm';
import PollVoteForm from './components/PollVoteForm';
import PollResult from './components/PollResult';

function App() {
  const [page, setPage] = useState(["home", {}]);

  return (
    <>
      
      <center>
      <div>
        <h1 class="header">Voting Dojo</h1>
      </div>

      </center>
    
      <div className="App">
        { page[0] === "home" && <Home setPage={setPage} /> }
        { page[0] === "create" && <PollForm setPage={setPage} /> }
        { page[0] === "vote" && <PollVoteForm poll={ page[1].poll } setPage={setPage} /> }
        { page[0] === "result" && <PollResult poll={ page[1].poll } setPage={setPage} /> }
      </div>
    </> 
  );
}

export default App;
