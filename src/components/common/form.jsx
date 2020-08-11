import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  /**
   * Validates the user input based on the defined schema and populates the errors object.
   */

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  /**
   *
   * @param {*} e
   *
   * Validates the form data based on the schema before submtting the form.
   */

  handleSubmit = (e) => {
    e.preventDefault(); // prevent submitting the form to the server which causes a full page reload

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  /**
   *
   * @param {*} event
   *
   * Populates the data and error objects on change of elements registered to this event handler.
   */

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  /**
   *
   * @param {*} name
   * @param {*} label
   * @param {*} type
   *
   * Renders an Input Html element.
   */

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  /**
   *
   * @param {*} name
   * @param {*} label
   * @param {*} items
   * @param {*} itemLabel
   *
   * Renders a select Html element.
   */
  renderSelect(name, label, items, itemLabel) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        items={items}
        itemLabel={itemLabel}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
