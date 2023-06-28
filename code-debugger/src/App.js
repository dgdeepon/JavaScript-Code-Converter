// App.js
import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import Typewriter from 'typewriter-effect';
import './App.css';
import axios from 'axios';

const App = () => {
  const [code, setCode] = useState('');
  const [languages] = useState(['Java', 'Python', 'C++', 'C', 'C#']);
  const [response,setResponse]=useState('');
  const [convertBy,setConvert]=useState('');
  const [loading,setLoading]=useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
console.log(code);
  const handleConvert = () => {
    if(!convertBy || !code){
      return;
    }else if(loading){
      return;
    }

    setLoading(true);
    axios.post(`${process.env.REACT_APP_API}/convert`,{code:code,option:convertBy})
    .then((res)=>{
      setLoading(false);
      setResponse(res.data.message);
    }).catch((err)=>{
      setLoading(false);
      setResponse(err);
    })

  };

  const handleDebug = () => {
    // Send 'code' to the back end for debugging
    // Display debugging results in a modal or console
    if(!code){
      return;
    }else if(loading){
      return;
    }
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API}/debug`,{code})
    .then((res)=>{
      setLoading(false);
      setResponse(res.data.message);
    }).catch((err)=>{
      setLoading(false);
      setResponse(err);
    })
  };

  const handleCheckQuality = () => {
    // Send 'code' to the back end for code quality checking
    // Display quality checking results in a modal or console
    if(!code){
      return;
    }else if(loading){
      return;
    }
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API}/quality`,{code})
    .then((res)=>{
      setLoading(false);
      setResponse(res.data.message);
    }).catch((err)=>{
      setLoading(false);
      setResponse(err);
    })
  };


  useEffect(()=>{

  },[loading])


  return (
    <div className="app-container">
    <h1 className="app-title">JavaScript To</h1>
      <div className="typewriter-container">
        <Typewriter
          options={{
            strings: languages,
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 20,
          }}
        />
      </div>
      <div style={{height:'50vh'}} className="editor-container">
      <Editor
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
        />
        </div>
        <div className="button-container">
        <select className='action-button' onChange={(e)=>{
          setConvert(e.target.value);
        }}>
          <option value={''}>Choose Language</option>
          <option value={'java'}>Java</option>
          <option value={'python'}>Python</option>
          <option value={'c'}>C</option>
          <option value={'c++'}>C++</option>
          <option value={'c#'}>C#</option>
        </select>
      <button className="action-button" onClick={handleConvert}>Convert</button>
      <button onClick={handleDebug} className="action-button">Debug</button>
      <button onClick={handleCheckQuality} className="action-button">Check Quality</button>
        </div>
      <div style={{height:'50vh'}}>
      <h3>Output :</h3>
      <div style={{border:'1px solid black', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',padding:'10px'}}>
        <Editor
        height={"50vh"}
        theme="vs-dark"
        value={loading ? 'Generating Response...' : response}
        />
      </div>
      </div>
    </div>
  );
};

export default App;
