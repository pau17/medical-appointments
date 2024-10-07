import { Appointment, AppointmentStatus } from '../../domain/entities/Appointment';
import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize(process.env.RDS_CONNECTION_STRING || '', {
  dialect: 'mysql',
  logging: false,
});

class AppointmentModel extends Model {
  public id!: string;
  public scheduleId!: string;
  public countryISO!: string;
  public status!: AppointmentStatus;
}

AppointmentModel.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  scheduleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryISO: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELED'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Appointment',
  tableName: 'appointments',
  timestamps: false,
});

export class RDSRepository {

  constructor() {
    sequelize.authenticate()
      .then(() => console.log('Conexión establecida correctamente con RDS.'))
      .catch((error) => console.error('Error al conectar con RDS:', error));
  }
 
  public async getAppointmentById(id: string): Promise<Appointment | null> {
    const appointmentRecord = await AppointmentModel.findByPk(id);
    if (!appointmentRecord) {
      return null;
    }

    return {
      insuredId: appointmentRecord.id,
      scheduleId: appointmentRecord.scheduleId,
      countryISO: appointmentRecord.countryISO,
      status: appointmentRecord.status as AppointmentStatus
    };
  }

  // Guardar una nueva cita
  public async saveAppointment(appointment: Appointment): Promise<void> {
    await AppointmentModel.create({
      id: appointment.insuredId,
      scheduleId: appointment.scheduleId,
      countryISO: appointment.countryISO,
      status: appointment.status,
    });
  }

  public async updateAppointmentStatus(id: string, newStatus: AppointmentStatus): Promise<void> {
    await AppointmentModel.update(
      { status: newStatus },
      { where: { id } }
    );
  }

  public async rescheduleAppointment(id: string, newDate: Date): Promise<void> {
    await AppointmentModel.update(
      { date: newDate },
      { where: { id } }
    );
  }

  public async deleteAppointment(id: string): Promise<void> {
    await AppointmentModel.destroy({ where: { id } });
  }
}
