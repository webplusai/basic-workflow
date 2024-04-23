import withSession from "@/lib/HOC/withSessionHOC";
import ActionFormComponent from "@/lib/components/ActionFormComponent";
import CardComponent from "@/lib/components/CardComponent";
import TriggerFormComponent from "@/lib/components/TriggerFormComponent";
import { ACTIONS, TRIGGER_EVENTS, WORKFLOW_OPS } from "@/lib/contexts/WorkflowContext";
import { useWorkflow } from "@/lib/hooks/useWorkflow";
import WorkflowModel from "@/lib/mongo/models/workflowSchema";
import ColorsTheme from "@/lib/theme/colors.theme";
import DBConnection from "@/server/factory/DBConnection";
import { Box, Button, Flex, Icon, IconButton, Kbd, Text, Tooltip, VStack } from "@chakra-ui/react";
import _ from "lodash";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaArrowDownLong } from "react-icons/fa6";

const Home = ({ workflow: fetchedWorkflow }) => {
  const {
    workflow,
    selectedOperation,
    setWorkflow,
    addTrigger,
    setOperation,
  } = useWorkflow();

  useEffect(() => {
    if (fetchedWorkflow) {
      setWorkflow(fetchedWorkflow)
      setOperation(WORKFLOW_OPS.ACTION_SELECTED)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedWorkflow])

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button
        onClick={signOut}
        position="fixed"
        size="sm"
        top={{ base: 2, md: 'inherit' }}
        bottom={{ base: 'inherit', md: 2 }}
        left={{ base: 'inherit', md: 2 }}
        right={{ base: 2, md: 'inherit' }}
        bgColor={ColorsTheme.black[500]}
      >
        Sign Out
      </Button>

      <Flex flexDir={{ base: "column", md: "row" }} h="100vh">
        <Box
          flex={3}
          h="100%"
          bg={ColorsTheme.white[200]}
          backgroundImage="radial-gradient(#000 5%, transparent 0)"
          backgroundSize="20px 20px"
          boxShadow={"inset 0px 2px 8px 5px #7575758a"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {!workflow.trigger ? <Tooltip label="Add a Trigger">
            <IconButton onClick={addTrigger} isRound icon={<CiCirclePlus />} fontSize={60} width={20} height={20} />
          </Tooltip>
            :
            <>
              <CardComponent
                type={"Trigger"}
                onClick={() => setOperation(WORKFLOW_OPS.TRIGGER_SELECTED)}
                bodyText={TRIGGER_EVENTS[workflow.trigger?.eventType]?.LABEL}
              />
              <VStack spacing={1}>
                {_.map(workflow.actions, (action, i) => (
                  <>
                    <Icon as={FaArrowDownLong} fontSize={40} mt={1} />
                    <CardComponent
                      type={"Action"}
                      onClick={() => setOperation(WORKFLOW_OPS.ACTION_SELECTED)}
                      bodyText={ACTIONS[action.type]?.LABEL}
                    />
                  </>
                ))}
              </VStack>
            </>
          }
        </Box>
        <Box flex={1.5} h="100%" p={2} maxH={{ base: "inherit", md: "100vh" }} overflowY={"auto"}>
          {
            selectedOperation === WORKFLOW_OPS.TRIGGER_SELECTED ?
              <TriggerFormComponent />
              :
              selectedOperation === WORKFLOW_OPS.ACTION_SELECTED ?
                <ActionFormComponent />
                :
                <Box
                  h="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={"xl"} fontWeight={"bold"} textAlign="center">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</Text>
                  <Text fontSize={"lg"} textAlign="center">Start your integration by clicking the <Kbd fontWeight={"bold"}>+</Kbd> button to create a trigger and then configure your preferred actions</Text>
                </Box>
          }
        </Box>
      </Flex>
    </>
  );
}

const wrappedComponent = withSession(Home)

export default wrappedComponent

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {}
    }
  }
  new DBConnection()
  const workflow = await WorkflowModel.findOne({ createdBy: session.user.id })

  return {
    props: {
      workflow: JSON.parse(JSON.stringify(workflow)) // serialize data
    }
  }
}