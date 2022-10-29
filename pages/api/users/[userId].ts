import {NextApiRequest, NextApiResponse} from "next";
import {firestoreDeleteUserById, firestoreUpdateUserById} from "../../../services/firestore/users.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method, body: payload} = req;
  switch (method) {
    case "PUT":
      const {userId} = req.query

      let updateResp = await firestoreUpdateUserById(`${userId}`, payload);
      return res.status(200).json({
        data: updateResp,
        error: []
      })

    case "DELETE":
      const docId = req.query.roleId
      let deleteResp = await firestoreDeleteUserById(`${docId}`);
      return res.status(200).json({
        data: deleteResp,
        error: []
      })


    default:
      return res.status(405).end(`Method ${method} Not allowed`)
  }

}