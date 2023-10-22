const Messages = require("../models/messageModel");

     // Controller function to get messages between specified users.
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    // Querying the 'Messages' model to find messages where both 'from' and 'to' users are present.
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });  // Sorting messages by their 'updatedAt' timestamp in ascending order.

    // Mapping the retrieved messages to a new format for response.
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    // Sending the formatted messages as a JSON response.
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

// Controller function to add a new message to the database.
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    
    // Checking if the message was successfully created and sending an appropriate response.
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
