import { request, response, Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  response.json(appointmentsRepository.all());
})

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = parseISO(date);

  try {
      const createAppointment = new CreateAppointmentService(appointmentsRepository);
      const appointment = createAppointment.execute({provider,date:parsedDate});
      return response.status(201).json(appointment);
  } catch (error) {
    return response.status(400).json({error: error.message});
  }
})

export default appointmentsRouter;
