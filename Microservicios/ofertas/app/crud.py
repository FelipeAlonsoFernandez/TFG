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

def update_oferta(db: Session, oferta_id: int, oferta: schemas.OfertaCreate):
    db_oferta = db.query(models.Oferta).filter(models.Oferta.id == oferta_id).first()
    if db_oferta:
        for key, value in oferta.model_dump().items():
            setattr(db_oferta, key, value)
        db.commit()
        db.refresh(db_oferta)
    return db_oferta

def delete_oferta(db: Session, oferta_id: int):
    db_oferta = db.query(models.Oferta).filter(models.Oferta.id == oferta_id).first()
    if db_oferta:
        db.delete(db_oferta)
        db.commit()
        return True
    return False