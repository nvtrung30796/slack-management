import React from "react";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import InsightsIcon from '@mui/icons-material/Insights';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';

//refs: https://mui.com/material-ui/material-icons/
export const getIconByName = (iconName: string) => {
  switch (iconName) {
    case "channel":
      return <MarkUnreadChatAltIcon/>

    case "role":
      return <AdminPanelSettingsIcon/>

    case "user":
      return <PeopleIcon/>

    case "dashboard":
      return <InsightsIcon/>

    case "profile":
      return <FolderSharedIcon/>

    default:
     return  <React.Fragment/>
  }
}