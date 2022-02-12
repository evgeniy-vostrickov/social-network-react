import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField } from 'react-admin';

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
        </Datagrid>
    </List>
);