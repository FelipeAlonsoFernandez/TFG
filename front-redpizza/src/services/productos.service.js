import http from "../../http-common-productos.js";

class ProductoDataService {
  createProducto(data) {
    return http.post("/productos/nuevo_producto", data);
  }

  getProducto(id) {
    return http.get(`/productos/${id}`);
  }

  getProductosByTipo(tipo) {
    return http.get(`/productos/tipo/${tipo}`);
  }

  updateProducto(id, data) {
    return http.put(`/productos/${id}`, data);
  }

  deleteProducto(id) {
    return http.delete(`/productos/${id}`);
  }
}

export default new ProductoDataService();
