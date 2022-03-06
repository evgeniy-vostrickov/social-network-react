import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField, EditButton, Edit, SimpleForm, TextInput } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <EmailField source="email" />
            <TextField source="user_name" />
            <TextField source="surname" />
            <TextField source="status" />
            <DateField source="date_births" />
            <TextField source="place_work_study" />
            <TextField source="direction_work_study" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="email" />
            <TextInput source="user_name" />
            <TextInput source="surname" />
            <TextInput source="status" />
            <TextInput source="place_work_study" />
            <TextInput source="direction_work_study" />
        </SimpleForm>
    </Edit>
);