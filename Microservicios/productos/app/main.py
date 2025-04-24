from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud
from . import models
from . import schemas
from . import database


# Crear la aplicación FastAPI
app = FastAPI()

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=database.engine)

# Ruta para obtener todos los productos
@app.get("/productos/", response_model=list[schemas.Producto])
def obtener_productos(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    productos = crud.obtener_productos(db, skip=skip, limit=limit)
    return productos

# Ruta para obtener un producto por ID
@app.get("/productos/{producto_id}", response_model=schemas.Producto)
def obtener_producto(producto_id: int, db: Session = Depends(database.get_db)):
    db_producto = crud.obtener_producto(db, producto_id=producto_id)
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto

# Ruta para crear un nuevo producto
@app.post("/productos/nuevo_producto", response_model=schemas.Producto)
def crear_producto(producto: schemas.ProductoCreate, db: Session = Depends(database.get_db)):
    return crud.crear_producto(db=db, producto=producto)
