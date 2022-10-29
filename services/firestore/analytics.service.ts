import {firestoreGetListOfUsers} from "./users.service";
import {firestoreGetListOfChannels} from "./channels.service";
import {firestoreGetListOfRoles} from "./roles.service";
import {firestoreAdmin} from "../../src/config/firebase";
import {DB_NAME} from "../../src/config/firebase.constant";

export const firestoreGetDataAnalytics = async () => {
  let users = await firestoreGetListOfUsers();
  let channels = await firestoreGetListOfChannels();
  let roles = await firestoreGetListOfRoles();
  let messageMetric = await firestoreGetMessageMetric(channels);

  let roleGroupBy: any[] = [];

  roles.forEach(r => {
     let listOfUserByRoleId = users.filter(u => u.role.id === r.id);
     roleGroupBy.push({
      name: r.name,
      value: listOfUserByRoleId.length,
      roleData: r,
      users: listOfUserByRoleId
    })


  })


  return {
    users: users.length || 0,
    channels: channels.length || 0,
    roles: roles.length || 0,
    totalMessage: messageMetric.total,
    meta: {
      roleGroupByUser: roleGroupBy,
      messageGroupByChannel: messageMetric.channels

    }
  }

}

const firestoreGetMessageMetric = async (channels: any[]) => {
  let channelUpdate: any[] = channels.map(c => {
    return {
      ...c,
      total_message: 0
    }
  })
  let total = 0;
  for await (let c of channelUpdate) {
    const subMessageCollection = await firestoreAdmin.collection(DB_NAME.CHANNELS)
      .doc(c.id)
      .collection(DB_NAME.MESSAGES)
      .get();

    total = total + subMessageCollection.size;
    c.total_message = subMessageCollection.size;
  }

  return {
    channels: channelUpdate,
    total
  }
  // return total;
}