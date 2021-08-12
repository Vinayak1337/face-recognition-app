import { FC } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from '../Pages/Home/Home';
import Auth from '../Pages/Auth/Auth';
import Profile from '../Pages/Profile/Profile';
import Navigator from '../Components/Header/Header';

const App: FC<AppProps> = ({ user }) => {
  return (
    <div className="App">
      <Navigator />
      <Switch>
        <Route exact path='/' render={() => (!user ? <Redirect to="/signin" /> : <Home /> )} />
        <Route exact path='/profile' render={() => (!user ? <Redirect to="/signin" /> : <Profile /> )} />
        <Route path='/signin' render={() => (user ? <Redirect to="/" /> : <Auth /> )} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(App);
