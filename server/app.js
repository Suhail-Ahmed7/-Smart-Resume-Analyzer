const express = require('express')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes');
require('./config/dbConnection')()
const app = express()


app.use(express.json())
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port, ${PORT}`,);
})