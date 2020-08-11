import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class CustomersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => (
        <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
      ),
    },
    { path: "phone", label: "Phone" },
    {
      path: "isGold",
      label: "Golden",
      content: (customer) => (customer.isGold ? "Yes" : "No"),
    },
    {
      key: "delete",
      content: (customer) => (
        <button
          onClick={() => this.props.onDelete(customer)}
          type="button"
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { customers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={customers}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default CustomersTable;
