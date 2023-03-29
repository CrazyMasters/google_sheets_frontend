import React from 'react';
import {Box} from "@mui/material";

const ContainerLayouts = ({
                              children,
                              maxWidth = '1600px',
                              justifyContent = 'flex-start',
                              alignItems = 'flex-start'
                          }) => {
    return (
        <Box display='flex' maxWidth={maxWidth} justifyContent={justifyContent} alignItems={alignItems} m='auto auto'
             height='100vh'>
            {children}
        </Box>
    );
};

export default ContainerLayouts;