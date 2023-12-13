export function convertMessageId(messageID) {
  messageID = messageID.replace(/<|>/g, "");
  var atIndex = messageID.indexOf("@");
  return messageID.substring(0, atIndex);
}
