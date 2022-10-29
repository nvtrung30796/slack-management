import {NextApiRequest, NextApiResponse} from "next";
import {firestoreDeleteRoleById, firestoreUpdateRoleById} from "../../../services/firestore/roles.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method, body: payload} = req;
  switch (method) {
    case "PUT":
      const {roleId} = req.query

      let roleUpdate = await firestoreUpdateRoleById(`${roleId}`, payload);
      return res.status(200).json({
        data: roleUpdate,
        error: []
      })

    case "DELETE":
      const roleDocId = req.query.roleId
      let roleDelete = await firestoreDeleteRoleById(`${roleDocId}`);
      return res.status(200).json({
        data: roleDelete,
        error: []
      })


    default:
      return res.status(405).end(`Method ${method} Not allowed`)
  }

}