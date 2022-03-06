import { Admin, Resource, ListGuesser, EditGuesser, CreateGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import jsonRestClient from 'aor-json-rest-client';
import { UserList, UserEdit } from './Users/users';
import { GroupList } from './Groups/groups';
import { BookList, BookEdit, BookCreate } from './Books/books';
import { CommentList, CommentEdit } from './Comments/comments';
import authProvider from './authProvider';
import myDataProvider from './myDataProvider';

// const dataProvider = jsonServerProvider("http://192.168.0.165:3500/admin");

const AdminPage = () => {

    document.querySelector("html").style.fontSize = '15px'; //изменяем дефолтный размер шрифта

    return (
        <Admin dataProvider={myDataProvider} authProvider={authProvider} >
            {/* <Resource name="comments" list={ListGuesser} /> */}
            <Resource name="comments" list={CommentList} edit={CommentEdit} />
            <Resource name="books" list={BookList} edit={BookEdit} create={BookCreate} />
            <Resource name="users" list={UserList} edit={UserEdit} />
            <Resource name="groups" list={GroupList} />
            <Resource name="genres" list={ListGuesser} />
            <Resource name="publish" list={ListGuesser} />
            <Resource name="languages" list={ListGuesser} />
        </Admin>
    )
}

export default AdminPage;