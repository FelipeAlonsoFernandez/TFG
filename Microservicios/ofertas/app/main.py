from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import engine, get_db

app = FastAPI()

# Crear las tablas
models.Base.metadata.create_all(bind=engine)

@app.get("/ofertas/", response_model=list[schemas.Oferta])
def obtener_ofertas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ofertas = crud.get_ofertas(db, skip=skip, limit=limit)
    return ofertas

@app.get("/ofertas/{oferta_id}", response_model=schemas.Oferta)
def obtener_oferta(oferta_id: int, db: Session = Depends(get_db)):
    db_oferta = crud.get_oferta(db, oferta_id=oferta_id)
    if db_oferta is None:
        raise HTTPException(status_code=404, detail="Oferta no encontrada")
    return db_oferta

@app.post("/ofertas/nueva_oferta", response_model=schemas.Oferta)
def crear_oferta(oferta: schemas.OfertaCreate, db: Session = Depends(get_db)):
    return crud.create_oferta(db=db, oferta=oferta)