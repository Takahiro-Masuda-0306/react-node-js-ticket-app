import { Publisher, OrderCreatedEvent, Subjects } from "@tamatickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}