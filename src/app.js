import express from 'express';
import authRouter from './routes/auth.route.js';
import errorHandler from './middlewares/error.js';
import serviceRouter from './routes/service.route.js';
import orderRouter from './routes/order.route.js';

const app = express();

app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/service', serviceRouter);
app.use('/order', orderRouter);

// Error handling
app.use(errorHandler);

export default app;