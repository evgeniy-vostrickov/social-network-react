import React, {useEffect} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';
import MessengerApp from './components/MessengerApp/MessengerApp';
import { initializeAppThunk } from "./redux/app-reducer";
import Friends from './components/Friends/Friends';
import Groups from './components/Groups/Groups';
import FormAddBook from './components/Books/NewBookAdd/FormAddBook';
import FoundBooks from './components/Books/FoundBooks/FoundBooks';
// import Navbar from './components/Navbar/Navbar';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import UsersContainer from './components/Users/UsersContainer';
import BookIndex from './components/Books/BookIndex';
// import Preloader from './components/common/Preloader/Preloader';

//Ленивая загрузка. Нужна в те моменты, когда мы хотим, чтобы все страницы не подгружались сразу, а поступляли по мере надобности.
// const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'));


const App = (props) => {
  useEffect(() => {
    props.initializeAppThunk();
  }, [])

  //!!!Нужен Preloader
  if (!props.initialized)
    return <div>Loading...</div>
  return (
    <div id="wrapper">
      <Header />
      <Switch>
        <Route path="/profile/friends" render={() => <Friends />} />
        <Route path="/profile/groups" render={() => <Groups />} />
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/books/add" render={() => <FormAddBook />} />
        <Route path="/books/:bookId" render={() => <BookIndex />} />
        <Route path="/books/" render={() => <FoundBooks />} />
        <Route path="/registration" render={() => <Registration />} />
        <Route path="/login" render={() => <Login />} />
        {/* <Route path="/messenger" element={<Messenger />} /> */}
        <Route path="/dialog/:dialogId?" render={() => <MessengerApp />} />
        <Route path="*" render={() => <div>404  NOT FOUND</div>} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

export default compose(connect(mapStateToProps, { initializeAppThunk }))(App)
//когда коннектим компоненту сбивается роутинг, поэтому нужно писать withRouter