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
        <rect width="240" height="60" x="-120" y="-30" fill="#B5DAFF" rx="10" ry="10" strokeWidth="2" onClick={() => handleNodeClick(nodeDatum)} onMouseOver={() => handleNodeHover(nodeDatum)} />
        <text fill="black" strokeWidth="1" x="-20" y="-10">
            {nodeDatum.name}
        </text>
    </g>
);


function Graph(props) {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const chartData = JSON.parse(JSON.stringify(data));
    const tempChart = {
        name: '',
        attributes: {
            subQuestion: '',
            subAnswer: '',
            link: '',
        },
        children: [],
    };
    const makeChart = (stepCount, chartData, target) => {
        if (stepCount === 0) {
            target.name = "Step" + String(stepCount + 1);
            target.attributes.subQuestion = chartData["nodeList"][stepCount]["subQuestion"];
            target.attributes.subAnswer = chartData["nodeList"][stepCount]["subAnswer"];
            target.attributes.link = chartData["nodeList"][stepCount]["url"];
            makeChart(stepCount + 1, chartData, target)
            return;
        }
        if (stepCount < chartData["stepCount"]) {
            const temp = {
                name: '',
                attributes: {
                    subQuestion: '',
                    subAnswer: '',
                    link: '',
                },
                children: [],
            };
            temp.name = "Step" + String(stepCount + 1);
            temp.attributes.subQuestion = chartData["nodeList"][stepCount]["subQuestion"];
            temp.attributes.subAnswer = chartData["nodeList"][stepCount]["subAnswer"];
            temp.attributes.link = chartData["nodeList"][stepCount]["url"];
            target.children.push(temp);
            makeChart(stepCount + 1, chartData, target.children[0]);
            return;
        }
        return;
    };
    makeChart(0, chartData, tempChart);
    const orgChart = tempChart;
    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
    }, []);
    const handleNodeHover = (nodeDatum) => {
        const text = " " + nodeDatum.attributes.subQuestion + "\n\n " + nodeDatum.attributes.subAnswer;
        props.setAnswer(text);
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