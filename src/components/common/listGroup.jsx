import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={
            item === selectedItem
              ? "clickable list-group-item active"
              : "clickable list-group-item"
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
