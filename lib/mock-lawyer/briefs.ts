import type { LawyerBrief } from "./types";

export const lawyerBriefs: LawyerBrief[] = [
  {
    id: "lbrf-001",
    caseId: "lcas-001",
    caseTitle: "Muhammad Asif v. Federation of Pakistan",
    status: "Complete",
    createdAt: "2024-02-01",
    sections: [
      {
        id: "lbrf-001-s1",
        title: "Case Header",
        content:
          "W.P. No. 1234/2024 | Lahore High Court | Before Justice Shahid Karim\nPetitioner: Muhammad Asif | Respondent: Federation of Pakistan\nCounsel for Petitioner: On Record | Counsel for Respondent: Deputy Attorney General",
      },
      {
        id: "lbrf-001-s2",
        title: "Facts",
        content:
          "The petitioner, Muhammad Asif, is a businessman engaged in textile trading in Lahore since 2005. The Federal Board of Revenue issued notices under Section 122 of the Income Tax Ordinance, 2001 for tax years 2019-2022, proposing amendments to the petitioner's assessed income without providing any opportunity of hearing. The total additional tax demand raised amounts to PKR 12 million. The petitioner filed representations which were not responded to within the statutory period of 60 days. The amended assessment orders were passed ex parte, violating the principles of natural justice and the mandatory procedural requirements of Section 122(9) of the Ordinance.",
      },
      {
        id: "lbrf-001-s3",
        title: "Issues",
        content:
          "1. Whether the assessment orders under Section 122 can be amended without providing mandatory notice and opportunity of hearing to the taxpayer?\n2. Whether the failure to dispose of the petitioner's representation within 60 days renders the amended assessment orders void ab initio?\n3. Whether the tax department's action violates Article 10-A (right to fair trial) and Article 4 (right of individuals to be dealt with in accordance with law) of the Constitution?\n4. Whether this Court has jurisdiction to interfere in tax matters under Article 199 of the Constitution when adequate statutory remedy exists?",
      },
      {
        id: "lbrf-001-s4",
        title: "Arguments",
        content:
          "The amended assessment orders are nullities in law as they were passed without following the mandatory procedure prescribed under Section 122(9). The Supreme Court in Commissioner Inland Revenue v. Shahzad International (2019 SCMR 1440) has categorically held that the requirement of notice is mandatory and not directory. Furthermore, the failure to decide the representation within 60 days creates a deemed acceptance under Section 122(5A). The petitioner's fundamental rights under Articles 4, 10-A, and 25 of the Constitution have been violated. The tax authorities acted with mala fide intent as evidenced by the simultaneous issuance of recovery notices.",
      },
      {
        id: "lbrf-001-s5",
        title: "Applicable Law",
        content:
          "1. Section 122 of the Income Tax Ordinance, 2001 - Amendment of assessments\n2. Section 122(9) - Mandatory notice requirement\n3. Section 122(5A) - Deemed assessment on failure to make order\n4. Article 199 of the Constitution - Jurisdiction of High Court\n5. Article 10-A - Right to fair trial and due process\n6. Article 4 - Right of individuals to be dealt with in accordance with law\n7. Article 25 - Equality before law",
      },
      {
        id: "lbrf-001-s6",
        title: "Precedents",
        content:
          "1. Commissioner Inland Revenue v. Shahzad International (2019 SCMR 1440) - Notice under Section 122 is mandatory\n2. Messrs Pak Arab Fertilizers v. FBR (PLD 2018 Lahore 585) - Assessment without hearing is coram non judice\n3. Collector of Customs v. Sheikh Muhammad Iqbal (2016 SCMR 806) - Right of hearing is a fundamental right\n4. Gadoon Textile Mills v. WAPDA (PLD 1997 SC 641) - Principles of natural justice in quasi-judicial proceedings\n5. Government of Pakistan v. Aftab Shahban Mirani (PLD 2012 SC 610) - Due process requirements",
      },
      {
        id: "lbrf-001-s7",
        title: "Strategy Notes",
        content:
          "Primary strategy: Establish that the assessment orders are void ab initio due to procedural non-compliance. Seek interim relief to stay recovery proceedings. If the Court questions jurisdiction due to availability of statutory remedy, argue that where fundamental rights are violated, the constitutional remedy under Article 199 runs parallel. Prepare for the possibility that the Court may remand the case back to the tax officer for fresh hearing - in which case ensure all documentary evidence is ready for re-examination. Backup argument: even on merits, the additions are based on conjectures without corroborative evidence.",
      },
    ],
    conversation: [
      {
        id: "lbrf-001-c1",
        role: "user",
        content:
          "Generate a comprehensive brief for the tax petition case against FBR. Focus on the procedural violations and constitutional angles.",
        timestamp: "2024-02-01T10:00:00Z",
      },
      {
        id: "lbrf-001-c2",
        role: "assistant",
        content:
          "I have generated a comprehensive brief for W.P. No. 1234/2024. The brief focuses on the procedural violations under Section 122(9) of the Income Tax Ordinance, 2001, specifically the failure to provide notice and opportunity of hearing. I have also highlighted the constitutional dimensions under Articles 4, 10-A, and 25. The precedent section includes five key Supreme Court and High Court judgments that directly support our position. The strategy recommends seeking interim relief while pursuing the substantive challenge.",
        timestamp: "2024-02-01T10:02:00Z",
        citations: [
          {
            id: "cit-001",
            caseName: "Commissioner Inland Revenue v. Shahzad International",
            citation: "2019 SCMR 1440",
            court: "Supreme Court of Pakistan",
            year: "2019",
            relevance: "Directly establishes that notice under Section 122 is mandatory, not directory",
            snippet:
              "The requirement of issuing notice under Section 122(9) is a mandatory condition precedent to the exercise of power of amendment. Any order passed without such notice is void ab initio.",
          },
        ],
      },
      {
        id: "lbrf-001-c3",
        role: "user",
        content:
          "Can you also add the argument about deemed assessment under Section 122(5A) since the representation was not decided within 60 days?",
        timestamp: "2024-02-01T10:05:00Z",
      },
    ],
  },
  {
    id: "lbrf-002",
    caseId: "lcas-002",
    caseTitle: "Fatima Begum v. Abdul Rehman",
    status: "Complete",
    createdAt: "2024-03-05",
    sections: [
      {
        id: "lbrf-002-s1",
        title: "Case Header",
        content:
          "Family Suit No. 456/2024 | Family Court, Lahore | Before Judge Samina Akram\nPetitioner: Mst. Fatima Begum | Respondent: Abdul Rehman\nSuit for Dissolution of Marriage, Recovery of Dowry Articles, and Maintenance",
      },
      {
        id: "lbrf-002-s2",
        title: "Facts",
        content:
          "Mst. Fatima Begum was married to Abdul Rehman on 15-03-2018 in Lahore as per Muslim rites. The Mehr (dower) was fixed at PKR 500,000 which remains unpaid. Since 2021, the respondent has been subjecting the petitioner to physical and mental cruelty, including domestic violence witnessed by neighbours and reported to the Women Protection Centre. The petitioner was forced to leave the matrimonial home on 10-01-2024. Dowry articles worth PKR 2.5 million were retained by the respondent. The petitioner has two minor children aged 4 and 6 who are currently in her custody. The respondent has failed to provide any maintenance since the petitioner's departure from the matrimonial home.",
      },
      {
        id: "lbrf-002-s3",
        title: "Issues",
        content:
          "1. Whether the petitioner has established sufficient grounds for dissolution of marriage under Section 2 of the Dissolution of Muslim Marriages Act, 1939?\n2. Whether the petitioner is entitled to recovery of unpaid Mehr of PKR 500,000?\n3. Whether the petitioner is entitled to recovery of dowry articles or their monetary equivalent?\n4. What is the quantum of maintenance for the petitioner and minor children under Section 9 of the Muslim Family Laws Ordinance, 1961?",
      },
      {
        id: "lbrf-002-s4",
        title: "Arguments",
        content:
          "The petitioner has established cruelty under Section 2(viii)(a) of the Dissolution of Muslim Marriages Act, 1939 through medical reports documenting physical injuries, a police complaint registered at Women Protection Centre, and sworn affidavits of two witnesses. The non-payment of Mehr constitutes an independent ground under Section 2(ii). For maintenance, the respondent is employed as a Grade-18 government officer with a monthly salary of approximately PKR 180,000, and is obligated to maintain his wife and children at a standard comparable to his own lifestyle. The dowry articles are established through the Barat list (Jahez Nama) attested by both families at the time of marriage.",
      },
      {
        id: "lbrf-002-s5",
        title: "Applicable Law",
        content:
          "1. Dissolution of Muslim Marriages Act, 1939 - Sections 2(ii), 2(viii)(a), 2(viii)(f)\n2. Muslim Family Laws Ordinance, 1961 - Section 9 (Maintenance)\n3. Family Courts Act, 1964 - Section 5 (Jurisdiction)\n4. West Pakistan Family Courts Rules, 1965\n5. Qanun-e-Shahadat Order, 1984 - Evidence requirements\n6. Punjab Domestic Violence (Prevention and Protection) Act, 2021",
      },
      {
        id: "lbrf-002-s6",
        title: "Precedents",
        content:
          "1. Mst. Khurshid Bibi v. Muhammad Amin (2016 SCMR 1002) - Definition and proof of cruelty in dissolution cases\n2. Mst. Naseem Akhtar v. Muhammad Rafique (PLD 2005 SC 3) - Standard of evidence in family matters\n3. Hafiz Abdul Waheed v. Mst. Asma Jehangir (PLD 2004 SC 219) - Women's right to Mehr is an absolute right\n4. Muhammad Nawaz v. Mst. Farzana (2020 SCMR 235) - Quantum of maintenance to be determined based on husband's income\n5. Mst. Saima v. The State (PLD 2003 Lahore 747) - Dowry articles recovery through family courts",
      },
      {
        id: "lbrf-002-s7",
        title: "Strategy Notes",
        content:
          "File interim application for maintenance pendente lite immediately. The medical reports and Women Protection Centre complaint are the strongest evidence - ensure certified copies are filed. The Jahez Nama signed by both families is key for dowry recovery. If the respondent contests and the case prolongs, seek urgent interim maintenance order. Consider filing a separate application under Punjab Domestic Violence Act for additional protection orders. Prepare for the respondent's likely defence of reconciliation attempts.",
      },
    ],
    conversation: [
      {
        id: "lbrf-002-c1",
        role: "user",
        content:
          "Create a detailed brief for the family case of Fatima Begum. Cover all aspects: dissolution, Mehr, dowry recovery, and maintenance.",
        timestamp: "2024-03-05T09:00:00Z",
      },
      {
        id: "lbrf-002-c2",
        role: "assistant",
        content:
          "I have prepared the brief covering all four aspects of the case. The dissolution grounds are strongest under Section 2(viii)(a) for cruelty, supported by medical evidence and police complaint. The Mehr claim is straightforward as it remains unpaid. For maintenance, I have calculated based on the respondent's government salary. The strategy section recommends filing an interim maintenance application immediately.",
        timestamp: "2024-03-05T09:03:00Z",
        citations: [
          {
            id: "cit-002",
            caseName: "Hafiz Abdul Waheed v. Mst. Asma Jehangir",
            citation: "PLD 2004 SC 219",
            court: "Supreme Court of Pakistan",
            year: "2004",
            relevance: "Establishes that Mehr is an absolute right of the wife and cannot be waived",
            snippet:
              "Dower (Mehr) is an obligation imposed by law on the husband as a mark of respect for the wife. It is her absolute property and she can claim it at any time.",
          },
        ],
      },
      {
        id: "lbrf-002-c3",
        role: "user",
        content:
          "Should we also invoke the Punjab Domestic Violence Act 2021 for additional protection?",
        timestamp: "2024-03-05T09:10:00Z",
      },
    ],
  },
  {
    id: "lbrf-003",
    caseId: "lcas-006",
    caseTitle: "Ahmed Hassan v. Shahid Enterprises",
    status: "Complete",
    createdAt: "2024-06-01",
    sections: [
      {
        id: "lbrf-003-s1",
        title: "Case Header",
        content:
          "Civil Appeal No. 901/2024 | Supreme Court of Pakistan | Before Justice Qazi Faez Isa\nAppellant: Ahmed Hassan | Respondent: Shahid Enterprises (Pvt) Ltd\nAppeal against Judgment of Lahore High Court in partnership dissolution dispute",
      },
      {
        id: "lbrf-003-s2",
        title: "Facts",
        content:
          "Ahmed Hassan and Shahid Iqbal entered into a partnership deed on 01-06-2010 to establish Shahid Enterprises dealing in real estate development. The partnership ratio was 60:40 in favour of Ahmed Hassan as the capital-investing partner. Total partnership assets grew to approximately PKR 200 million including 5 commercial properties and 12 residential plots. In 2023, Shahid Iqbal unilaterally sold two commercial properties worth PKR 80 million without the consent of Ahmed Hassan, in violation of Clause 7 of the Partnership Deed. Ahmed Hassan filed a suit for dissolution and accounting which was partly decreed by the Trial Court. The High Court modified the decree reducing Ahmed Hassan's share, leading to this appeal.",
      },
      {
        id: "lbrf-003-s3",
        title: "Issues",
        content:
          "1. Whether the High Court erred in modifying the partnership ratio from 60:40 to 50:50 without sufficient justification?\n2. Whether the unauthorized sale of partnership properties by Shahid Iqbal constitutes breach of fiduciary duty under Section 9 of the Partnership Act, 1932?\n3. Whether the goodwill of the firm should be included in the partnership assets for distribution?\n4. Whether Ahmed Hassan is entitled to damages for the unauthorized sale of partnership properties?",
      },
      {
        id: "lbrf-003-s4",
        title: "Arguments",
        content:
          "The High Court committed an error of law by altering the partnership ratio expressly agreed upon in the registered Partnership Deed. Under Section 13 of the Partnership Act, 1932, the mutual rights and duties of partners are governed by the partnership agreement, and no court can modify these terms unilaterally. The unauthorized sale of partnership properties by Shahid Iqbal violates Section 9 (duty of partner to act in good faith) and Section 19 (implied authority limitations). The goodwill, valued at PKR 35 million by the court-appointed valuer, must be distributed according to the 60:40 ratio.",
      },
      {
        id: "lbrf-003-s5",
        title: "Applicable Law",
        content:
          "1. Partnership Act, 1932 - Sections 9, 13, 14, 17, 19, 44, 46, 48\n2. Specific Relief Act, 1877 - Section 42 (Declaratory decree)\n3. Contract Act, 1872 - Section 73 (Compensation for breach)\n4. Code of Civil Procedure, 1908 - Order XX Rule 15 (Dissolution decree)\n5. Qanun-e-Shahadat Order, 1984 - Article 92 (Exclusion of oral evidence)",
      },
      {
        id: "lbrf-003-s6",
        title: "Precedents",
        content:
          "1. Muhammad Aslam v. Ghulam Hussain (2015 SCMR 1233) - Partnership deed governs mutual rights; courts cannot modify agreed terms\n2. Khawaja Muhammad Arshad v. Khawaja Iqbal (PLD 2010 SC 350) - Principles of partnership dissolution and accounting\n3. Bank of Punjab v. Haris Steel (2018 SCMR 186) - Fiduciary duty of partners\n4. Allied Bank v. Haji Muhammad Naeem (PLD 2012 SC 368) - Goodwill as a partnership asset\n5. Tariq Aziz v. Maqsood Ahmad (2020 CLC 1567) - Damages for unauthorized transactions by partner",
      },
      {
        id: "lbrf-003-s7",
        title: "Strategy Notes",
        content:
          "The strongest argument is the registered Partnership Deed which clearly states the 60:40 ratio. The High Court's modification lacks legal basis. During oral arguments, emphasis should be on Section 13 of the Partnership Act and the sanctity of contractual terms. The valuation report by the court-appointed commissioner supports our position on asset values. Be prepared for the respondent's argument that Ahmed Hassan's capital contribution was less than 60% - counter with evidence of the initial investment receipts. If the Supreme Court is inclined to remand, request that the Trial Court decree be restored instead.",
      },
    ],
    conversation: [
      {
        id: "lbrf-003-c1",
        role: "user",
        content:
          "Generate brief for the Supreme Court appeal in the Shahid Enterprises partnership case. Focus on why the High Court erred in changing the partnership ratio.",
        timestamp: "2024-06-01T14:00:00Z",
      },
      {
        id: "lbrf-003-c2",
        role: "assistant",
        content:
          "The brief has been generated with focus on the High Court's error in modifying the contractually agreed partnership ratio. The key legal argument centres on Section 13 of the Partnership Act, 1932 which makes the partnership deed the governing document for mutual rights. I have included five precedents from the Supreme Court and High Courts supporting the sanctity of partnership agreements.",
        timestamp: "2024-06-01T14:03:00Z",
      },
      {
        id: "lbrf-003-c3",
        role: "user",
        content:
          "Add the point about fiduciary duty breach for the unauthorized property sale. What damages can we claim?",
        timestamp: "2024-06-01T14:08:00Z",
      },
    ],
  },
  {
    id: "lbrf-004",
    caseId: "lcas-007",
    caseTitle: "Noor Muhammad v. The State",
    status: "Complete",
    createdAt: "2025-01-09",
    sections: [
      {
        id: "lbrf-004-s1",
        title: "Case Header",
        content:
          "Bail Application No. 345/2025 | Peshawar High Court | Before Justice Ijaz Anwar\nApplicant: Noor Muhammad s/o Fazal Muhammad | Respondent: The State\nFIR No. 187/2024 u/s 302/34 PPC | P.S. Hayatabad, Peshawar",
      },
      {
        id: "lbrf-004-s2",
        title: "Facts",
        content:
          "Noor Muhammad, aged 32, resident of Hayatabad Phase 3, Peshawar, was arrested on 20-12-2024 in connection with FIR No. 187/2024 registered at Police Station Hayatabad on 15-11-2024 under Sections 302 and 34 PPC. The FIR was lodged by the brother of the deceased alleging that Noor Muhammad and two co-accused committed the murder of Zahid Khan during a property dispute. Noor Muhammad claims alibi - he was in Islamabad attending a business meeting at the time of the incident. CCTV footage from the Islamabad hotel and mobile phone location data support the alibi. The case is based entirely on the ocular account of one interested witness (brother of deceased) without any corroboration from forensic or circumstantial evidence. Recovery of the alleged weapon has not been attributed to Noor Muhammad.",
      },
      {
        id: "lbrf-004-s3",
        title: "Issues",
        content:
          "1. Whether the sole testimony of an interested and closely related witness is sufficient to deny bail in a case punishable with death?\n2. Whether the alibi supported by documentary evidence (CCTV, hotel records, mobile data) creates reasonable doubt in the prosecution case?\n3. Whether the lack of forensic evidence linking the accused to the crime scene strengthens the case for bail?\n4. Whether further inquiry into the guilt of the accused is warranted under Section 497(2) Cr.P.C.?",
      },
      {
        id: "lbrf-004-s4",
        title: "Arguments",
        content:
          "Under the well-established principles of bail jurisprudence, bail is the rule and refusal is the exception. The case against Noor Muhammad rests on the testimony of a single interested witness who is the brother of the deceased. The Supreme Court has consistently held that the testimony of interested and closely related witnesses requires strong corroboration, especially in cases involving property disputes where there is motive for false implication. The applicant's alibi is supported by: (a) CCTV footage from Pearl Continental Hotel, Islamabad dated 15-11-2024 showing the accused at the time of the alleged murder, (b) hotel booking records in his name, and (c) mobile phone location data placing him in Islamabad. No forensic evidence connects the accused to the crime.",
      },
      {
        id: "lbrf-004-s5",
        title: "Applicable Law",
        content:
          "1. Section 497 Cr.P.C. - When bail may be taken in case of non-bailable offence\n2. Section 497(2) Cr.P.C. - Further inquiry into guilt\n3. Section 302 PPC - Punishment of Qatl-i-amd\n4. Section 34 PPC - Acts done by several persons in furtherance of common intention\n5. Article 9 of the Constitution - Security of person\n6. Article 10 of the Constitution - Safeguards as to arrest and detention",
      },
      {
        id: "lbrf-004-s6",
        title: "Precedents",
        content:
          "1. Tariq Pervez v. The State (1995 SCMR 1345) - Bail principles: bail is the rule, refusal is exception\n2. Muhammad Ismail v. The State (2017 SCMR 713) - Interested witness testimony requires independent corroboration\n3. Hashim Qasim v. The State (2017 SCMR 986) - Alibi supported by documentary evidence creates reasonable doubt\n4. Muhammad Nawaz v. The State (2020 SCMR 1489) - Lack of forensic evidence weakens prosecution case\n5. Ghulam Shabbir v. The State (PLD 2019 SC 587) - Property disputes often lead to false implications",
      },
      {
        id: "lbrf-004-s7",
        title: "Strategy Notes",
        content:
          "The CCTV footage is the strongest piece of evidence. File it with the bail application along with a certificate under Article 164 of the Qanun-e-Shahadat Order for electronic evidence. Ensure the mobile phone data is obtained through the telecom company with proper authorization. Offer surety bonds and undertaking not to tamper with evidence. If bail is refused by the High Court, immediately prepare for Supreme Court under Section 497 Cr.P.C. The co-accused factor under Section 34 weakens if we can demonstrate the accused was not present at the scene. Prepare character witnesses - the accused has no prior criminal record.",
      },
    ],
    conversation: [
      {
        id: "lbrf-004-c1",
        role: "user",
        content:
          "Prepare an urgent bail brief for Noor Muhammad. He has alibi evidence including CCTV footage. Focus on bail jurisprudence principles.",
        timestamp: "2025-01-09T08:00:00Z",
      },
      {
        id: "lbrf-004-c2",
        role: "assistant",
        content:
          "The bail brief is ready. I have structured it around three pillars: (1) the interested witness issue - sole eyewitness is the deceased's brother with property dispute motive, (2) the strong alibi supported by CCTV, hotel records, and mobile location data, and (3) absence of forensic evidence. The precedent section includes Tariq Pervez (1995) which established that bail is the rule. The strategy notes cover electronic evidence certification requirements.",
        timestamp: "2025-01-09T08:04:00Z",
      },
      {
        id: "lbrf-004-c3",
        role: "user",
        content:
          "Good. Also emphasize that no weapon recovery was attributed to our client specifically.",
        timestamp: "2025-01-09T08:10:00Z",
      },
    ],
  },
  {
    id: "lbrf-005",
    caseId: "lcas-008",
    caseTitle: "Karachi Port Trust v. Ocean Shipping Co.",
    status: "Complete",
    createdAt: "2024-07-15",
    sections: [
      {
        id: "lbrf-005-s1",
        title: "Case Header",
        content:
          "Admiralty Suit No. 67/2024 | High Court of Sindh, Karachi | Before Justice Muhammad Junaid Ghaffar\nPlaintiff: Karachi Port Trust | Defendant: Ocean Shipping Co. Ltd (Registered in Singapore)\nSuit for Recovery of Demurrage Charges and Port Fees - USD 2.3 Million",
      },
      {
        id: "lbrf-005-s2",
        title: "Facts",
        content:
          "Karachi Port Trust (KPT) entered into a berthing agreement with Ocean Shipping Co. Ltd (OSC) for vessel MV Pacific Star to dock at Berth No. 12, East Wharf, Karachi Port for a period of 14 days commencing 01-03-2024. OSC failed to vacate the berth within the stipulated period and continued to occupy it for an additional 45 days until 29-05-2024. During this extended period, the vessel underwent unauthorized repairs using port infrastructure. KPT issued multiple notices for vacating the berth and payment of demurrage, all of which were ignored. The total claim includes: (a) demurrage at USD 15,000/day for 45 extra days = USD 675,000, (b) port infrastructure usage charges = USD 890,000, (c) loss of revenue from other vessels denied berthing = USD 735,000. The vessel has since departed Pakistani waters.",
      },
      {
        id: "lbrf-005-s3",
        title: "Issues",
        content:
          "1. Whether the Admiralty jurisdiction of the High Court of Sindh extends to claims for demurrage and port infrastructure usage charges?\n2. Whether OSC's extended occupation of the berth constitutes breach of the berthing agreement and entitles KPT to liquidated damages?\n3. Whether KPT can claim consequential damages for loss of revenue from other vessels?\n4. Whether the in personam jurisdiction can be exercised against a foreign company (Singapore-registered) in the absence of the vessel from Pakistani waters?",
      },
      {
        id: "lbrf-005-s4",
        title: "Arguments",
        content:
          "The High Court of Sindh exercises admiralty jurisdiction under the Admiralty Jurisdiction of High Courts Ordinance, 1980. Section 3(2)(d) specifically covers claims for dock charges and port dues. The berthing agreement contains a choice of law clause designating Pakistani law and jurisdiction of courts in Karachi. OSC has a registered agent in Pakistan (M/s Pak Maritime Services, Karachi) who accepted service of notices. The demurrage rate of USD 15,000/day is contractually agreed and constitutes liquidated damages, not a penalty, as it represents a genuine pre-estimate of loss. Consequential damages are recoverable under Section 73 of the Contract Act, 1872 as the loss of revenue was within the contemplation of parties.",
      },
      {
        id: "lbrf-005-s5",
        title: "Applicable Law",
        content:
          "1. Admiralty Jurisdiction of High Courts Ordinance, 1980 - Section 3\n2. KPT Act, 1886 - Port charges and duties\n3. Contract Act, 1872 - Sections 73, 74 (Damages and penalties)\n4. Code of Civil Procedure, 1908 - Order XXI (Execution against foreign entities)\n5. Merchant Shipping Ordinance, 2001\n6. International Convention on Maritime Liens, 1993 (as applicable)",
      },
      {
        id: "lbrf-005-s6",
        title: "Precedents",
        content:
          "1. Port Qasim Authority v. MV Bering Sea (2014 CLC 1234) - Admiralty jurisdiction covers port charges and demurrage\n2. Pakistan National Shipping Corporation v. MV Gulf Trader (2010 SCMR 890) - Demurrage as liquidated damages under maritime law\n3. Karachi Port Trust v. Evergreen Marine Corp (PLD 2008 Karachi 456) - In personam jurisdiction through registered agent\n4. MSC Mediterranean Shipping v. Collector of Customs (2016 CLC 567) - Consequential damages in maritime claims\n5. Port of Singapore Authority v. MV Nordic Star [2005] SGHC 112 - International standards for berth occupation charges",
      },
      {
        id: "lbrf-005-s7",
        title: "Strategy Notes",
        content:
          "File an application for arrest of any other OSC vessel entering Pakistani waters as security for the claim. Engage a maritime valuation expert to quantify the loss of revenue from denied berthing. Pursue the registered agent (Pak Maritime Services) for service and jurisdiction purposes. Consider invoking the bilateral maritime agreement between Pakistan and Singapore for enforcement. The berthing agreement's arbitration clause should be examined - if it requires arbitration, file application under Section 20 of the Arbitration Act, 1940 to stay proceedings. However, our position is that the admiralty jurisdiction overrides the arbitration clause for maritime liens.",
      },
    ],
    conversation: [
      {
        id: "lbrf-005-c1",
        role: "user",
        content:
          "Draft a brief for the KPT admiralty suit. We need to establish jurisdiction over the Singapore company and quantify the USD 2.3 million claim.",
        timestamp: "2024-07-15T11:00:00Z",
      },
      {
        id: "lbrf-005-c2",
        role: "assistant",
        content:
          "The admiralty brief is ready. I have addressed the jurisdictional question through the registered agent route and the choice of law clause in the berthing agreement. The claim is broken down into three components: demurrage (USD 675K), infrastructure charges (USD 890K), and consequential loss of revenue (USD 735K). The strategy includes seeking arrest of any OSC vessel entering Pakistani waters as security.",
        timestamp: "2024-07-15T11:04:00Z",
        citations: [
          {
            id: "cit-003",
            caseName: "Port Qasim Authority v. MV Bering Sea",
            citation: "2014 CLC 1234",
            court: "High Court of Sindh",
            year: "2014",
            relevance: "Confirms admiralty jurisdiction for port charges and demurrage claims",
            snippet:
              "The admiralty jurisdiction of the High Court extends to all claims arising out of port charges, dock dues, and demurrage claims under Section 3(2)(d) of the Admiralty Jurisdiction Ordinance, 1980.",
          },
        ],
      },
      {
        id: "lbrf-005-c3",
        role: "user",
        content:
          "What about the arbitration clause in the berthing agreement? Could that be a problem?",
        timestamp: "2024-07-15T11:10:00Z",
      },
    ],
  },
  {
    id: "lbrf-006",
    caseId: "lcas-011",
    caseTitle: "Khalid Mehmood v. WAPDA",
    status: "Draft",
    createdAt: "2025-01-20",
    sections: [
      {
        id: "lbrf-006-s1",
        title: "Case Header",
        content:
          "Civil Suit No. 567/2024 | District Court, Faisalabad | Before Judge Muhammad Arshad\nPlaintiff: Khalid Mehmood s/o Muhammad Sharif | Defendant: Water and Power Development Authority (WAPDA)\nSuit for Damages on Account of Negligence - Electrocution Injury",
      },
      {
        id: "lbrf-006-s2",
        title: "Facts",
        content:
          "On 15-02-2024, the plaintiff Khalid Mehmood, a 45-year-old factory worker, suffered severe electrical burns when he came into contact with an exposed high-tension wire near his residence at 123, Peoples Colony No. 1, Faisalabad. The wire had been hanging dangerously low for over two months despite multiple complaints to WAPDA by the area residents. The plaintiff suffered 40% burns on his body, resulting in permanent disability affecting both arms. He was hospitalized at Allied Hospital, Faisalabad for 3 months with medical expenses exceeding PKR 4.5 million. He has lost his earning capacity as a factory worker. Prior to the incident, the Peoples Colony Welfare Committee had written three letters to WAPDA demanding repair of the exposed wires, which were acknowledged but not acted upon.",
      },
      {
        id: "lbrf-006-s3",
        title: "Issues",
        content:
          "1. Whether WAPDA owed a duty of care to residents of the area to maintain electrical infrastructure in safe condition?\n2. Whether WAPDA's failure to repair the exposed wire despite notice constitutes actionable negligence?\n3. What is the quantum of damages including medical expenses, loss of earning capacity, pain and suffering, and future care costs?\n4. Whether WAPDA can claim contributory negligence on the part of the plaintiff?",
      },
      {
        id: "lbrf-006-s4",
        title: "Arguments",
        content:
          "WAPDA has a statutory and common law duty to maintain electrical infrastructure in a safe condition. The three letters from the Welfare Committee establish that WAPDA had actual notice of the dangerous condition and failed to act. Under the principles of negligence established in Donoghue v. Stevenson and adopted in Pakistani jurisprudence, WAPDA's failure constitutes breach of duty causing foreseeable harm. The damages claimed include: (a) Medical expenses: PKR 4.5 million (documented), (b) Loss of future earnings: PKR 15 million (based on remaining working years and average income), (c) Pain and suffering: PKR 5 million, (d) Future care and rehabilitation: PKR 3 million. Total claim: PKR 27.5 million. Contributory negligence cannot be alleged as the plaintiff was on a public road and the wire was on WAPDA's infrastructure.",
      },
      {
        id: "lbrf-006-s5",
        title: "Applicable Law",
        content:
          "1. WAPDA Act, 1958 - Statutory duties of the Authority\n2. Electricity Act, 1910 - Section 30 (Negligence in supply)\n3. Fatal Accidents Act, 1855 (as applied to personal injury)\n4. Contract Act, 1872 - Section 73 (Analogous application for damages)\n5. Constitution of Pakistan - Article 9 (Right to life includes right to livelihood)\n6. Pakistan Penal Code - Section 337-F (Causing hurt by negligence, for criminal reference)",
      },
      {
        id: "lbrf-006-s6",
        title: "Precedents",
        content:
          "1. WAPDA v. Muhammad Shafi (2013 SCMR 1245) - WAPDA liable for electrocution due to negligent maintenance\n2. K-Electric v. Abdul Qadir (2019 CLC 789) - Quantum of damages in electrocution cases\n3. WAPDA v. Mst. Nasreen Akhtar (PLD 2016 Lahore 234) - Duty of care owed by electricity distribution entities\n4. Pakistan Railways v. Syed Arif Hussain (2017 SCMR 567) - Principles of assessing loss of earning capacity\n5. Sui Southern Gas v. Haji Muhammad (2020 CLC 1890) - Liability of statutory bodies for infrastructure negligence",
      },
      {
        id: "lbrf-006-s7",
        title: "Strategy Notes",
        content:
          "This is a strong case given the documented prior complaints. Obtain certified copies of all three letters to WAPDA with acknowledgment receipts. Commission an independent medical examination to establish the permanent nature of the disability. Engage an actuarial expert for loss of earning capacity calculation. File application for interim relief to secure funds for ongoing medical treatment. Consider joining FESCO (Faisalabad Electric Supply Company) as a co-defendant since they are the distribution company in the area. Prepare for WAPDA's likely argument of being a statutory body with limited liability - counter with constitutional right to life argument.",
      },
    ],
    conversation: [
      {
        id: "lbrf-006-c1",
        role: "user",
        content:
          "Start drafting a brief for the WAPDA negligence case. Client has strong evidence of prior complaints. Focus on damages calculation.",
        timestamp: "2025-01-20T15:00:00Z",
      },
      {
        id: "lbrf-006-c2",
        role: "assistant",
        content:
          "I have prepared a draft brief for the WAPDA negligence case. The damages are calculated at PKR 27.5 million across four heads: medical expenses (PKR 4.5M documented), loss of future earnings (PKR 15M), pain and suffering (PKR 5M), and future care (PKR 3M). The three prior complaint letters are the strongest evidence of WAPDA's knowledge and inaction. I recommend engaging an actuarial expert for the earnings calculation and an independent medical examiner.",
        timestamp: "2025-01-20T15:04:00Z",
      },
      {
        id: "lbrf-006-c3",
        role: "user",
        content:
          "Should we also consider filing a criminal complaint under Section 337-F PPC for causing hurt by negligence?",
        timestamp: "2025-01-20T15:12:00Z",
      },
    ],
  },
  {
    id: "lbrf-007",
    caseId: "lcas-014",
    caseTitle: "Rehman Industries v. Customs Authority",
    status: "Generating",
    createdAt: "2025-02-10",
    sections: [
      {
        id: "lbrf-007-s1",
        title: "Case Header",
        content:
          "Customs Appeal No. 456/2024 | High Court of Sindh, Karachi | Before Justice Aqeel Ahmed Abbasi\nAppellant: Rehman Industries (Pvt) Ltd | Respondent: Collector of Customs, Karachi\nAppeal against Order of Customs Appellate Tribunal",
      },
      {
        id: "lbrf-007-s2",
        title: "Facts",
        content:
          "Rehman Industries imported industrial machinery (CNC milling machines and automated lathes) from Germany through Karachi Port in July 2024. The goods were declared under HS Code 8458.11 (horizontal lathes for removing metal) attracting a customs duty of 5%. The Customs authorities re-classified the goods under HS Code 8457.10 (machining centres) attracting a duty of 20%. The goods were seized under Section 168 of the Customs Act, 1969 pending adjudication. The total value of seized goods is PKR 120 million. Rehman Industries appealed to the Collector (Appeals) who upheld the seizure. The Customs Appellate Tribunal also confirmed the re-classification. The machinery remains in customs bond warehouse for over 6 months, incurring daily warehouse charges.",
      },
      {
        id: "lbrf-007-s3",
        title: "Issues",
        content:
          "1. Whether the re-classification of CNC lathes from HS 8458.11 to HS 8457.10 is legally justified based on the technical specifications of the machinery?\n2. Whether seizure under Section 168 was lawful when the dispute is merely about tariff classification and not smuggling or misdeclaration?\n3. Whether the appellant is entitled to release of goods on provisional assessment under Section 81 of the Customs Act?\n4. Whether the daily warehouse charges during the dispute period should be borne by Customs?",
      },
      {
        id: "lbrf-007-s4",
        title: "Arguments",
        content:
          "The classification dispute is purely technical. The imported machinery are CNC horizontal lathes that operate on a single axis, clearly falling under HS 8458.11. Machining centres under HS 8457.10 are multi-axis machines capable of performing multiple operations without manual intervention. The technical specifications from the German manufacturer (DMG Mori) clearly distinguish the two categories. The WCO (World Customs Organization) Explanatory Notes to Chapter 84 support our classification. Seizure under Section 168 is disproportionate for a classification dispute where there is no element of smuggling. Under Section 81, the appellant should have been allowed provisional assessment pending determination of the correct classification.",
      },
      {
        id: "lbrf-007-s5",
        title: "Applicable Law",
        content:
          "1. Customs Act, 1969 - Sections 25 (Classification), 81 (Provisional assessment), 168 (Seizure), 194-A (Appeals)\n2. Pakistan Customs Tariff (First Schedule to the Customs Act)\n3. Harmonized System of Nomenclature - Chapter 84, Headings 8457-8458\n4. WCO Explanatory Notes to Chapter 84\n5. General Rules for Interpretation of the Harmonized System (GRI Rules 1-6)",
      },
      {
        id: "lbrf-007-s6",
        title: "Precedents",
        content:
          "Generating precedent analysis... This section is being populated with relevant customs classification case law from Supreme Court and High Court judgments.",
      },
      {
        id: "lbrf-007-s7",
        title: "Strategy Notes",
        content:
          "Generating strategy recommendations based on the case analysis...",
      },
    ],
    conversation: [
      {
        id: "lbrf-007-c1",
        role: "user",
        content:
          "Generate a brief for the customs appeal. The key issue is HS Code classification of CNC machinery. We need technical arguments distinguishing lathes from machining centres.",
        timestamp: "2025-02-10T16:00:00Z",
      },
      {
        id: "lbrf-007-c2",
        role: "assistant",
        content:
          "I am generating the brief for the customs appeal. The core argument revolves around the technical distinction between horizontal lathes (HS 8458.11) and machining centres (HS 8457.10). I have drafted the facts, issues, arguments, and applicable law sections. The precedent and strategy sections are still being generated. The WCO Explanatory Notes provide strong support for our classification position.",
        timestamp: "2025-02-10T16:02:00Z",
      },
      {
        id: "lbrf-007-c3",
        role: "user",
        content:
          "Also address why seizure was inappropriate - this is a classification dispute, not smuggling.",
        timestamp: "2025-02-10T16:05:00Z",
      },
    ],
  },
  {
    id: "lbrf-008",
    caseId: "lcas-018",
    caseTitle: "Mst. Nasreen v. Board of Revenue",
    status: "Complete",
    createdAt: "2024-09-01",
    sections: [
      {
        id: "lbrf-008-s1",
        title: "Case Header",
        content:
          "W.P. No. 3456/2024 | Peshawar High Court | Before Justice Rooh ul Amin Khan\nPetitioner: Mst. Nasreen w/o Muhammad Zubair | Respondent: Board of Revenue, KPK\nConstitutional Petition Challenging Amendment Restricting Women's Inheritance of Agricultural Land",
      },
      {
        id: "lbrf-008-s2",
        title: "Facts",
        content:
          "The petitioner, Mst. Nasreen, is the widow of Muhammad Zubair who owned 50 kanals of agricultural land in District Mardan, KPK. After her husband's death in 2023, the petitioner applied for mutation of land in her name as legal heir under Sharia law of inheritance. The Board of Revenue refused the mutation citing a recent amendment to the KPK Land Revenue Act which restricts transfer of agricultural land to female heirs without obtaining a No Objection Certificate from male family members. The petitioner contends that this amendment violates the Sharia principles of inheritance recognized under Article 2-A (Objectives Resolution) and Articles 23, 25, and 26 of the Constitution of Pakistan.",
      },
      {
        id: "lbrf-008-s3",
        title: "Issues",
        content:
          "1. Whether the impugned amendment to the KPK Land Revenue Act ultra vires the Constitution on grounds of gender discrimination under Article 25?\n2. Whether the NOC requirement from male family members violates the Sharia right of inheritance guaranteed under Article 2-A (Objectives Resolution)?\n3. Whether the amendment infringes the right to property under Article 23 of the Constitution?\n4. Whether the amendment violates Pakistan's obligations under international conventions (CEDAW) ratified by the Government?",
      },
      {
        id: "lbrf-008-s4",
        title: "Arguments",
        content:
          "The impugned amendment creates a classification based solely on gender which is constitutionally impermissible under Article 25 of the Constitution. The Supreme Court in numerous judgments has held that classification based on sex alone is discriminatory unless it serves a compelling state interest. The NOC requirement effectively gives male family members a veto over female inheritance, which directly contradicts the Quranic injunctions on inheritance (Surah An-Nisa, 4:7, 4:11, 4:12). Article 2-A makes the Objectives Resolution a substantive part of the Constitution, and any law repugnant to Islamic principles of inheritance is void. Furthermore, Pakistan ratified CEDAW in 1996, committing to eliminate discrimination against women in property rights. The right to property under Article 23 is a fundamental right that cannot be curtailed through discriminatory conditions.",
      },
      {
        id: "lbrf-008-s5",
        title: "Applicable Law",
        content:
          "1. Constitution of Pakistan - Articles 2-A, 8, 23, 25, 26\n2. KPK Land Revenue Act (impugned amendment)\n3. Muslim Personal Law (Shariat) Application Act, 1962\n4. West Pakistan Muslim Personal Law (Shariat) Application Act, 1962 - Section 2\n5. Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW), 1979\n6. Quranic Injunctions on Inheritance - Surah An-Nisa, Verses 7, 11, 12\n7. Punjab Land Revenue Act, 1967 (comparative analysis)",
      },
      {
        id: "lbrf-008-s6",
        title: "Precedents",
        content:
          "1. Mst. Ghulam Fatima v. Province of Punjab (PLD 2019 SC 811) - Women's constitutional right to inherit property\n2. Government of Balochistan v. Azizullah Memon (PLD 2013 SC 470) - Article 25 prohibits gender-based discrimination\n3. Mst. Humaira Mehmood v. The State (PLD 1999 Lahore 494) - Constitutional protection of women's rights under Islamic law\n4. Suo Motu Case No. 1/2014 (PLD 2014 SC 699) - Deprivation of women from inheritance is un-Islamic and unconstitutional\n5. Benazir Bhutto v. Federation of Pakistan (PLD 1988 SC 416) - Objectives Resolution as substantive constitutional provision\n6. Shehla Zia v. WAPDA (PLD 1994 SC 693) - Expansive interpretation of fundamental rights",
      },
      {
        id: "lbrf-008-s7",
        title: "Strategy Notes",
        content:
          "This case has potential for becoming a landmark judgment on women's inheritance rights in KPK. Consider involving human rights organizations as interveners (Aurat Foundation, HRCP). File a comprehensive written submission with Quranic references alongside constitutional arguments - the dual track of Islamic law and constitutional law strengthens the petition significantly. Prepare a comparative analysis showing that no other province has such a restriction. Engage Dr. Faqir Hussain (constitutional law expert) as an amicus curiae. If the Court issues notice, the government will likely argue cultural protection of agricultural land - counter with the argument that culture cannot override constitutional and Sharia rights. Media coverage could build public support but handle sensitively given cultural dynamics in KPK.",
      },
    ],
    conversation: [
      {
        id: "lbrf-008-c1",
        role: "user",
        content:
          "Prepare a constitutional brief challenging the KPK amendment on women's inheritance of agricultural land. Use both Islamic law and constitutional arguments.",
        timestamp: "2024-09-01T10:00:00Z",
      },
      {
        id: "lbrf-008-c2",
        role: "assistant",
        content:
          "The constitutional brief is ready with a dual-track approach combining Islamic inheritance law and constitutional fundamental rights. The Quranic injunctions from Surah An-Nisa are directly invoked alongside Articles 2-A, 23, and 25 of the Constitution. I have included six precedents including the landmark Suo Motu Case of 2014 where the Supreme Court declared deprivation of women from inheritance as un-Islamic and unconstitutional. The strategy recommends involving human rights organizations as interveners.",
        timestamp: "2024-09-01T10:05:00Z",
        citations: [
          {
            id: "cit-004",
            caseName: "Suo Motu Case No. 1/2014",
            citation: "PLD 2014 SC 699",
            court: "Supreme Court of Pakistan",
            year: "2014",
            relevance: "Supreme Court declared deprivation of women from inheritance as un-Islamic and unconstitutional",
            snippet:
              "Denying women their Sharia-mandated share in inheritance is not only a violation of fundamental rights under the Constitution but is also repugnant to the injunctions of Islam as laid down in the Holy Quran.",
          },
        ],
      },
      {
        id: "lbrf-008-c3",
        role: "user",
        content:
          "Should we also reference CEDAW obligations? Pakistan has ratified it.",
        timestamp: "2024-09-01T10:12:00Z",
      },
    ],
  },
];
