import API from "./axios";

export const getSlots = (date) => API.get(`/appointments/slots?date=${date}`);

export const bookAppointment = (data) => API.post("/appointments/book", data);

export const getMyAppointments = () => API.get("/appointments/my");
