import './App.css';
import React from 'react'
import Form from './components/Form';
import Resume from './components/Resume';
import Pdf from "react-to-pdf";

function App() {
  const ref = React.createRef();

  return (
    <div className="App">
     {/* <Form/> */}
     <Resume ref={ref}/>
    </div>
  );
}

export default App;
