import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="app-layout">
            <main>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;