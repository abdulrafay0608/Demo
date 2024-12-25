export const contacts = Array.from({ length: 20 }, (_, i) => ({
  _id: i + 1,
  name: `Contact ${i + 1}`,
  email: `contact${i + 1}@example.com`,
  phone: `+12345678${i + 100}`, // Generate dummy phone numbers
}));

export const priorities = [
  { _id: 1, priority: "Low" },
  { _id: 2, priority: "Medium" },
  { _id: 3, priority: "High" },
];

export const departments = [
  { _id: 1, department: "Marketing" },
  { _id: 2, department: "Sales" },
  { _id: 3, department: "Abuse" },
  { _id: 4, department: "Support" },
  { _id: 5, department: "Billing" },
];

export const services = [
  { _id: "1", service: "Web Development" },
  { _id: "2", service: "Mobile App Development" },
  { _id: "3", service: "UI/UX Design" },
  { _id: "4", service: "Digital Marketing" },
  { _id: "5", service: "SEO Optimization" },
  { _id: "6", service: "Content Writing" },
  { _id: "7", service: "Graphic Design" },
  { _id: "8", service: "E-Commerce Solutions" },
  { _id: "9", service: "Cloud Computing" },
  { _id: "10", service: "Data Analytics" },
  { _id: "11", service: "Cybersecurity" },
  { _id: "12", service: "IT Support" },
  { _id: "13", service: "AI and Machine Learning" },
  { _id: "14", service: "Blockchain Development" },
  { _id: "15", service: "Game Development" },
];
