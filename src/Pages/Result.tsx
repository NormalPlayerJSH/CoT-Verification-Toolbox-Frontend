import React, { useState } from 'react';
import Graph from '../Components/Graph.jsx';
import MakeRate from '../Components/MakeRate';

function Result() {
  const [answer, setAnswer] = useState("");
  return (
    <div className="grid grid-cols-3 w-full h-full p-4 gap-2">
      <div className="col-start-1 border">
        <Graph setAnswer={setAnswer} />
      </div>
      <div className="col-start-2 border" style={{ whiteSpace: "pre-wrap", fontFamily: "Verdana", fontSize: "20px" }}>
        {answer}
      </div>
      <div className="col-start-3 border p-4">
        <MakeRate />
      </div>
    </div>
  );
}

export default Result;
