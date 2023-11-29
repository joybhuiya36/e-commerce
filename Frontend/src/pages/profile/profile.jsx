import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosIntance from "../../utils/axiosInstance";
import "./profile.style.scss";
import picture from "../../assets/profilepic.png";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const userData = useSelector((state) => state.user);
  const [balance, setBalance] = useState();
  const [balanceField, setBalanceField] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [amount, setAmount] = useState(0);
  const [pic, setPic] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axiosIntance
      .get(`/file/get/${userData.id}.jpg`)
      .then((res) => setPic(`/file/get/${userData.id}.jpg`))
      .catch((err) => setPic(picture));

    setTimeout(() => {
      axiosIntance.get("/wallet/balance").then((res) => {
        setBalance(res.data.data.balance);
      });
    }, 500);
  }, [trigger, pic]);
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleWallet = (tk) => {
    axiosIntance
      .post("/wallet/add-balance", { amount: parseInt(tk) })
      .then(() => {
        setTrigger(!trigger);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_to_upload", file[0]);
    axiosIntance
      .post(`/file/upload-file/${userData.id}`, formData)
      .then((res) => {
        // console.log(res.data.data.path);
        // const str = res.data.data.path.split("\\")[1];
        // // console.log(str);
        // setPic(`/file/get/${str}`);
        setPic(null);
      })
      .catch((err) => toast("Invalid File Format"));
  };
  return (
    <div className="profile">
      <h1>
        {userData.role == 1 ? <span>Admin</span> : <span>User</span>} Profile
      </h1>
      <hr />
      <div className="totalDiv">
        <div className="left">
          <img src={pic} style={{ borderRadius: "50%" }} /> <br />
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            Upload
          </button>
        </div>
        <div className="right">
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Address: {userData.address}</p>
          <p>Phone: {userData.phone}</p>
          {userData.role == 2 && (
            <div className="balanceDiv">
              <p>Balance: {balance?.toFixed(2)}</p>
              <span onClick={(e) => setBalanceField(!balanceField)}>
                Add Balance
              </span>
              {balanceField && (
                <div>
                  <input
                    placeholder="Amount"
                    onChange={handleAmount}
                    value={amount}
                  />
                  <button
                    onClick={() => {
                      handleWallet(amount);
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
