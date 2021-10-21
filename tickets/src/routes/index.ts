import express, { Request, Response } from "express";
import { Tickets } from "../models/tickets";

import { requireAuth } from "@tamatickets/common";

const router = express.Router();

router.get("/api/tickets", 
requireAuth, 
async (req: Request, res: Response) => {
  const tickets = await Tickets.find({});

  res.send(tickets);
});

export { router as indexTicketsRouter };
