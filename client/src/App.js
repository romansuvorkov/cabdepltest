import Header from './components/Header';
import CompanyList from './components/CompanyList';
import CompanyPage from './components/CompanyPage';
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
          </Route>
        </Switch>
        <Route path="/company/:id" component={CompanyPage} exact/>        
      </Router>

    </div>
  );
}

export default App;
