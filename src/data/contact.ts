export interface ContactData {
  email: string;
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
  email: "umerquraishi.dev@gmail.com",
  location: "Karachi, Pakistan (Open to Remote / Relocation)",
  availability: "Available for full-time roles & select engineering contracts.",
  preferredMethod: "Email / LinkedIn",
  closingStatement: "Always open to discussing new opportunities, software architecture, and product engineering.",
  socials: [
    {
      name: "LinkedIn",
      label: "linkedin.com/in/umer-quraishi",
      url: "https://linkedin.com/in/umer-quraishi"
    },
    {
      name: "GitHub",
      label: "github.com/umerquraishi",
      url: "https://github.com/umerquraishi"
    },
    {
      name: "Resume",
      label: "Download CV (PDF)",
      url: "/resume.pdf"
    }
  ]
};
