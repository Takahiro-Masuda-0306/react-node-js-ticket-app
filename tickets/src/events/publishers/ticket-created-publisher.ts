import { Publisher, Subjects, TicketCreatedEvent } from '@tamatickets/common';

export class TicketCreatePublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

