const { connection } = require("../config/mySQL");

class User {
  constructor({ name, roll, department }) {
    this.name = name;
    this.roll = roll;
    this.department = department;
  }
  static registerUser({ email, uid, password }) {
    const registerUserData = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "INSERT INTO Users VALUES ( ?, ?, ? )",
          timeout: 4000,
        },
        [uid, email, password],
        function (error, results, fields) {
          if (error != null) {
            console.log(error);
            return reject("Unknown Error Happen");
          }
          return resolve({ uid });
        }
      );
    });
    return registerUserData;
  }
  static getUserByEmail(email) {
    const getUserDataByEmail = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "SELECT * FROM Users WHERE email = ?",
          timeout: 4000,
        },
        [email],
        function (error, results, fields) {
          if (error != null || results.length == 0) {
            return reject("Unknown Error Happen");
          }
          const { email, uid, password } = results[0];
          return resolve({ email, uid, password });
        }
      );
    });
    return getUserDataByEmail;
  }
  static getUserByRoll(roll) {
    const getUserPromise = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "SELECT * FROM student WHERE roll = ?",
          timeout: 4000,
        },
        [roll],
        function (error, results, fields) {
          if (error != null || results.length == 0) {
            return reject("Unknown Error Happen");
          }
          const { name, roll, department } = results[0];
          return resolve({ name, roll, department });
        }
      );
    });
    return getUserPromise;
  }

  static deleteUserByRoll(roll) {
    const deletePromise = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "DELETE FROM student WHERE roll = ?",
          timeout: 4000,
        },
        [roll],
        function (error, results, fields) {
          if (error != null || results.affectedRows == 0) {
            return reject("Unknown Error Happen");
          }
          return resolve("Succesfully excuted");
        }
      );
    });
    return deletePromise;
  }

  data() {
    return {
      name: this.name,
      roll: this.roll,
      department: this.department,
    };
  }
  async update() {
    const updateUserData = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "UPDATE student SET name = ?, department = ? WHERE roll = ?",
          timeout: 4000,
        },
        [this.name, this.department, this.roll],
        function (error, results, fields) {
          if (error != null) {
            return reject("Unknown Error Happen");
          }
          return resolve("Succesfully excuted");
        }
      );
    });
    return updateUserData;
  }

  async save() {
    const saveUserData = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "INSERT INTO student VALUES( ?, ?, ? )",
          timeout: 4000,
        },
        [this.name, this.roll, this.department],
        function (error, results, fields) {
          if (error != null && error.code == "ER_DUP_ENTRY") {
            return reject("Same Roll Exists");
          } else if (error != null) {
            return reject("Unknown Error Happen");
          }
          return resolve("Succesfully excuted");
        }
      );
    });
    return saveUserData;
  }
}

// const saveUser = async ({ name, roll, department }) => {
//   const saveUserData = new Promise((resolve, reject) => {
//     connection.query(
//       {
//         sql: "INSERT INTO student VALUES( ?, ?, ? )",
//         timeout: 4000,
//       },
//       [name, roll, department],
//       function (error, results, fields) {
//         if (error != null && error.code == "ER_DUP_ENTRY") {
//           reject("Same Roll Exists");
//         } else if (error != null) {
//           reject("Unknown Error Happen");
//         }
//         console.log("DATA SAVED");
//         resolve("Succesfully excuted");
//       }
//     );
//   });
//   return saveUserData;
// };

module.exports = { User };
