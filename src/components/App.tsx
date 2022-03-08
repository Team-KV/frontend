import ReactDOM from 'react-dom';
import Login from "../pages/Login";

function App() {
  return (
    <Login/>
  );
}

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
