import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GET_WEATHER, SET_ERROR, SET_LOADING, SET_CITY, WeatherAction, WeatherData, WeatherError } from '../types';

export const getWeather = (city: string, apiKey: string): ThunkAction<void, RootState, null, WeatherAction> | AnyAction => {
    return async (dispatch) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            if (!response.ok) {
                const responseData: WeatherError = await response.json();
                throw new Error(responseData.message);
            }
            const responseData: WeatherData = await response.json();
            console.log('responseData', responseData);
            dispatch({ type: GET_WEATHER, payload: responseData });
        } catch (error: any) {
            dispatch({
                type: SET_ERROR,
                payload: error.message
            });
        }
    };
};

export const setCurrentCity = (city: string): WeatherAction => {
    return {
        type: SET_CITY,
        payload: city
    };
};

export const setLoading = (): WeatherAction => {
    return {
        type: SET_LOADING
    };
};

export const setError = (): WeatherAction => {
    return {
        type: SET_ERROR,
        payload: ''
    };
};
