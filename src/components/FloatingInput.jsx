import React, { useState } from "react";

const FloatingInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative mb-6">
      <label className="absolute -top-2 left-3 bg-popx-bg px-1 text-xs font-normal text-popx-purple z-10">
        {label}
        {required && <span className="text-popx-purple"> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full h-[52px] bg-popx-white rounded-lg px-4 py-3
          font-rubik text-sm text-popx-gray outline-none
          border transition-colors duration-200
          ${focused ? "border-popx-purple" : "border-popx-border"}
          placeholder:text-popx-gray`}
      />
    </div>
  );
};

export default FloatingInput;
