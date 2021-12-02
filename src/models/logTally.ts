import Log from "./log";
import _ from "lodash";

interface TallyRecord {
    email: string;
    total: number;
}
export default class LogTally {
    logs_id: number;
    tally: TallyRecord[];

    constructor() {
        this.logs_id = 0;
        this.tally = [];
    }

    public addLog(log: Log): void {

        const existingRecordIndex = _.findIndex(this.tally, {email: log.email});

        if(existingRecordIndex == -1) {
            this.tally.push({
                email: log.email,
                total: 1
            });
        } else {
            this.tally[existingRecordIndex].total += 1;
        }

    }

    public displayTally(): string {
        return JSON.stringify(this.tally);
    }

}