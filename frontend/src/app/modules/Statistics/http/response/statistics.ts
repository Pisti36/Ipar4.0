import { nodeReport } from "./nodeReport";

export class Statistics {
    solved: number;
    unsolved: number;
    reportTimes: string[];
    reportsTimesSinceComission: number[];
    reportDuration: number[];
    nodeReports: nodeReport[];
}