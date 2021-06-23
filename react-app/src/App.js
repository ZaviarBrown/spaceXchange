import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/Users/User";
import { authenticate } from "./store/session";
import Planet from './components/PlanetDescription/PlanetDescription';
import Portfolio from './components/Portfolio/Portfolio';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition 
            timeout={1000}
            classNames="fade"
            key={location.key}
          >
            <Switch location={location}>
              <Route path="/login" exact={true}>
                <LoginForm />
              </Route>
              <Route path="/sign-up" exact={true}>
                <SignUpForm />
              </Route>
              <ProtectedRoute path="/" exact={true}>
                <NavBar />  
                <Portfolio />
              </ProtectedRoute>
              <Route path='/planet/:planetId' exact={true}>
                <NavBar />  
                <Planet />
              </Route>
              <ProtectedRoute path="/users/:userId" exact={true}>
                <NavBar />  
                <User />
              </ProtectedRoute>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </BrowserRouter>
  );
}

export default App;
