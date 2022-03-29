const { connection } = require("../config/mySQL");

class Link {
  constructor({ url, uid, genUrl }) {
    this.url = url;
    this.uid = uid;
    this.genUrl = genUrl;
  }
  static deleteUrlById(id) {
    const deleteUrl = new Promise();
    return deleteUrl;
  }
  static getAllLinks(uid) {
    const getLinks = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "SELECT * FROM URLs WHERE uid = ?",
          timeout: 4000,
        },
        [uid],
        function (error, results, fields) {
          if (error != null) {
            console.log(error);
            return reject("Unknown Error Happen");
          }
          return resolve(results);
        }
      );
    });
    return getLinks;
  }
  static getLinkById(uid, id) {
    const getLink = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "SELECT * FROM URLs WHERE uid = ? AND id = ?",
          timeout: 4000,
        },
        [uid, id],
        function (error, results, fields) {
          if (error != null || results.length == 0) {
            console.log(error);
            return reject("Unknown Error Happen");
          }
          return resolve(results[0]);
        }
      );
    });
    return getLink;
  }
  save() {
    const saveUrl = new Promise((resolve, reject) => {
      connection.query(
        {
          sql: "INSERT INTO URLs VALUES ( NULL, ?, ?, ? )",
          timeout: 4000,
        },
        [this.url, this.genUrl, this.uid],
        function (error, results, fields) {
          if (error != null) {
            console.log(error);
            return reject("Unknown Error Happen");
          }
          return resolve("Successfully Executed");
        }
      );
    });
    return saveUrl;
  }
}

module.exports = { Link };
