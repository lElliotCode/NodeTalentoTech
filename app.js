import 'dotenv/config';
import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import { productsRouter } from "./src/routes/products.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(join(__dirname, "public")));
app.use(express.json());
app.disable("x-powered-by");
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} with express`)
})

app.use("/products", productsRouter)
app.use("/auth", authRouter)    

app.use((req, res, next) => {
    res.status(404).json({
      error: 'Not Found',
      message: `La ruta -- ${req.originalUrl} -- no existe en este servidor`
    });
  });