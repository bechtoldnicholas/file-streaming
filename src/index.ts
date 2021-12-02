import express from "express";
import LogHandler from "./handlers/LogHandler";
import LogTally from "./models/logTally";
import * as fs from "fs";
import JSONStream from "JSONStream";

const app = express();
const port = 8080;

const readData = (stream: fs.ReadStream, counter: number, globalLogTally: LogTally) => {
    return new Promise((resolve, reject) => {
        const parser = JSONStream.parse('logs');
        stream.pipe(parser);
        parser.on('data', obj => {
            LogHandler.tallyLogs(counter, obj, globalLogTally);
        });
        parser.on('end', () => {
            resolve(true);
        })
    })
}

app.get( "/", async( req, res ) => {
    const globalLogTally = new LogTally();

    for(let counter = 0; counter <= 99; counter++) {
        const stream = fs.createReadStream(`./logs/logs_${counter}.json`, {encoding: 'utf8'});
        await readData(stream, counter, globalLogTally);
    }

    // step 9 print global tally
    res.send( globalLogTally.tally );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );