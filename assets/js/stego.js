function loadImage(file) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}

// LSB Encode
function lsbHide(data, msg) {
  const enc = new TextEncoder();
  const bytes = enc.encode(msg);
  const need = (4 + bytes.length) * 8;
  if (need > data.length) return false;

  const len = bytes.length;
  const head = new Uint8Array([
    len >>> 24, len >>> 16, len >>> 8, len & 255,
  ]);
  const all = new Uint8Array(4 + bytes.length);
  all.set(head);
  all.set(bytes, 4);

  let bit = 0;
  for (let b of all) {
    for (let i = 7; i >= 0; i--) {
      const bitVal = (b >> i) & 1;
      data[bit] = (data[bit] & 254) | bitVal;
      bit++;
    }
  }
  return true;
}

// LSB Decode
function lsbExtract(data) {
  let bit = 0;
  const rb = () => data[bit++] & 1;
  const rbyte = () => {
    let v = 0;
    for (let i = 0; i < 8; i++) v = (v << 1) | rb();
    return v;
  };

  if (data.length < 32) return null;

  const lenBytes = new Uint8Array(4);
  for (let i = 0; i < 4; i++) lenBytes[i] = rbyte();

  const len = (lenBytes[0] << 24) |
              (lenBytes[1] << 16) |
              (lenBytes[2] << 8) |
              lenBytes[3];

  if (len <= 0 || len > 1e7) return null;

  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) out[i] = rbyte();

  try {
    return new TextDecoder().decode(out);
  } catch {
    return null;
  }
}
