import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
