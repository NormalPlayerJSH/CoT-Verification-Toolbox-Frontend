import React from 'react';
import Graph from '../Components/Graph.jsx';
import Solution from '../Components/Solution';
import MakeRate from '../Components/MakeRate';

function Result() {
  return (
    <div className="grid grid-cols-3 w-full h-full p-4 gap-2">
      <div className="col-start-1 border">
        <Graph />
      </div>
      <div className="col-start-2 border">
        <Solution />
      </div>
      <div className="col-start-3 border p-4">
        <MakeRate />
      </div>
    </div>
  );
}

export default Result;
