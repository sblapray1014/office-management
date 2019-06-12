import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import About from "./components/layout/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserTask from "./components/tasks/UserTask";
import BrokerageTask from "./components/tasks/BrokerageTask";
import PrivateRoute from "./components/routing/PrivateRoute";
import Users from "./components/users/Users";
import ShowTask from "./components/task/ShowTask";
import CreateTask from "./components/task/CreateTask";
import Alert from "./components/layout/Alert";
import UserCompleted from "./components/tasks/completed-tasks/UserCompleted";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Switch>
              <PrivateRoute exact path="/Register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/about" component={About} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/tasks/me" component={UserTask} />
              <PrivateRoute
                exact
                path="/tasks/me/completed"
                component={UserCompleted}
              />
              <PrivateRoute
                exact
                path="/tasks/brokerage"
                component={BrokerageTask}
              />
              <PrivateRoute exact path="/tasks/me/:id" component={ShowTask} />
              <PrivateRoute
                exact
                path="/create-task/:id"
                component={CreateTask}
              />
            </Switch>
            <Alert />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
