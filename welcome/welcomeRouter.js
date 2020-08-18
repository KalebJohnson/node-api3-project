const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: ` Jesus heroku is ANNOYING`
        // $(process.env.HEROKU) variable wont be in my env unless I restart PC (cool windows)
    })
})

module.exports = router;