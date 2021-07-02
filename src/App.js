import React from 'react';
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import MasterLayout from './components/master-layout';
import configureStore from './store';
import { LanguageProvider } from './localization/LanguageContainers';
import 'antd/dist/antd.css';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <LanguageProvider>      
      <div className="App">
        <Provider store={store}>       
            <PersistGate loading={null} persistor={persistor}>
              <Router>
                <MasterLayout />
              </Router>
            </PersistGate>      
        </Provider>
      </div>
    </LanguageProvider>
  );
}
export default App;
