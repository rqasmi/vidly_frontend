import React from "react";

const CheckBox = (props) => {
  return (
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="isGold" />
      <label class="form-check-label" for="isGold">
        Check me out
      </label>
    </div>
  );
};

export default CheckBox;
