const Model = require("./model");

function addMessage(message) {
  const myMessage = new Model(message);
  return myMessage.save();
}

async function listUsers() {
  const users = await Model.find();
  return users;
}

module.exports = {
  add: addMessage,
  list: listUsers,
};
