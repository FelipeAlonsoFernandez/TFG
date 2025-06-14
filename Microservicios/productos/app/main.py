from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, models, schemas, database

app = FastAPI()

# Configurar CORS para permitir cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"]   # Permite todas las cabeceras
)

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=database.engine)

# Ruta para obtener todos los productos
@app.get("/productos/", response_model=list[schemas.Producto])
def obtener_productos(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    productos = crud.obtener_productos(db, skip=skip, limit=limit)
    return productos

# Ruta para crear un nuevo producto
@app.post("/productos/nuevo_producto", response_model=schemas.Producto)
def crear_producto(producto: schemas.ProductoCreate, db: Session = Depends(database.get_db)):
    return crud.crear_producto(db=db, producto=producto)

# Ruta para obtener un producto por ID
@app.get("/productos/{producto_id}", response_model=schemas.Producto)
def obtener_producto(producto_id: int, db: Session = Depends(database.get_db)):
    db_producto = crud.obtener_producto(db, producto_id=producto_id)
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto

# Ruta para obtener productos por tipo
@app.get("/productos/tipo/{tipo}", response_model=list[schemas.Producto])
def obtener_productos_por_tipo(tipo: str, db: Session = Depends(database.get_db)):
    productos = crud.obtener_productos_por_tipo(db, tipo=tipo)
    if not productos:
        raise HTTPException(status_code=404, detail=f"No se encontraron productos del tipo {tipo}")
    return productos

# Ruta para modificar un producto
@app.put("/productos/{producto_id}", response_model=schemas.Producto)
def actualizar_producto(producto_id: int, producto: schemas.ProductoCreate, db: Session = Depends(database.get_db)):
    db_producto = crud.actualizar_producto(db, producto_id=producto_id, producto=producto)
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto

# Ruta para eliminar un producto
@app.delete("/productos/{producto_id}", response_model=schemas.Producto)
def eliminar_producto(producto_id: int, db: Session = Depends(database.get_db)):
    db_producto = crud.eliminar_producto(db, producto_id=producto_id)
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto