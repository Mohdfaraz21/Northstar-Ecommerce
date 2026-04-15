import app from './srcApp.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: "./backend/.env" });

console.log("ENV CHECK:", process.env.MONGO_URI);


const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
