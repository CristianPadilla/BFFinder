import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App.jsx';
import { Provider } from 'react-redux';
import { store } from './store';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  , document.getElementById('app'));

