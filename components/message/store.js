const db = require("mongoose");
const Model = require("./model");
db.Promise = global.Promise;
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
db.connect(
  "mongodb+srv://angelarchbold09:angelarchbold09@cluster0.twoul.mongodb.net?retryWrites=true&w=majority",
  options
)
  .then(() => console.log("[DB] Conexion exitosa"))
  .catch((err) => {
    console.log(err);
  });

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessages(filterUser) {
  let filter = {};
  if (filterUser !== null) {
    filter = { user: filterUser };
  }
  const messages = await Model.find(filter);
  return messages;
}

async function updateText(id, message) {
  const foundMessage = await Model.findOne({
    _id: id,
  });
  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

function removeMessage(id) {
  return Model.deleteOne({ _id: id });
}

module.exports = {
  add: addMessage,
  list: getMessages,
  updateText,
  removeMessage,
};
