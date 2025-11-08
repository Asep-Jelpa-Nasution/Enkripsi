// ===================== Steganografi LSB =====================

// Memuat gambar sebagai objek <img>
export function loadImage(file) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}

// Menyisipkan pesan ke LSB piksel
export function lsbHide(data, msg) {
  const enc = new TextEncoder();
  const bytes = enc.encode(msg);

  // Total bit yang dibutuhkan: 4 byte panjang + isi pesan
  const need = (4 + bytes.length) * 8;
  if (need > data.length) return false;

  const len = bytes.length;

  // Header panjang pesan (4 byte)
  const lenArr = new Uint8Array([
    (len >>> 24) & 255,
    (len >>> 16) & 255,
    (len >>> 8) & 255,
    len & 255
  ]);

  const all = new Uint8Array(4 + bytes.length);
  all.set(lenArr);
  all.set(bytes, 4);

  // Sisipkan bit ke LSB
  let bit = 0;
  for (let i = 0; i < all.length; i++) {
    for (let b = 7; b >= 0; b--) {
      const bitVal = (all[i] >> b) & 1;
      data[bit] = (data[bit] & 254) | bitVal;  // set LSB
      bit++;
    }
  }

  return true;
}

// Mengambil pesan dari LSB piksel
export function lsbExtract(data) {
  let bit = 0;

  const rb = () => data[bit++] & 1;

  const rbyte = () => {
    let v = 0;
    for (let i = 0; i < 8; i++) v = (v << 1) | rb();
    return v;
  };

  if (data.length < 32) return null;

  // Baca 4 byte panjang pesan
  const lenArr = new Uint8Array(4);
  for (let i = 0; i < 4; i++) lenArr[i] = rbyte();

  const len = (
    (lenArr[0] << 24) |
    (lenArr[1] << 16) |
    (lenArr[2] << 8) |
    lenArr[3]
  ) >>> 0;

  if (len <= 0 || len > 1e7) return null;

  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) out[i] = rbyte();

  try {
    return new TextDecoder().decode(out);
  } catch {
    return null;
  }
}
