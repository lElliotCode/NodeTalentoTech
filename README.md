
# 📦 API REST - Gestión de Productos y Usuarios

API REST construida con **Node.js**, **Express** y **Firebase Firestore**, con autenticación por **JWT en cookies**. Permite registrar usuarios, iniciar sesión y realizar operaciones CRUD sobre productos.

---

## ⚙️ Tecnologías utilizadas

- Node.js + Express
- Firebase Admin SDK (Firestore)
- JWT + Cookies
- bcrypt
- dotenv
- cookie-parser

---

## 🚀 Cómo iniciar el proyecto

1. Cloná el repositorio e instalá dependencias:

```bash
git clone <URL-del-repo>
cd nombre-del-repo
npm install
```

2. Configurá el archivo `.env` en la raíz del proyecto:

```env
envPORT=3000
FIREBASE_API_KEY=tu_firebase_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto_id
FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
JWT_SECRET=tuClaveSecretaJWT_muy_segura
```
⚠️ Importante: Reemplazá todos los valores con los de tu proyecto Firebase. Podés obtenerlos desde la consola de Firebase > Configuración del proyecto > Configuración general.



3. Iniciá el servidor en modo desarrollo:

```bash
npm run dev
```

---

## 🔐 Autenticación para el uso de rutas protegidas

- Al iniciar sesión, el token JWT se guarda automáticamente en una **cookie**.
- No es necesario enviarlo manualmente si el cliente gestiona cookies.
- Si usás Postman o REST Client, podés agregar el token manualmente:

```http
Authorization: Bearer <token>
```

---

## 📦 Rutas disponibles

| Método | Endpoint               | Autenticación | Descripción                     |
|--------|------------------------|---------------|----------------------------------|
| POST   | /auth/register         | ❌            | Registrar nuevo usuario         |
| POST   | /auth/login            | ❌            | Iniciar sesión                  |
| POST   | /auth/logout           | ❌            | Cerrar sesión (borra cookie)    |
| GET    | /products              | ❌            | Listar todos los productos      |
| GET    | /products/:id          | ❌            | Obtener producto por ID         |
| POST   | /products              | ✅            | Crear nuevo producto            |
| PATCH  | /products/:id          | ✅            | Editar producto existente       |
| DELETE | /products/:id          | ✅            | Eliminar producto               |

---

## ✍️ Ejemplos de peticiones

### Registro

⚠️ Importante: Jean Paul, podes usar un usuario ya creado para hacer las pruebas de las rutas protegidas o crearte uno nuevo con la ruta auth/register
Usuario ya registrado
```json
{
  "email": "test@example.com",
  "password": "password"
}
```

```json
POST /auth/register
{
  "name": "Sergio",
  "email": "sergio@example.com",
  "password": "123456"
}
```

### Login

```json
POST /auth/login
{
  "email": "sergio@example.com",
  "password": "123456"
}
```

### Crear producto (requiere login)

```json
POST /products
{
  "name": "Auriculares",
  "category": ["Electronica"],
  "rating": 4.8
}
```

### Editar producto

```json
PATCH /products/:id
{
  "name": "Auriculares inalámbricos",
  "rating": 5
}
```

---

## 📄 Tips para pruebas

- Usá `rest.http` en VSCode con la extensión **REST Client**.
- En Postman, activá el manejo de cookies o enviá el token como `Bearer` en headers si es necesario.

---

## 👋 Autor

Este proyecto fue desarrollado por Sergio Vazquez(ElliotCode) como práctica de desarrollo backend.
Profesor: Jean Paul Ferrerira
Tutora: Sofia Tarabusi
¡Gracias por revisar el código! 💻
