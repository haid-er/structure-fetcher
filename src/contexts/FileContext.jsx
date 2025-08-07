import { createContext, useContext, useState, useCallback } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const initialTreeData = null;
    const [treeData, setTreeData] = useState(initialTreeData);

    // const updateEmail = useCallback((newEmail) => {
    //     setUser(prev => ({ ...prev, email: newEmail }));
    // }, []);

    return (
        <FileContext.Provider value={{ treeData, setTreeData }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => {
    const context = useContext(FileContext);
    if (!context) throw new Error("useFileContext must be used within a FileProvider");
    return context;
};
