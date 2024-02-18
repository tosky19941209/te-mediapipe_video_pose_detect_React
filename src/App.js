import logo from './logo.svg';
import './App.css';
import './style/bootstrap/css/bootstrap.min.css'
import Test from './page/Test.js'
import Camera from './page/Camera.js'
import Result from './page/Result.js'
import Load from './component/Loading/Load.js'
import { useEffect, useState } from 'react';
const App = () => {

  const index_landmark = {
    nose: 0,
    left_eye_inner: 1,
    left_eye: 2,
    left_eye_outer: 3,
    right_eye_inner: 4,
    right_eye: 5,
    right_eye_outer: 6,
    left_ear: 7,
    right_ear: 8,
    mouth_left: 9,
    mouth_right: 10,
    left_shoulder: 11,
    right_shoulder: 12,
    left_elbow: 13,
    right_elbow: 14,
    left_wrist: 15,
    right_wrist: 16,
    left_pinky: 17,
    right_pinky: 18,
    left_index: 19,
    right_index: 20,
    left_thumb: 21,
    right_thumb: 22,
    left_hip: 23,
    right_hip: 24,
    left_knee: 25,
    right_knee: 26,
    left_ankle: 27,
    right_ankle: 28,
    left_heel: 29,
    right_heel: 30,
    left_foot_index: 31,
    right_foot_index: 32
}

  const [results_Data, setResultData] = useState({
    accuracy:0,
    repetition:0,
    score:0,
    kind_exercise:"video1.mp4",
    stateVideoPlay:false,
    cameraState:false
  })

  const updateStateData = (value) => {
    setResultData(value)
  }

  // useEffect(()=>{
  //   console.log(results_Data)
  // }, [results_Data])


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
          {/* <Test></Test> */}
        </div>
      </header>
    </div>
  );
}

export default App;
