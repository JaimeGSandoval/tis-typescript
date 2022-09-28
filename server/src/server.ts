import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: path.join(__dirname, '..', '..', '/.env') });

const { PORT } = process.env || 8001;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// process.on('unhandledRejection', (err: any) => {
//   console.log(err.name, err.message);
//   console.log('UNHANDLED REJECTION... SHUTTING DOWN...');

//   server.close(() => process.exit(1));
// });
