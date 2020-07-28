const express = require('express')
const router = express.Router()

const meRequest = require('../../../middlewares/requests/me-request')

router.get('/', async (req, res, next) => {
  try {
    res.json({
      username: req.user.username,
      displayname: req.user.displayname,
      avatar_url: req.user.avatar_url,
    })
  } catch (err) {
    next(err)
  }
})

router.put('/', meRequest, async (req, res, next) => {
  try {
    const newUser = await req.user.update(req.body)
    req.user = newUser
    res.json({
      username: newUser.username,
      displayname: newUser.displayname,
      avatar_url: newUser.avatar_url,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
