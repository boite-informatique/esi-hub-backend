import React   from 'react';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import doc from './components/Doc';
import {BrowserRouter as Router ,Route , Switch} from 'react-router-dom';

function App() {
  
  return (
    <Router>
    <div className="App">
      
      <div className='content'>
      <Switch>
      <Route exact path="/doc" component={doc} ></Route>
      <Route exact path="/" component={Home} ></Route>

      <Route exact path="/register" component={Register}></Route>

      <Route exact path="/login"  component={LoginForm}></Route>

      </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
