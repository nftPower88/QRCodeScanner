import localForage from 'localforage'
import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import accountSettings from '../reducer/accountSetting';

const persistConfig = {
    key: 'root',
    storage: localForage,
    blacklist: []
}

const configureStore = () => {
    const reducers = combineReducers({
       accountSettings: accountSettings,
    })
    
    const persistedReducer = persistReducer(persistConfig, reducers)
  
    const store = createStore(
        persistedReducer,
        {},
    )  
    const persistor = persistStore(store)  
  
    return { store, persistor }
  }
  
  export default configureStore