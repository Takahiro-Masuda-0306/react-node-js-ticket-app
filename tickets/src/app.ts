import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { indexTicketsRouter } from './routes';
import { createTicketsRouter } from './routes/new';
import { showTicketsRouter } from './routes/show';
import { updateTicketsRouter } from './routes/update';
import { errorHandler, NotFoundError, currentUser } from '@tamatickets/common';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);
app.use(currentUser);

app.use(createTicketsRouter);
app.use(showTicketsRouter);
app.use(updateTicketsRouter);
app.use(indexTicketsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};