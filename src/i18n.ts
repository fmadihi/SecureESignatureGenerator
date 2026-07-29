export type Lang = "fa" | "en" | "de";
export interface Translations {
  title: string;
  name: string;
  role: string;
  publicKey: string;
  drawTab: string;
  typeTab: string;
  color: string;
  thickness: string;
  font: string;
  clear: string;
  generate: string;
  payloadLabel: string;
  hashLabel: string;
  typedPlaceholder: string;
  namePlaceholder: string;
  rolePlaceholder: string;
  keyPlaceholder: string;
}

export const t: Record<Lang, Translations> = {
  fa: {
    title: "ژنراتور امضای دیجیتال",
    drawTab: "رسم امضا",
    typeTab: "تایپ امضا",
    generate: "تولید هش / Base64",
    payloadLabel: "Base64 Payload (شبیه‌سازی ارسال به بک‌اند):",
    hashLabel: "Hash (SHA-like):",
    name: "نام و نام خانوادگی",
    role: "سمت / عنوان شغلی",
    publicKey: "کلید عمومی (اختیاری)",
    color: "رنگ:",
    thickness: "ضخامت:",
    font: "فونت:",
    clear: "پاک کردن",
    typedPlaceholder: "امضای شما",
    namePlaceholder: "فاطمه مدیحی",
    rolePlaceholder: "Frontend Developer",
    keyPlaceholder: "ssh-rsa AAAA...",
  },
  en: {
    title: "Secure E-Signature Generator",
    drawTab: "Draw Signature",
    typeTab: "Type Signature",
    generate: "Generate Hash / Base64",
    payloadLabel: "Base64 Payload (simulated backend send):",
    hashLabel: "Hash (SHA-like):",
    name: "Full Name",
    role: "Job Title / Role",
    publicKey: "Public Key (optional)",
    color: "Color:",
    thickness: "Thickness:",
    font: "Font:",
    clear: "Clear",
    typedPlaceholder: "Your Signature",
    namePlaceholder: "Fatemeh Madihi",
    rolePlaceholder: "Frontend Developer",
    keyPlaceholder: "ssh-rsa AAAA...",
  },
  de: {
    title: "Sicherer E-Signatur-Generator",
    drawTab: "Unterschrift zeichnen",
    typeTab: "Unterschrift tippen",
    generate: "Hash / Base64 generieren",
    payloadLabel: "Base64-Payload (simulierter Backend-Versand):",
    hashLabel: "Hash (SHA-ähnlich):",
    name: "Vor- und Nachname",
    role: "Berufsbezeichnung",
    publicKey: "Öffentlicher Schlüssel (optional)",
    color: "Farbe:",
    thickness: "Stärke:",
    font: "Schriftart:",
    clear: "Löschen",
    typedPlaceholder: "Ihre Unterschrift",
    namePlaceholder: "Fatemeh Madihi",
    rolePlaceholder: "Frontend-Entwicklerin",
    keyPlaceholder: "ssh-rsa AAAA...",
  },
};
