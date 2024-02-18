import logo from './logo.svg';
import './App.css';
import './style/bootstrap/css/bootstrap.min.css'
import Camera from './page/Camera.js'
import Result from './page/Result.js'
import Load from './component/Loading/Load.js'
import { useEffect, useState } from 'react';
const App = () => {

  const [results_Data, setResultData] = useState({
    accuracy:0,
    repetition:0,
    score:0,
    kind_exercise:"",
    stateVideoPlay:false
  })

  const updateStateData = (value) => {
    setResultData(value)
  }
  useEffect(()=>{
    console.log(results_Data.stateVideoPlay)
  },results_Data.stateVideoPlay)


  return (
    <div className="App"    >
      <header className="App-header"
        style={{
          background: "url('background.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <div className='d-flex' style={{ width: "98vw", height: "10vw" }}>
          <Load></Load>
          <p style={{ color: 'rgb(237,120,3)', fontSize: "4vw", paddingLeft: "24vw", marginTop: "-2vw" }}>
            Fitness Exercisess
          </p>
        </div>

        <div className='d-flex justify-content-between align-content-between' style={{ marginTop: "-5vw" }}>
          <Camera updateStateData={updateStateData} results_Data={results_Data}></Camera>
          <Result updateStateData={updateStateData} results_Data={results_Data}></Result>
        </div>
      </header>
    </div>
  );
}

export default App;
