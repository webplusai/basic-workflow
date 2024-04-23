import { createContext, useCallback, useState } from 'react';
import { useAlert } from "../hooks/useAlert";
import _ from "lodash";
import axios from "axios";

const defaultContextValue = {
  workflow: {},
  selectedOperation: null,
  isSubmitting: false,
  setWorkflow: () => { },
  addTrigger: () => { },
  addAction: () => { },
  setOperation: () => { },
  addActionQueryParam: () => { },
  handleActionUrlChange: () => { },
  handleQueryParamChange: () => { },
  saveWorkflow: () => { },
};

export const TRIGGER_EVENTS = {
  INCOMING_API_CALL: {
    KEY: 'INCOMING_API_CALL',
    LABEL: 'Incoming API Call'
  }
}

export const WORKFLOW_OPS = {
  TRIGGER_SELECTED: 'TRIGGER_SELECTED',
  ACTION_SELECTED: 'ACTION_SELECTED',
}

export const ACTIONS = {
  EXTERNAL_GET_API_CALL: {
    KEY: 'EXTERNAL_GET_API_CALL',
    LABEL: 'Outgoing API Call - GET'
  }
}

export const WorkflowContext = createContext(defaultContextValue);

export const WorkflowProvider = ({ children }) => {
  const [workflow, setWorkflow] = useState({})
  const [selectedOperation, setSelectedOperation] = useState()
  const { showAlert } = useAlert();
  const [isSubmitting, setSubmitting] = useState(false)

  const genSlug = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const addTrigger = useCallback(() => {
    if (workflow?.trigger) return;
    const triggerSlug = `${genSlug(3)}_${genSlug(6)}`
    setWorkflow((prev) => ({
      ...prev,
      trigger: {
        eventType: TRIGGER_EVENTS.INCOMING_API_CALL.KEY,
        triggerSlug,
        webhookURL: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/workflows/${triggerSlug}`
      },
      actions: []
    }))
    setSelectedOperation(WORKFLOW_OPS.TRIGGER_SELECTED)
  }, [workflow])

  const addAction = () => {
    setWorkflow((prev) => ({
      ...prev,
      actions: [
        {
          type: ACTIONS.EXTERNAL_GET_API_CALL.KEY,
          url: '',
          params: []
        }
      ]
    }))
    setSelectedOperation(WORKFLOW_OPS.ACTION_SELECTED)
  }

  const setOperation = (op) => {
    setSelectedOperation(op)
  }

  const addActionQueryParam = () => {
    setWorkflow((prev) => {
      const actions = prev.actions.map((action) => ({
        ...action,
        params: [...action.params],
      }));

      actions[0].params.push({ key: "", value: "" });

      return {
        ...prev,
        actions,
      };
    });
  };

  const handleActionUrlChange = (e) => {
    setWorkflow((prev) => {
      const actions = [...prev.actions]
      actions[0].url = e.target.value
      return ({
        ...prev,
        actions
      })
    })
  }

  const handleQueryParamChange = (e) => {
    const { target: { name, value } } = e;
    const [property, index] = _.split(name, "_");

    setWorkflow((prev) => {
      const actions = prev.actions.map((action) => {
        const params = [...action.params];
        params[parseInt(index)][property] = value

        return ({
          ...action,
          params
        })
      });

      return {
        ...prev,
        actions,
      };
    });
  }

  const dataCleaner = (data) => {
    const temp = {...data};

    const actions = temp.actions.map((action) => {
      const params = [...action.params];
      const filteredParams = _.filter(params, (param) => {
        return _.every(Object.keys(param), (key) => param[key?.trim()])
      })

      return {
        ...action,
        params: filteredParams
      }
    })

    return {
      ...temp,
      actions
    }
  }

  const saveWorkflow = useCallback(async () => {
    try {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      const actionsAreValid = _.every(workflow.actions, (action) => action.type?.trim() && urlPattern.test(action.url?.trim()))
      if (!workflow.trigger) throw new Error("Workflow must have a trigger")
      if (!actionsAreValid) throw new Error("One or more actions have some incomplete / invalid required fields")
      const workflowExists = !!workflow._id;

      const payload = dataCleaner(workflow)

      setSubmitting(true)
      
      const {data: { entry }} = await axios[workflowExists ? 'patch' : 'post']('/api/workflows', payload)

      setWorkflow(entry)
      setSubmitting(false)

      showAlert({
        status: 'success',
        title: `Workflow ${workflowExists ? 'Updated' : 'Created'}`,
        description: `Your workflow has been ${workflowExists ? 'updated' : 'created'} successfully`
      })
    } catch (error) {
      setSubmitting(false)
      showAlert({
        status: 'error',
        title: 'Error',
        description: error.message
      })
    }
  }, [workflow, showAlert])

  return (
    <WorkflowContext.Provider value={{
      workflow,
      selectedOperation,
      isSubmitting,
      setWorkflow,
      addTrigger,
      addAction,
      setOperation,
      addActionQueryParam,
      handleActionUrlChange,
      handleQueryParamChange,
      saveWorkflow
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};
