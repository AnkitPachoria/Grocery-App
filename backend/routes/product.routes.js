import express from "express";

import { authSeller } from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  getProductById,
  getProducts, updateProduct,deleteProduct,
} from "../controller/product.controller.js";
import { upload } from "../config/multer.js";
const router = express.Router();

router.post("/add-product", authSeller, upload.array("image", 4), addProduct);
router.get("/list", getProducts);
router.get("/id", getProductById);
router.post("/stock", authSeller, changeStock);


// New:
router.delete("/delete/:id", authSeller, deleteProduct);
router.put("/update/:id", authSeller, updateProduct);
export default router;
 