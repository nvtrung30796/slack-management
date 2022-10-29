export const ROUTE_NAME = {
  DASHBOARD: "/home",
  CHANNELS: "/channels",
  ROLES: "/roles",
  USERS: "/users",
  PROFILE: "/profile"
}

export const MenuOpts = [
  {
    id: 1,
    path: ROUTE_NAME.DASHBOARD,
    title: "Dashboards",
    icon: "dashboard"
  },
  {
    id: 2,
    path: ROUTE_NAME.CHANNELS,
    title: "Channels",
    icon: "channel"
  },
  {
    id: 3,
    path: ROUTE_NAME.ROLES,
    title: "Roles",
    icon: "role"
  },
  {
    id: 4,
    path: ROUTE_NAME.USERS,
    title: "Users",
    icon: "user"
  }
]

export const SubMenuOpts = [
  {
    id: 10001,
    path: ROUTE_NAME.PROFILE,
    title: "Profile Information",
    icon: "profile"
  }
]