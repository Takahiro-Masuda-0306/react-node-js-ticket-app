import { Subjects, Publisher, PaymentCreatedEvent } from '@tamatickets/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}