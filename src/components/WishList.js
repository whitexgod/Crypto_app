import React,{useEffect, useState} from "react";
import close_img from "../assets/close.png";
import "./wishList.css";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const WishList = (props) => {
  const [wishListItems, setWishListItems] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, "wishlist"),
      where("Email", "==", auth.currentUser.email) 
    );
    // const list=[]
    const useME = onSnapshot(q, (snapshot) => {
      setWishListItems(snapshot.docs.map((doc) => doc.data()));
      // list.push(snapshot.docs.map((doc) => doc.data().Coin_id))
      // console.log(list)
      // console.log(list.includes('bitcoin'))
      //  console.log(snapshot.docs.map((doc) => doc.data()));
      //  console.log(snapshot.docs.map((doc) => doc.data().Coin_id));
    });
    return useME;
  }, []);

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
            {wishListItems.map(({Coin_id, uid})=>(
              <p key={`${uid}+${Math.floor(Math.random() * 101)}`}>{Coin_id}</p>
            ))}
      </div>
    </div>
  );
};
