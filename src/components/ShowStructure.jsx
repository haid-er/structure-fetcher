import { useRef, useState, useEffect } from "react";
import Tree from "react-d3-tree";

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

  // const orgChartData = {
  //   name: "Bluefield Solar Income Fund Ltd (Guernsey)",
  //   children: [
  //     {
  //       name: "Bluefield Renewables 1 Ltd",
  //       children: [
  //         {
  //           name: "New Road Wind Ltd",
  //           children: [
  //             {
  //               name: "New Road Solar Ltd",
  //               children: [
  //                 { name: "Lower Mays Solar Farm Ltd" },
  //                 { name: "Marian Farm Energy Park Ltd" },
  //                 { name: "AJ006 Co Solar Ltd (Grange Energy)" },
  //                 { name: "IFW Solar Farms Ltd" },
  //                 { name: "AJ003 Ink Bott Solar Farm Ltd" },
  //                 { name: "Lightning Energy Park Ltd" },
  //                 { name: "Whitehouse Farms Energy Barns Limited" },
  //                 { name: "Shropshire Lane Energy Barns Limited" },
  //                 { name: "BP040 BHF Solar Ltd (Brick House Farms)" },
  //                 { name: "Psychole Solar Farms Ltd" },
  //                 {
  //                   name: "Clapton Farms Solar Park Ltd",
  //                   children: [
  //                     { name: "Little Bear Solar Ltd" },
  //                     { name: "Old Stone Farm Solar Park Ltd" },
  //                     { name: "Place Barton Farms Solar Park Ltd" },
  //                     { name: "Killigoley Solar Farms" },
  //                     { name: "Holly Farm Solar Park" },
  //                     { name: "East Farm Solar Park" },
  //                     { name: "Gulson Manor Solar Park Ltd" },
  //                   ],
  //                 },
  //                 {
  //                   name: "Longwater Solar Farms Limited",
  //                   children: [
  //                     { name: "New Road 2 Solar Ltd" },
  //                     { name: "Opsumm Solar Farm Ltd" },
  //                     { name: "Barningham Solar Farm Ltd" },
  //                     { name: "Court Farm Solar Park Ltd" },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         // … all the other “person” nodes under Bluefield Renewables 1 Ltd …
  //         {
  //           name: "High Hurst Airfield Solar Ltd",
  //         },
  //         {
  //           name: "WSKE Hartford Wood Limited",
  //         },
  //         {
  //           name: "BP037 BHF Solar Ltd (Burnt House Farm)",
  //         },
  //         {
  //           name: "Blay ZE Solar Ltd (Water Hall Farm)",
  //         },
  //         {
  //           name: "BP038 TPF Solar Ltd (Carr Farm Cottage)",
  //         },
  //         {
  //           name: "BP039 LLP Solar Ltd (Lower Horton)",
  //         },
  //         {
  //           name: "LE09B Energy Park Ltd",
  //         },
  //         {
  //           name: "Sweet Briars Solar Farm Ltd",
  //         },
  //         {
  //           name: "Lemming Solar Farm Ltd",
  //         },
  //         {
  //           name: "Treleham Energy Ltd",
  //         },
  //         {
  //           name: "Wallace Wood Solar Farm Ltd",
  //           children: [
  //             { name: "Blossom 1 Solar Ltd" },
  //             { name: "Blossom 2 Solar Ltd" },
  //           ],
  //         },
  //         {
  //           name: "Lower Team Lees Solar Farm Ltd",
  //         },
  //         {
  //           name: "Killingsley Mt Solar Ltd",
  //         },
  //         {
  //           name: "Willows Farm Solar Ltd",
  //           children: [
  //             { name: "Gretton Solar Farm Ltd" },
  //             { name: "Thornton Lane Solar Farm Ltd" },
  //             { name: "Wormit Solar Farm Ltd" },
  //           ],
  //         },
  //         {
  //           name: "Yelvertoft Solar Farm Ltd",
  //           children: [
  //             {
  //               name: "GPP Big Field LLP",
  //               children: [
  //                 { name: "GPP Black Bush LLP" },
  //                 { name: "GPP Eastcott LLP" },
  //                 { name: "GPP Lamphouse LLP" },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           name: "LIJ DNO Grid Services Ltd",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Bluefield Partners LLP",
  //       // you can style this one specially via a custom flag
  //       // special: true,
  //     },
  //   ],
  // };
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
        data={data.data}
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
