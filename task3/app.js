const express = require('express');
const app = express();
const routerNotes = require('./routers/routerNotes')

app.use( express.json() );
app.use( '/notes', routerNotes );

const port = process.env.PORT || 3000;

app.listen( port, () => console.log( `server start at port - ${port}` ));