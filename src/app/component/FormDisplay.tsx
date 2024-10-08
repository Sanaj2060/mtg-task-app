"use client";
import React from "react";
import Image from "next/image";

const FormDisplay = ({ forms }: { forms: any[] }) => {
  return (
    <div>
      {forms.map((form, key) => (
        <div key={key}>
          <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            {/* Form Title */}
            <h1 className="text-3xl font-bold mb-6 text-center">
              {form.title}
            </h1>

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
              {form.formdata?.questions.map((question: any, index: number) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">
                    {index + 1}. {question.question}
                  </p>
                  <p className="text-gray-600 text-sm">Type: {question.type}</p>
                  {question.type === "select" &&
                    question.options.length > 0 && (
                      <ul className="list-disc list-inside ml-4">
                        {question.options.map((option: any, idx: number) => (
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
};

export default FormDisplay;
