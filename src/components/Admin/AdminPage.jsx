import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './Users/users';
import { BookList } from './Books/books';
import { CommentEdit, CommentList } from './Comments/comments';

const dataProvider = jsonServerProvider("http://192.168.0.165:3500/admin");
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminPage = () => {

    document.querySelector("html").style.fontSize = '15px'; //изменяем дефолтный размер шрифта

    return (
        <Admin dataProvider={dataProvider}>
            {/* <Resource name="comments" list={ListGuesser} /> */}
            <Resource name="comments" list={CommentList} edit={CommentEdit} />
            <Resource name="books" list={BookList} />
            <Resource name="users" list={UserList} />
        </Admin>
    )
}

export default AdminPage;