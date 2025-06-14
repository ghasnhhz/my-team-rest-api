const express = require("express")
const developers = require("../data/dataDevelopers")
const uuid = require("uuid")
const router = express.Router()

router.get("/", (req, res) => {
  const { name } = req.query
  
  if (name) {
    const developer = developers.filter(member => member.fullName.toLowerCase().includes(name.toLowerCase()))

    if (developer === 0) {
      return res.status(404).json({error: "No developer found with the fullName you provided."})
    }

    return res.status(200).json(developer)
  }
  
  if (developers.length !== 0) {
    return res.status(200).json(developers)
  } else {
    res.status(404).json({error: "Do not have developers yet."})
  }
  
})

router.get("/:developerID", (req, res) => {
  const { developerID } = req.params
  
  const developer = developers.find(member => member.id === parseInt(developerID))

  if (!developer) {
    return res.status(404).json({error: "No developer found with the id you provided."})
  }

  res.status(200).json(developer)
})

router.post("/", (req, res) => {
  const newDeveloper = req.body
  newDeveloper.id = uuid.v4()
  
  developers.push(newDeveloper)
  res.status(201).json(newDeveloper)
})

router.put("/", (req, res) => {
  const updatedDeveloper = req.body
  const developerID = parseInt(updatedDeveloper.id)

  const indexDeveloper = developers.findIndex(developer => developer.id === developerID)

  if (indexDeveloper === -1) {
    return res.status(404).json({error: "No developer found to be updated with the id you provided."})
  }

  developers[indexDeveloper] = updatedDeveloper

  res.status(200).json(updatedDeveloper)
})

router.delete("/", (req, res) => {
  const { id } = req.body
  const developerID = parseInt(id)

  const indexDeveloper = developers.findIndex(developer => developer.id === developerID)  

  if (indexDeveloper === -1) {
    return res.status(404).json({error: "No developer found to be deleted with the id you provided."})
  }

  const deletedDeveloper = developers.splice(indexDeveloper, 1)
  res.status(200).json({"Deleted Developer": deletedDeveloper[0]})
})


module.exports = router