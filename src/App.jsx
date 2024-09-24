
import './App.css';
import Header from "./header/Header.jsx";
import Menu from "./menu/Menu.jsx";
import Content from "./content/Content.jsx";
import Footer from "./footer/Footer.jsx";
import {BrowserRouter, Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";


Link.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node
};

function App() {


  return (

      <BrowserRouter basename="/">
          <Header/>
          <div className="container">
              <Menu/>
              <Content/>
          </div>
          <Footer/>
      </BrowserRouter>

  );
}

export default App;
