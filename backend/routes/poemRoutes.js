const express = require("express")
const router = express.Router()

const {getPoems,addPoem,updatePoem,deletePoem,toggleVisibility,getPublicPoems} = require("../controllers/poemController")

const {protect} = require("../middleware/auth")

router.get("/",protect, getPoems)

router.post("/add",protect, addPoem)

router.put("/update/:id",protect, updatePoem)

router.patch("/toggleVisibility",protect,toggleVisibility)

router.delete("/delete/:id",protect,deletePoem)

router.get("/public",getPublicPoems)

module.exports = router