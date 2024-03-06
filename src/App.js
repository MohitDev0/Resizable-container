// import 
import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/Form";
import Resizable from "./Components/Resizable";
import axios from "axios";

const App = () => {
  const url = process.env.REACT_APP_BACKEND_URL;           //backend url
  const [componentData, setComponentData] = useState([]);  // to manage the data of all the 3 components
  const [ApiCallCount, setApiCallCount] = useState(0);     // counter to count how  many time add/edit api call
  const [displayForm, setDisplayForm] = useState({         // for conditional rendering form and open form conditionally for add and update
    show: false,
    option: ""
  });
  useEffect(() => {
    // get all the component data only first time
    const getComponentData = async () => {
      await axios.get(url)
        .then((res) => {
          setComponentData(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getComponentData();
  }, [url])
  return (
    <div>
      <h4>Count Api call : {ApiCallCount}</h4>
      <Resizable componentData={componentData} setComponentData={setComponentData} setDisplayForm={setDisplayForm} />
      {displayForm.option && <Form componentData={componentData} setComponentData={setComponentData} setDisplayForm={setDisplayForm} displayForm={displayForm} setApiCallCount={setApiCallCount} />}
    </div>
  )
}

export default App