const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: ` Jesus huroku is ${process.env.HUROKU}`
    })
})

module.exports = router;