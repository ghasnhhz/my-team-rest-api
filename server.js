const express = require("express")
const membersRoute = require("./routes/allMembers")
const bossesRoute = require("./routes/bosses")
const managersRoute = require("./routes/managers")
const programmersRoute = require("./routes/developers")
const app = express()

app.use(express.json())
app.use("/members", membersRoute)
app.use("/bosses", bossesRoute)
app.use("/managers", managersRoute)
app.use("/developers", programmersRoute)

app.listen(3000, () => {
  console.log("App is listening on: http://localhost:3000")
})