import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Tickets } from "../models/tickets";

import { requireAuth, ValidateRequest } from "@tamatickets/common";

import { natsWrapper } from "../nats-wrapper";
import { TicketCreatePublisher } from "../events/publishers/ticket-created-publisher";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Tickets.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();
    await new TicketCreatePublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version
    });
    res.status(201).send(ticket);
  }
);

export { router as createTicketsRouter };
