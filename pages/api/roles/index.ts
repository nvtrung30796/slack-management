import {NextApiRequest, NextApiResponse} from "next";
import {firestoreGetListOfRoles, firestorePostCreateARole} from "../../../services/firestore/roles.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method, body} = req;

  switch (method) {
    case "GET":
      let roles: any[] = await firestoreGetListOfRoles();
      return res.status(200).json({
        data: roles,
        pagination: {
          page: 1,
          perPage: roles.length,
          total: roles.length
        }
      })

    case "POST":
      let postRole = await firestorePostCreateARole(body);

      return res.status(200).json({
        data: postRole
      })

    default:
      return res.status(405).end(`Method ${method} Not allowed`)
  }

}