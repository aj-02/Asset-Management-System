import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Administrator from './components/Administrator';
import Employee from './components/Employee';
import Addasset from './components/Addasset';
import EmployeeManagement from './components/EmployeeManagement';
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Registration" component={Registration} />
        <Route exact path="/Administrator" component={Administrator} />
        <Route exact path="/Employee" component={Employee} />
        <Redirect to="/login" />
        <Route exact path="/Addasset" component={Addasset} />
        <Route exact path="/EmployeeManagement" component={EmployeeManagement} />
      </Switch>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
