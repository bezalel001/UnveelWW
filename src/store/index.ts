import { type } from 'os';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import alertReducer from './redux/alertReducer';
import weatherReducer from './redux/weatherReducer';

const rootReducer = combineReducers({
    weather: weatherReducer,
    alert: alertReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
