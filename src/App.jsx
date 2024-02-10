import React, { useState, useEffect } from "react";
import ThreeScene from "./components/ThreeScene";

const App = () => {
  const [currIndex, setIndex] = useState(1);

  const charDict = {
    1: "bald.glb",
    2: "bucket.glb",
    3: "fashion_man.glb",
    4: "dress_woman.glb",
    5: "man_final.glb",
    6: "woman_final.glb",
    7: "woman_working.glb",
    8: "woman1999.glb",
  };

  // Function to go to the next model
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex >= Object.keys(charDict).length ? 1 : prevIndex + 1));
  };

  // Function to go to the previous model
  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex <= 1 ? Object.keys(charDict).length : prevIndex - 1));
  };

    // Empty dependency array means this effect runs only once after the initial render

  return (
    <div className="flex justify-center w-screen h-screen bg-black">
      <div className="w-full h-full">
        <ThreeScene model={charDict[currIndex]} />
      </div>
      <div className="absolute flex justify-between w-full p-4">
        <button onClick={handlePrevious} className="p-2 text-white bg-gray-700">Previous</button>
        <button onClick={handleNext} className="p-2 text-white bg-gray-700">Next</button>
      </div>
    </div>
  );
};

export default App;
