const ivLength = 12;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encodeBase64 = (buffer: ArrayBuffer): string => {
  return Buffer.from(buffer).toString("base64");
};

const decodeBase64 = (base64: string): Uint8Array => {
  return new Uint8Array(Buffer.from(base64, "base64"));
};

const getKey = async (secret: string): Promise<CryptoKey> => {
  const keyBytes = encoder.encode(secret.padEnd(32, "0").slice(0, 32));
  return crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
};

export const encrypt = async (text: string, secret: string): Promise<string> => {
  try {
    const iv = crypto.getRandomValues(new Uint8Array(ivLength));
    const key = await getKey(secret);
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(text),
    );

    const encryptedBytes = new Uint8Array(encrypted);
    const combined = new Uint8Array(ivLength + encryptedBytes.length);
    combined.set(iv);
    combined.set(encryptedBytes, ivLength);

    return encodeURIComponent(encodeBase64(combined.buffer));
  } catch (err) {
    console.error("Encryption failed:", err);
    throw new Error("Encryption failed");
  }
};

export const decrypt = async (encoded: string, secret: string): Promise<string | null> => {
  try {
    const raw = decodeURIComponent(encoded);
    const combined = decodeBase64(raw);

    if (combined.length <= ivLength || combined.length > 2048) {
      console.warn("🚨 Invalid encrypted format or suspicious input:", raw);
      return null;
    }

    const iv = combined.slice(0, ivLength);
    const ciphertext = combined.slice(ivLength);
    const key = await getKey(secret);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
    return decoder.decode(decrypted);
  } catch (err) {
    console.error("❌ Decryption failed:", err);
    return null;
  }
};