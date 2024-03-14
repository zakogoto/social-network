import React, { Component } from 'react';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { appInitialized } from './redux/reducers/appReducer';
import { withSuspense } from './hoc/withSuspense';
import Footer from './components/footer/Footer';
import Music from './components/music/Music';
import NavbarContainer from './components/navbar/NavbarContainer';
import HeaderContainer from './components/header/HeaderContainer';
import Preloader from './ui/Preloader';
import store from './redux/redux-store';
import './App.css';

const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/users/UsersContainer'))
const Login = React.lazy(()=> import( './components/login/Login'))


class App extends Component {

  componentDidMount = () => {
    this.props.appInitialized()
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
      <main className='App'>
        <HeaderContainer />
        <NavbarContainer />
        <div className='contentWrapper'>
          <Routes>
            <Route element={<React.Suspense><DialogsContainer/></React.Suspense>} path='/dialogs/*'/>
            <Route element={withSuspense(ProfileContainer)} path='/profile/:id'/>
            <Route element={withSuspense(ProfileContainer)} path='/profile'/>
            <Route element={withSuspense(UsersContainer)} path='/users'/>
            <Route element={<Music/>} path='/music'/>
            <Route element={withSuspense(Login)} path='/login' />
            {/* <Route element={<Friends/>} path='/friends'/> */}
          </Routes>
        </div>
        <Footer/>
      </main>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

// export default App;
const AppContainer = compose(
  connect(MapStateToProps, {appInitialized}),
  ) (App)

const MainApp = (props) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer/> 
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default MainApp