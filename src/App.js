import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./components/Login";

function App() {
  return (
    <React.Fragment>
        <Login/>
    </React.Fragment>
  );
}

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
