import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import noteReducer from '../reducers/noteReducers';

export const store = createStore(
    noteReducer,
    composeWithDevTools(applyMiddleware(thunk)
    ));






