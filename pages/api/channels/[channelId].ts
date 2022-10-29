import { NextApiRequest, NextApiResponse } from "next";
import { firestoreDeleteChannelById, firestoreUpdateChannelById } from "../../../services/firestore/channels.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body: payload } = req;

  switch (method) {
    case "PUT":
      const { channelId } = req.query;

      let channelUpdate = await firestoreUpdateChannelById(
        `${channelId}`,
        payload
      );
      return res.status(200).json({
        data: channelUpdate,
        error: [],
      });
      case "DELETE":
        const channelDocId = req.query.channelId
        let channelDelete = await firestoreDeleteChannelById(`${channelDocId}`);
        return res.status(200).json({
          data: channelDelete,
          error: []
        })

    default:
      return res.status(405).end(`Method ${method} Not allowed`);
  }
}
