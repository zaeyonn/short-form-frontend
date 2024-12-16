import { configureStore, combineReducers} from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
import userReducer from './userSlice';

const reducer = combineReducers({
  global: globalReducer,
  user: userReducer,
})

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export default store;