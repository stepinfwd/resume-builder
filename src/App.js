import './App.css';
import React from 'react'
import Form from './components/Form/Form';
import Resume from './components/Resume/Resume';
import Navbar from './components/Navbar/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import  { useState, useEffect } from 'react'



function App() {

  const [data, setdata] = useState()
  const resumeData =(payload)=>{
    setdata(payload)
  }
  useEffect(() => {
console.log("resumedata is",data)
  }, [data])
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Form resumeData={resumeData} />
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
