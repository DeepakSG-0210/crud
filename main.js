// main.js
const readline = require('readline');
const createRecord = require('./create');
const { readRecords, readRecordById } = require('./read');
const updateRecord = require('./update');
const deleteRecord = require('./delete');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question('Enter operation (create, read, update, delete): ', operation => {
        switch (operation) {
            case 'create':
                rl.question('Enter data to create record (JSON format): ', data => {
                    createRecord(JSON.parse(data), (err, record) => {
                        if (err) {
                            console.error(err);
                            promptUser();
                            return;
                        }
                        console.log('Created record:', record);
                        promptUser();
                    });
                });
                break;
            case 'read':
                rl.question('Enter ID to read record (leave blank to read all records): ', id => {
                    if (id) {
                        readRecordById(id, (err, record) => {
                            if (err) {
                                console.error(err);
                                promptUser();
                                return;
                            }
                            console.log('Record:', record);
                            promptUser();
                        });
                    } else {
                        readRecords((err, records) => {
                            if (err) {
                                console.error(err);
                                promptUser();
                                return;
                            }
                            console.log('All records:', records);
                            promptUser();
                        });
                    }
                });
                break;
            case 'update':
                rl.question('Enter ID of record to update: ', id => {
                    rl.question('Enter new data (JSON format): ', newData => {
                        updateRecord(id, JSON.parse(newData), (err, updatedRecord) => {
                            if (err) {
                                console.error(err);
                                promptUser();
                                return;
                            }
                            console.log('Updated record:', updatedRecord);
                            promptUser();
                        });
                    });
                });
                break;
            case 'delete':
                rl.question('Enter ID to delete record: ', id => {
                    deleteRecord(id, err => {
                        if (err) {
                            console.error(err);
                            promptUser();
                            return;
                        }
                        console.log('Record deleted successfully');
                        promptUser();
                    });
                });
                break;
            default:
                console.log('Invalid operation. Please enter one of: create, read, update, delete');
                promptUser();
                break;
        }
    });
}

promptUser();
