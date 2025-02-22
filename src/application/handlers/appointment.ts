import dotenv from 'dotenv';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { DynamoRepository } from '../../infrastructure/dynamo/DynamoRepository';
import { SNS } from 'aws-sdk';
import { Appointment, AppointmentStatus } from '../../domain/entities/Appointment';
import { validateAppointment } from '../../shared/validation';

dotenv.config();

const sns = new SNS();
const dynamoRepository = new DynamoRepository();

const saveAppointment = async (appointment: Appointment): Promise<void> => {
    await dynamoRepository.saveAppointment(appointment);
};

// Función para publicar en SNS
const publishToSNS = async (appointment: Appointment, topicArn: string): Promise<void> => {
    await sns.publish({
        Message: JSON.stringify(appointment),
        TopicArn: topicArn
    }).promise();
};

// Handler principal
export const handler = async (event: APIGatewayEvent, context: Context): Promise<any> => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'No body provided in the request.' })
        };
    }

    const { insuredId, scheduleId, countryISO } = JSON.parse(event.body);

    // Validar la cita antes de proceder
    const validationErrors = validateAppointment({ insuredId, scheduleId, countryISO });
    if (validationErrors.length > 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Validation failed', errors: validationErrors })
        };
    }

    // Crear la cita
    const appointment: Appointment = {
        insuredId,
        scheduleId,
        status: AppointmentStatus.PENDING,  
        countryISO,
    };

    // Guardar en DynamoDB
    await saveAppointment(appointment);

    // Publicar en SNS
    const topicArn = `arn:aws:sns:us-east-1:<account_id>:appointments_topic`; // Reemplaza <account_id> con tu cuenta
    await publishToSNS(appointment, topicArn);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Appointment created and message sent to SNS.' })
    };
};
