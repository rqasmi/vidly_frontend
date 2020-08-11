import http from "./httpService";

const apiEndpoint = "/returns";

export function returnRental(rental) {
  const { customer, movie } = rental;
  return http.post(apiEndpoint, {
    customerId: customer._id,
    movieId: movie._id,
  });
}
