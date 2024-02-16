import logo from './logo.svg';
import './App.css';
import './style/bootstrap/css/bootstrap.min.css'
import Camera from './page/camera'
import Result from './page/result'
function App() {
  return (
    <div className="App"    >
      <header className="App-header"
        style={{
          background: "url('background.jpg')",
          backgroundRepeat:"no-repeat",
          backgroundSize : "cover"
        }}
      >
        <div className='d-flex justify-content-between align-content-between'>
          <Camera></Camera>
          <Result></Result>
        </div>
      </header>
    </div>
  );
}

export default App;
