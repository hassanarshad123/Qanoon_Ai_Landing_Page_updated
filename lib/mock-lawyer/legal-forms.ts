import type { LegalForm } from "./types";

export const legalForms: LegalForm[] = [
  // ── Court Forms ──────────────────────────────────────────
  {
    id: "lfrm-001",
    title: "Writ Petition (Article 199)",
    category: "Court Forms",
    description:
      "Standard writ petition template for filing under Article 199 of the Constitution of Pakistan in any High Court.",
    fields: [
      "Petitioner Name",
      "Respondent Name",
      "Court Name",
      "District",
      "Prayer / Relief Sought",
      "Grounds",
      "Verification",
    ],
    downloadCount: 1842,
  },
  {
    id: "lfrm-002",
    title: "Civil Suit Plaint",
    category: "Court Forms",
    description:
      "Plaint template for instituting a civil suit under the Code of Civil Procedure, 1908 (CPC) in District/Civil Courts.",
    fields: [
      "Plaintiff Name",
      "Defendant Name",
      "Court Name",
      "Cause of Action",
      "Relief Claimed",
      "Jurisdiction",
      "Valuation",
      "Verification",
    ],
    downloadCount: 2456,
  },
  {
    id: "lfrm-003",
    title: "Bail Application (Pre-Arrest)",
    category: "Court Forms",
    description:
      "Application for pre-arrest bail under Section 498 Cr.P.C. to be filed before Sessions Court or High Court.",
    fields: [
      "Applicant Name",
      "FIR Number",
      "Police Station",
      "Section of Offence",
      "Grounds for Bail",
      "Court Name",
      "Surety Details",
    ],
    downloadCount: 3105,
  },
  {
    id: "lfrm-004",
    title: "Appeal Memorandum (Civil)",
    category: "Court Forms",
    description:
      "Memorandum of appeal template for challenging civil court decrees before the appellate court.",
    fields: [
      "Appellant Name",
      "Respondent Name",
      "Impugned Order/Decree",
      "Date of Decree",
      "Grounds of Appeal",
      "Relief Sought",
      "Court Fee",
    ],
    downloadCount: 987,
  },

  // ── Agreements ───────────────────────────────────────────
  {
    id: "lfrm-005",
    title: "General Power of Attorney",
    category: "Agreements",
    description:
      "A comprehensive GPA template authorising an attorney to act on behalf of the principal in all legal and financial matters.",
    fields: [
      "Principal Name",
      "Attorney Name",
      "CNIC Numbers",
      "Powers Granted",
      "Effective Date",
      "Witnesses",
      "Notary Details",
    ],
    downloadCount: 4210,
  },
  {
    id: "lfrm-006",
    title: "Sale Agreement (Immovable Property)",
    category: "Agreements",
    description:
      "Agreement to sell immovable property in Pakistan covering payment schedule, possession, and transfer requirements.",
    fields: [
      "Seller Name",
      "Buyer Name",
      "Property Description",
      "Sale Price",
      "Earnest Money",
      "Payment Schedule",
      "Possession Date",
      "Witnesses",
    ],
    downloadCount: 3780,
  },
  {
    id: "lfrm-007",
    title: "Employment Contract",
    category: "Agreements",
    description:
      "Standard employment agreement compliant with Pakistan labour laws including salary, benefits, termination, and confidentiality clauses.",
    fields: [
      "Employer Name",
      "Employee Name",
      "Designation",
      "Salary",
      "Probation Period",
      "Notice Period",
      "Benefits",
      "Governing Law",
    ],
    downloadCount: 1523,
  },
  {
    id: "lfrm-008",
    title: "Partnership Deed",
    category: "Agreements",
    description:
      "Partnership deed template under the Partnership Act, 1932 for establishing business partnerships in Pakistan.",
    fields: [
      "Partner Names",
      "Business Name",
      "Capital Contribution",
      "Profit Sharing Ratio",
      "Duration",
      "Dispute Resolution",
      "Witnesses",
    ],
    downloadCount: 892,
  },

  // ── Notices ──────────────────────────────────────────────
  {
    id: "lfrm-009",
    title: "Legal Notice (Recovery of Money)",
    category: "Notices",
    description:
      "Demand notice for recovery of outstanding money/debt before filing a civil suit for recovery.",
    fields: [
      "Sender Name",
      "Recipient Name",
      "Amount Due",
      "Date of Transaction",
      "Deadline to Pay",
      "Consequences of Non-Payment",
    ],
    downloadCount: 5640,
  },
  {
    id: "lfrm-010",
    title: "Eviction Notice",
    category: "Notices",
    description:
      "Notice to vacate rented premises under the relevant provincial Rent Restriction Ordinance of Pakistan.",
    fields: [
      "Landlord Name",
      "Tenant Name",
      "Property Address",
      "Reason for Eviction",
      "Notice Period",
      "Date of Vacation",
    ],
    downloadCount: 2340,
  },
  {
    id: "lfrm-011",
    title: "Cheque Dishonour Notice (Section 489-F PPC)",
    category: "Notices",
    description:
      "Legal notice for dishonour of cheque under Section 489-F of the Pakistan Penal Code requiring payment within 30 days.",
    fields: [
      "Drawer Name",
      "Payee Name",
      "Cheque Number",
      "Bank Name",
      "Amount",
      "Date of Dishonour",
      "Demand Deadline",
    ],
    downloadCount: 4120,
  },
  {
    id: "lfrm-012",
    title: "Defamation Notice",
    category: "Notices",
    description:
      "Legal notice for defamatory statements or publications demanding retraction and damages under the Defamation Ordinance, 2002.",
    fields: [
      "Complainant Name",
      "Respondent Name",
      "Date of Publication",
      "Medium of Defamation",
      "Statement Summary",
      "Damages Claimed",
      "Retraction Deadline",
    ],
    downloadCount: 765,
  },

  // ── Affidavits ───────────────────────────────────────────
  {
    id: "lfrm-013",
    title: "General Affidavit",
    category: "Affidavits",
    description:
      "Multipurpose sworn affidavit template for use in Pakistani courts and government offices.",
    fields: [
      "Deponent Name",
      "Father's Name",
      "CNIC",
      "Address",
      "Statement of Facts",
      "Date",
      "Notary/Commissioner of Oaths",
    ],
    downloadCount: 6780,
  },
  {
    id: "lfrm-014",
    title: "Affidavit of Heirship (Succession Certificate)",
    category: "Affidavits",
    description:
      "Affidavit listing legal heirs of a deceased for succession certificate proceedings under the Succession Act, 1925.",
    fields: [
      "Deponent Name",
      "Deceased Name",
      "Date of Death",
      "Heir Names & Relationship",
      "CNIC Numbers",
      "Assets Description",
      "Court Name",
    ],
    downloadCount: 3450,
  },
  {
    id: "lfrm-015",
    title: "Affidavit of Non-Marriage",
    category: "Affidavits",
    description:
      "Sworn declaration that the deponent is currently unmarried, commonly required for Nikah registration and visa processing.",
    fields: [
      "Deponent Name",
      "Father's Name",
      "CNIC",
      "Date of Birth",
      "Address",
      "Purpose",
      "Verification",
    ],
    downloadCount: 2890,
  },
  {
    id: "lfrm-016",
    title: "Affidavit of Domicile",
    category: "Affidavits",
    description:
      "Affidavit declaring permanent residence in a province or district, required for domicile certificate applications.",
    fields: [
      "Deponent Name",
      "Father's Name",
      "CNIC",
      "Permanent Address",
      "Duration of Residence",
      "Province/District",
      "Verification",
    ],
    downloadCount: 1920,
  },
];
