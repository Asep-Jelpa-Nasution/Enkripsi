function caesarCipher(text, shift) {
  const A = "A".charCodeAt(0);
  return text.toUpperCase().replace(/[A-Z]/g, ch =>
    String.fromCharCode(((ch.charCodeAt(0) - A + shift + 26) % 26) + A)
  );
}
