import logo from './logo.png';
import './App.css';
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx';

function App() {
    return (
        <>
        
        <div className="App">
        <Navbar />
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header> 
        
        </div>
        <Footer />
       </>
        );
}

export default App;
