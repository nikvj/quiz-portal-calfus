
import Quiz from './components/Quiz/Quiz';
import  Navbar from './components/Navbar/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path="/" element={<Quiz />} />
    </Routes>
    <Footer />
</Router>
  );
}

export default App;
