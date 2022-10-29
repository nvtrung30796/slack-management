import {firestoreAdmin, FirebaseAdmin} from "../../src/config/firebase";
import {DB_NAME} from "../../src/config/firebase.constant";
import {ChannelDataModel, ChannelPayloadModel} from "../../src/models/ChannelsDTO";
const FieldValue = FirebaseAdmin.firestore.FieldValue

export const firestorePostCreateAChannel = async (channelPayload: ChannelPayloadModel) => {
  const customPayload = {
    ...channelPayload,
    created_at: FieldValue.serverTimestamp(),
    description: channelPayload.name
  }
  return firestoreAdmin.collection(DB_NAME.CHANNELS).add(customPayload);
}

export const firestoreGetListOfChannels = async () => {
  let channels: any[] = [];
  const querySnapshot = await firestoreAdmin.collection(DB_NAME.CHANNELS).get()
  querySnapshot.forEach((doc: any) => {
    channels.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return channels;
}


export const firestoreUpdateChannelById = async (channelId: string, payload: ChannelDataModel) => {
  return firestoreAdmin
    .collection(DB_NAME.CHANNELS)
    .doc(channelId)
    .update({
      ...payload
    })
}

export const firestoreDeleteChannelById = async (channelDocId: string) => {
  return firestoreAdmin.collection(DB_NAME.CHANNELS).doc(channelDocId).delete();
}