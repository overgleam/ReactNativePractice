import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("users.db");

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT);",
      [],
      () => {
        console.log("Table created successfully");
      },
      (error) => console.log("Error creating table: ", error)
    );
  });
};

export { db, initDatabase };
