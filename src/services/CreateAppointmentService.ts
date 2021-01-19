import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {

  private appointmentsRepository;

  constructor(appointmentsRepository:AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentsInSameDate = this.appointmentsRepository.finByDate(appointmentDate);

    if (findAppointmentsInSameDate) {
      throw Error('this appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment;
  }
}

export default CreateAppointmentService;
