import React from 'react';
import { List, Datagrid, TextField, NumberField } from 'react-admin';

export const BookList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="book_name" />
            <TextField source="author" />
            <NumberField source="year_publication" />
            <TextField source="age_restrictions" />
            <TextField source="type_book" />
        </Datagrid>
    </List>
);