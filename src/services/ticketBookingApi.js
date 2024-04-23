import { http } from "./config";

const resourceName = "QuanLyDatVe/";
const user = JSON.parse(localStorage.getItem("user"));
 // Lấy token từ local storage
const token = user.accessToken
const headers = { Authorization: `Bearer ${token}` }; // Tạo header Authorization

const ticketBookingApi = {
  bookTicket: (ticket) => {
    const url = resourceName + "DatVe";
    return http.post(url, ticket, { headers });
  },
  getTicketOfficeList: (params) => {
    const url = resourceName + "LayDanhSachPhongVe";
    return http.get(url, { params });
  },
  createShowtime: (showtime) => {
    const url = resourceName + "TaoLichChieu";
    return http.post(url, showtime, { headers });
  },
};

export default ticketBookingApi;
