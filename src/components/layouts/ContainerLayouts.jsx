import React from 'react';
import {Box} from "@mui/material";

const ContainerLayouts = ({
                              children,
                              maxWidth = '1600px',
                              justifyContent = 'flex-start',
                              alignItems = 'flex-start'
                          }) => {
    return (
        <Box display='flex' p='0 20px' maxWidth={maxWidth} justifyContent={justifyContent} alignItems={alignItems}
             m='auto auto'
             height='100vh'>
            {children}
        </Box>
    );
};

export default ContainerLayouts;