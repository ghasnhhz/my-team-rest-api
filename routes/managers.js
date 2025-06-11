const express = require("express")
const allMembers = require("../data")
const router = express.Router()

router.get("/", (req, res) => {
  managers = allMembers.filter(manager => manager.role === "Manager")

  if (!managers) {
    return res.status(404).json({error: "Do not have managers yet!"})
  }
  res.status(200).json(managers)
})

module.exports = router