import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';

const orgChart = {
    name: 'CEO',
    children: [
        {
            name: 'Manager',
            attributes: {
                department: 'Production',
            },
            children: [
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Assembly',
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

function Graph() {
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
            />
        </div>
    );
}

export default Graph;