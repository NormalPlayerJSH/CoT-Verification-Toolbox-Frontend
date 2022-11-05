import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';

const orgChart = {

    name: 'Step1',
    attributes: {
        solution: "The Statue of Freedom is in Washington D.C., which is about 300 miles from the Statue of Liberty.",
        link: "https://www.naver.com",
    },
    children: [
        {
            name: 'Step2',
            attributes: {
                solution: 'None',
            },
            children: [
                {
                    name: 'Step3',
                    attributes: {
                        solution: 'None'
                    },
                },
            ],
        },
    ],
}

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
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
    }, []);
    const handleNodeHover = (nodeDatum) => {
        props.setSolution(nodeDatum.attributes.solution)
    };
    const handleNodeClick = (nodeDatum) => {
        window.open(nodeDatum.attributes.link)
    };
    return (
        <div id="treeWrapper" ref={ref} style={{ margin: '0', padding: '0', width: '100%', height: '100%' }}>
            <Tree
                data={orgChart}
                orientation="vertical"
                translate={{ x: width / 2, y: height / 5 }}
                renderCustomNodeElement={(rd3tProps) =>
                    renderNodeWithCustomEvents({ ...rd3tProps, handleNodeHover, handleNodeClick })
                }
            />
        </div>
    );
}

export default Graph;