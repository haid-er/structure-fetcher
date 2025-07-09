function flattenOrgChart(node, level = 0, parent = null, path = []) {
    const currentPath = [...path, node.name];
    const flat = [{
        name: node.name,
        level,
        parent: parent || null,
        path: currentPath.join(" > ")
    }];

    if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
            flat.push(...flattenOrgChart(child, level + 1, node.name, currentPath));
        }
    }

    return flat;
}

export default flattenOrgChart;