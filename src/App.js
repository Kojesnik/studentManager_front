import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ManageStudents from './pages/manageStudents';
import ManageGroups from './pages/manageGroups';
import SetMarks from './pages/setMark';
import Header from './components/header';
import Students from './pages/students';
import 'semantic-ui-css/semantic.min.css';
import './css/styles.css';

class App extends React.Component {

  render() {
    return(
      <>
        <Suspense fallback={(<div>Loading</div>)}>
          <Header />
          <BrowserRouter>
            <Switch>
              <Route exact={true} path='/manageStudents' render={() => (
                  <ManageStudents/>
              )}/>
              <Route exact={true} path='/setMarks' render={() => (
                  <SetMarks/>
              )}/>
              <Route exact={true} path='/manageGroups' render={() => (
                  <ManageGroups/>
              )}/>
              <Route exact={true} path='/students' render={() => (
                  <Students/>
              )}/>
            </Switch>
          </BrowserRouter>
        </Suspense>
      </>
    );
  }
}

export default App;
