import {firestoreAdmin, FirebaseAdmin} from "../../src/config/firebase";
import {DB_NAME} from "../../src/config/firebase.constant";
import {UserDataModel, UserPayloadModel} from "../../src/models/UsersDTO";
const FieldValue = FirebaseAdmin.firestore.FieldValue

export const firestorePostCreateAUser = async (payload: UserPayloadModel) => {
  const customPayload = {
    ...payload,
    created_at: FieldValue.serverTimestamp(),
  }

  return firestoreAdmin.collection(DB_NAME.USERS).add(customPayload);
}

export const firestoreGetListOfUsers = async () => {
  let users: any[] = [];
  // refs: https://firebase.google.com/docs/firestore/query-data/get-data
  const querySnapshot = await firestoreAdmin.collection(DB_NAME.USERS).get()
  querySnapshot.forEach((doc: any) => {
    users.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return users;
}


export const firestoreUpdateUserById = async (id: string, payload: UserDataModel) => {
  return firestoreAdmin
    .collection(DB_NAME.USERS)
    .doc(id)
    .update({
      ...payload
    })
}

export const firestoreDeleteUserById = async (docId: string) => {
  return firestoreAdmin.collection(DB_NAME.USERS).doc(docId).delete();
}