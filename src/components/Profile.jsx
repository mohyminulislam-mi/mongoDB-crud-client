import React from "react";
import { useLoaderData } from "react-router";

const Profile = () => {
  const user = useLoaderData();
  console.log(user);

  return (
    <div>
      <h1>Your profiles</h1>
      <h3>Name : {user.name}</h3>
      <span>Email: {user.email}</span>
    </div>
  );
};

export default Profile;
