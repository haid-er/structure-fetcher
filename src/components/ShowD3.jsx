// import Tree from 'react-d3-tree';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const fetchUsers = async () => {
//     const response = await axios.get('http://localhost:3000/chat');
//     return response?.data;
// };


// export default function ShowD3({ treeData }) {
//     if (!treeData) return <div>Loading...</div>;

//     return (
//         <div style={{ width: '80vw', height: '80vh', background: "white", borderRadius: "20px", margin: "20px 0px" }}>
//             <Tree
//                 data={treeData}
//                 orientation="vertical"
//                 pathFunc={"step"}
//                 renderCustomNodeElement={"MixedNodeElement"}
//                 translate={{ x: 500, y: 200 }}
//                 nodeSize={{ x: 300, y: 200 }}
//             />
//         </div>
//     );
// }

import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";

// Center tree using container ref
const containerStyles = {
    width: "100%",
    height: "100vh",
    backgroundColor: "#f9fafb",
    padding: "20px"
};

const customNode = ({ nodeDatum, toggleNode }) => (
    <g>
        <rect
            width="220"
            height="80"
            x="-110"
            y="-40"
            rx="10"
            ry="10"
            fill="#ffffff"
            stroke="#2563eb"
            strokeWidth="2"
            onClick={toggleNode}
        />
        <text fill="#1f2937" fontSize="14" fontWeight="bold" x="0" y="-15" textAnchor="middle">
            {nodeDatum.name}
        </text>
        {nodeDatum.attributes &&
            Object.entries(nodeDatum.attributes).map(([key, value], i) => (
                <text
                    key={i}
                    fill="#4b5563"
                    fontSize="12"
                    x="0"
                    y={5 + i * 15}
                    textAnchor="middle"
                >
                    {`${key}: ${value}`}
                </text>
            ))}
    </g>
);

const ShowD3 = ({ treeData }) => {
    const treeContainer = useRef(null);
    const [translate, setTranslate] = useState({ x: 500, y: 100 });
    console.log(treeData);
    useEffect(() => {
        if (treeContainer.current) {
            const dimensions = treeContainer.current.getBoundingClientRect();
            setTranslate({
                x: dimensions.width / 4,
                y: dimensions.height / 2
            });
        }
    }, []);
    if (!treeData) return <>Loading...</>
    return (
        <div style={containerStyles} ref={treeContainer}>
            <Tree
                data={treeData}
                translate={translate}
                orientation="horizontal"
                pathFunc="step"
                renderCustomNodeElement={customNode}
                zoomable
                zoom={0.8}
                separation={{ siblings: 1.5, nonSiblings: 2 }}
                collapsible={false}
                nodeSize={{ x: 500, y: 100 }}
            />
        </div>
    );
};

export default ShowD3;
