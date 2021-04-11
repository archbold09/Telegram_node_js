const express = require("express");
const multer = require("multer");

const router = express.Router();
const response = require("../../network/response");

const controller = require("./controller");

const upload = multer({
  dest: "public/files/",
});

router.get("/", function (req, res) {
  const filterMessages = req.query.chat || null;
  controller
    .getMessages(filterMessages)
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((e) => {
      response.error(req, res, "Unexpected Error", 500, e);
    });
});

router.post("/", upload.single("file"), function (req, res) {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((e) => {
      response.error(
        req,
        res,
        "Informacion invalida",
        400,
        "Error en el controlaor"
      );
    });
});

router.patch("/:id", (req, res) => {
  const idMessage = req.params.id;
  const data = req.body.message;
  controller
    .updateMessage(idMessage, data)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error interno", 500, error);
    });
});

router.delete("/:id", (req, res) => {
  const idMessage = req.params.id;
  controller
    .deleteMessage(idMessage)
    .then(() => {
      response.success(req, res, `Mensaje ${idMessage} eliminado.`, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error interno", 500, error);
    });
});

module.exports = router;
