const express = require("express")
const allMembers = require("../data")
const router = express.Router()

router.get("/", (req, res) => {
  developers = allMembers.filter(developer => developer.role === "Developer") 
  
  if (!developers) {
    return res.status(404).json({error: "Do not have developers yet."})
  }
    
  res.status(200).json(developers)
})

module.exports = router