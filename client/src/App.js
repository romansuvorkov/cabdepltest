import Header from './components/Header';
import CompanyList from './components/CompanyList';
import CompanyPage from './components/CompanyPage';
import InfoSourceList from './components/InfoSourceList';
import InterGasCert from './components/InterGasCert';
import KamkabelStorage from './components/KamkabelStorage';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <CompanyList />
            <InfoSourceList />
          </Route>
          <Route path="/interGasCert" exact>
            <InterGasCert />
          </Route>
          <Route path="/kamkabelStorage" exact>
            <KamkabelStorage />
          </Route>
        </Switch>
        <Route path="/company/:id" component={CompanyPage} exact/>        
      </Router>

    </div>
  );
}

export default App;
