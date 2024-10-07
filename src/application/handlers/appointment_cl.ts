import { SQSEvent, Context } from 'aws-lambda';
import { RDSRepository } from '../../infrastructure/rds/RDSRepository';

const rdsRepository = new RDSRepository();

export const handler = async (event: SQSEvent, context: Context): Promise<void> => {
    for (const record of event.Records) {
        const appointmentData = JSON.parse(record.body);
        await rdsRepository.saveAppointment(appointmentData);
    }
};
