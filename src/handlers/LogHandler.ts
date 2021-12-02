import Log from "../models/log"
import LogTally from "../models/logTally"

export default class LogHandler {
    /*
    * adds logs to log tally and console logs the final count
    ***** should take the logs_id from the parsed json but in the time restriction I couldn't figure out how to extract the ID from the json file with the parser*****
    */
    public static tallyLogs(logsId: number, logs: Log[], globalLogTally: LogTally): void {
        const logTally = new LogTally();
        logTally.logs_id = logsId;

        logs.forEach((l: Log) => {
            const log: Log = new Log(l.id, l.email, l.message);
            // step 2 log message
            console.log(log);
            // add log to log tally for console log
            logTally.addLog(log);
            // add log to global tally
            globalLogTally.addLog(log);
        });

        // step 5 log out the log tally message
        console.log(logTally);

    }
}