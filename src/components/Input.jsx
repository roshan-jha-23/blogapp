import React, { useId } from "react";
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label,  type = "text", className = "", ...props },
  ref
) {
    const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="" htmlFor={id}>
          {label}
        </label>
      )}
      <input 
      className={` ${className}`}
      type={type} ref={ref} />
    </div>
  );
});

export default Input;
