import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Nav from './Components/Nav.js';
// import Footer from './Components/footer.js';
import AddTeacher from './Components/signUpp.js';
import GetTeacher from './Components/getTeacher.js';
import Content from './Components/content.js';
import ParticularContent from './Components/particularContent.js';
import DeleteTeacher from './Components/deleteTeacher.js';
import UpdateTeacher from './Components/update.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path="/" element={ <div> <h1> Teacher List </h1> <Content/> </div>} />
            <Route path="/get" element={ <div> <h1> Get Teacher </h1> <GetTeacher/> </div>} />
            <Route path="/get/:mail" element= { <div> <h1> Get Teacher </h1> <ParticularContent/> </div> } /> 
            <Route path="/add" element={ <div> <h1> Add Teacher </h1> <AddTeacher/> </div> } />
            <Route path="/update" element={ <div> <h1> Update Teacher </h1> <UpdateTeacher/> </div> } />
            <Route path="/delete" element={ <div> <h1> Delete Teacher </h1> <DeleteTeacher/> </div> } />
            <Route path="*" element={<h1> No Page </h1>} /> 
          </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </div>
  );
}

export default App;