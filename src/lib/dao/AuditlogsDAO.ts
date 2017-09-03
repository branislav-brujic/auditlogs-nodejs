import {AuditlogsModel} from "../model/AuditlogsModel";

let insertLog = (postData: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        AuditlogsModel.service = postData['service'];
        AuditlogsModel.model = postData['model'];
        AuditlogsModel.object = postData['object'];
        AuditlogsModel.object_pk = postData['object_pk'];
        AuditlogsModel.save(function (err) {
            if (err) throw err;
            console.log('Log saved successfully!');
        });
    })
};

export {
    insertLog
}