import http from "../../http-common-ofertas.js";

class OfertasDataService {
  createOferta(data) {
    return http.post("/ofertas/nueva_oferta", data);
  }

  getOfertas() {
    return http.get("/ofertas/");
  }

  getOferta(id) {
    return http.get(`/ofertas/${id}`);
  }

  getOfertasActivas() {
    return http.get("/ofertas/activas");
  }

  updateOferta(id, data) {
    return http.put(`/ofertas/${id}`, data);
  }

  deleteOferta(id) {
    return http.delete(`/ofertas/${id}`);
  }

  activateOferta(id) {
    return http.put(`/ofertas/${id}/activar`);
  }

  deactivateOferta(id) {
    return http.put(`/ofertas/${id}/desactivar`);
  }
}

export default new OfertasDataService();
