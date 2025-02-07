import { NODE_ENV, PORT } from 'env'

import express from 'express'

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running in ${NODE_ENV} on port ${PORT}`)
})