import React from "react";

const TextInput = ({ labelName, defVal, disabled }: any) => {
  return (
    <div className="w-full mb-5">
      <label className="block text-left pl-2 w-full mb-2 text-sm font-medium text-gray-900">
        {labelName}
      </label>
      <input
        disabled={disabled}
        type="text"
        className="bg-gray-50 border w-full border-gray-300 p-3 text-gray-900 text-sm rounded-lg"
        placeholder="John"
        defaultValue={defVal}
      />
    </div>
  );
};

export default TextInput;
