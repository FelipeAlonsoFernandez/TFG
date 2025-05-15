from sqlalchemy import Column, Integer, String, Float, Boolean
from .database import Base

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    descripcion = Column(String)
    precio = Column(Float)
    disponible = Column(Boolean, default=True)
    imagen_url = Column(String)
    tipo = Column(String)  # Nueva columna añadida
