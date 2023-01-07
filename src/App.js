import Form from "./components/Form.js";
import Main from "./components/Main";
import { Link, Route, Routes } from "react-router-dom";
import './App.css'


function App() {
  const open =()=>{
    document.getElementById('log-out').style.display='block'
  }
  // const reload = () =>{
  //   sessionStorage.clear()
  //   window.location.reload()
  // }
  return (
    <div className="App">
      <nav
        style={{
          backgroundColor: "black",
          color: "white",
          height: "6vh",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "4vh",
              fontWeight:'500'
            }}
            to="/"
            id="home"
          >
           
            Home
          </Link>
        </div>
        <div id="extra-div"></div>
        <div>
          {sessionStorage.getItem("name") === null ? (
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                textAlign: "center",
                marginRight: "4vh",
              }}
              to="/form"
            >

              Register
            </Link>
          ) : (
            <div > <h4 onClick={open} style={{marginRight:'4vh'}} >{"Hello " + sessionStorage.getItem("name")}</h4>
            {/* <div id="log-out"  onClick={reload} >
              Log Out
            </div> */}
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
