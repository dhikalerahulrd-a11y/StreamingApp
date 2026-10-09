const email = "dhikalerahul.rd@gmail.com";
const result = db.users.updateOne(
  { email: email },
  { $set: { role: "admin" } }
);
printjson(result);
