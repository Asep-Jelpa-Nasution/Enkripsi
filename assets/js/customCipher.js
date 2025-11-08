// =============== Cipher Buatan Sendiri ===============

// Mapping huruf -> angka
const cipherMap = {
  A: "0",  B: "7",
  C: "11", D: "12", E: "13", F: "14", G: "15", H: "16",
  I: "21", J: "22", K: "23", L: "24", M: "25", N: "26",
  O: "31", P: "32", Q: "33", R: "34", S: "35", T: "36",
  U: "41", V: "42", W: "43", X: "44", Y: "45", Z: "46",
};

// Balikan angka -> huruf
const reverseMap = Object.fromEntries(
  Object.entries(cipherMap).map(([char, code]) => [code, char])
);

// Mapping digit -> sandi
const digitToSandi = {
  0: ".", 
  1: "_",
  2: "._",
  3: "._.",
  4: "._..",
  5: ".._.",
  6: "_._.",
  7: "._._"
};

// Balikan sandi -> digit
const sandiToDigit = Object.fromEntries(
  Object.entries(digitToSandi).map(([digit, sandi]) => [sandi, digit])
);


// ======= FUNGSI =======

// Huruf -> kode angka
function encryptTextToNumber(text) {
  return [...text.toUpperCase()]
    .map(ch => cipherMap[ch] || ch)
    .join("");
}

// Angka -> sandi titik-garis
function numberToSandi(numStr) {
  return [...numStr]
    .map(d => digitToSandi[d] || "")
    .filter(Boolean)
    .join(", ");
}

// Sandi -> angka
function sandiToNumber(sandiStr) {
  return sandiStr
    .split(/[, ]+/)
    .filter(Boolean)
    .map(tok => sandiToDigit[tok] || "")
    .join("");
}

// Angka -> huruf (termasuk kode 1-digit & 2-digit)
function numberToText(numStr) {
  let i = 0;
  let out = "";

  while (i < numStr.length) {
    const single = numStr[i];
    const double = numStr.slice(i, i + 2);

    if (single === "0") {
      out += "A";
      i++;
    } 
    else if (single === "7") {
      out += "B";
      i++;
    } 
    else if (reverseMap[double]) {
      out += reverseMap[double];
      i += 2;
    } 
    else {
      i++;
    }
  }

  return out;
}


// ======= HANDLER BUTTON =======
function customEncrypt() {
  const text = document.getElementById("customText").value.trim();
  const num = encryptTextToNumber(text);
  const sandi = numberToSandi(num);

  document.getElementById("customNumber").innerText = num;
  document.getElementById("customMorse").innerText = sandi;
}

function customDecrypt() {
  const text = document.getElementById("customText").value.trim();
  let num = "";
  let result = "";

  if (/^[._,\s]+$/.test(text)) {
    num = sandiToNumber(text);
    result = numberToText(num);
  }
  else if (/^\d+$/.test(text)) {
    num = text;
    result = numberToText(num);
  }
  else {
    result = "(format tidak dikenali)";
  }

  document.getElementById("customNumber").innerText = num;
  document.getElementById("customMorse").innerText = result;
}
