import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useDrawer } from "../hooks/useDrawer";
import { BugReport, Code, Favorite, OpenInNew } from "@mui/icons-material";

export const Sidebar = () => {
  const { drawerOpened, closeDrawer } = useDrawer();
  return (
    <Drawer open={drawerOpened} onClose={closeDrawer} slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)" } } }}>
      <Toolbar>
        <Typography align="center" variant="h6" flex="1">Hello</Typography>
      </Toolbar>
      <List sx={{ width: "300px" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => window.open("https://github.com/aminnairi/hello/stargazers")}>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="aminnairi/hello" secondary="Give a star" />
            <ListItemIcon>
              <OpenInNew />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => window.open("https://github.com/aminnairi/hello")}>
            <ListItemIcon>
              <Code />
            </ListItemIcon>
            <ListItemText primary="aminnairi/hello" secondary="Source Code" />
            <ListItemIcon>
              <OpenInNew />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => window.open("https://github.com/aminnairi/hello/issues")}>
            <ListItemIcon>
              <BugReport />
            </ListItemIcon>
            <ListItemText primary="aminnairi/hello" secondary="Fill a bug report" />
            <ListItemIcon>
              <OpenInNew />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
