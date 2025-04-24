from sqlalchemy import Boolean, Column, Float, Integer, String
from productos.app.database import Base

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    descripcion = Column(String)
    precio = Column(Float)
    disponible = Column(Boolean, default=True)
    imagen_url = Column(String, nullable=True)
