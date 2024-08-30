"use client";
import React, { useState } from "react";
import NavBar from "../component/navBar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/auth";
import TextInput from "../component/textInput";

const Page = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen items-center">
      <div className="w-full lg:w-5/6">
        <div className="bg-green-400 w-full h-10">Navbar Here</div>
        <div className="px-4">
          <p>Profile</p>
          <p>Full Name</p>
          <p>Email address</p>
          <p>Mobile number</p>
          <p>Address</p>
          <button
            className="bg-orange-500 text-white rounded p-2"
            onClick={() => setShowEditProfile((prev) => !prev)}
          >
            Edit profile
          </button>
        </div>
        {/* dialog */}
        {showEditProfile && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            {/* <!--
            Background backdrop, show/hide based on modal state.
        
            Entering: "ease-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100"
              To: "opacity-0"
          --> */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 w-full text-center sm:p-0">
                {/* <!--
                Modal panel, show/hide based on modal state.
        
                Entering: "ease-out duration-300"
                  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                  From: "opacity-100 translate-y-0 sm:scale-100"
                  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              --> */}
                <div className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Edit your profile
                        </h3>
                        <div className="mt-2">
                          <TextInput
                            labelName="Full name"
                            defVal="Angom Oson Singh"
                          />
                          <TextInput
                            labelName="Email address"
                            defVal="angomosn64@gmail.com"
                          />
                          <TextInput
                            labelName="Mobile number"
                            defVal="7085535842"
                          />
                          <TextInput
                            labelName="Address"
                            defVal="Angom Oson Singh"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
                    >
                      Save changes
                    </button>
                    <button
                      onClick={() => setShowEditProfile((prev) => !prev)}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
