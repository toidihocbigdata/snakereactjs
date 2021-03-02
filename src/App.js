import logo from './logo.svg';
import './App.css';
import { SnakeGame } from './SnakeGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SnakeGame/>
    </div>
  );
}

export default App;
