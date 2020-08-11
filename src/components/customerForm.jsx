import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCustomer, saveCustomer } from "../services/customerService";

class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      isGold: false,
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().min(3).max(30).label("Name"),
    phone: Joi.string().length(10).label("Phone"),
    isGold: Joi.boolean(),
  };

  async populateCustomer() {
    const { match } = this.props;
    try {
      if (match.path.includes("new")) return;
      const customerId = match.params.id;

      const { data: customer } = await getCustomer(customerId);
      this.setState({
        data: this.mapToViewModel(customer),
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateCustomer();
  }

  /**
   *
   * @param {*} customer
   *
   * Maps the customer object from the database to a custom object used to populate the form.
   */
  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    };
  }

  /**
   *
   * @param {*} event
   *
   * Sets the state of a checkbox.
   */

  handleCheck = ({ currentTarget: input }) => {
    const data = { ...this.state.data };

    data[input.name] = input.checked;

    this.setState({ data });
  };

  renderCheckBox = (name, label) => {
    return (
      <div className="form-check">
        <input
          name={name}
          type="checkbox"
          id={name}
          checked={this.state.data[name]}
          onChange={this.handleCheck}
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
      </div>
    );
  };

  /**
   * Attempts to save the customer on submission. Populates the error object if an expected error occurs.
   */
  doSubmit = async () => {
    try {
      await saveCustomer(this.state.data);
      this.props.history.replace("/customers");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderCheckBox("isGold", "Golden")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
