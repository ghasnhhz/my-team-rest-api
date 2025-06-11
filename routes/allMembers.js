const express = require("express")
const allMembers = require("../data")
const router = express.Router()

router.get("/", (req, res) => {
  const { fullName, age } = req.query
  
  if (fullName && age) {
    const member = allMembers.find(member => member.fullName === fullName)

    if (!member) {
      return res.status(404).json({message: "No member found with the provided fullName!"})
    } else if (member.age !== parseInt(age)) {
      return res.status(404).json({message: "No member found with the provided age."})
    }
    return res.status(200).json(member)
  }

  res.status(200).json(allMembers)
})

router.get("/:memberId", (req, res) => {
  const {memberId} = req.params
  const member = allMembers.find(member => member.id === parseInt(memberId))

  if (!member) {
    return res.status(404).json({message: "No member found with the provided memberID!"})
  }
  res.status(200).json(member)
})


module.exports = router  