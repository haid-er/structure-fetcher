import Swal from "sweetalert2";

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

export { addNode, deleteNode, updateNode, findNode }