import React from 'react';
import { Box, CircularProgress } from '@chakra-ui/react'
import { useSession } from "next-auth/react";

const withSession = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { data, status } = useSession({ required: true });

    return (
      status === 'loading' ?
        <Box sx={{
          w: '100vw',
          h: '100vh',
          display: 'flex',
          flexDir: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CircularProgress isIndeterminate color='green.500' />
        </Box>
        :
        <WrappedComponent sessionUser={data.user} {...props} />
    );
  };

  return Wrapper;
};

export default withSession;
