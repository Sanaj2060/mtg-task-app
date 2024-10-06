"use client";
import React, { useState } from "react";
import TextInput from "../component/textInput";
import NavBar from "../component/navBar";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Page = () => {
  const { data: session, status } = useSession();
  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen items-center">
      <div className="w-full lg:w-5/6">
        {/* <NavBar /> */}
        <div className="lg:flex px-4 gap-4 mt-4">
          <div className="flex flex-col flex-3 justify-start items-center gap-3 p-4 rounded shadow-lg min-h-full">
            <Image
              height={100}
              width={100}
              src={session?.dbUser?.googlepic.slice(0, -6) || ""}
              alt=""
              className="rounded-full"
            />
            <div className="flex flex-col gap-1 items-center justify-center">
              <p>{session?.dbUser?.fullname}</p>
              <p className="text-sm text-gray-500">{session?.dbUser?.email}</p>
              <button
                className="text-white rounded p-2 w-full mt-3 bg-orange-400 hover:bg-orange-500"
                onClick={() => setShowEditProfile((prev) => !prev)}
              >
                Edit profile
              </button>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded shadow-lg h-full flex-1 mt-10 lg:mt-0">
            <p className="text-blue-500 text-lg mb-4">Personal Details</p>

            <div className="w-full mb-5">
              <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
                Full name
              </label>
              <input
                disabled
                type="text"
                className="bg-gray-50 border w-full border-gray-300 p-3 text-gray-900 text-sm rounded-lg"
                placeholder=""
                value={session?.dbUser?.fullname}
              />
            </div>
            <div className="w-full mb-5">
              <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                disabled
                type="text"
                id="email"
                className="bg-gray-50 border w-full border-gray-300 p-3 text-gray-900 text-sm rounded-lg"
                placeholder=""
                value={session?.dbUser?.email}
              />
            </div>
            <div className="w-full mb-5">
              <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <input
                disabled
                type="text"
                className="bg-gray-50 border w-full border-gray-300 p-3 text-gray-900 text-sm rounded-lg"
                placeholder=""
                value={session?.dbUser?.address}
              />
            </div>
            <div className="w-full mb-5">
              <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
                Mobile number
              </label>
              <input
                disabled
                type="text"
                className="bg-gray-50 border w-full border-gray-300 p-3 text-gray-900 text-sm rounded-lg"
                placeholder=""
                value={session?.dbUser?.phone}
              />
            </div>
            <div className="w-full mb-5">
              <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
                User ID
              </label>
              <input
                disabled
                type="text"
                id="userid"
                className="bg-gray-50 border w-full border-gray-300 p-3 text-gray-900 text-sm rounded-lg"
                placeholder=""
                value={session?.dbUser?.id}
              />
            </div>
            <div className="w-full mb-5">
              <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
                Joined on
              </label>
              <input
                disabled
                type="text"
                id="joinedon"
                className="bg-gray-50 border w-full border-gray-300 p-3 text-gray-900 text-sm rounded-lg"
                placeholder=""
                value={session?.dbUser?.joinOn ? session.dbUser.joinOn.toDateString() : 'None'}
              />
            </div>
          </div>
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
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                          Edit your profile
                        </h3>
                        <div className="mt-2">
                          <TextInput
                            labelName="Full name"
                            defVal={session?.dbUser?.fullname}
                          />
                          {/* <TextInput
                            labelName="Email address"
                            defVal={session?.dbUser?.email}
                            disabled={true}
                          /> */}
                          <TextInput
                            labelName="Mobile number"
                            defVal={session?.dbUser?.phone}
                          />
                          <TextInput
                            labelName="Address"
                            defVal={session?.dbUser?.address}
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
