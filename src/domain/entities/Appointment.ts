export enum AppointmentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export interface Appointment {
  insuredId: string;      
  scheduleId: string;     
  countryISO: string;     
  status: AppointmentStatus;
}
