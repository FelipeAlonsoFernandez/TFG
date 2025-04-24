from sqlalchemy import Boolean, Column, Float, Integer, String
from .database import Base

class Oferta(Base):
    __tablename__ = "ofertas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True)
    descripcion = Column(String)
    precio = Column(Float)
    activa = Column(Boolean, default=True)
    imagen_url = Column(String, nullable=True)