const express = require("express")
const bosses = require("../data/dataBosses")
const infoBosses = require("../data/dataBosses")
const router = express.Router()

router.get("/", (req, res) => {
  const { fullName, age } = req.query
  
  if (fullName && age) {
    const boss = bosses.find(boss => boss.fullName === fullName)
    const bossAge = parseInt(age)

    if (!boss) {
      return res.status(404).json({error: "No boss with the fullName you provided!"})
    } else if (boss.age !== bossAge) {
      return res.status(404).json({error: "Age not matched!"})
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
  req.body.id = bosses.length + 1
  const newBoss = req.body

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