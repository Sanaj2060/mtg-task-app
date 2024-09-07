import { options } from "@/app/api/auth/[...nextauth]/auth";
import { getFormByUserID } from "@/app/api/lib/db";
import { getServerSession } from "next-auth";
import React from "react";
import Image from "next/image";

export default async function Page() {
  const session = await getServerSession(options);

  // If no session or no user ID, return an error message
  if (!session || !session.dbUser?.id) {
    return (
      <div>
        <p>No User ID found. Please make sure you`&apos;`re authenticated.</p>
      </div>
    );
  }

  try {
    // Fetch forms by user ID
    const allFormsByUser = await getFormByUserID(session.dbUser.id);

    // If no forms are found, return an empty state message
    if (!allFormsByUser || allFormsByUser.forms.length === 0) {
      return (
        <div>
          <p>No forms found for this user.</p>
        </div>
      );
    }

    // Render the list of forms
    return (
      <div>
        {allFormsByUser.forms.map((form, key) => (
          <div key={key}>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
              {/* Form Title */}
              <h1 className="text-3xl font-bold mb-6 text-center">{form.title}</h1>

              {/* Creator Info */}
              <div className="flex items-center mb-6">
                <Image
                  src={form.createdbypic}
                  width={30}
                  height={30}
                  alt={form.createdbyname}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{form.createdbyname}</p>
                  <p className="text-gray-600 text-sm">{form.createdbyemail}</p>
                </div>
              </div>

              {/* Creation Date */}
              <p className="text-gray-500 text-sm mb-6">
                Created on: {new Date(form.createdon).toLocaleDateString()}
              </p>

              {/* Questions */}
              <div>
                {form.formdata?.questions.map((question: any, index: any) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium">
                      {index + 1}. {question.question}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Type: {question.type}
                    </p>
                    {question.type === "select" && question.options.length > 0 && (
                      <ul className="list-disc list-inside ml-4">
                        {question.options.map((option: any, idx: any) => (
                          <li key={idx} className="text-gray-600 text-sm">
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (err) {
    console.error("Something went wrong while fetching the forms.", err);
    return (
      <div>
        <p>Something went wrong while fetching the forms. Please try again later.</p>
      </div>
    );
  }
}