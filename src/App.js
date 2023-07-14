import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./App.css";

function App() {
  const [time, setTime] = useState(20 * 60);
  const [time2, setTime2] = useState(20 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isRunning2, setIsRunning2] = useState(false);
  const [showing, setShowing] = useState(true);
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);
  const [p1Color, setP1Color] = useState(localStorage.getItem("p1Color"));
  const [p2Color, setP2Color] = useState(localStorage.getItem("p2Color"));

  // This section causes the timer to switch players on click of screen
  useEffect(() => {
    let intervalID;
    let intervalID2;
    if (time <= 0) {
      return alert(`Player 1 is out of time!`);
    }
    if (time2 <= 0) {
      return alert(`Player 2 is out of time!`);
    }
    if (isRunning) intervalID = setInterval(tick, 1000);
    if (isRunning2) intervalID2 = setInterval(tick2, 1000);
    return () => {
      clearInterval(intervalID);
      clearInterval(intervalID2);
    };
  }, [time, time2, isRunning, isRunning2]);

  function tick() {
    setTime((t) => t - 1);
  }
  function tick2() {
    setTime2((t) => t - 1);
  }

  function start() {
    setIsRunning(true);
  }

  function switchPlayers() {
    setIsRunning(!isRunning);
    setIsRunning2(!isRunning2);
  }

  function formatTime(t) {
    let min = Math.floor(t / 60);
    let sec = t % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }

  // This section makes the start screen disappear when start game is clicked
  function toggleStartScreen() {
    setShowing(!showing);
    start();
  }

  // This section is to open the settings menu from the home screen
  function toggleSettingsScreen() {
    setShowing(!showing);
    setIsSettingsClicked(!isSettingsClicked);
  }

  // This section is for selecting colors via the settings window
  const changeColorP1 = (e) => {
    const color = e.target.value;
    setP1Color(color);
    localStorage.setItem("p1Color", color);
  };
  const changeColorP2 = (e) => {
    const color = e.target.value;
    setP2Color(color);
    localStorage.setItem("p2Color", color);
  };

  return (
    <div className="App">
      <div
        className={`flex-col h-full flex items-center ${
          showing ? "" : "hidden"
        }`}
        id="initialScreen"
      >
        <div className="flex w-full justify-end pt-3 pr-3">
          <button className="text-3xl" onClick={toggleSettingsScreen}>
            <FaCog />
          </button>
        </div>
        <div className="flex justify-center h-full">
          <button onClick={toggleStartScreen} className="text-5xl">
            Start Game!
          </button>
        </div>
      </div>
      <div
        className={`${isSettingsClicked ? "" : "hidden"}`}
        id="settingsScreen"
      >
        <div className="flex w-full justify-end pt-3 pr-3">
          <button onClick={toggleSettingsScreen} className="text-3xl">
            <IoMdCloseCircleOutline />
          </button>
        </div>
        <div>
          {/* <p>Time</p>
          <br /> */}
          <div>
            <label>Player 1 Color</label>
            <select
              name="p1-color-selector"
              value={p1Color}
              onChange={changeColorP1}
            >
              <option value="bg-[#f8fafc]">White</option>
              <option value="bg-[#020617]">Black</option>
              <option value="bg-[#b91c1c]">Red</option>
              <option value="bg-[#14532d]">Green</option>
              <option value="bg-[#0284c7]">Blue</option>
            </select>
          </div>
          <br />
          <div>
            <label>Player 2 Color</label>
            <select
              name="p2-color-selector"
              value={p2Color}
              onChange={changeColorP2}
            >
              <option value="bg-[#f8fafc]">White</option>
              <option value="bg-[#020617]">Black</option>
              <option value="bg-[#b91c1c]">Red</option>
              <option value="bg-[#14532d]">Green</option>
              <option value="bg-[#0284c7]">Blue</option>
            </select>
            <div className="testing"></div>
          </div>
        </div>
      </div>
      <div
        className={`${
          !showing && !isSettingsClicked ? "" : "hidden"
        } flex flex-col h-full`}
        onClick={switchPlayers}
        id="mainScreen"
      >
        <div
          // className={`h-1/2 bg-[${p1Color}] flex justify-center items-center`}
          className={`h-1/2 ${p1Color} flex justify-center items-center`}
        >
          <div className="">
            <p className="text-5xl">{formatTime(time)}</p>
          </div>
        </div>
        <div className={`h-1/2 ${p2Color} flex justify-center items-center`}>
          <div className="">
            <p className="text-5xl">{formatTime(time2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
