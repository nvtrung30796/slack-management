import {NextApiRequest, NextApiResponse} from "next";
import {firestoreGetDataAnalytics} from "../../services/firestore/analytics.service"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {method} = req;

  switch (method) {
    case "GET":
      let dataAnalytics: any = await firestoreGetDataAnalytics();
      return res.status(200).json({
        ...dataAnalytics
      })

    default:
      return res.status(405).end(`Method ${method} Not allowed`)
  }

}