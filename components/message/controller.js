const store = require("./store");

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error("[messageController] No hay usuaro o mensaje");
      reject("Los datos son incorrectos.");
      return false;
    }
    const fullMessage = {
      user: user,
      message: message,
      date: new Date(),
    };

    store.add(fullMessage);

    resolve(fullMessage);
  });
}

function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject("Datos invalidos");
      return false;
    }
    const result = await store.updateText(id, message);
    resolve(result);
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Id invalido");
      return false;
    }
    store
      .removeMessage(id)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
