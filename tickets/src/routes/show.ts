import express, { Request, Response } from "express";
import { NotFoundError } from '@tamatickets/common'
import { Tickets } from '../models/tickets';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Tickets.findById(req.params.id);

  if(!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
})

export { router as showTicketsRouter }