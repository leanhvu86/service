module.exports = app => {
    const gallery = require("../controllers/gallery/gallery");
    var VerifyToken = require(__root + 'auth/VerifyToken');
    var VerifyUserByToken = require(__root + 'auth/VerifyUserByToken');
    app.post("/createGallery", VerifyUserByToken, gallery.createGallery);
    app.post("/addGallery",  VerifyUserByToken,gallery.addGallery);
    app.post("/removeGallery", VerifyUserByToken,gallery.deleteGallery);
    app.get("/getGalleries", gallery.getGallerys);
    app.get("/getTopGalleries", gallery.getTopGallerys);
    app.post("/findGallery", VerifyToken, gallery.findGallery);
    app.get("/galleryDetail/:id", gallery.galleryDetail);
    app.post("/updateGallery",VerifyUserByToken,gallery.updateGallery);
    app.post("/deleteGallery",VerifyUserByToken,gallery.deleteGallery);
};

