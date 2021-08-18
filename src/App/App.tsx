import { FC } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from '../Pages/Home';
import Auth from '../Pages/Auth';
import Profile from '../Pages/Profile';
import Navigator from '../Components/Header';
import Error from '../Pages/Error';

const App: FC<AppProps> = ({ user }) => {
  return (
    <div className="App">
      <Navigator />
      <Switch>
        <Route exact path='/' render={() => (!user ? <Redirect to="/signin" /> : <Home /> )} />
        <Route exact path='/profile' render={() => (!user ? <Redirect to="/signin" /> : <Profile /> )} />
        <Route exact path='/signin' render={() => (user ? <Redirect to="/" /> : <Auth /> )} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(App);
