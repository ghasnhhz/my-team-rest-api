const express = require("express")
const allMembers = require("../data")
const router = express.Router()

router.get("/", (req, res) => {
  const { fullName, age } = req.query
  
  if (fullName && age) {
    const boss = allMembers.find(boss => boss.fullName === fullName)
    const bossAge = parseInt(age)

    if (!boss) {
      return res.status(404).json({error: "No boss with the fullName you provided!"})
    } else if (boss.age !== bossAge) {
      return res.status(404).json({error: "Age not matched!"})
    }
    return res.status(200).json(boss)
  }
  
  const bosses = allMembers.filter(member => member.role === "Boss")

  if (!bosses) {
    return res.status(404).json({error: "Bosses are not included yet."})
  }
  res.status(200).json(bosses)
})

router.get("/:bossID", (req, res) => {
  const {bossID} = req.params
  const boss = allMembers.find(boss => boss.id === parseInt(bossID))

  if (!boss || boss.role !== "Boss") {
    return res.status(404).json({error: "No boss with the id you provided!"})
  }
  res.status(200).json(boss)
})

module.exports = router