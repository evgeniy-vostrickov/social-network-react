import React from 'react';
import { List, Datagrid, TextField, NumberField, DeleteButton } from 'react-admin';

export const GroupList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <NumberField source="owner" />
            <TextField source="group_name" />
            <TextField source="group_description" />
            <TextField source="city" />
            <DeleteButton />
        </Datagrid>
    </List>
);