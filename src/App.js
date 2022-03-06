import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';
import { initializeAppThunk } from "./redux/app-reducer";
import FormAddBook from './components/Books/NewBookAdd/FormAddBook';
import FoundBooks from './components/Books/FoundBooks/FoundBooks';
import BookIndex from './components/Books/BookIndex';
import GroupIndex from './components/Groups/GroupIndex';
import FoundGroups from './components/Groups/FoundGroups/FoundGroups';
import FormAddGroup from './components/Groups/NewGroupAdd/FormAddGroup';
import Quotes from './components/Quotes/Quotes';
import IntroductoryPage from './components/IntroductoryPage/IntroductoryPage';
// import Preloader from './components/common/Preloader/Preloader';

//Ленивая загрузка. Нужна в те моменты, когда мы хотим, чтобы все страницы не подгружались сразу, а поступляли по мере надобности.
// const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'));

const App = ({ initialized, isAuth, initializeAppThunk }) => {
  useEffect(() => {
    initializeAppThunk();
  }, [])

  document.querySelector("html").style.fontSize = '10px'; //возвращаем дефолтный размер шрифта

  //!!!Нужен Preloader
  if (!initialized)
    return <div>Loading...</div>

  return (
    <div id="wrapper">
      <Header isAuth={isAuth} />
      <Switch>
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/books/add" render={() => <FormAddBook />} />
        <Route path="/books/:bookId" render={() => <BookIndex />} />
        <Route path="/books/" render={() => <FoundBooks />} />
        <Route path="/educational/:typeBook" render={() => <FoundBooks />} />
        <Route path="/groups/add" render={() => <FormAddGroup />} />
        <Route path="/groups/:groupId" render={() => <GroupIndex />} />
        <Route path="/groups/" render={() => <FoundGroups />} />
        <Route path="/quotes/" render={() => <Quotes />} />
        <Route path="/registration" render={() => <Registration />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/" render={() => <IntroductoryPage />} />
        <Route path="*" render={() => <div>404  NOT FOUND</div>} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth
  }
}

export default compose(connect(mapStateToProps, { initializeAppThunk }))(App)
//когда коннектим компоненту сбивается роутинг, поэтому нужно писать withRouter