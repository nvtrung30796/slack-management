export type ChannelDataModel=  {
    id: string;
    [key: string]: any;
   
  }

export type ChannelPayloadModel = {
  name: string;

}

export type ChannelFormBuilderDialogPropType = {
  onRefresh: () => void;
}