import React from "react";
import { useNavigate } from "react-router-dom";

const Select = () => {
    const navigate = useNavigate();
   const handleclientbtn = () => {
    navigate('/clientsignup');
   }
   const handlevendorbtn = () => {
    navigate('/vendorsignup');
   }


  return (
    <div>
      {/* <div>
        <img src="public/Selectionscreen/Logo.svg" alt="" />
      </div> */}

    <div className="grid justify-center align-middle mt-28 bg-white">
      <div>
        <img className="ml-40" src="public/Selectionscreen/Group.svg" alt="" />
      </div>
      
      <div className="border rounded-2xl shadow-lg  flex flex-col w-[600px] h-96 justify-center align-middle">
        <img className="w-56 h-28 ml-44" src="public/Selectionscreen/Logo.svg"  />
        <p className="text-sm pl-8">
          We need you to help us with some basic information for your account
          creation. Here are our <span className="text-button">terms and conditions</span>. Please read
          them carefully.
        </p>

        <div className="flex flex-col ml-44">
          <button className="bg-button w-64 h-10 text-white rounded-xl mb-5 mt-8 hover:bg-white border-[1px] border-button hover:text-button" onClick={handleclientbtn}>Client</button>
          <button className="bg-button w-64 h-10 text-white rounded-xl hover:bg-white border-[1px] border-button hover:text-button" onClick={handlevendorbtn}>Become a Vendor</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Select;
