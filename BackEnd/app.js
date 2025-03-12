import express from "express";
import productsRoutes from "./src/routes/productsRoute.js"
import employeesRoutes from "./src/routes/employeesRoute.js";   
import branchesRoutes from "./src/routes/BranchesRoute.js"      

const app = express();

app.use(express.json());

app.use("/api/products", productsRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/branches", branchesRoutes)

export default app;