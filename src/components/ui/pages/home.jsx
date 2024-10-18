import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import BottomNavigation from "./BottomNavigation"; 
import mainCharacter from "../../../../public/assets/Maincharacterr.png";
import dollarCoin from "../../../../public/assets/dollar-coin.png";
import energyIcon from "../../../../public/assets/energy.png";
import { Link } from "react-router-dom";
import newsIcon from "../../../../public/assets/News.png";
import electionIcon from "../../../../public/assets/Election.png";
import backgroundIcon from "../../../../public/assets/background.png";

const Home = () => {
  const [coins, setCoins] = useState(0);
  const [tapped, setTapped] = useState(false);
  const [energy, setEnergy] = useState(1000); 
  const [showMessage, setShowMessage] = useState(false);
  const isActive = (path) => location.pathname === path;

  const handleTap = () => {
    setCoins(coins + 100);
    setTapped(true);

    if (energy > 0) {
      setEnergy(energy - 10);
    }

    setTimeout(() => setTapped(false), 50);
  };

  const buttonAnimation = useSpring({
    transform: tapped ? "scale(1.2)" : "scale(1)",
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-[#7a7474] text-white h-screen font-bold flex flex-col max-w-xl relative">
        <div
          
        />
        
        <div className="relative z-10 px-2"> {/* Make sure content is above the background */}
          <div className="flex items-center space-x-2 pt-0">
            <div className="p-3 mt-5 rounded-lg bg-[#0e1c17]"></div>
            <div>
              <p className="mt-4 text-xl">Arafat</p>
            </div>
          </div>

          {/* Points Display */}
          <div className="absolute top-4 right-4 mt-8 flex items-center px-2 py-1 bg-gray-800 text-white rounded-md shadow-lg">
            <span>Total earn = </span>
            <p className="text-xl text-white"> {1000 + coins}</p>
            <img src={dollarCoin} className="w-[30px] h-[30px]" />
          </div>

          {/* News Section */}
          <div className="px-4 py-2 mt-20 flex justify-between gap-3">
            {/* Repeat News Icons as needed */}
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <Link to="/News" className="text-center">
                  <div className="relative">
                    <img
                      src={newsIcon}
                      alt="News Icon"
                      className={`w-6 h-6 mx-auto transition-transform duration-300 ${isActive("/News") ? "transform scale-125 brightness-150 shadow-lg filter hue-rotate-15" : "brightness-100"}`}
                    />
                    <span className={`text-sm ${isActive("/News") ? "text-purple-500" : "text-gray-600"}`}>
                      News
                    </span>
                  </div>
                </Link>
              </div>
            ))}

            <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
              <Link to="/Election" className="text-center">
                <div className="relative">
                  <img
                    src={electionIcon}
                    alt="Election Icon"
                    className={`w-6 h-6 mx-auto transition-transform duration-300 ${isActive("/Election") ? "transform scale-125 brightness-150 shadow-lg filter hue-rotate-15" : "brightness-100"}`}
                  />
                  <span className={`text-sm ${isActive("/Election") ? "text-yellow-500" : "text-gray-600"}`}>
                    Election
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Coin Earn Section */}
          <div className="px-4 mt-3 flex justify-center">
            <div className="px-4 py-2 flex items-center space-x-2">
              <img src={dollarCoin} className="w-[60px] h-[60px]" />
              <p className="text-4xl text-white">{1000 + coins}</p>
            </div>
          </div>

          {/* Tappable Button Section */}
          <div className="px-7 mt-5 flex justify-center">
            <animated.button
              style={buttonAnimation}
              onClick={handleTap}
              className={`w-[330px] h-[330px] px-3 p-4 rounded-full bg-[#272a2f] flex justify-center items-center cursor-pointer transform transition duration-200 ease-in-out ${energy > 0 ? "hover:scale-90 active:scale-75" : "cursor-not-allowed"}`}
              disabled={energy <= 0}
            >
              <div className="w-full h-full rounded-full bg-[#0e1c17] flex justify-center items-center">
                
              </div>
            </animated.button>
          </div>

          {/* Energy Display */}
          <div className="flex items-center px-2 py-2 mt-10 w-[130px] h-8 bg-gray-800 text-white rounded-md shadow-lg">
            <img src={energyIcon} className="w-[20px] h-[20px] mr-2" />
            <span>{energy}/1000</span>
          </div>
          {showMessage && (
            <div className="text-center mt-4 text-red-500 font-semibold">Sorry, ran out of energy!</div>
          )}

          {/* Bottom Navigation */}
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default Home;
