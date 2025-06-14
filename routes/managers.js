const express = require("express")
const managers = require("../data/dataManagers")
const uuid = require("uuid")
const router = express.Router()

router.get("/", (req, res) => {
  const { name} = req.query
  // return res.send(`Manager age is: ${typeof age}`)
  
  if (name) {
    const manager = managers.filter(manager => manager.fullName.toLowerCase().includes(name.toLowerCase()))

    if (manager === 0) {
      return res.status(404).json({error: "No manager or managers found with the name you provided!"})
    }

    return res.status(200).json(manager)
  }

  if (managers.length !== 0) {
    return res.status(200).json(managers)
  } else {
    res.status(404).json({error: "Do not have managers yet."})
  }
})

router.get("/:managerID", (req, res) => {
  const { managerID } = req.params

  const manager = managers.find(member => member.id === parseInt(managerID))

  if (!manager) {
    return res.status(404).json({error: "No manager found with the id you provided."})
  }

  res.status(200).json(manager)
})

router.post("/", (req, res) => {
  const newManager = req.body
  newManager.id = uuid.v4()

  managers.push(newManager)
  res.status(201).json(newManager)
})

router.put("/", (req, res) => {
  const updatedManager = req.body

  const indexManager = managers.findIndex(manager => manager.id === parseInt(updatedManager.id))

  if (indexManager === -1) {
    return res.status(404).json({error: "No manager found to be updated with the id you provided."})
  }

  managers[indexManager] = updatedManager
  res.status(200).json(updatedManager)
})

router.delete("/", (req, res) => {
  const { id } = req.body
  const managerID = parseInt(id)

  const indexManager = managers.findIndex(manager => manager.id === managerID)

  if (indexManager === -1) {
    return res.status(404).json({error: "No manager found with the id you provided."})
  }

  const deletedManager = managers.splice(indexManager, 1)
  res.status(200).json({"Deleted Manager": deletedManager[0]})
})


module.exports = router