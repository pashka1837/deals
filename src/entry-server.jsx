import { renderToString } from 'react-dom/server';
import './index.css'

 
import App from './App';
 
export const render = () => {
  return renderToString(<App />);
};