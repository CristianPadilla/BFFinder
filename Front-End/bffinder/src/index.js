import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App.jsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n.js';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const persistor = persistStore(store);

ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
  , document.getElementById('app'));

