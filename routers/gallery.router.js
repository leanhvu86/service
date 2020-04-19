module.exports = app => {
    const gallery = require("../controllers/gallery/gallery");
    var VerifyToken = require(__root + 'auth/VerifyToken');
    app.post("/createGallery", VerifyToken, gallery.createGallery);
    app.post("/addGallery", VerifyToken, gallery.addGallery);
    app.post("/removeGallery", VerifyToken, gallery.deleteGallery);
    app.get("/getGalleries", gallery.getGallerys);
    app.get("/getTopGalleries", gallery.getTopGallerys);
    app.post("/findGallery", VerifyToken, gallery.findGallery);
    app.get("/galleryDetail/:id", gallery.galleryDetail);
    app.post("/updateGallery", VerifyToken,gallery.updateGallery);
    app.post("/deleteGallery", VerifyToken,gallery.deleteGallery);
};
