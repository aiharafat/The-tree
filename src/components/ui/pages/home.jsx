import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import dollarCoin from "../../../../public/assets/dollar-coin.png";
import settingsIcon from "../../../../public/assets/settingss.png";
import { Link, useLocation } from "react-router-dom";
import energyIcon from "../../../../public/assets/energy.png";
import profileImg from "../../../../public/assets/profileimg.png";
import { EnergyProvider } from "./EnergyContext";
import logoIcon from "../../../../public/assets/Logo.png";
import Loading from "./Loading";
import boosticon from"../../../../public/assets/energyy.png";

const Home = () => {
  const [isLoading, setIsLoading] = useState(!sessionStorage.getItem("hasLoadedBefore"));
  const [tapped, setTapped] = useState(false); 
  const location = useLocation();
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem("coins")) || 0);
  const [energy, setEnergy] = useState(() => parseInt(localStorage.getItem("energy")) || 1000);
  const [coinPopups, setCoinPopups] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [boostActive, setBoostActive] = useState(false);
  const [boostCount, setBoostCount] = useState(() => parseInt(localStorage.getItem("boostCount")) || 3);
  const [boostTimer, setBoostTimer] = useState(0);
  const levelNames = [ "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Epic", "Legendary", "Master", "GrandMaster", "Lord"];
  const levelMinPoints = [ 0, 1000, 3000, 5000, 1000, 30000, 50000, 10000, 100000, 1000000];
  const [levelIndex, setLevelIndex] = useState(0); 

  
  // Adjust viewport height for Telegram
  const adjustViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    adjustViewportHeight();
    window.addEventListener("resize", adjustViewportHeight);
    return () => window.removeEventListener("resize", adjustViewportHeight);
  }, []);
 
 
  //level progress
  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) return 100;
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    return Math.min(((coins - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100, 100);
  };

  useEffect(() => {
    if (coins >= levelMinPoints[levelIndex + 1] && levelIndex < levelNames.length - 1) {
      setLevelIndex((prevIndex) => prevIndex + 1);
    } else if (coins < levelMinPoints[levelIndex] && levelIndex > 0) {
      setLevelIndex((prevIndex) => prevIndex - 1);
    }
  }, [coins, levelIndex]);


//fetching from localstorage
  useEffect(() => {
    localStorage.setItem("coins", coins);
    localStorage.setItem("energy", energy);
    localStorage.setItem("boostCount", boostCount);
  }, [coins, energy, boostCount]);


  useEffect(() => {
    const lastBoostDate = localStorage.getItem("lastBoostDate");
    const today = new Date().toLocaleDateString();
    if (lastBoostDate !== today) {
      setBoostCount(3);
      localStorage.setItem("lastBoostDate", today);
    }
  }, []);
//energy stats
  const handleTap = (e) => {
    if (energy <= 10) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      return;
    }

    const tapPosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      id: Date.now(),
    };
//adding coins
  // Adding coins
  const coinsToAdd = levelIndex + 1; // Coin increase based on level

setCoins((prevCoins) => prevCoins + (boostActive ? coinsToAdd * 2 : coinsToAdd));

// Reduce energy only if boost is not active
if (!boostActive) {
  setEnergy((prevEnergy) => Math.max(prevEnergy - coinsToAdd , 0));
}

//coins popup
setCoinPopups((prev) => [...prev, tapPosition]);
setTimeout(() => {
  setCoinPopups((prev) => prev.filter((popup) => popup.id !== tapPosition.id));
}, 500);
};

