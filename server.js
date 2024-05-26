import express from 'express';
import cors from 'cors'
import errorHandlingMW from './mw.js';
import todoRoutes from './tasksRoutes.js';

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

app.use('/api/tasks', todoRoutes);

app.use(errorHandlingMW);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
