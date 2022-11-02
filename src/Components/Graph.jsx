import React, { useRef, useEffect } from "react";
import ForceGraph2D from 'react-force-graph-2d';
// import "./Graph.css";

var data = {
    nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }, { id: "E" }],
    links: [
        { source: "A", target: "B" },
        { source: "A", target: "C" },
        { source: "B", target: "D" },
        { source: "C", target: "D" },
        { source: "D", target: "E" }
    ]
};

function Graph() {
    const forceRef = useRef(null);
    useEffect(() => {
        forceRef.current.d3Force("charge").strength(-400);
    })
    return (
        <div className="Graph">
            <ForceGraph2D
                graphData={data}
                nodeLabel="id"
                linkCurvature="curvature"
                enablePointerInteraction={true}
                linkDirectionalParticleWidth={1}
                ref={forceRef}
                backgroundColor="#FFFFFF"
                width={400}
                height={740}
                nodeRelSize={7}
                nodeColor={nodes => "#DD7777"}
                linkColor={links => "#000000"}
                linkWidth={2}
            />
        </div>
    );
}

export default Graph;