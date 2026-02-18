import type { CourtEntry } from "./types";

export const courts: CourtEntry[] = [
  // ── Supreme Court ────────────────────────────────────────
  {
    id: "lcrt-001",
    name: "Supreme Court of Pakistan",
    level: "Supreme Court",
    province: "Federal",
    location: "Constitution Avenue, Islamabad",
    chiefJustice: "Justice Yahya Afridi",
    contact: "+92-51-9220581",
    jurisdictionNotes:
      "Apex court with original, appellate, and advisory jurisdiction under Articles 184, 185, and 186 of the Constitution.",
  },

  // ── High Courts ──────────────────────────────────────────
  {
    id: "lcrt-002",
    name: "Lahore High Court",
    level: "High Court",
    province: "Punjab",
    location: "Mall Road, Lahore",
    chiefJustice: "Justice Malik Shahzad Ahmad Khan",
    contact: "+92-42-99210154",
    jurisdictionNotes:
      "Original and appellate jurisdiction over Punjab province. Writ jurisdiction under Article 199.",
  },
  {
    id: "lcrt-003",
    name: "Sindh High Court",
    level: "High Court",
    province: "Sindh",
    location: "Court Road, Karachi",
    chiefJustice: "Justice Muhammad Shafi Siddiqui",
    contact: "+92-21-99211076",
    jurisdictionNotes:
      "Original and appellate jurisdiction over Sindh province. Constitutional petitions and civil/criminal appeals.",
  },
  {
    id: "lcrt-004",
    name: "Peshawar High Court",
    level: "High Court",
    province: "KPK",
    location: "Peshawar Judicial Complex, Peshawar",
    chiefJustice: "Justice Ishtiaq Ibrahim",
    contact: "+92-91-9213475",
    jurisdictionNotes:
      "Original and appellate jurisdiction over Khyber Pakhtunkhwa. Includes FATA merger jurisdiction.",
  },
  {
    id: "lcrt-005",
    name: "Balochistan High Court",
    level: "High Court",
    province: "Balochistan",
    location: "Zarghoon Road, Quetta",
    chiefJustice: "Justice Naeem Akhtar Afghan",
    contact: "+92-81-9202630",
    jurisdictionNotes:
      "Original and appellate jurisdiction over Balochistan province. Writ and constitutional petitions.",
  },
  {
    id: "lcrt-006",
    name: "Islamabad High Court",
    level: "High Court",
    province: "Islamabad",
    location: "Sector G-5, Islamabad Judicial Complex",
    chiefJustice: "Justice Aamer Farooq",
    contact: "+92-51-9250067",
    jurisdictionNotes:
      "Jurisdiction over Islamabad Capital Territory. Constitutional petitions, appeals, and writ jurisdiction.",
  },

  // ── District Courts ──────────────────────────────────────
  {
    id: "lcrt-007",
    name: "District & Sessions Court, Lahore",
    level: "District Court",
    province: "Punjab",
    location: "Lower Mall, Lahore",
    chiefJustice: "District & Sessions Judge Muhammad Arshad",
    contact: "+92-42-99210300",
    jurisdictionNotes:
      "Civil and criminal original jurisdiction for Lahore district. Sessions trials for offences punishable with death or life.",
  },
  {
    id: "lcrt-008",
    name: "District & Sessions Court, Karachi South",
    level: "District Court",
    province: "Sindh",
    location: "City Courts, Karachi",
    chiefJustice: "District & Sessions Judge Rafiq Ahmed",
    contact: "+92-21-99214350",
    jurisdictionNotes:
      "Civil suits, family matters, and sessions trials for Karachi South district.",
  },
  {
    id: "lcrt-009",
    name: "District & Sessions Court, Islamabad",
    level: "District Court",
    province: "Islamabad",
    location: "Sector F-8, Islamabad",
    chiefJustice: "District & Sessions Judge Sohail Nasir",
    contact: "+92-51-9261320",
    jurisdictionNotes:
      "Civil, criminal, and family court jurisdiction for Islamabad Capital Territory.",
  },
  {
    id: "lcrt-010",
    name: "District & Sessions Court, Rawalpindi",
    level: "District Court",
    province: "Punjab",
    location: "Kutchery Road, Rawalpindi",
    chiefJustice: "District & Sessions Judge Afzal Majoka",
    contact: "+92-51-9290145",
    jurisdictionNotes:
      "Original civil and criminal jurisdiction for Rawalpindi district. Includes rent and banking courts.",
  },
  {
    id: "lcrt-011",
    name: "District & Sessions Court, Peshawar",
    level: "District Court",
    province: "KPK",
    location: "Peshawar Judicial Complex, Peshawar",
    chiefJustice: "District & Sessions Judge Fazal Subhan",
    contact: "+92-91-9212876",
    jurisdictionNotes:
      "Civil and criminal original jurisdiction for Peshawar district including family and labour courts.",
  },
  {
    id: "lcrt-012",
    name: "District & Sessions Court, Quetta",
    level: "District Court",
    province: "Balochistan",
    location: "Zarghoon Road, Quetta",
    chiefJustice: "District & Sessions Judge Abdul Hameed Baloch",
    contact: "+92-81-9201540",
    jurisdictionNotes:
      "Civil and criminal jurisdiction for Quetta district. Sessions and small causes court.",
  },
  {
    id: "lcrt-013",
    name: "District & Sessions Court, Faisalabad",
    level: "District Court",
    province: "Punjab",
    location: "Civil Lines, Faisalabad",
    chiefJustice: "District & Sessions Judge Tariq Mehmood",
    contact: "+92-41-9200876",
    jurisdictionNotes:
      "Civil, criminal, and family court jurisdiction for Faisalabad district.",
  },
  {
    id: "lcrt-014",
    name: "District & Sessions Court, Multan",
    level: "District Court",
    province: "Punjab",
    location: "Kutchery Road, Multan",
    chiefJustice: "District & Sessions Judge Nasir Javed",
    contact: "+92-61-9200543",
    jurisdictionNotes:
      "Civil and criminal original jurisdiction for Multan district including consumer and banking courts.",
  },

  // ── Tribunals ────────────────────────────────────────────
  {
    id: "lcrt-015",
    name: "National Industrial Relations Commission (NIRC)",
    level: "Tribunal",
    province: "Federal",
    location: "Sector G-5, Islamabad",
    chiefJustice: "Chairperson Justice (R) Syed Afzal Haider",
    contact: "+92-51-9214560",
    jurisdictionNotes:
      "Adjudication of industrial disputes, unfair labour practices, and trade union matters at the federal level.",
  },
  {
    id: "lcrt-016",
    name: "Appellate Tribunal Inland Revenue (ATIR)",
    level: "Tribunal",
    province: "Federal",
    location: "FBR House, Islamabad",
    chiefJustice: "Chairperson Dr. Muhammad Ashfaq Ahmed",
    contact: "+92-51-9219780",
    jurisdictionNotes:
      "Appeals against orders of Commissioner Inland Revenue under the Income Tax Ordinance, 2001 and Sales Tax Act, 1990.",
  },
  {
    id: "lcrt-017",
    name: "Banking Court No. 1, Lahore",
    level: "Tribunal",
    province: "Punjab",
    location: "Bank Square, Lahore",
    chiefJustice: "Judge Khalid Mehmood Siddiqui",
    contact: "+92-42-99210678",
    jurisdictionNotes:
      "Jurisdiction over recovery of finances under the Financial Institutions (Recovery of Finances) Ordinance, 2001.",
  },

  // ── Special Courts ──────────────────────────────────────
  {
    id: "lcrt-018",
    name: "Anti-Terrorism Court No. 1, Lahore",
    level: "Special Court",
    province: "Punjab",
    location: "Camp Jail, Lahore",
    chiefJustice: "Judge Arshad Hussain Bhutta",
    contact: "+92-42-99214890",
    jurisdictionNotes:
      "Trial of offences under the Anti-Terrorism Act, 1997. Expedited proceedings with 7-day adjournment limits.",
  },
  {
    id: "lcrt-019",
    name: "Accountability Court No. 2, Islamabad",
    level: "Special Court",
    province: "Islamabad",
    location: "Judicial Complex, G-11, Islamabad",
    chiefJustice: "Judge Muhammad Bashir",
    contact: "+92-51-9251230",
    jurisdictionNotes:
      "Trial of corruption and corrupt practices references filed by NAB under the NAB Ordinance, 1999.",
  },
  {
    id: "lcrt-020",
    name: "Special Court (Customs, Taxation & Anti-Smuggling), Karachi",
    level: "Special Court",
    province: "Sindh",
    location: "Custom House, Karachi",
    chiefJustice: "Judge Irfan Ahmed Siddiqui",
    contact: "+92-21-99214670",
    jurisdictionNotes:
      "Trial of offences under the Customs Act, 1969 and related taxation statutes. Anti-smuggling jurisdiction.",
  },
];
