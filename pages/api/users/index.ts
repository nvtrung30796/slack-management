import {NextApiRequest, NextApiResponse} from "next";
import {firestoreGetListOfUsers, firestorePostCreateAUser} from "../../../services/firestore/users.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {method, body} = req;
  
    switch (method) {
      case "GET":
        let users: any[] = await firestoreGetListOfUsers();
        return res.status(200).json({
          data: users,
          pagination: {
            page: 1,
            perPage: users.length,
            total: users.length
          }
        })
  
      case "POST":
        let postUser = await firestorePostCreateAUser(body);
  
        return res.status(200).json({
          data: postUser
        })
  
      default:
        return res.status(405).end(`Method ${method} Not allowed`)
    }
  
  }