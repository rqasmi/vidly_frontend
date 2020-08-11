import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: {
      path: "name",
      order: "asc",
    },
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter((c) => c._id !== customer._id);
    this.setState({ customers });

    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This customer has already been deleted.");

      this.setState({ customers: originalCustomers });
    }
  };

  /**
   * Get the customers, filter, sort and paginate them.
   *
   * @return obj
   */
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      customers: allCustomers,
    } = this.state;

    const filtered = searchQuery
      ? allCustomers.filter((c) =>
          c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : allCustomers;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: customers };
  };

  render() {
    const { length: count } = this.state.customers;

    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: customers } = this.getPagedData();

    return (
      <React.Fragment>
        <Link
          to="/customers/new"
          style={{ marginBottom: 20 }}
          className="btn btn-primary"
        >
          New Customer
        </Link>
        <p>Showing {totalCount} customer(s) in the database.</p>
        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        />
        <CustomersTable
          customers={customers}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
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

export default Customers;
