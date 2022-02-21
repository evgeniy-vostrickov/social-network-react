import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './Users/users';
import { BookList } from './Books/books';
import { CommentEdit, CommentList } from './Comments/comments';
import authProvider from './authProvider';

const dataProvider = jsonServerProvider("http://192.168.0.165:3500/admin");
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminPage = () => {

    document.querySelector("html").style.fontSize = '15px'; //изменяем дефолтный размер шрифта

    return (
        <Admin dataProvider={dataProvider} authProvider={authProvider}>
            {/* <Resource name="comments" list={ListGuesser} /> */}
            <Resource name="comments" list={CommentList} edit={CommentEdit} />
            <Resource name="books" list={BookList} edit={CommentEdit} />
            <Resource name="users" list={UserList} edit={CommentEdit} />
        </Admin>
    )
}

export default AdminPage;