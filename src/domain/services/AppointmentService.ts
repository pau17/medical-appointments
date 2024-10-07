import { Appointment, AppointmentStatus } from '../entities/Appointment';
import { RDSRepository } from '../../infrastructure/rds/RDSRepository';

export class AppointmentService {
  private repository: RDSRepository;

  constructor(repository?: RDSRepository) {
    this.repository = repository || new RDSRepository();
  }

  public async createAppointment(id: string, patientName: string, date: Date): Promise<Appointment> {
    const appointment: Appointment = {
      insuredId: id,
      scheduleId: patientName, 
      countryISO: 'US', 
      status: AppointmentStatus.PENDING
    };

    await this.repository.saveAppointment(appointment);

    return appointment;
  }

  public async getAppointmentById(id: string): Promise<Appointment | null> {
    const appointment = await this.repository.getAppointmentById(id);

    if (!appointment) {
      throw new Error(`La cita con ID ${id} no fue encontrada.`);
    }

    return appointment;
  }

  public async confirmAppointment(id: string): Promise<void> {
    const appointment = await this.getAppointmentById(id);

    if (appointment && appointment.status !== AppointmentStatus.PENDING) {
      throw new Error(`Solo se pueden confirmar citas en estado PENDING.`);
    }

    await this.repository.updateAppointmentStatus(id, AppointmentStatus.COMPLETED); // Se ajusta a los estados disponibles
  }

  public async cancelAppointment(id: string): Promise<void> {
    const appointment = await this.getAppointmentById(id);

    if (!appointment || appointment.status === AppointmentStatus.CANCELED) {
      throw new Error(`La cita ya ha sido cancelada o no existe.`);
    }

    await this.repository.updateAppointmentStatus(id, AppointmentStatus.CANCELED);
  }

  public async completeAppointment(id: string): Promise<void> {
    const appointment = await this.getAppointmentById(id);

    if (appointment && appointment.status !== AppointmentStatus.COMPLETED) {
      throw new Error(`Solo se pueden completar citas en estado COMPLETED.`);
    }

    await this.repository.updateAppointmentStatus(id, AppointmentStatus.COMPLETED);
  }

  public async rescheduleAppointment(id: string, newDate: Date): Promise<void> {
    const appointment = await this.getAppointmentById(id);

    if (!appointment || appointment.status === AppointmentStatus.CANCELED) {
      throw new Error(`No se pueden reprogramar citas canceladas o inexistentes.`);
    }

    await this.repository.rescheduleAppointment(id, newDate);
  }
}
