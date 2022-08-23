import { WeatherState, WeatherAction, GET_WEATHER, SET_LOADING, SET_ERROR, SET_CITY } from '../types';

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: '',
    city: ''
};

export const weatherReducer = (state = initialState, action: WeatherAction): WeatherState => {
    switch (action.type) {
        case GET_WEATHER:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: ''
            };
        case SET_CITY:
            return {
                ...state,
                city: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_ERROR:
            return {
                ...state,
                data: null,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default weatherReducer;
