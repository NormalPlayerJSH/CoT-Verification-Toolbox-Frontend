import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import data from "../db/db.json";

const renderNodeWithCustomEvents = ({
    nodeDatum,
    handleNodeHover,
    handleNodeClick
}) => (
    <g>
        <circle r="15" onClick={() => handleNodeClick(nodeDatum)} onMouseOver={() => handleNodeHover(nodeDatum)} />
        <text fill="black" strokeWidth="1" x="20">
            {nodeDatum.name}
        </text>
    </g>
);


function Graph(props) {
    const ref = useRef(null);
    const [orgChart, setOrgChart] = useState({});
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const chartData = JSON.parse(JSON.stringify(data));
    const tempChart = {
        name: '',
        attributes: {
            subquery: '',
            solution: '',
            link: '',
        },
        children: [],
    };
    const makeChart = (stepCount, chartData, target) => {
        if (stepCount == 0) {
            target.name = "Step" + String(stepCount + 1);
            target.attributes.subquery = chartData["nodeList"][stepCount]["subQuery"];
            target.attributes.solution = chartData["nodeList"][stepCount]["solution"];
            target.attributes.link = chartData["nodeList"][stepCount]["url"];
            makeChart(stepCount + 1, chartData, target)
            return;
        }
        if (stepCount < chartData["stepCount"]) {
            const temp = {
                name: '',
                attributes: {
                    subquery: '',
                    solution: '',
                    link: '',
                },
                children: [],
            };
            temp.name = "Step" + String(stepCount + 1);
            temp.attributes.subquery = chartData["nodeList"][stepCount]["subQuery"];
            temp.attributes.solution = chartData["nodeList"][stepCount]["solution"];
            temp.attributes.link = chartData["nodeList"][stepCount]["url"];
            target.children.push(temp);
            makeChart(stepCount + 1, chartData, target.children[0]);
            return;
        }
        return;
    };
    makeChart(0, chartData, tempChart);
    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
        setOrgChart(tempChart);
    }, []);
    const handleNodeHover = (nodeDatum) => {
        const text = nodeDatum.attributes.subquery + "\n" + nodeDatum.attributes.solution;
        props.setSolution(text);
    };
    const handleNodeClick = (nodeDatum) => {
        window.open(nodeDatum.attributes.link);
    };
    return (
        <div id="treeWrapper" ref={ref} style={{ margin: '0', padding: '0', width: '100%', height: '100%' }}>
            <Tree
                data={orgChart}
                orientation="vertical"
                translate={{ x: width / 2, y: height / 4.5 }}
                renderCustomNodeElement={(rd3tProps) =>
                    renderNodeWithCustomEvents({ ...rd3tProps, handleNodeHover, handleNodeClick })
                }
            />
        </div>
    );
}

export default Graph;