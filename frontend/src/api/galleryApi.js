import API from "./axios";

export const getGalleryImages = () => API.get("/gallery");

export const uploadGalleryImage = (formData) =>
  API.post("/gallery/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Admin APIs
export const getAllAppointments = () => API.get("/admin/appointments");

export const getAllPatients = () => API.get("/admin/patients");

export const cancelAppointment = (id) => API.delete(`/admin/appointment/${id}`);
