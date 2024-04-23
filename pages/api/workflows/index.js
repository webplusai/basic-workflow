import workflowModel from "@/lib/mongo/models/workflowSchema";
import { findUserByEmail } from "@/lib/mongo/users";
import { DatabaseStub } from "@/server/factory/DatabaseStub";
import { getServerSession } from "next-auth";


const handleCreateWorkflow = async (req, res, session) => {
  try {
    req.body['createdBy'] = session.user.id
    const stub = new DatabaseStub(workflowModel);
    let data = await stub.create(req.body)

    res.status(200).json({ entry: data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const handleUpdateWorkflow = async (req, res, session) => {
  try {
    const stub = new DatabaseStub(workflowModel);
    const data = await stub.read({}, req.body._id)

    if (!data) throw new Error("We were unable to find the workflow")
    if (session.user.id !== data.createdBy?.toString()) throw new Error("You do not have permission to modify this workflow")

    await stub.update(req.body._id, req.body)

    const workflow = await stub.read({}, req.body._id)

    res.status(200).json({ entry: workflow })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default async function handler(req, res) {
  try {
    const { method } = req;
    const session = await getServerSession(req, res);
    if (!session) throw new Error("You are unauthorized to access this resource")

    const { user } = await findUserByEmail(session.user.email)
    session.user['id'] = user._id

    switch (method) {
      case 'POST':
        await handleCreateWorkflow(req, res, session)
        break;

      case 'PATCH':
        await handleUpdateWorkflow(req, res, session)
        break;
      default:
        res.status(500).json({ error: "Unsupported request method" })
        break;
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}