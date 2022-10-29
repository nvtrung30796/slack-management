import { NextApiRequest, NextApiResponse } from "next";
import {firestoreGetListOfChannels, firestorePostCreateAChannel} from "../../../services/firestore/channels.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {method, body} = req;
  
    switch (method) {
      case "GET":
        let channels: any[] = await firestoreGetListOfChannels();
        return res.status(200).json({
          data: channels,
          pagination: {
            page: 1,
            perPage: channels.length,
            total: channels.length
          }
        })
  
      case "POST":
        let postChannelResp = await firestorePostCreateAChannel(body);

        return res.status(200).json({
          data: postChannelResp
        })
  
      default:
        return res.status(405).end(`Method ${method} Not allowed`)
    }
  
}

 

