
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Link} from "react-router-dom";
import './index.css'
import * as PropTypes from "prop-types";
import App from "./App.jsx";

Link.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node
};
createRoot(document.getElementById('root')).render(
    <>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>,
    </>


)
