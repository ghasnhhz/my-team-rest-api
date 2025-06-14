const express = require("express")
const bosses = require("../data/dataBosses")
const managers = require("../data/dataManagers")
const developers = require("../data/dataDevelopers")
const router = express.Router()

let allMembers = [...bosses, ...managers, ...developers]

router.get("/", (req, res) => {
  const { name } = req.query
  
  if (name) {
    const member = allMembers.filter(member => member.fullName.toLowerCase().includes(name.toLowerCase()))

    if (member === 0) {
      return res.status(404).json({message: "No member or members found with name you provided."})
    }

    return res.status(200).json(member)
  }

  res.status(200).json(allMembers)
})

router.get("/:memberId", (req, res) => {
  const {memberId} = req.params
  const member = allMembers.find(member => member.id === parseInt(memberId))

  if (!member) {
    return res.status(404).json({message: "No member found with the id you provided."})
  }
  res.status(200).json(member)
})


module.exports = router  