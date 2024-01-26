/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";

const UserAvatar = ({ user }) => {
  const iniciales =
    user.name.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase();

  return <Avatar>{iniciales}</Avatar>;
};

export default UserAvatar;
