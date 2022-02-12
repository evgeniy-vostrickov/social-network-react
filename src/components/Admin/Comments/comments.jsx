import React from 'react';
import { List, Datagrid, TextField, SelectField, ReferenceField, DateField, EditButton, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, DateInput } from 'react-admin';

export const CommentList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="book_id" reference="books">
                <TextField source="id" />
                {/* <TextField source="name" /> */}
            </ReferenceField>
            <ReferenceField source="user_id" reference="users">
                <TextField source="id" />
            </ReferenceField>
            <TextField source="comment_type" />
            <TextField source="comment_text" />
            <DateField source="date" />
            <EditButton />
        </Datagrid>
    </List>
);

export const CommentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput disabled source="user_id" reference="users"><SelectInput optionText="id" /></ReferenceInput>
            <ReferenceInput source="book_id" reference="books"><SelectInput optionText="id" /></ReferenceInput>
            <TextInput source="comment_type" />
            <TextInput source="comment_text" />
            <DateInput source="date" />
        </SimpleForm>
    </Edit>
);