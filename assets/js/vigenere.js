function vigenereCipher(text, key, decrypt = false) {
  text = text.toUpperCase();
  key = key.toUpperCase();
  let out = "";
  let keyIndex = 0;

  for (const ch of text) {
    if (/[A-Z]/.test(ch)) {
      const t = ch.charCodeAt(0) - 65;
      const k = key[keyIndex % key.length].charCodeAt(0) - 65;
      const shift = decrypt ? (t - k + 26) % 26 : (t + k) % 26;
      out += String.fromCharCode(shift + 65);
      keyIndex++;
    } else out += ch;
  }
  return out;
}
