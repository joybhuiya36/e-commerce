import React, { useEffect, useState } from "react";
import axiosIntance from "../../utils/axiosInstance";
import "./allUsers.style.scss";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    axiosIntance.get("/user/all").then((res) => {
      setUsers(res.data.data);
    });
  }, [trigger]);

  const handleEdit = (id, editedValues) => {
    axiosIntance.patch("/user/edit", { id: id, ...editedValues });
    setEditUserId(null);
    setEditedValues({});
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditedValues({});
  };

  const handleSaveEdit = async (id) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user._id === id ? { ...user, ...editedValues } : user
      );
    });

    handleEdit(id, editedValues);
  };

  const handleDelete = (id) => {
    axiosIntance.delete(`/user/delete/${id}`);
    setTrigger(!trigger);
  };

  const handleInputChange = (field, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <div className="all-users-container">
      <h2>All Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editUserId === user._id ? (
                  <input
                    className="edit-input"
                    defaultValue={user.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    className="edit-input"
                    defaultValue={user.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    className="edit-input"
                    defaultValue={user.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                ) : (
                  user.address
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    className="edit-input"
                    defaultValue={user.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <>
                    <button
                      className="save-button"
                      onClick={() => handleSaveEdit(user._id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="edit-button"
                    onClick={() => setEditUserId(user._id)}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
