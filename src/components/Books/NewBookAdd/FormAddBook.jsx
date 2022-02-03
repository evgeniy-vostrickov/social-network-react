import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { checkFilePhoto } from '../../../common/validate/checkImage';
import { setBookIdNull, getPayloadForAddBookThunk, addNewBookThunk } from '../../../redux/book-reducer';
import SelectOption from './SelectOption';

const FormAddBook = (props) => {
    
    // const [checkChange, setCheckChange] = useState(props.bookId); //для понимания когда данные были изменнены
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            language_id: '1',
            genre_id: '1',
            publish_id: '1',
        }
    });

    useEffect(() => {
        //Получаем языки, жанры и издательства
        props.getPayloadForAddBookThunk();
        //Обнуляем bookId чтобы понять когда новые данные будут загружены
        props.setBookIdNull();
    }, [])

    const onSubmit = (formData) => {
        formData.illustration_cover = formData.illustration_cover[0];
        console.log(formData);
        props.addNewBookThunk(formData);
        // if (checkChange)
        // promise.then(() => {
        //     props.history.push(`/books/${props.bookId}`);
        // })
    };

    if (props.bookId)
        return <Redirect to={`/books/${props.bookId}`}/>

    return (
        <section className="main-content registration">
            <h2 className='mb-3'>Добавление новой книги</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="book_name" className="form-label">Название книги</label>
                    <input id="book_name" className="form-control" placeholder="Введите название книги" {...register("book_name",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 250,
                                message: 'Число символов должно быть меньше 250'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.book_name && <p>{errors?.book_name?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Автор книги</label>
                    <input id="author" className="form-control" placeholder="Введите автора книги" {...register("author",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 250,
                                message: 'Число символов должно быть меньше 250'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.author && <p>{errors?.author?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="book_description" className="form-label">Описание к книге</label>
                    <textarea id="book_description" className="form-control" placeholder="Введите описание к книге" {...register("book_description",
                        {
                            required: 'Поле обязательно для заполнения',
                            maxLength: {
                                value: 1000,
                                message: 'Число символов должно быть меньше 1000'
                            }
                        })}>
                    </textarea>
                </div>
                <div>
                    {errors?.book_description && <p>{errors?.book_description?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="year_publication" className="form-label">Год издания</label>
                    <input id="year_publication" className="form-control" placeholder="Введите год издания" {...register("year_publication",
                        {
                            required: 'Поле обязательно для заполнения',
                            pattern: {
                                value: /^[1-9][0-9]{3}$/,
                                message: 'Год введен неверно'
                            },
                            maxLength: {
                                value: 250,
                                message: 'Число символов должно быть не больше 250'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.year_publication && <p>{errors?.year_publication?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="year_publication" className="form-label">Язык</label>
                    <select {...register("language_id")}>
                        {props.listAllLanguage.map(language => {
                            return <SelectOption key={language.language_id} value={language.language_id} name={language.language_name} />
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="year_publication" className="form-label">Жанр</label>
                    <select {...register("genre_id")}>
                        {props.listAllGenres.map(genre => {
                            return <SelectOption key={genre.genre_id} value={genre.genre_id} name={genre.genre_name} />
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="year_publication" className="form-label">Издательство</label>
                    <select {...register("publish_id")}>
                        {props.listAllPublication.map(publish => {
                            return <SelectOption key={publish.publish_id} value={publish.publish_id} name={publish.publish_name} />
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="age_restrictions" className="form-label">Возрастные ограничения</label>
                    <input id="age_restrictions" className="form-control" placeholder="Введите возрастные ограничения" {...register("age_restrictions",
                        {
                            required: 'Поле обязательно для заполнения',
                            pattern: {
                                value: /^[0-9]{1,2}[+]$/,
                                message: 'Возраст введен неверно'
                            },
                            maxLength: {
                                value: 3,
                                message: 'Число символов должно быть не больше 3'
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.age_restrictions && <p>{errors?.age_restrictions?.message || "Error"}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="illustration_cover" className="form-label">Иллюстрация обложки</label>
                    <input id="illustration_cover" className="form-control" type="file" placeholder="Выберите иллюстрацию обложки" {...register("illustration_cover",
                        {
                            required: 'Поле обязательно для заполнения',
                            validate: {
                                checkFile: checkFilePhoto
                            }
                        })}
                    />
                </div>
                <div>
                    {errors?.illustration_cover && <p>{errors?.illustration_cover?.message || "Выберите другой файл"}</p>}
                </div>
                <div className="but-center"><input type="submit" value="Добавить" className="btn btn-primary" /></div>
            </form>
        </section>
    )
}

const mapStateToProps = (state) => ({
    bookId: state.bookPages.bookId,
    listAllLanguage: state.bookPages.listAllLanguage,
    listAllPublication: state.bookPages.listAllPublication,
    listAllGenres: state.bookPages.listAllGenres
})

export default compose(connect(mapStateToProps, { setBookIdNull, getPayloadForAddBookThunk, addNewBookThunk }), withRouter)(FormAddBook);