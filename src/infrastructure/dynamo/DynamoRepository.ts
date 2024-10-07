import { DynamoDB } from 'aws-sdk';
import { Appointment } from '../../domain/entities/Appointment';

export class DynamoRepository {
    private dynamoDb: DynamoDB.DocumentClient;
    private tableName: string;

    constructor() {
        this.dynamoDb = new DynamoDB.DocumentClient();
        this.tableName = process.env.DYNAMODB_TABLE || 'Appointments';
    }

    public async saveAppointment(appointment: Appointment): Promise<void> {
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
