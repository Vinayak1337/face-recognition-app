import { FC } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from '../Components/Header';
import { Home, Profile, Auth, ErrorPage } from '../Pages';
import './App.css';

const App: FC<AppProps> = ({ user }) => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' render={() => (!user ? <Redirect to="/signin" /> : <Home /> )} />
        <Route exact path='/profile' render={() => (!user ? <Redirect to="/signin" /> : <Profile /> )} />
        <Route exact path='/signin' render={() => (user ? <Redirect to="/" /> : <Auth /> )} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(App);
