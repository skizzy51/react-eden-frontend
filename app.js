const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, 'build')
app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('build'))
//     app.get('*', (res, req) => {
//         req.sendFile(path.resolve(__dirname, 'build', 'index.html'))
//     })
// }

app.listen(port, (err) => {
    if (err) {return console.log(err)}
    console.log(`App listening on ${port}`)
})