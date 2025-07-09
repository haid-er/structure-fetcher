// TableViewWithActions.jsx
import { useState } from "react";
import TableView from "./TableView";
import Swal from "sweetalert2";
function addChild(tree, targetPath, newNode) {
    if (!tree) return;

    if (targetPath.length === 1 && tree.name === targetPath[0]) {
        if (!tree.children) tree.children = [];
        tree.children.push(newNode);
        return;
    }

    if (tree.children) {
        for (let child of tree.children) {
            if (targetPath[1] === child.name) {
                addChild(child, targetPath.slice(1), newNode);
            }
        }
    }
}

function updateNode(tree, targetPath, newName) {
    if (!tree) return;

    if (targetPath.length === 1 && tree.name === targetPath[0]) {
        tree.name = newName;
        return;
    }

    if (tree.children) {
        for (let child of tree.children) {
            if (targetPath[1] === child.name) {
                updateNode(child, targetPath.slice(1), newName);
            }
        }
    }
}

function deleteNode(tree, targetPath) {
    if (!tree?.children) return;

    const nameToDelete = targetPath[targetPath.length - 1];
    const parentPath = targetPath.slice(0, -1);

    const findParent = (node, path) => {
        if (path.length === 0) return node;
        const next = node.children?.find(c => c.name === path[0]);
        return next ? findParent(next, path.slice(1)) : null;
    };

    const parent = findParent(tree, parentPath);
    if (parent?.children) {
        parent.children = parent.children.filter(c => c.name !== nameToDelete);
    }
}


const TableViewWithActions = ({ initialData }) => {
    const [orgChart, setOrgChart] = useState(initialData);

    const handleAdd = (path) => {
        // Swal.fire({
        //     title: 'Add New Entity',
        //     text: 'Enter the name of the new entity:',
        //     input: 'text',
        //     inputPlaceholder: 'New Entity Name',
        //     showCancelButton: true,
        //     confirmButtonText: 'Add',
        //     cancelButtonText: 'Cancel',
        // }).then((result) => {
        //     if (result.isConfirmed && result.value) {
        //         const newNode = { name: result.value, children: [] };
        //         const updated = structuredClone(orgChart); // OR deep copy using lodash
        //         addChild(updated, path, newNode);
        //         setOrgChart(updated);
        //     }
        // });
        console.log(path)
        const newNode = { name: "New Entity" };
        const updated = structuredClone(orgChart); // OR deep copy using lodash
        addNode(updated, path, newNode);
        setOrgChart(updated);
    };

    const handleEdit = (path) => {
        const newName = prompt("Enter new name:");
        if (!newName) return;
        const updated = structuredClone(orgChart);
        updateNode(updated, path, newName);
        setOrgChart(updated);
    };

    const handleDelete = (path) => {
        const confirmDelete = window.confirm("Delete this node?");
        if (!confirmDelete) return;
        const updated = structuredClone(orgChart);
        deleteNode(updated, path);
        setOrgChart(updated);
    };

    return (
        <>
            <h2>Org Chart Table View</h2>
            <TableView data={orgChart} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
};

export default TableViewWithActions;
