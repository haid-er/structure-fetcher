// TableViewWithActions.jsx
import { useState } from "react";
import TableView from "./TableView";
import Swal from "sweetalert2";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function findNode(root, pathInput) {
    const pathArr = Array.isArray(pathInput)
        ? pathInput.map(p => p.trim().toLowerCase())
        : pathInput.split(">").map(p => p.trim().toLowerCase());

    if (!root || root.name.trim().toLowerCase() !== pathArr[0]) return null;
    let current = root;
    for (let i = 1; i < pathArr.length; i++) {
        if (!current.children) return null;
        const seg = pathArr[i];
        current = current.children.find(c => {
            const name = c.name.trim().toLowerCase();
            return name === seg || name.startsWith(seg);
        });
        if (!current) return null;
    }
    return current;
}

function addNode(tree, targetPath, newNode) {
    const parent = findNode(tree, targetPath);
    if (!parent) {
        Swal.fire({ icon: "error", title: "Error", text: "Parent node not found!" });
        return;
    }
    if (!Array.isArray(parent.children)) parent.children = [];
    parent.children.push(newNode);
}

function updateNode(tree, targetPath, newName) {
    const node = findNode(tree, targetPath);
    if (!node) {
        Swal.fire({ icon: "error", title: "Error", text: "Node to update not found!" });
        return;
    }
    node.name = newName;
}

function deleteNode(tree, targetPath) {
    const pathArr = Array.isArray(targetPath)
        ? targetPath.map(p => p.trim())
        : targetPath.split(">").map(p => p.trim());

    if (pathArr.length === 1 && tree.name.trim() === pathArr[0]) {
        Swal.fire({ icon: "error", title: "Error", text: "Cannot delete the root node!" });
        return;
    }

    const parentPath = pathArr.slice(0, -1);
    const nameToDelete = pathArr[pathArr.length - 1].trim().toLowerCase();
    const parent = findNode(tree, parentPath);
    if (!parent?.children) return;

    parent.children = parent.children.filter(
        child => child.name.trim().toLowerCase() !== nameToDelete
    );
    if (parent.children.length === 0) delete parent.children;
}

const TableViewWithActions = ({ data, setTreeData }) => {
    const [orgChart, setOrgChart] = useState(data);

    const handleAdd = (path) => {
        Swal.fire({
            title: "Add New Entity",
            input: "text",
            inputPlaceholder: "Entity Name",
            showCancelButton: true,
            confirmButtonText: "Add",
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const updated = structuredClone(orgChart);
                addNode(updated, path, { name: result.value, children: [] });
                setOrgChart(updated);
                setTreeData(updated)
            }
        });
    };

    const handleEdit = (path) => {
        Swal.fire({
            title: "Edit Entity Name",
            input: "text",
            inputValue: findNode(orgChart, path)?.name || "",
            inputPlaceholder: "New Name",
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const updated = structuredClone(orgChart);
                updateNode(updated, path, result.value);
                setOrgChart(updated);
                setTreeData(updated);
            }
        });
    };

    const handleDelete = (path) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the node and its children.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                const updated = structuredClone(orgChart);
                deleteNode(updated, path);
                setOrgChart(updated);
                setTreeData(updated);
            }
        });
    };

    const handleSave = async () => {
        const { value: confirm } = await Swal.fire({
            title: "Save Changes?",
            text: "Your edits will be saved to the database.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Save",
        });
        if (!confirm) return;

        try {
            await axios.put(`${BACKEND_URL}/user/save-data`,
                {
                    json: orgChart,
                    imageUrl: "anonymous",
                    imageKey: "anonymous",
                });
            Swal.fire({ icon: "success", title: "Saved!", text: "Changes Saved in DB." });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Save Failed",
                text: err.response?.data?.message || err.message,
            });
        }
    };

    return (
        <>
            <TableView
                data={orgChart}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <div style={{ marginTop: 16, textAlign: "right" }}>
                <button
                    onClick={handleSave}
                    className="border border-teal-800 hover:border-teal-600 rounded py-4 px-8 bg-transparent font-bold text-teal-800 hover:text-teal-600 transition duration-500 hover:cursor-pointer"
                >
                    💾 Save Changes
                </button>
            </div>
        </>
    );
};

export default TableViewWithActions;
