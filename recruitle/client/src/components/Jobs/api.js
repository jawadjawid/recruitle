import { send } from '../api.js';

export function sendApplication(jobId, callback) {
    send("POST", "/jobs/apply/", {jobId}, callback);
}