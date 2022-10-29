export type UserDataModel=  {
    id: string;
    [key: string]: any;
  }
  
  export type UserPayloadModel = {
    [key: string]: any;
  }
  
  export type UserFormBuilderDialogPropType = {
    onRefresh: () => void;
  }