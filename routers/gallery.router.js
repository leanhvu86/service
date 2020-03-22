
module.exports = app => {
  const comments = require("../controllers/gallery/gallery");
  var VerifyToken = require(__root + 'auth/VerifyToken');
  app.post("/createGallery", VerifyToken,comments.createGallery);
  app.post("/addGallery", VerifyToken,comments.addGallery);
  app.post("/removeGallery",VerifyToken, comments.deleteGallery);
  app.get("/getGalleries", comments.getGallerys);
  app.get("/getTopGalleries", comments.getTopGallerys);
  app.post("/findGallery", comments.findGallery);
};
