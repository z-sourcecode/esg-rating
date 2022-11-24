import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './Pages/Home';
import DataPage from './Pages/Data';
import ConfigurationsPage from './Pages/Configurations';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Styling/styles.css'

function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand>ESG Rating</Navbar.Brand>
              <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/data">Data</Nav.Link>
              <Nav.Link href="/configurations">Configurations</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/' exact element={<HomePage/>} />
          <Route path='/data' element={<DataPage/>}/>
          <Route path='/configurations' element={<ConfigurationsPage/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
