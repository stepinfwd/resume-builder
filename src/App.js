import './App.css';
import React,{ useState }  from 'react'
import Form from './components/Form/Form';
import Resume from './components/Resume/Resume';
import Navbar from './components/Navbar/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from './components/Footer/Footer';

function App() {
  const [data, setdata] = useState()
  const resumeData =(payload)=>{
    setdata(payload)
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
          <Navbar/>
            <Form resumeData={resumeData} />
            <Footer/>
          </Route>
          <Route path="/resume">
            <Resume data={data} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
