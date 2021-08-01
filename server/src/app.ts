import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
// import bodyParser from "body-parser";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(todoRoutes);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo.b9cph.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", true);

// console.log(uri);
mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
