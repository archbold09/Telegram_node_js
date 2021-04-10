const express = require("express");
const router = express.Router();
const response = require("../../network/response");

const controller = require("./controller");

router.get("/", (req, res) => {
  const filterMessages = req.query.user || null;

  controller
    .getMessages(filterMessages)
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((error) => {
      response.error(req, res, "Error inesperado", 500, error);
    });
});

router.post("/", (req, res) => {
  controller
    .addMessage(req.body.user, req.body.message)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((error) => {
      response.error(req, res, "Información invalida", 400, error);
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
