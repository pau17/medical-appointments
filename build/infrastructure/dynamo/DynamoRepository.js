"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoRepository = void 0;
const aws_sdk_1 = require("aws-sdk");
class DynamoRepository {
    constructor() {
        this.dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
        this.tableName = process.env.DYNAMODB_TABLE || 'Appointments';
    }
    async saveAppointment(appointment) {
        const params = {
            TableName: 'medical-appointments-table',
            Item: {
                insuredId: appointment.insuredId,
                scheduleId: appointment.scheduleId,
                status: appointment.status,
                countryISO: appointment.countryISO
            }
        };
        await this.dynamoDb.put(params).promise();
    }
}
exports.DynamoRepository = DynamoRepository;
