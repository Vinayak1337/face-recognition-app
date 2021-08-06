import { FC } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from '../Pages/Home/Home';
import Auth from '../Pages/Auth/Auth';

const App: FC<AppProps> = ({ user }) => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (!user ? <Redirect to="/signin" /> : <Home /> )} />
        <Route path='/signin' render={() => (user ? <Redirect to="/" /> : <Auth /> )} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(App);
