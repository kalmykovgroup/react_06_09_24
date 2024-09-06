
import './App.css'
import Header from "./header/Header.jsx";
import Menu from "./menu/Menu.jsx";
import Content from "./content/Content.jsx";
import Footer from "./footer/Footer.jsx";

function App() {

  return (
    <>
        <Header/>
        <div className="container">
            <Menu/>
            <Content/>
        </div>
        <Footer/>
    </>
  )
}

export default App
