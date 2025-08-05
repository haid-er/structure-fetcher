import { useRef, useState, useEffect } from "react";
import Tree from "react-d3-tree";
import Swal from "sweetalert2";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 80;

export default function ShowStructure({ data }) {
  // console.log(data);
  if (!data)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Center tree on mount
  useEffect(() => {
    const dimensions = treeContainer.current.getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 2 - NODE_WIDTH / 2,
      y: 50,
    });
  }, []);

  const renderForeignObjectNode = ({ nodeDatum, toggleNode }) => (
    <g>
      {/* line-click toggler */}
      {nodeDatum.children && (
        <circle
          r={10}
          cx={0}
          cy={20}
          fill="black"
          stroke="yellow"
          strokeWidth={1}
          onClick={toggleNode}
        />
      )}

      <foreignObject width={NODE_WIDTH} height={NODE_HEIGHT} x={-100} y={-70}>
        <div
          className={`h-full w-full p-2 rounded-lg shadow border 
            ${nodeDatum.special
              ? "border-yellow-400 bg-yellow-50"
              : "border-gray-300 bg-white"
            }`}
        >
          <p className="text-sm font-semibold text-gray-800 truncate">
            {nodeDatum.name}
          </p>
        </div>
      </foreignObject>
    </g>
  );

  return (
    <div
      ref={treeContainer}
      className="w-[90vw] h-[80vh] bg-gray-50 overflow-auto border border-gray-200 rounded-lg shadow-lg p-4"
    >
      <Tree
        data={data}
        translate={translate}
        pathFunc="diagonal"
        orientation="vertical"
        nodeSize={{ x: NODE_WIDTH - 60, y: NODE_HEIGHT + 200 }}
        renderCustomNodeElement={renderForeignObjectNode}
        separation={{ siblings: 1.8, nonSiblings: 2.5 }}
        zoomable
        initialDepth={5}
      />

    </div>
  );
}
