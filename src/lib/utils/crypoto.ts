const ivLength = 12;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encodeBase64 = (buffer: ArrayBuffer) =>
  typeof window === "undefined"
    ? Buffer.from(buffer).toString("base64")
    : btoa(String.fromCharCode(...new Uint8Array(buffer)));

const decodeBase64 = (base64: string): Uint8Array =>
  typeof window === "undefined"
    ? Buffer.from(base64, "base64")
    : Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

const getKey = async (secret: string) => {
  const keyBytes = encoder.encode(secret.padEnd(32, "0").slice(0, 32));
  return crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
};

export const encrypt = async (text: string, secret: string): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(ivLength));
  const key = await getKey(secret);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(text)
  );

  const encryptedBytes = new Uint8Array(encrypted);
  const combined = new Uint8Array(ivLength + encryptedBytes.length);
  combined.set(iv);
  combined.set(encryptedBytes, ivLength);

  return encodeURIComponent(encodeBase64(combined.buffer));
};

export const decrypt = async (encoded: string, secret: string): Promise<string> => {
  const combined = decodeBase64(decodeURIComponent(encoded));
  if (combined.length <= ivLength) {
    throw new Error("Invalid encrypted data format.");
  }
  const iv = combined.slice(0, ivLength);
  const ciphertext = combined.slice(ivLength);
  const key = await getKey(secret);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return decoder.decode(decrypted);
};
