import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RentalsTable from "./rentalsTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { getRentals } from "../services/rentalService";
import { returnRental } from "./../services/returnService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Rentals extends Component {
  state = {
    rentals: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "customer.name", order: "asc" },
  };

  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
  }

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleReturn = async (rental) => {
    try {
      await returnRental(rental);
      console.log(
        `The rental with id ${rental._id} belonging to customer ${rental.customer.name} has been successfully processed.`
      );
      toast(
        `The rental with id ${rental._id} belonging to customer ${rental.customer.name} has been successfully processed.`
      );
      window.location = "/rentals";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("This rental has already been processed.");
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      rentals: allRentals,
    } = this.state;

    const filtered = searchQuery
      ? allRentals.filter((r) =>
          r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : allRentals;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rentals = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: rentals };
  };

  render() {
    const { length: count } = this.state.rentals;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no rentals in the database.</p>;

    const { totalCount, data: rentals } = this.getPagedData();

    return (
      <React.Fragment>
        <Link
          to="/rentals/new"
          style={{ marginBottom: 20 }}
          className="btn btn-primary"
        >
          New Rental
        </Link>
        <p>Showing {totalCount} rental(s) in the database.</p>
        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        />
        <RentalsTable
          user={user}
          rentals={rentals}
          sortColumn={sortColumn}
          onReturn={this.handleReturn}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Rentals;
