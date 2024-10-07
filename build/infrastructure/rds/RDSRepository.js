"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDSRepository = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.RDS_CONNECTION_STRING || '', {
    dialect: 'mysql',
    logging: false,
});
class AppointmentModel extends sequelize_1.Model {
}
AppointmentModel.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    scheduleId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    countryISO: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELED'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: false,
});
class RDSRepository {
    constructor() {
        sequelize.authenticate()
            .then(() => console.log('Conexión establecida correctamente con RDS.'))
            .catch((error) => console.error('Error al conectar con RDS:', error));
    }
    async getAppointmentById(id) {
        const appointmentRecord = await AppointmentModel.findByPk(id);
        if (!appointmentRecord) {
            return null;
        }
        return {
            insuredId: appointmentRecord.id,
            scheduleId: appointmentRecord.scheduleId,
            countryISO: appointmentRecord.countryISO,
            status: appointmentRecord.status
        };
    }
    // Guardar una nueva cita
    async saveAppointment(appointment) {
        await AppointmentModel.create({
            id: appointment.insuredId,
            scheduleId: appointment.scheduleId,
            countryISO: appointment.countryISO,
            status: appointment.status,
        });
    }
    async updateAppointmentStatus(id, newStatus) {
        await AppointmentModel.update({ status: newStatus }, { where: { id } });
    }
    async rescheduleAppointment(id, newDate) {
        await AppointmentModel.update({ date: newDate }, { where: { id } });
    }
    async deleteAppointment(id) {
        await AppointmentModel.destroy({ where: { id } });
    }
}
exports.RDSRepository = RDSRepository;
