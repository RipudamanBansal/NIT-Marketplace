const express = require('express');
const { ensureAuthenticated } = require('./middlewares/authentication');
const AuthRouter = require('./router/AuthRouter');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

require('./model/db'); // Ensure DB connection is established

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});