import React, { Component } from "react";
import Table from "./common/table";

class RentalsTable extends Component {
  columns = [
    {
      path: "customer.name",
      label: "Customer Name",
    },
    { path: "movie.title", label: "Movie Title" },
    {
      path: "dateOut",
      label: "Date Out",
      content: (rental) => {
        const date = new Date(rental.dateOut);
        return date.toDateString();
      },
    },
    {
      key: "dateReturned",
      label: "Date Returned",
      content: (rental) => {
        if (!rental.dateReturned) return "N/A";
        const date = new Date(rental.dateReturned);
        return date.toDateString();
      },
    },
    {
      key: "rentalFee",
      label: "Rental Fee",
      content: (rental) => {
        if (rental.rentalFee >= 0) return rental.rentalFee;
        return "N/A";
      },
    },
    {
      key: "return",
      content: (rental) => (
        <button
          onClick={() => this.props.onReturn(rental)}
          type="button"
          className="btn btn-primary btn-sm"
        >
          Return
        </button>
      ),
    },
  ];

  render() {
    const { rentals, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={rentals}
        onSort={onSort}
        sortColumn={sortColumn}
      ></Table>
    );
  }
}

export default RentalsTable;
