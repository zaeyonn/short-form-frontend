import { configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './sagas';
import globalReducer from './globalSlice';
import userReducer from './userSlice';


const reducer = combineReducers({
  global: globalReducer,
  user: userReducer,
})

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false,}).concat(middleware)
});

sagaMiddleware.run(watcherSaga);

export default store;