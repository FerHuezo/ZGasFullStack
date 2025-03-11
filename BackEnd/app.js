import express from "express";
import productsRoutes from "./src/routes/productsRoute.js"

const app = express();

app.use(express.json());

app.use("/api/products", productsRoutes)
app.use("/api/employees", employeesRoutes)

export default app;