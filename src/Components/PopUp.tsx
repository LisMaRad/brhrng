import React from 'react';

type PopUpProps = {
    children: React.ReactNode,
};
const PopUp = ({ children } : PopUpProps) => {
    return (
        <div className="popup">
            {children}
        </div>
    );
};

export default PopUp;
