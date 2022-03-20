import { sendFiles } from '../api.js';

// add an image to the gallery
export function uploadResume(file, callback){
    sendFiles("POST", "/resumes/", {file: file}, function(err, res){
        if (err) return callback(err);
        else return callback(null);
    });
};
    
