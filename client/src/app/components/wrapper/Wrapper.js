"use client"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from "../../../redux/store"
import { Provider } from 'react-redux';

const Wrapper = ({children}) => {
  return (
    <>
        <Provider store={Store} > 
        {children}
        <ToastContainer />
        </Provider>
    </>
  )
}

export default Wrapper