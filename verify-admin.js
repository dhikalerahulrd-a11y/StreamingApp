printjson(
  db.users.findOne(
    { email: "dhikalerahul.rd@gmail.com" },
    { name: 1, email: 1, role: 1 }
  )
);
