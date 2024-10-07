"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const Appointment_1 = require("../entities/Appointment");
const RDSRepository_1 = require("../../infrastructure/rds/RDSRepository");
class AppointmentService {
    constructor(repository) {
        this.repository = repository || new RDSRepository_1.RDSRepository();
    }
    async createAppointment(id, patientName, date) {
        const appointment = {
            insuredId: id,
            scheduleId: patientName,
            countryISO: 'US',
            status: Appointment_1.AppointmentStatus.PENDING
        };
        await this.repository.saveAppointment(appointment);
        return appointment;
    }
    async getAppointmentById(id) {
        const appointment = await this.repository.getAppointmentById(id);
        if (!appointment) {
            throw new Error(`La cita con ID ${id} no fue encontrada.`);
        }
        return appointment;
    }
    async confirmAppointment(id) {
        const appointment = await this.getAppointmentById(id);
        if (appointment && appointment.status !== Appointment_1.AppointmentStatus.PENDING) {
            throw new Error(`Solo se pueden confirmar citas en estado PENDING.`);
        }
        await this.repository.updateAppointmentStatus(id, Appointment_1.AppointmentStatus.COMPLETED); // Se ajusta a los estados disponibles
    }
    async cancelAppointment(id) {
        const appointment = await this.getAppointmentById(id);
        if (!appointment || appointment.status === Appointment_1.AppointmentStatus.CANCELED) {
            throw new Error(`La cita ya ha sido cancelada o no existe.`);
        }
        await this.repository.updateAppointmentStatus(id, Appointment_1.AppointmentStatus.CANCELED);
    }
    async completeAppointment(id) {
        const appointment = await this.getAppointmentById(id);
        if (appointment && appointment.status !== Appointment_1.AppointmentStatus.COMPLETED) {
            throw new Error(`Solo se pueden completar citas en estado COMPLETED.`);
        }
        await this.repository.updateAppointmentStatus(id, Appointment_1.AppointmentStatus.COMPLETED);
    }
    async rescheduleAppointment(id, newDate) {
        const appointment = await this.getAppointmentById(id);
        if (!appointment || appointment.status === Appointment_1.AppointmentStatus.CANCELED) {
            throw new Error(`No se pueden reprogramar citas canceladas o inexistentes.`);
        }
        await this.repository.rescheduleAppointment(id, newDate);
    }
}
exports.AppointmentService = AppointmentService;
