// =========================
// CAESAR CIPHER
// =========================
function caesarCipher(text, shift) {
  const A = "A".charCodeAt(0);
  return text
    .toUpperCase()
    .replace(/[A-Z]/g, ch =>
      String.fromCharCode(((ch.charCodeAt(0) - A + shift + 26) % 26) + A)
    );
}

// =========================
// VIGENERE CIPHER
// =========================
function vigenereCipher(text, key, decrypt = false) {
  text = text.toUpperCase();
  key = key.toUpperCase();
  let out = "";
  let i = 0;

  for (const ch of text) {
    if (/[A-Z]/.test(ch)) {
      const t = ch.charCodeAt(0) - 65;
      const k = key[i % key.length].charCodeAt(0) - 65;
      const shift = decrypt ? (t - k + 26) % 26 : (t + k) % 26;
      out += String.fromCharCode(shift + 65);
      i++;
    } else {
      out += ch;
    }
  }
  return out;
}

// =========================
// CUSTOM CIPHER
// =========================
const cipherMap = {
  A: "0", B: "7", C: "11", D: "12", E: "13",
  F: "14", G: "15", H: "16", I: "21", J: "22",
  K: "23", L: "24", M: "25", N: "26", O: "31",
  P: "32", Q: "33", R: "34", S: "35", T: "36",
  U: "41", V: "42", W: "43", X: "44", Y: "45", Z: "46",
};

const reverseMap = Object.fromEntries(
  Object.entries(cipherMap).map(([k, v]) => [v, k])
);

// digit ke "morse modifikasi"
const digitToSandi = {
  0: ".", 1: "_", 2: "._", 3: "._.",
  4: "._..", 5: ".._.", 6: "_._.", 7: "._._",
};

const sandiToDigit = Object.fromEntries(
  Object.entries(digitToSandi).map(([k, v]) => [v, k])
);

function encryptTextToNumber(t) {
  return t.toUpperCase().split("").map(ch => cipherMap[ch] || ch).join("");
}

function numberToSandi(num) {
  return num.split("").map(n => digitToSandi[n]).join(", ");
}

function sandiToNumber(s) {
  return s.split(/[, ]+/).map(v => sandiToDigit[v] || "").join("");
}

function numberToText(num) {
  let i = 0, out = "";
  while (i < num.length) {
    if (num[i] === "0") { out += "A"; i++; continue; }
    if (num[i] === "7") { out += "B"; i++; continue; }
    const pair = num.slice(i, i + 2);
    if (reverseMap[pair]) {
      out += reverseMap[pair];
      i += 2;
    } else i++;
  }
  return out;
}
