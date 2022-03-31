import express from 'express'
const router = express.Router()

router.route(`/version`).get((req, res) => {
  res.send(require(`../package.json`).version)
})

export default router 