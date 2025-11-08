// CAESAR
document.getElementById("btnCaesarEnc").onclick = () => {
  const t = document.getElementById("caesarText").value;
  const s = parseInt(document.getElementById("caesarShift").value) || 3;
  document.getElementById("caesarOutput").innerText = caesarCipher(t, s);
};

document.getElementById("btnCaesarDec").onclick = () => {
  const t = document.getElementById("caesarText").value;
  const s = parseInt(document.getElementById("caesarShift").value) || 3;
  document.getElementById("caesarOutput").innerText = caesarCipher(t, -s);
};

// VIGENERE
document.getElementById("btnVigEnc").onclick = () => {
  const t = document.getElementById("vigenereText").value;
  const k = document.getElementById("vigenereKey").value || "KEY";
  document.getElementById("vigenereOutput").innerText =
    vigenereCipher(t, k, false);
};

document.getElementById("btnVigDec").onclick = () => {
  const t = document.getElementById("vigenereText").value;
  const k = document.getElementById("vigenereKey").value || "KEY";
  document.getElementById("vigenereOutput").innerText =
    vigenereCipher(t, k, true);
};

// CUSTOM
document.getElementById("btnCustomEnc").onclick = () => {
  const t = document.getElementById("customText").value.trim();
  const num = encryptTextToNumber(t);
  const morse = numberToSandi(num);

  document.getElementById("customNumber").innerText = num;
  document.getElementById("customMorse").innerText = morse;
};

document.getElementById("btnCustomDec").onclick = () => {
  const t = document.getElementById("customText").value.trim();
  let num = "", result = "";

  if (/^[._,\s]+$/.test(t)) {
    num = sandiToNumber(t);
    result = numberToText(num);
  } else if (/^\d+$/.test(t)) {
    num = t;
    result = numberToText(t);
  } else {
    result = "(format tidak dikenali)";
  }

  document.getElementById("customNumber").innerText = num;
  document.getElementById("customMorse").innerText = result;
};

// STEGANOGRAFI
const stegoFile = document.getElementById("stegoFile");
const stegoPreview = document.getElementById("stegoPreview");
let stegoCanvas = document.createElement("canvas");

stegoFile.onchange = async () => {
  const file = stegoFile.files[0];
  if (!file) return;

  const img = await loadImage(file);
  stegoCanvas.width = img.width;
  stegoCanvas.height = img.height;

  const ctx = stegoCanvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  stegoPreview.src = stegoCanvas.toDataURL();
};

document.getElementById("hideMsg").onclick = () => {
  const ctx = stegoCanvas.getContext("2d");
  const img = ctx.getImageData(0, 0, stegoCanvas.width, stegoCanvas.height);

  const msg = document.getElementById("stegoMsg").value;
  if (lsbHide(img.data, msg)) {
    ctx.putImageData(img, 0, 0);
    stegoPreview.src = stegoCanvas.toDataURL();
    alert("Pesan disisipkan ke gambar!");
  } else {
    alert("Pesan terlalu panjang.");
  }
};

document.getElementById("extractMsg").onclick = () => {
  const ctx = stegoCanvas.getContext("2d");
  const img = ctx.getImageData(0, 0, stegoCanvas.width, stegoCanvas.height);
  const msg = lsbExtract(img.data);
  document.getElementById("extractedMsg").value = msg || "[tidak ada pesan]";
};

document.getElementById("downloadStego").onclick = () => {
  const a = document.createElement("a");
  a.href = stegoCanvas.toDataURL("image/png");
  a.download = "stego.png";
  a.click();
};
