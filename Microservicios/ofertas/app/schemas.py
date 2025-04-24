from pydantic import BaseModel
from typing import Optional

class OfertaBase(BaseModel):
    titulo: str
    descripcion: str
    precio: float
    activa: bool = True
    imagen_url: Optional[str] = None

class OfertaCreate(OfertaBase):
    pass

class Oferta(OfertaBase):
    id: int

    class Config:
        from_attributes = True