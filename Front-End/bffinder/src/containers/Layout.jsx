import React from 'react';

const Layout = ({areClass, css, children}) => {
    return (
        <div className={areClass} style={css}>
            {children}
        </div>
    );
};

export default Layout;