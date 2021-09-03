import { parseISO, startOfHour } from 'date-fns';
import { Request, Response, Router } from 'express';

import AppointmentsRepository from '../repositories/AppointmentsRepository';



const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/get', (request, response) => {
    const appointments = appointmentsRepository.getAll();

    return response.json(appointments)
});

appointmentsRouter.post('/create', (request: Request, response: Response) => {
    const { provider, date } = request.body;
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate)
    if (findAppointmentInSameDate) {
        return response.status(400).json({ message: 'This appointment is already booked' });
    }
    // const appointment = new Appointment(provider, parsedDate)

    const appointment = appointmentsRepository.create({ provider, date: parsedDate });
    return response.json(appointment)
})

export default appointmentsRouter;