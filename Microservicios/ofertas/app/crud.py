from sqlalchemy.orm import Session
from . import models, schemas

def get_ofertas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Oferta).offset(skip).limit(limit).all()

def get_oferta(db: Session, oferta_id: int):
    return db.query(models.Oferta).filter(models.Oferta.id == oferta_id).first()

def create_oferta(db: Session, oferta: schemas.OfertaCreate):
    db_oferta = models.Oferta(**oferta.model_dump())
    db.add(db_oferta)
    db.commit()
    db.refresh(db_oferta)
    return db_oferta