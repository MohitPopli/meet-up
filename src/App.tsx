import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import 'react-calendar/dist/Calendar.css';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
