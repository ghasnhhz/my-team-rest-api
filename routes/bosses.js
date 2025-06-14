const express = require("express")
const bosses = require("../data/dataBosses")
const uuid = require("uuid")
const router = express.Router()

router.get("/", (req, res) => {
  const { name } = req.query
  
  if (name) {
    const boss = bosses.filter(boss => boss.fullName.toLowerCase().includes(name.toLowerCase()))

    if (boss === 0) {
      return res.status(404).json({error: "No boss or bosses with the name you provided!"})
    }

    return res.status(200).json(boss)
  }

  if (bosses.length !== 0) {
    return res.status(200).json(bosses)
  } else {
    return res.status(404).json({error: "Bosses are not included yet."})
  }
})

router.get("/:bossID", (req, res) => {
  const {bossID} = req.params
  const boss = bosses.find(boss => boss.id === parseInt(bossID))

  if (!boss) {
    return res.status(404).json({error: "No boss found with the id you provided."})
  }
  
  res.status(200).json(boss)
})

router.post("/", (req, res) => {
  const newBoss = req.body
  newBoss.id = uuid.v4()

  bosses.push(newBoss)
  res.status(201).json(newBoss)
})

router.put("/", (req, res) => {
  const updatedBoss = req.body

  const indexBoss = bosses.findIndex(boss => boss.id === parseInt(updatedBoss.id))

  if (!indexBoss) {
    return res.status(404).json({error: "No boss found to be updated with the provided id."})
  }

  bosses[indexBoss] = updatedBoss

  res.status(200).json(updatedBoss)
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  const bossID = parseInt(id)

  const indexBoss = bosses.findIndex(boss => boss.id === bossID)

  if (indexBoss === -1) {
    res.status(404).json({error: "No boss found to delete with the id you provided"})
  }

  const deletedBoss = bosses.splice(indexBoss, 1)

  res.status(200).json({"Deleted Manager": deletedBoss[0]})
})

module.exports = router