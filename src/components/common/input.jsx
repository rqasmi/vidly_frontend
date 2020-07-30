import React from "react";

const Input = ({ type, value, name, label, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
