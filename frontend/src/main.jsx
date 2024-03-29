import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { ApiProvider } from "./components/ApiContext.jsx";
import { RecipeProvider } from "./components/RecipeContext";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ApiProvider>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </ApiProvider>
  </React.StrictMode>,
)
