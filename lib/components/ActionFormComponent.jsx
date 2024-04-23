import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Select, Text } from "@chakra-ui/react";
import React from 'react';
import { ACTIONS } from "../contexts/WorkflowContext";
import _ from "lodash";
import { useWorkflow } from "../hooks/useWorkflow";

const ActionFormComponent = () => {
  const {
    workflow,
    isSubmitting,
    addActionQueryParam,
    handleActionUrlChange,
    handleQueryParamChange,
    saveWorkflow
  } = useWorkflow();

  return (
    <Box h={"100%"} display={"flex"} flexDir={"column"}>
      <Box flex={1}>
        <Text fontWeight={"bold"} fontSize={"xl"}>Action</Text>
        <FormControl>
          <FormLabel>Select an Action</FormLabel>
          <Select>
            {Object.values(ACTIONS).map((option, i) => <option key={i} value={option.KEY}>{option.LABEL}</option>)}
          </Select>
        </FormControl>

        <FormControl mt={3}>
          <FormLabel>URL</FormLabel>
          <Input value={workflow.actions[0].url} onChange={handleActionUrlChange} />
          <FormHelperText>Provide an endpoint URL to which the request will be sent</FormHelperText>
        </FormControl>

        <FormControl mt={3}>
          {!_.isEmpty(workflow.actions[0].params) && <FormLabel>Query Parameters</FormLabel>}
          {
            _.map(workflow.actions[0].params, (param, i) => (
              <Flex gap={2} mt={2} key={i}>
                <FormControl>
                  <Input placeholder="Key" name={`key_${i}`} value={param.key} onChange={handleQueryParamChange} />
                </FormControl>
                <FormControl>
                  <Input placeholder="Value" name={`value_${i}`} value={param.value} onChange={handleQueryParamChange} />
                </FormControl>
              </Flex>
            ))
          }
        </FormControl>
        <Flex flexDir={"row-reverse"} mt={3}>
          <Button size="sm" bgColor={"blue.500"} onClick={addActionQueryParam}>Add Query Parameter</Button>
        </Flex>
      </Box>
      <Button isLoading={isSubmitting} minH={"50px"} my={3} onClick={saveWorkflow}>{`${!!workflow?._id ? 'Update' : 'Save'} Workflow`}</Button>
    </Box>
  )
}

export default ActionFormComponent;
