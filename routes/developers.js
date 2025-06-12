const express = require("express")
const allMembers = require("../data")
const router = express.Router()

router.get("/", (req, res) => {
  const { fullName, age } = req.query
  
  if (fullName && age) {
    const developer = allMembers.find(member => member.fullName === fullName)
    const developerID = parseInt(age)

    if (!developer) {
      return res.status(404).json({error: "No developer found with the fullName you provided."})
    } else if (developer.age !== developerID) {
      return res.status(404).json({error: "No developer found with the age you provided."})
    }

    res.status(200).json(developer)
  }

  developers = allMembers.filter(developer => developer.role === "Developer") 
  
  if (developers.length === 0) {
    return res.status(404).json({error: "Do not have developers yet."})
  }
    
  res.status(200).json(developers)
})

router.get("/:developerID", (req, res) => {
  const { developerID } = req.params
  
  const developer = allMembers.find(member => member.id === parseInt(developerID))

  if (!developer || developer.role !== "Developer") {
    return res.status(404).json({error: "No developer found with the id you provided."})
  }

  res.status(200).json(developer)
})


module.exports = router