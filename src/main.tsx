import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  </Provider>,
)
