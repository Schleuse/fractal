import React from 'react';

// TODO: it should be possible to import components by handles
import IncludeChild from '../include-child/include-child.jsx';

const IncludeParent = () => {
    return (
        <>
            include parent
            <IncludeChild />
        </>
    );
};

export default IncludeParent;
