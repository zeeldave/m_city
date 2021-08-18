import React from "react";
import { Link, withRouter } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { logoutHandler } from "../../Utils/tools";

const AdminNav = (props) => {

  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches",
    },
    {
      title: "Players",
      linkTo: "/admin_players",
    },
  ]

  const renderItem = () =>
   (
       links.map(link=>(
           <Link to={link.linkTo} key={link.title}>
               <ListItem button className="admin_nav_link">
                   {link.title}
               </ListItem>
           </Link>
       ))
   )
    

  return( <div>{renderItem()}
  
  <ListItem button className="admin_nav_link"
  onClick={()=>logoutHandler()}
  >
                   Log out
               </ListItem>
  
  </div>);
};

export default withRouter(AdminNav);
