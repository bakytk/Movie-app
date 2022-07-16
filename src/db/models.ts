
const models = (mongoose) => {
  var schema = mongoose.Schema({
    Title: {
      type: String,
      required: true
    },
    Released: {
      type: Date,
      required: true
    },
    Genre: {
      type: String,
      required: true
    },
    Director: {
      type: String,
      required: true
    },
    UserName: {
      type: String,
      required: true
    },
    UserRole: {
      type: String,
      required: true
    },
    CreatedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    UpdateAt: {
      type: Date,
      required: true,
      default: Date.now
    },
  });
  return mongoose.model("Movie", schema);
};

export { models };
