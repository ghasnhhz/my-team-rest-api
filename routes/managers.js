const express = require("express")
const allMembers = require("../data")
const router = express.Router()

router.get("/", (req, res) => {
  const { fullName, age } = req.query
  // return res.send(`Manager age is: ${typeof age}`)
  
  if (fullName && age) {
    const manager = allMembers.find(manager => manager.fullName === fullName)
    const managerAge = parseInt(age)

    if (!manager) {
      return res.status(404).json({error: "No manager with the fullName you provided!"})
    } else if (manager.age !== managerAge) {
      return res.status(404).json({error: "Age not matched"})
    }

    return res.status(200).json(manager)
  }

  const managers = allMembers.filter(member => member.role === "Manager")

  if (managers.length === 0) {
    return res.status(404).json({error: "Do not have managers yet."})
  }

  res.status(200).json(managers)
})

router.get("/:managerID", (req, res) => {
  const { managerID } = req.params

  const manager = allMembers.find(member => member.id === parseInt(managerID))

  if (!manager || manager.role !== "Manager") {
    return res.status(404).json({error: "No manager found with the id you provided."})
  }

  res.status(200).json(manager)
})

module.exports = router