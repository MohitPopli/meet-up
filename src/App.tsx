import * as React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import 'react-calendar/dist/Calendar.css';
import MeetingConfirmation from './containers/MeetingConfirmation/MeetingConfirmation';

function App() {
  return (
    <Switch>
      <Route path="/meeting-confirmed" component={MeetingConfirmation} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
