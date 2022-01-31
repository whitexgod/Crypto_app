import React from "react";
import close_img from "../assets/close.png";
import "./wishList.css";
import { auth } from "../firebase";
import { Coin } from "./Coin";

export const WishList = (props) => {

  function handleCloseWishList() {
    props.closeWishList(false);
  }
  const {photoURL, email } = auth.currentUser;
  return (
    <div className="popup">
      <button className="close-btn" onClick={handleCloseWishList}>
        <img src={close_img} alt="close" />
      </button>
      <div className="user-details-box">
            <img src={photoURL} alt="userphoto" />
            <h4>Email : {email}</h4>
            <hr/>
            
      </div>
    </div>
  );
};
