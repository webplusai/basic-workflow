import { Alert, Button, Center, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, Kbd, Text } from "@chakra-ui/react";
import React from 'react';
import { TRIGGER_EVENTS } from "../contexts/WorkflowContext";
import _ from "lodash";
import { useWorkflow } from "../hooks/useWorkflow";
import { IoCopy } from "react-icons/io5";

const TriggerFormComponent = () => {
  const {
    workflow,
    addAction,
  } = useWorkflow();

  return (
    <>
      <Text fontWeight={"bold"} fontSize={"xl"}>Trigger</Text>
      <FormControl>
        <FormLabel>Event</FormLabel>
        <Input value={TRIGGER_EVENTS[workflow.trigger?.eventType]?.LABEL} />
      </FormControl>

      <FormControl mt={3}>
        <FormLabel>Webhook URL</FormLabel>
        <InputGroup>
          <Input value={workflow.trigger?.webhookURL} />
          <InputRightElement>
            <IconButton size="sm" mr={1} px={2} icon={<IoCopy />} />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Alert severity="info" my={3} borderRadius={5} flexDir={"column"} fontSize={"sm"}>
        <strong>How to fire trigger</strong>
        <span>
          Send a <strong>POST</strong> request to the endpoint below <Kbd fontSize={"sm"}>{workflow.trigger?.webhookURL}</Kbd>
          <br />
          The endpoint accepts data in the request body as well as query parameters.
        </span>
      </Alert>

      {_.isEmpty(workflow.actions) && <Center>
        <Button size="md" bgColor={"blue.500"} onClick={addAction}>Add an Action</Button>
      </Center>}
    </>
  )
}

export default TriggerFormComponent;