import { createContext, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './Store/store';
import DCC from './DCC/DCC';

const store = new Store();
const dcc = new DCC();

export const GlobalData = createContext<{
  store: Store,
  dcc: DCC
}>
  ({
    store,
    dcc
  })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

