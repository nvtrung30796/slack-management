import {firestoreAdmin, FirebaseAdmin} from "../../src/config/firebase";
import {DB_NAME} from "../../src/config/firebase.constant";
import {RoleDataModel, RolePayloadModel} from "../../src/models/RolesDTO";
const FieldValue = FirebaseAdmin.firestore.FieldValue

export const firestorePostCreateARole = async (rolePayload: RolePayloadModel) => {
  const customPayload = {
    ...rolePayload,
    created_at: FieldValue.serverTimestamp()
  }

  return firestoreAdmin.collection(DB_NAME.ROLES).add(customPayload);
}

export const firestoreGetListOfRoles = async () => {
  let roles: any[] = [];
  const querySnapshot = await firestoreAdmin.collection(DB_NAME.ROLES).get()
  querySnapshot.forEach((doc: any) => {
    roles.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return roles;
}


export const firestoreUpdateRoleById = async (roleId: string, payload: RoleDataModel) => {
  return firestoreAdmin
    .collection(DB_NAME.ROLES)
    .doc(roleId)
    .update({
      ...payload
    })
}

export const firestoreDeleteRoleById = async (roleDocId: string) => {
  return firestoreAdmin.collection(DB_NAME.ROLES).doc(roleDocId).delete();
}