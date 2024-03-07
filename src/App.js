import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Component } from 'react';
import { compose } from 'redux';
import Footer from './components/footer/Footer';
import Music from './components/music/Music';
// import Friends from './components/friends/Friends';
import DialogsContainer from './components/dialogs/DialogsContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/login/Login';
import { appInitialized } from './redux/reducers/appReducer';
import './App.css';
import Preloader from './ui/Preloader';

class App extends Component {

  componentDidMount = () => {
    this.props.appInitialized()
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
      <BrowserRouter>
        <main className='App'>
          <HeaderContainer />
          <NavbarContainer />
          <div className='contentWrapper'>
            <Routes>
              <Route element={<DialogsContainer/>} path='/dialogs/*'/>
              <Route element={<ProfileContainer/>} path='/profile/:id'/>
              <Route element={<ProfileContainer />} path='/profile'/>
              <Route element={<UsersContainer/>} path='/users'/>
              <Route element={<Music/>} path='/music'/>
              <Route element={<Login/>} path='/login' />
              {/* <Route element={<Friends/>} path='/friends'/> */}
            </Routes>
          </div>
          <Footer/>
        </main>
      </BrowserRouter>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

// export default App;
export default compose(
  connect(MapStateToProps, {appInitialized}),
  ) (App)
