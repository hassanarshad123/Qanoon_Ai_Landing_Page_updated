export const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Azad Jammu & Kashmir",
  "Gilgit-Baltistan",
] as const;

export const CITIES_BY_PROVINCE: Record<string, string[]> = {
  Punjab: [
    "Lahore",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Gujranwala",
    "Sialkot",
    "Bahawalpur",
    "Sargodha",
    "Sahiwal",
    "Gujrat",
  ],
  Sindh: [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Nawabshah",
    "Mirpurkhas",
    "Thatta",
  ],
  "Khyber Pakhtunkhwa": [
    "Peshawar",
    "Mardan",
    "Abbottabad",
    "Swat",
    "Mansehra",
    "Dera Ismail Khan",
    "Kohat",
    "Bannu",
  ],
  Balochistan: [
    "Quetta",
    "Gwadar",
    "Turbat",
    "Khuzdar",
    "Sibi",
    "Zhob",
  ],
  "Islamabad Capital Territory": ["Islamabad"],
  "Azad Jammu & Kashmir": [
    "Muzaffarabad",
    "Mirpur",
    "Rawalakot",
    "Kotli",
    "Bagh",
  ],
  "Gilgit-Baltistan": [
    "Gilgit",
    "Skardu",
    "Hunza",
    "Chilas",
  ],
};

export const PRACTICE_AREAS = [
  "Criminal Law",
  "Civil Law",
  "Corporate & Commercial",
  "Family Law",
  "Constitutional Law",
  "Tax Law",
  "Banking & Finance",
  "Intellectual Property",
  "Labour & Employment",
  "Real Estate & Property",
  "Immigration Law",
  "Environmental Law",
  "Cyber Law & IT",
  "International Law",
] as const;

export const COURT_LEVELS = [
  "District Court",
  "High Court",
  "Supreme Court",
  "Tribunal / Special Court",
] as const;

export const FIRM_TYPES = [
  { value: "solo", label: "Solo Practice" },
  { value: "small", label: "Small Firm (2-10)" },
  { value: "medium", label: "Medium Firm (11-50)" },
  { value: "large", label: "Large Firm (50+)" },
  { value: "in_house", label: "In-House Counsel" },
] as const;

export const EXPERIENCE_RANGES = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10-20 years",
  "20+ years",
] as const;

export const REFERRAL_SOURCES = [
  "Search Engine (Google, etc.)",
  "Social Media",
  "Colleague / Friend",
  "Bar Association",
  "Legal Conference / Event",
  "News Article / Blog",
  "Other",
] as const;

export const LAWYER_STEPS = [
  { id: "role", label: "Role" },
  { id: "personal", label: "Personal Info" },
  { id: "practice", label: "Practice" },
  { id: "location", label: "Location" },
  { id: "firm", label: "Firm" },
  { id: "referral", label: "Referral" },
] as const;

export const JUDGE_STEPS = [
  { id: "role", label: "Role" },
  { id: "personal", label: "Personal Info" },
  { id: "judicial", label: "Judicial Info" },
  { id: "location", label: "Location" },
] as const;
