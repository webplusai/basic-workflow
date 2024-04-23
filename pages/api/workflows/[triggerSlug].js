import workflowModel from "@/lib/mongo/models/workflowSchema";
import axios from "axios";
import _ from "lodash";

const convertQueryParamsToString = (queryParams) => {
  if (!queryParams) {
    return '';
  }

  const params = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return params ? `?${params}` : '';
}

const handleWorkflowExecution = async (req, res) => {
  try {
    const { query: { triggerSlug, ...queryParams }, body } = req;
    const mergedParams = Object.assign(body, queryParams)
    const workflow = await workflowModel.findOne({ 'trigger.triggerSlug': triggerSlug })
    if (!workflow) throw new Error("Workflow doesn't exist")
    const { actions } = workflow;
    if (_.isEmpty(actions)) throw new Error("Workflow does not have executable actions");
    const [action] = actions;
    const { url, params } = action;

    params.forEach(item => {
      mergedParams[item.key] = item.value;
  });

  const endpoint = `${url}${convertQueryParamsToString(mergedParams)}`
  const {data} = await axios.get(endpoint);

    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default async function handler(req, res) {
  try {
    const { method } = req;

    switch (method) {
      case 'POST':
        await handleWorkflowExecution(req, res)
        break;

      default:
        res.status(500).json({ error: "Unsupported request method" })
        break;
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}