import React from 'react';
import { List, Datagrid, TextField, NumberField, ImageField, EditButton, Edit, SimpleForm, TextInput, NumberInput, ImageInput, Create, ReferenceInput, SelectInput } from 'react-admin';

export const BookList = props => (
    <List {...props}>
        <Datagrid> {/* rowClick="edit" - для редактирования записи при клике на строку */}
            <TextField source="id" />
            <TextField source="book_name" />
            <TextField source="author" />
            <NumberField source="year_publication" />
            <TextField source="book_description" />
            <TextField source="age_restrictions" />
            <TextField source="type_book" />
            <EditButton />
        </Datagrid>
    </List>
);

export const BookEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="book_name" />
            <TextInput source="author" />
            <NumberInput source="year_publication" />
            <TextInput source="book_description" />
            <TextInput source="age_restrictions" />
            {/* <TextInput source="type_book" /> */}
            <SelectInput source="type_book" choices={[
                { id: "Для младших классов", name: "Для младших классов" },
                { id: "Для старших классов", name: "Для старших классов" },
                { id: "Для студентов", name: "Для студентов" },
                { id: "Общая литература", name: "Общая литература" },
            ]} />
            <ReferenceInput source="genre_id" reference="genres"><SelectInput optionText="genre_name" /></ReferenceInput>
            <ReferenceInput source="publish_id" reference="publish"><SelectInput optionText="publish_name" /></ReferenceInput>
            <ReferenceInput source="language_id" reference="languages"><SelectInput optionText="language_name" /></ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const BookCreate = props => (
    <Create {...props}>
        <SimpleForm>
            {/* <TextInput source="id" disabled /> */}
            <TextInput source="book_name" />
            <TextInput source="author" />
            <NumberInput source="year_publication" />
            <TextInput source="book_description" />
            <TextInput source="age_restrictions" />
            <SelectInput source="type_book" choices={[
                { id: "Для младших классов", name: "Для младших классов" },
                { id: "Для старших классов", name: "Для старших классов" },
                { id: "Для студентов", name: "Для студентов" },
                { id: "Общая литература", name: "Общая литература" },
            ]} />
            <ReferenceInput source="genre_id" reference="genres"><SelectInput optionText="genre_name" /></ReferenceInput>
            <ReferenceInput source="publish_id" reference="publish"><SelectInput optionText="publish_name" /></ReferenceInput>
            <ReferenceInput source="language_id" reference="languages"><SelectInput optionText="language_name" /></ReferenceInput>
            <ImageInput source="illustration_cover" label="Illustration" accept="image/*">
                <ImageField source="image" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);