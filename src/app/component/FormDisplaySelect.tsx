"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FormDisplaySelect = ({ forms }: { forms: any[] }) => {
  const router = useRouter();
  const handleSelectForm = (formID: string) => {
    // Handle form selection logic here (e.g., redirect to another page, set a form ID, etc.)
    console.log(`Form selected: ${formID}`);
    // You can redirect or take action based on the form ID
    router.push(`/form/task-form-fill?formid=${formID}`);
  };

  return (
    <div className="flex items-start justify-center bg-gray-100 py-2 px-6">
      <div className="md:w-4/6 w-full">
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

              {/* Form Description */}
              <p className="text-gray-500 text-sm mb-6">
                Description: {form.description}
              </p>

              {/* Select Form Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleSelectForm(form.id)} // Pass the form ID to the handler
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  Select Form
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormDisplaySelect;
