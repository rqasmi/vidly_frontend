import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCustomers } from "../services/customerService";
import { getMovies } from "../services/movieService";
import { saveRental } from "./../services/rentalService";

class MovieForm extends Form {
  state = {
    data: {
      customerId: "",
      movieId: "",
    },
    customers: [],
    movies: [],
    errors: {},
  };

  schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };

  async populateCustomers() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  async populateMovies() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }

  async componentDidMount() {
    await this.populateCustomers();
    await this.populateMovies();
  }

  // Map the movie object from the database with properties used to populate the form
  // mapToViewModel(movie) {
  //   return {
  //     _id: movie._id,
  //     title: movie.title,
  //     genreId: movie.genre._id,
  //     numberInStock: movie.numberInStock,
  //     dailyRentalRate: movie.dailyRentalRate,
  //   };
  // }

  doSubmit = async () => {
    await saveRental(this.state.data);

    this.props.history.replace("/rentals");
  };

  render() {
    return (
      <div>
        <h1>Rental Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect(
            "customerId",
            "Customer",
            this.state.customers,
            "name"
          )}
          {this.renderSelect("movieId", "Movie", this.state.movies, "title")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
