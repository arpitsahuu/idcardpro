"use client"
import { submitOtpStudent } from '@/redux/actions/userAction';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Code() {
    const [inputs, setInputs] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.user);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (user) {
          redirect('/')
        }
    }, [user]);

    const handleKeyDown = (e, index) => {
        if (
            !/^[0-9]{1}$/.test(e.key)
            && e.key !== 'Backspace'
            && e.key !== 'Delete'
            && e.key !== 'Tab'
            && !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (index > 0) {
                const newInputs = [...inputs];
                newInputs[index - 1] = '';
                setInputs(newInputs);
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleInputChange = (e, index) => {
        const newInputs = [...inputs];
        newInputs[index] = e.target.value;
        setInputs(newInputs);

        if (e.target.value && index < inputs.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleFocus = (index) => {
        inputRefs.current[index].select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
            return;
        }
        const digits = text.split('');
        const newInputs = digits.slice(0, inputs.length);
        setInputs(newInputs);
        inputRefs.current[inputs.length - 1].focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = inputs.join('');
        console.log('Verification code:', verificationCode);
        const code = {
            activationCode: verificationCode
        }
        const response = await dispatch(submitOtpStudent(code)) ; 
        if(response == "successfully register" ){
            toast.success(response, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else{
            toast.error(response, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    };

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
                <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your email address.</p>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center gap-3">
                    {inputs.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            value={value}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={() => handleFocus(index)}
                            onPaste={handlePaste}
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                    >
                        Verify Account
                    </button>
                </div>
            </form>
        
        </div>
        </div>
    );
}

export default Code;
