import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/Users/User";
import { authenticate } from "./store/session";
import Planet from "./components/PlanetDescription/PlanetDescription";
import Portfolio from "./components/Portfolio/Portfolio";
import Splash from "./components/Splash/Splash";
import Footer from "./components/Footer/Footer";
import AllPlanets from "./components/AllPlanets/AllPlanets";
import AllTransactions from "./components/AllTransactions/AllTransactions";

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
      <Switch>
        <Route path="/" exact={true}>
          <Splash />
          <Footer />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/dashboard" exact={true}>
          <NavBar />
          <Portfolio />
        </ProtectedRoute>
        <ProtectedRoute path="/planet/:planetId" exact={true}>
          <NavBar />
          <Planet />
        </ProtectedRoute>
        <ProtectedRoute path="/allPlanets">
          <NavBar />
          <AllPlanets />
        </ProtectedRoute>
        <ProtectedRoute path="/allTransactions">
          <NavBar />
          <AllTransactions />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <NavBar />
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
