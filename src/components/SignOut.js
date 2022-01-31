import React from 'react';
import { auth } from '../firebase';

export const SignOut = () => {
  return (<button className='btn_glob' onClick={() => { auth.signOut() }}>Sign Out</button>);
};