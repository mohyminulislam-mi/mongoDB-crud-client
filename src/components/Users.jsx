import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ userPromiss }) => {
  const initUsers = use(userPromiss);
  const [users, setUsers] = useState(initUsers);

  const handleDeleteUser = (id) => {
    console.log("delete user", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after delete", data);
        if (data.deletedCount) {
          alert("Delete successful");
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        }
      });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };
    console.log(newUser);

    //save data into server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after saving user", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("users added successfully");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      <h1>{users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" /> <br />
        <input type="email" name="email" /> <br /> <br />
        <button>Add User</button>
      </form>
      <p>------------------------</p>
      {users.map((user) => (
        <p key={user._id}>
          {user.name} : {user.email} {""}
          <Link to={`/users/${user._id}`}>Details</Link> {""}
          <Link to={`/update/${user._id}`}>Edit</Link> {""}
          <button onClick={() => handleDeleteUser(user._id)}>X</button>
        </p>
      ))}
    </div>
  );
};

export default Users;
