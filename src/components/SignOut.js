import React from 'react';
import { auth } from '../firebase';

export const SignOut = () => {
  return <div>
      <button onClick={()=>{auth.signOut()}}>Sign Out</button>
  </div>;
};