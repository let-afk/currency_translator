import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

let decoding_ignore = {
  groupId: true,
  service: true,
  formatSize: true,
  ca: true,
};

let unique_ids = {};
let decoded = [];

function decoding() {
  for (let groupNum in encoded) {
    let decoded_group = {};

    for (let key in encoded[groupNum]) {
      if (decoding_ignore[key] || encoded[groupNum][key] === null) {
        decoded_group[key] = encoded[groupNum][key];
        continue;
      }

      if (key.includes("Id")) {
        if (unique_ids[key] === undefined) {
          unique_ids[key] = new Set();
        } else {
          unique_ids[key].add(encoded[groupNum][key]);
        }

        if (translations[key] === undefined) {
          decoded_group[key] = encoded[groupNum][key];
        } else {
          decoded_group[key] = translations[encoded[groupNum][key]];
        }
      }
    }

    decoded.push(decoded_group);
    decoded_group = {};
  }
}

decoding();

console.log(decoded);
console.log(unique_ids);
