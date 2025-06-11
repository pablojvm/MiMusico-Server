function handleErrors(app) {
  
  app.use("*", (req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {

    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // Sends a generic server error response if headers haven't been sent
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          message: "Internal server error. Check the server console for details",
        });
    }
  });
};

module.exports = handleErrors