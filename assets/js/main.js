document.addEventListener("DOMContentLoaded", () => {
  
  // Inject UI Caesar
  document.getElementById("caesarSection").innerHTML = `
    <h2>1️⃣ Caesar Cipher</h2>
    <input id="caesarText" placeholder="Masukkan teks..." />
    <input id="caesarShift" type="number" placeholder="Shift (misal: 3)" />
    <button onclick="handleCaesar(true)">Enkripsi</button>
    <button onclick="handleCaesar(false)">Dekripsi</button>
    <div class="output" id="caesarOutput"></div>
  `;

  // Function handler
  window.handleCaesar = function(isEncrypt) {
    const t = document.getElementById("caesarText").value;
    const s = parseInt(document.getElementById("caesarShift").value) || 3;
    document.getElementById("caesarOutput").innerText =
      isEncrypt ? caesarCipher(t, s) : caesarCipher(t, -s);
  };

  // (Vigenere, Custom Cipher, Stego akan disisipkan dengan cara serupa)
});
