import { Subjects, Publisher, ExpirationCompleteEvent } from "@tamatickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    
}