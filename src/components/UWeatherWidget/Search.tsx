import React, { memo, FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import styled from 'styled-components';
import { setAlert } from '../../store/actions/alertActions';
import { setLoading, getWeather, setCurrentCity } from '../../store/actions/weatherActions';

const StyledInput = styled.input`
    background: none;
    background-color: white;
    color: grey;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: inline-block;
    width: 50%;
    border: none;
    border-radius: 10px;
    border-bottom: 1px solid grey;
    margin: 10px 0;

    &:focus {
        outline: none;
    }
`;

const StyledForm = styled.form`
    width: 100%;
    text-align: center;
`;

interface SearchProps {
    title: string;
    apiKey: string;
}

const Search: FC<SearchProps> = memo(({ title, apiKey }) => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');

    const changehandler = (e: FormEvent<HTMLInputElement>) => {
        setCity(e.currentTarget.value);
    };
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (city.trim() === '') {
            return dispatch(setAlert('City is required!'));
        }
        dispatch(setCurrentCity(city));
        dispatch(setLoading());
        dispatch(getWeather(city, apiKey) as AnyAction);
        setCity('');
    };

    return (
        <StyledForm onSubmit={submitHandler}>
            <StyledInput value={city} onChange={changehandler} placeholder={title} />
        </StyledForm>
    );
});

export default Search;
