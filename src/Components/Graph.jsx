import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';

const orgChart = {
    name: 'Start',
    children: [
        {
            name: 'Step1',
            attributes: {
                solution: "The Statue of Freedom is in Washington D.C., which is about 300 miles from the Statue of Liberty.",
            },
            children: [
                {
                    name: 'Step2',
                    attributes: {
                        solution: 'None',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
            ],
        },
    ],
};

const solutions = {
    1: "The Statue of Freedom is in Washington D.C., which is about 300 miles from the Statue of Liberty."
};

function Graph(props) {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
    }, []);
    return (
        <div id="treeWrapper" ref={ref} style={{ margin: '0', padding: '0', width: '100%', height: '100%' }}>
            <Tree
                data={orgChart}
                orientation="vertical"
                translate={{ x: width / 2, y: height / 5 }}
                onNodeMouseOver={() => {
                    props.setSolution(solutions[1])
                }}
            />
        </div>
    );
}

export default Graph;