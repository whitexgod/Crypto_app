import React from 'react';
import "./wishList.css"

export const WishList = (props) => {
  return <div className='wishList'>
        <img src={props.userPhoto} alt=""/>
        <h5>{props.userEmail}</h5>
  </div>;
};
