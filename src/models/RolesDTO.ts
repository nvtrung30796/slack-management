export type RoleDataModel=  {
    id: string;
    [key: string]: any;
  }
  
  export type RolePayloadModel = {
    name: string; // Admin, admin, administrator, management
    description: string;
    value: string; // ADMIN, MANAGER
  }
  
  export type RoleFormBuilderDialogPropType = {
    onRefresh: () => void;
  }
  
  export const ROLE_ENUM = {
    ADMIN: "ADMIN",
    MANAGER: "MANAGER",
    MEMBER: "MEMBER"
  }