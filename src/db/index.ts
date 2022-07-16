
import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import { config } from "./config";
import { models } from "./models";

const mongo_db: any = {};
mongo_db.mongoose = mongoose;
mongo_db.url = config.url;
mongo_db.movies = models(mongoose);

export { mongo_db as db };
