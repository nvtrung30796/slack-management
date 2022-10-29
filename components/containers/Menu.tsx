import React from 'react';
import {drawerWidth} from "../../src/config/app.constant";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from '@mui/material/Drawer';
import {styled, useTheme, Theme, CSSObject} from "@mui/material/styles";
import {MenuOpts, SubMenuOpts} from "../../src/route-options";
import Link from "next/link";
import {getIconByName} from "../elements/AppIcon";

type MenuPropType = {
  open: boolean;
  handleDrawerClose: () => void
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Menu = (props: MenuPropType) => {
  const theme = useTheme();
  const {open, handleDrawerClose} = props;
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
        </IconButton>
      </DrawerHeader>
      <Divider/>
      <List>
        {MenuOpts.map((menuItem) => (
          <ListItem key={menuItem.id} disablePadding sx={{display: 'block'}}>
            <Link href={menuItem.path}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {getIconByName(menuItem.icon)}
                </ListItemIcon>
                <ListItemText primary={menuItem.title} sx={{opacity: open ? 1 : 0}}/>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {SubMenuOpts.map((menuItem) => (
          <ListItem key={menuItem.id} disablePadding sx={{display: 'block'}}>
            <Link href={menuItem.path}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {getIconByName(menuItem.icon)}
                </ListItemIcon>
                <ListItemText primary={menuItem.title} sx={{opacity: open ? 1 : 0}}/>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default Menu;

export const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));