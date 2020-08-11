import http from "./httpService";

const apiEndpoint = "/rentals";

export function getRentals() {
  return http.get(apiEndpoint);
}

export function getRental(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function saveRental(rental) {
  return http.post(apiEndpoint, rental);
}
