module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      released:String,
      synopsis:String,
    },
    { timestamps: true }
  );
  
  const Movie = mongoose.model("movie", schema);
  return Movie;
};
