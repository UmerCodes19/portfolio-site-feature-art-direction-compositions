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

export const CONTACT_DATA: ContactData = {
  name: "Muhammad Umer Qureshi",
  title: "Software Engineer",
  email: "0252umer@gmail.com",
  phone: "+92 334 3778636",
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

