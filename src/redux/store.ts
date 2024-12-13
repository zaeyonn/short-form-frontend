import { configureStore, combineReducers} from '@reduxjs/toolkit';
import globalReducer from './globalSlice';

const reducer = combineReducers({
  global: globalReducer,
})

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export default store;