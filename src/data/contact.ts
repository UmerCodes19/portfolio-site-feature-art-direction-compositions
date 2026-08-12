export interface ContactData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  preferredMethod: string;
  closingStatement: string;
  socials: {
    name: string;
    label: string;
    url: string;
  }[];
}

// Obfuscation helper: string fragments assembled dynamically to block static scraper bots
const getObfuscatedEmail = () => ["0252umer", "gmail.com"].join(String.fromCharCode(64));
const getObfuscatedPhone = () => ["+92", "334", "3778636"].join(String.fromCharCode(32));

export const CONTACT_DATA: ContactData = {
  name: "Muhammad Umer Qureshi",
  title: "Software Engineer",
  get email() {
    return getObfuscatedEmail();
  },
  get phone() {
    return getObfuscatedPhone();
  },
  location: "Karachi, Sindh, Pakistan (Open to Remote / Relocation)",
  availability: "Available for full-time roles & select engineering contracts.",
  preferredMethod: "Email / LinkedIn / Phone",
  closingStatement: "Always open to discussing new opportunities, full-stack architecture, AI engineering, and technical leadership.",
  socials: [
    {
      name: "LinkedIn",
      label: "linkedin.com/in/umerqureshi19",
      url: "https://www.linkedin.com/in/umerqureshi19"
    },
    {
      name: "GitHub",
      label: "github.com/UmerCodes19",
      url: "https://github.com/UmerCodes19"
    },
    {
      name: "Direct Phone",
      label: "+92 334 3778636",
      url: "tel:+923343778636"
    },
    {
      name: "Resume",
      label: "Download CV (PDF)",
      url: "/resume.pdf"
    }
  ]
};