// Boost mechanism
const handleBoost = () => {
  if (boostCount > 0 && !boostActive) {
    setBoostActive(true);
    setBoostCount((prevCount) => prevCount - 1);
    setBoostTimer(30);

    const boostInterval = setInterval(() => {
      setBoostTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(boostInterval);
          setBoostActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  } else {
    setShowMessage(true);
  }
};

//clicking the taptap button 
  const handleCardClick = () => {
    console.log("Tappable area clicked!");
    
  };
//energy increasing
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => (prevEnergy < 1000 ? prevEnergy + 1 : 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
//button animation
  const buttonAnimation = useSpring({
    transform: tapped ? "scale(1.3)" : "scale(1)",
    config: { tension: 0, friction: 0 },
  });
//loading mechanism
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasLoadedBefore", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const isActive = (path) => location.pathname === path;

  if (isLoading) return <Loading />;


  return (
    <EnergyProvider>
      {isLoading ? (
        <Loading />
      ) :( 
          <div className="bg-black  flex justify-center">
            <div className="w-full bg-[#1f2f40] h-screen font-bold flex flex-col max-w-xl relative">
              <div className="flex items-center space-x-2 ">
                <div className="absolute top-0  mt-4 flex items-center  px-2 text-white">  
                  <Link to="/infoPage" className="text-center">
                    <div className="relative">
                      <img
                       src={profileImg}
                       alt="Profile Icon"
                       className={`w-[30px] h-[30px] rounded-full p-[2px] bg-gradient-to-r from-yellow-100 to-yellow-900 mx-auto transition-transform duration-300 ${isActive("/News") ? "transform scale-125 brightness-150 shadow- filter hue-rotate-15" : "brightness-100"}`}
                      />
                     <span className={`text-sm ${isActive("/infoPage") ? "text-purple-500" : "text-gray-600"}`}></span>
                    </div>
                  </Link>
                  <span className="px-1">Arafat</span>
           
          
                </div>
                 {/* settings icon */}
           <div className="absolute top-0 right-[10px] mt-3 flex items-center text-white">
          <img
          src={settingsIcon}
          className="w-[30px] h-[30px] cursor-pointer"
          
          alt="Settings Icon"
           />
          </div>
           </div>
          
        <div className="relative z-10 px-2">
          <div className="flex items-center mt-8 w-1/3">
            <div className="w-full ">
             
              <div className="relative flex items-center mt-6 border-2 border-[#43433b] rounded-full">
                 {/* Progress bar container */}
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full relative">
                      {/* Dividers spaced across the full width of the progress bar */}
                  {[...Array(9)].map((_, index) => (
                  <div
                  key={index}
                   className={`absolute top-0 bottom-0 w-1/10 h-full ${index < levelIndex ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-[#43433b]/[0.6]'} rounded-full`}
                  style={{
                  left: `${index * 9}%`, // Space the segments evenly
                  width: '20%', // Each segment occupies 10% of the bar
                   }}
                 ></div>
                  ))}

                   {/* Progress gradient for filled divisions */}
                  <div
                   className="absolute top-0 left-0 rounded-full h-2 bg-gradient-to-r from-yellow-200 to-yellow-700"
                   style={{ width: `${(levelIndex / 9) * 100}%` }} // Fill width based on level
                  ></div>
                </div>
              </div>
              <div className="flex mt-0 justify-between">
                <p className="text-sm">{levelNames[levelIndex]}</p>
                <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
              </div>
            </div>
          </div>

        {/* array section of the news */}

          <div className=" py-2 mt-3 flex justify-between gap-2"> 
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-[#272a2f] rounded-lg px-3 py-4 w-full relative">
                <Link to="/News" className="text-center">
                  <div className="relative">
                    
                    <span className={`text-sm ${isActive("/News") ? "text-purple-500" : "text-gray-600"}`}>Law enforcers stop protesters from breaking thru Bangabhaban barricade</span>
                  </div>
                </Link>
              </div>
            ))}
           
          </div>


          {/* Coin Earn Section */}
          <div className="px-4 mt-1 flex justify-center">
            <div className="px-2  mt-0 flex items-center space-x-0">
              <img src={dollarCoin} className="w-[40px] h-[40px] py-0" />
              <p className="text-3xl mt-0 text-white">{1000 + coins}</p>
            </div>
          </div>

          {/* Points Display */}
          <div className="absolute top-0 right-[160px] mt-4 flex items-center text-white ">
           <img src={dollarCoin} className="w-[30px] h-[30px]" />
            <p className="text-xl text-white"> {1000 + coins}</p>
            
          </div>

          {/* Tappable Button Section */}
          <div className="px-7 mt-3 flex justify-center">
            <animated.button
              style={buttonAnimation}
              onTouchStart={handleTap}
              onClick={handleCardClick}
              className={`w-[280px] h-[280px] px-3 p-4 rounded-full bg-[#272a2f] flex justify-center items-center cursor-pointer transform transition duration-200 ease-in-out ${
                energy > 0 ? "hover:scale-90 active:scale-75" : "cursor-not-allowed"
              }`}
              disabled={energy <= 0}
            >
              <div className="w-full h-full rounded-full bg-[#0e1c17] flex justify-center brightness-1 items-center">
                <img src={logoIcon} className="w-full h-full" />
              </div>
            </animated.button>
          </div>

          {/* Boost Timer */}
          {boostActive && boostTimer > 0 && (
            <div className="text-center text-white font-bold mt-4">
              Boost Active! Time Left: {boostTimer}s
            </div>
          )}

          {/* Coin Pop-ups */}
          {coinPopups.map((popup) => (
            <div
              key={popup.id}
              className="absolute text-yellow-500 font-bold"
              style={{
                top: popup.y,
                left: popup.x,
                transform: "translate(-50%, -50%)",
                fontSize: "40px", // Adjust size
              }}
            >
              +{boostActive ? (levelIndex + 1 )* 2 : levelIndex + 1}
            </div>
          ))}

          <div className="flex justify-between gap-3 px-2 py-3">
            {/* Energy Display */}
            <div className="flex items-center px-2 w-[130px] h-[40px] bg-gray-800 text-white rounded-md shadow-lg">
              <img src={energyIcon} className="w-[20px] h-[20px] mr-2" />
              <span>{energy}/1000</span>
            </div>

            {/* Boost Button */}
            <div
              className="flex items-center px-2 w-[150px] h-[40px] bg-gray-800 text-white rounded-md shadow-lg"
              onClick={handleBoost}
            
            >
              <img src={boosticon} className=" w-[20px] h-[20px] mr-2"></img>
              <span>{boostCount > 0 ? `Boost (${boostCount} left)` : "No Boosts Left"}</span>
              
            </div>
          </div>

          {/* Error message when energy is out */}
          {showMessage && (
            <div className="text-center mt-10 text-red-500 font-semibold">
              Sorry, not enough energy!
            </div>
          )}

          
        </div>
      </div>
    </div>
    

   
    )}
    </EnergyProvider>
  );
};

export default Home;
