"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const DynamoRepository_1 = require("../../infrastructure/dynamo/DynamoRepository");
const aws_sdk_1 = require("aws-sdk");
const Appointment_1 = require("../../domain/entities/Appointment");
const validation_1 = require("../../shared/validation");
dotenv_1.default.config();
const sns = new aws_sdk_1.SNS();
const dynamoRepository = new DynamoRepository_1.DynamoRepository();
const saveAppointment = async (appointment) => {
    await dynamoRepository.saveAppointment(appointment);
};
// Función para publicar en SNS
const publishToSNS = async (appointment, topicArn) => {
    await sns.publish({
        Message: JSON.stringify(appointment),
        TopicArn: topicArn
    }).promise();
};
// Handler principal
const handler = async (event, context) => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'No body provided in the request.' })
        };
    }
    const { insuredId, scheduleId, countryISO } = JSON.parse(event.body);
    // Validar la cita antes de proceder
    const validationErrors = (0, validation_1.validateAppointment)({ insuredId, scheduleId, countryISO });
    if (validationErrors.length > 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Validation failed', errors: validationErrors })
        };
    }
    // Crear la cita
    const appointment = {
        insuredId,
        scheduleId,
        status: Appointment_1.AppointmentStatus.PENDING,
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
exports.handler = handler;
