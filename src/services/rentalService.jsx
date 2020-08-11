import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/rentals";

// function rentalUrl(id) {
//   return `${apiEndpoint}/${id}`;
// }

export function getRentals() {
  return http.get(apiEndpoint);
}

export function getRental(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function saveRental(rental) {
  // if (rental._id) {
  //   const body = { ...rental };
  //   delete body._id;
  //   return http.put(`${apiEndpoint}/${rental._id}`, body);
  // }
  return http.post(apiEndpoint, rental);
}

// export function deleteRental(id) {
//   return http.delete(`${apiEndpoint}/${id}`);
// }
