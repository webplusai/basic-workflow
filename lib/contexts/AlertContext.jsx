import { Box, Text, useToast } from '@chakra-ui/react';
import React, { createContext } from 'react';
import _ from 'lodash';

const defaultContextValue = {
  showAlert: () => { },
};

export const AlertContext = createContext(defaultContextValue);

export const AlertProvider = ({ children }) => {
  const toast = useToast()

  const showAlert = (alert) => {
    const message = _.isArray(alert.description) ?
      (alert.description).join('\n')
      : alert.description
    toast({
      ...alert,
      description: message,
      position: alert.position ?? 'bottom-left',
      render: () => (
        <Box color='white' p={3} bg={
          alert.status === "error" ? "red.500" :
          alert.status === "info" ? "blue.500" :
          alert.status === "success" ? "green.500" :
          alert.status === "warning" ? "yellow.500" :
          'blue.500'
        }>
          {alert.title && <Text>{alert.title}</Text>}
          {message && <Text variant="paragraph" noOfLines={3}>{message}</Text>}
        </Box>
      ),
    })
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
