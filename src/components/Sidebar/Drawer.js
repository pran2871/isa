import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: "190px"
  }
});

const Drawer = props => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Home",
    //   icon: <InboxIcon />,
      onClick: () => history.push("/landing")
    },
    {
      text: "Manage Organisation",
    //   icon: <MailIcon />,
      onClick: () => history.push("/table")
    },
    {
        text: "Manage User",
      //   icon: <MailIcon />,
        onClick: () => history.push("/manageUser")
      },
      {
        text: "Manage Templates",
      //   icon: <MailIcon />,
        onClick: () => history.push("/templates")
      },
      {
        text: "Manage Questions",
      //   icon: <MailIcon />,
        onClick: () => history.push("/about")
      },
      {
        text: "Manage Template",
      //   icon: <MailIcon />,
        onClick: () => history.push("/about")
      },
      {
        text: "Manage Student",
      //   icon: <MailIcon />,
        onClick: () => history.push("/about")
      },
    {
      text: "View Report",
    //   icon: <MailIcon />,
      onClick: () => history.push("/contact")
    }
    ,
    {
      text: "Account",
    //   icon: <MailIcon />,
      onClick: () => history.push("/account")
    }

  ];
  return (
    <MUIDrawer variant="permanent" className={classes.drawer}>
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);
