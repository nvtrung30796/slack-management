import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Menu, {DrawerHeader} from "./Menu";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {drawerWidth} from "../../src/config/app.constant";

type AppLayoutPropType = {
  children: React.ReactNode
}

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean;
}>(({theme, open}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppLayout = (props: AppLayoutPropType) => {
  const {children} = props;
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>

      <Header open={open} handleDrawerOpen={handleDrawerOpen}/>

      <Menu open={open} handleDrawerClose={handleDrawerClose}/>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader/>
        {children}
      </Box>
    </Box>
  );
};

AppLayout.propTypes = {};

export default AppLayout;