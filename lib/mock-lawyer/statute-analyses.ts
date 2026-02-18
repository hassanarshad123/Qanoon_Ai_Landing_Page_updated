import type { StatuteAnalysis } from "./types";

export const statuteAnalyses: StatuteAnalysis[] = [
  {
    id: "lsa-001",
    statuteId: "lstat-001",
    statuteName: "Pakistan Penal Code",
    sectionNumber: "489-F",
    query: "Explain the elements of dishonestly issuing a cheque under Section 489-F PPC",
    plainLanguage:
      "Section 489-F PPC criminalizes the act of dishonestly issuing a cheque that bounces when presented to the bank. If a person issues a cheque to repay a loan or fulfil an obligation, and the cheque is dishonoured (bounced), the person can be punished with up to 3 years imprisonment, fine, or both.\n\nThe key elements are:\n1. The cheque must be issued dishonestly — the person knew or intended that the cheque would not be honoured.\n2. It must be towards repayment of a loan or fulfilment of an obligation — a pre-existing legal liability must exist.\n3. The cheque must be dishonoured on presentation to the drawee bank.\n4. The accused bears the burden of proving they had made arrangements with the bank to ensure the cheque would be honoured.",
    judicialInterpretations:
      "The Supreme Court in Muhammad Amin v. The State (2019 SCMR 1732) held that the essential ingredient of Section 489-F is the dishonest intent at the time of issuing the cheque. Mere dishonour alone is not sufficient; the prosecution must establish that the accused knew the cheque would not be honoured when it was issued.\n\nIn Mst. Rashida Bibi v. The State (2020 PCrLJ 1456), the Lahore High Court clarified that post-dated cheques given as security deposits are not covered under this section, as there must be a pre-existing liability. Security cheques are not issued 'towards repayment of a loan or fulfilment of an obligation' within the meaning of the section.\n\nThe Sindh High Court in Aziz Ahmed v. The State (2018 YLR 2341) held that a compromise between the parties after the offence is a valid ground for acquittal, as the offence is compoundable in nature.",
    amendmentsHistory:
      "Section 489-F was originally inserted in the PPC through the Criminal Law (Amendment) Ordinance, 2002. The original punishment was imprisonment up to one year or fine or both.\n\nThrough the Criminal Laws (Amendment) Act, 2020, the punishment was enhanced from one year to three years imprisonment, reflecting the legislature's intent to more strictly penalize cheque fraud and protect commercial transactions.\n\nThe 2020 amendment also clarified the burden of proof provisions, explicitly placing the onus on the accused to demonstrate banking arrangements were in place.",
    relatedSections: [
      "Section 420 PPC — Cheating and dishonestly inducing delivery of property",
      "Section 468 PPC — Forgery for purpose of cheating",
      "Section 406 PPC — Criminal breach of trust",
      "Section 3 Negotiable Instruments Act 1881 — Definition of negotiable instrument",
    ],
    createdAt: "2025-06-12T10:45:00Z",
    conversation: [
      {
        id: "lsa-001-m1",
        role: "user",
        content:
          "Explain the elements of dishonestly issuing a cheque under Section 489-F PPC",
        timestamp: "2025-06-12T10:45:00Z",
      },
      {
        id: "lsa-001-m2",
        role: "assistant",
        content:
          "Section 489-F PPC criminalizes bounced cheques issued dishonestly. The prosecution must prove four elements: (1) dishonest intent at the time of issuance, (2) the cheque was issued for repayment of a loan or fulfilment of an obligation, (3) it was dishonoured on presentation, and (4) the accused cannot demonstrate banking arrangements. The burden on element (4) rests on the accused.",
        timestamp: "2025-06-12T10:46:00Z",
        citations: [
          {
            id: "lsa-001-c1",
            caseName: "Muhammad Amin v. The State",
            citation: "2019 SCMR 1732",
            court: "Supreme Court of Pakistan",
            year: "2019",
            relevance: "Defined the essential elements of Section 489-F",
            snippet:
              "The essential ingredient is the dishonest intent at the time of issuing the cheque; mere dishonour is insufficient.",
          },
        ],
      },
      {
        id: "lsa-001-m3",
        role: "user",
        content:
          "Does this section apply to post-dated cheques given as security?",
        timestamp: "2025-06-12T10:48:00Z",
      },
      {
        id: "lsa-001-m4",
        role: "assistant",
        content:
          "No. The Lahore High Court in Mst. Rashida Bibi v. The State (2020 PCrLJ 1456) clarified that post-dated cheques given as security are not covered under Section 489-F. The section requires the cheque to be issued 'towards repayment of a loan or fulfilment of an obligation,' meaning a pre-existing legal liability. Security cheques do not meet this threshold as they are conditional in nature.",
        timestamp: "2025-06-12T10:49:00Z",
        citations: [
          {
            id: "lsa-001-c2",
            caseName: "Mst. Rashida Bibi v. The State",
            citation: "2020 PCrLJ 1456",
            court: "Lahore High Court",
            year: "2020",
            relevance: "Security cheques excluded from Section 489-F",
            snippet:
              "Post-dated cheques given as security deposits do not fall within the ambit of Section 489-F PPC.",
          },
        ],
      },
    ],
  },
  {
    id: "lsa-002",
    statuteId: "lstat-004",
    statuteName: "Constitution of the Islamic Republic of Pakistan",
    sectionNumber: "10-A",
    query: "Scope and application of Article 10-A right to fair trial",
    plainLanguage:
      "Article 10-A of the Constitution guarantees every person the right to a fair trial and due process. This fundamental right was inserted by the 18th Amendment in 2010.\n\nIn simple terms:\n1. Every person has the right to be heard before a decision is made against them.\n2. Proceedings must be conducted fairly and impartially by an independent tribunal.\n3. The right extends to all stages of judicial and quasi-judicial proceedings, including administrative actions.\n4. It encompasses the right to legal representation, the right to present evidence, the right to cross-examine witnesses, and the right to be informed of the charges or claims against them.",
    judicialInterpretations:
      "The Supreme Court in Mustafa Impex v. Government of Pakistan (PLD 2016 SC 808) gave an expansive interpretation to Article 10-A, holding that it encompasses all principles of natural justice — audi alteram partem (hear the other side) and nemo judex in causa sua (no one should be a judge in their own cause) — and applies to all governmental actions affecting individual rights.\n\nIn Syed Mushahid Shah v. Federation of Pakistan (2020 SCMR 1), the Court held that Article 10-A has both procedural and substantive dimensions. Any law or executive action that violates fair trial standards is liable to be struck down as unconstitutional.\n\nThe Islamabad High Court in Raja Muhammad Amin v. NAB (2021 PCrLJ 891) extended fair trial protections to NAB (National Accountability Bureau) proceedings, emphasizing the right to cross-examination and the prohibition on coerced confessions.",
    amendmentsHistory:
      "Article 10-A was inserted by the Constitution (Eighteenth Amendment) Act, 2010, through Section 5 of the Amendment. This was one of the most significant additions made by the 18th Amendment.\n\nPrior to the 18th Amendment, fair trial rights were derived implicitly from other constitutional provisions, particularly Articles 4 (right to be dealt with in accordance with law), 9 (security of person), 14 (dignity of man), and 25 (equality). The explicit insertion of Article 10-A gave direct constitutional recognition to this fundamental right.\n\nNo subsequent amendments have been made to Article 10-A since its insertion in 2010.",
    relatedSections: [
      "Article 4 — Right of individuals to be dealt with in accordance with law",
      "Article 9 — Security of person",
      "Article 14 — Inviolability of dignity of man",
      "Article 25 — Equality of citizens",
    ],
    createdAt: "2025-06-15T14:30:00Z",
    conversation: [
      {
        id: "lsa-002-m1",
        role: "user",
        content:
          "What is the scope and application of Article 10-A?",
        timestamp: "2025-06-15T14:30:00Z",
      },
      {
        id: "lsa-002-m2",
        role: "assistant",
        content:
          "Article 10-A guarantees fair trial and due process as a fundamental right. It was introduced by the 18th Amendment in 2010 and applies to all civil and criminal proceedings. The Supreme Court has interpreted it expansively to include natural justice principles and substantive protections beyond mere procedural safeguards.",
        timestamp: "2025-06-15T14:31:00Z",
        citations: [
          {
            id: "lsa-002-c1",
            caseName: "Mustafa Impex v. Government of Pakistan",
            citation: "PLD 2016 SC 808",
            court: "Supreme Court of Pakistan",
            year: "2016",
            relevance: "Expansive interpretation of Article 10-A",
            snippet:
              "Article 10-A encompasses all principles of natural justice and applies to every governmental action affecting individual rights.",
          },
        ],
      },
      {
        id: "lsa-002-m3",
        role: "user",
        content:
          "Does Article 10-A apply to NAB proceedings?",
        timestamp: "2025-06-15T14:33:00Z",
      },
      {
        id: "lsa-002-m4",
        role: "assistant",
        content:
          "Yes. The Islamabad High Court in Raja Muhammad Amin v. NAB (2021 PCrLJ 891) expressly held that Article 10-A protections extend to NAB proceedings. The accused has the right to legal representation, the right to cross-examine prosecution witnesses, and protection against coerced confessions under NAB custody. The court noted that NAB's mandate to combat corruption does not override constitutional guarantees of fair trial.",
        timestamp: "2025-06-15T14:34:00Z",
        citations: [
          {
            id: "lsa-002-c2",
            caseName: "Raja Muhammad Amin v. NAB",
            citation: "2021 PCrLJ 891",
            court: "Islamabad High Court",
            year: "2021",
            relevance: "Fair trial rights in NAB proceedings",
            snippet:
              "The right to fair trial under Article 10-A extends fully to NAB proceedings; anti-corruption mandate does not override constitutional guarantees.",
          },
        ],
      },
    ],
  },
  {
    id: "lsa-003",
    statuteId: "lstat-002",
    statuteName: "Code of Criminal Procedure",
    sectionNumber: "497",
    query: "When can bail be granted in non-bailable offences under Section 497 CrPC?",
    plainLanguage:
      "Section 497 CrPC governs the grant of bail in non-bailable offences. The court has discretion to grant bail when:\n\n1. There are no reasonable grounds for believing the accused is guilty of an offence punishable with death or imprisonment for life.\n2. Further inquiry into the guilt of the accused is required.\n3. The accused is a woman or a child under sixteen years of age.\n4. The accused is sick or infirm and detention would be unjust.\n\nThe section explicitly provides that bail shall NOT be granted if there appear reasonable grounds for believing the accused is guilty of an offence punishable with death, imprisonment for life, or imprisonment for ten years. However, even in such cases, bail may be granted if the trial is unduly delayed.",
    judicialInterpretations:
      "In Tariq Bashir v. The State (PLD 1995 SC 34), the Supreme Court laid down comprehensive guidelines for bail in non-bailable offences, emphasizing that bail is the rule and jail is the exception, and that the accused is presumed innocent until proved guilty.\n\nThe Lahore High Court in Muhammad Arshad v. The State (2021 YLR 1892) held that prolonged incarceration during trial can itself constitute a ground for bail, invoking Article 10-A rights to fair trial and Article 9 rights to liberty.\n\nIn The State v. Syed Qaim Ali Shah (1992 SCMR 2192), the Supreme Court clarified that the deeper appreciation of evidence is not permissible at the bail stage; the court must confine itself to a tentative assessment of the available material.",
    amendmentsHistory:
      "Section 497 has undergone multiple amendments since its original enactment in 1898. The most significant amendment came through the Code of Criminal Procedure (Amendment) Ordinance, 2001, which introduced additional grounds for bail consideration and expanded the categories of persons entitled to bail as of right.\n\nThe Anti-Terrorism (Amendment) Act, 2013 introduced special provisions for bail in terrorism cases, creating exceptions to the general principles of Section 497 and imposing a stricter standard for bail in terrorism-related offences.\n\nThe Criminal Law (Amendment) Act, 2016 further amended Section 497 to address honour killing cases, restricting bail where the offence involves honour-based violence.",
    relatedSections: [
      "Section 496 CrPC — Bail in bailable offences (bail as of right)",
      "Section 498 CrPC — Bail by High Court or Court of Session",
      "Section 499 CrPC — Bond of accused and sureties",
      "Section 426 CrPC — Suspension of sentence pending appeal",
    ],
    createdAt: "2025-07-01T09:15:00Z",
    conversation: [
      {
        id: "lsa-003-m1",
        role: "user",
        content:
          "When can bail be granted in non-bailable offences?",
        timestamp: "2025-07-01T09:15:00Z",
      },
      {
        id: "lsa-003-m2",
        role: "assistant",
        content:
          "Section 497 CrPC grants courts discretion to release an accused in a non-bailable offence on bail, provided there are no reasonable grounds for believing guilt of an offence punishable with death or life imprisonment. Women, children under 16, and sick persons have special entitlements. The Supreme Court has repeatedly affirmed that bail is the rule and jail the exception.",
        timestamp: "2025-07-01T09:16:00Z",
        citations: [
          {
            id: "lsa-003-c1",
            caseName: "Tariq Bashir v. The State",
            citation: "PLD 1995 SC 34",
            court: "Supreme Court of Pakistan",
            year: "1995",
            relevance: "Comprehensive principles for bail in non-bailable offences",
            snippet:
              "Bail is the rule and jail is the exception; the accused is presumed innocent until proved guilty.",
          },
        ],
      },
    ],
  },
  {
    id: "lsa-004",
    statuteId: "lstat-003",
    statuteName: "Code of Civil Procedure",
    sectionNumber: "151",
    query: "Inherent powers of the court under Section 151 CPC",
    plainLanguage:
      "Section 151 CPC preserves the inherent power of every civil court to make orders necessary for the ends of justice or to prevent abuse of the court's process.\n\nThis section acts as a residual power that can be invoked when:\n1. No specific provision exists in the CPC to address a particular situation.\n2. The interests of justice require immediate court intervention to prevent injustice.\n3. The court's process is being abused by a party through delay, vexation, or frivolous litigation.\n\nImportant limitation: This power cannot be used to override or contradict express provisions of the Code. It supplements the Code; it does not supplant it.",
    judicialInterpretations:
      "The Supreme Court in Collector of Customs v. Sheikh Spinning Mills (PLD 2017 SC 427) held that Section 151 CPC cannot be used to bypass specific procedures expressly provided in the Code. The inherent power is supplementary, not overriding.\n\nIn Hassan Ali v. Government of Punjab (2020 CLC 1234), the Lahore High Court exercised inherent powers to consolidate related suits pending before different courts in the interest of justice, noting that rigid adherence to procedure should not defeat substantive justice.\n\nThe Supreme Court in Nazir Ahmed v. Muhammad Iqbal (PLD 2009 SC 545) observed that inherent powers under Section 151 CPC can be exercised ex debito justitiae (as a matter of right and justice) when no other specific remedy is available.",
    amendmentsHistory:
      "Section 151 has remained substantially unchanged since the original enactment of the Code of Civil Procedure in 1908. Its broad and purposefully vague language has allowed courts to adapt its application to modern judicial needs without requiring legislative amendment.\n\nThe West Pakistan Civil Courts Ordinance, 1962 and subsequent provincial amendments did not alter the text of Section 151, preserving its original formulation as enacted by the British colonial legislature.\n\nJudicial interpretation has effectively expanded the scope of this section over time, particularly in areas such as electronic evidence, virtual hearings, and alternative dispute resolution.",
    relatedSections: [
      "Section 94 CPC — Supplemental proceedings and temporary injunctions",
      "Order XXXIX CPC — Temporary injunctions and interlocutory orders",
      "Section 141 CPC — Application of provisions to miscellaneous proceedings",
      "Section 148 CPC — Power to enlarge time",
    ],
    createdAt: "2025-07-10T11:20:00Z",
    conversation: [
      {
        id: "lsa-004-m1",
        role: "user",
        content:
          "What are the inherent powers of the court under Section 151 CPC?",
        timestamp: "2025-07-10T11:20:00Z",
      },
      {
        id: "lsa-004-m2",
        role: "assistant",
        content:
          "Section 151 CPC preserves the inherent power of every civil court to make orders necessary for the ends of justice or to prevent abuse of process. It is a residual power invoked only when no specific provision addresses the situation. It cannot override express provisions of the Code.",
        timestamp: "2025-07-10T11:21:00Z",
        citations: [
          {
            id: "lsa-004-c1",
            caseName: "Collector of Customs v. Sheikh Spinning Mills",
            citation: "PLD 2017 SC 427",
            court: "Supreme Court of Pakistan",
            year: "2017",
            relevance: "Limitations on inherent powers under Section 151",
            snippet:
              "Section 151 cannot be invoked to circumvent specific procedures expressly provided in the Code of Civil Procedure.",
          },
        ],
      },
    ],
  },
  {
    id: "lsa-005",
    statuteId: "lstat-001",
    statuteName: "Pakistan Penal Code",
    sectionNumber: "302",
    query: "Explain the categories of punishment for Qatl-i-Amd under Section 302 PPC",
    plainLanguage:
      "Section 302 PPC prescribes the punishment for Qatl-i-Amd (intentional murder). The punishment falls into three categories:\n\n1. **Qisas (Retribution):** Death as qisas when the offence is proved through the testimony of witnesses or a voluntary and true confession before a competent court.\n2. **Ta'zir (Discretionary Punishment):** Death or imprisonment for life when qisas-level proof is not available but guilt is established through other evidence.\n3. **Reduced Ta'zir:** Imprisonment up to twenty-five years where, according to the injunctions of Islam, qisas is not applicable (e.g., when the right of qisas has been waived or compounded).\n\nImportantly, the heirs (wali) of the deceased have the right to waive qisas or enter into a compromise (sulh) with the accused, which is a distinctive feature of Pakistani homicide law based on Islamic principles.",
    judicialInterpretations:
      "The Supreme Court in Muhammad Akram v. The State (PLD 2001 SC 96) held that the right of qisas belongs to the heirs of the deceased, and the State cannot override this right. However, the State retains the power to impose ta'zir punishment even after the heirs have compounded the offence.\n\nIn Ghulam Qadir v. The State (2008 SCMR 1221), the Court clarified that circumstantial evidence alone can be the basis for conviction under Section 302, provided the chain of circumstances is complete and admits of no reasonable hypothesis other than guilt.\n\nThe landmark case of Sughran Bibi v. The State (PLD 2018 SC 595) addressed honour killings, holding that the Criminal Law (Amendment) Act, 2016 has restricted the right to compound in fasad-fil-arz (mischief on earth) cases, including honour killings, and imposed a mandatory minimum sentence of life imprisonment.",
    amendmentsHistory:
      "Section 302 was substantially amended in 1990 through the Criminal Law (Amendment) Act to introduce the concepts of qisas and diyat (blood money) in accordance with Islamic injunctions. This replaced the original British-era provision.\n\nThe Criminal Law (Amendment) (Offences in the Name or on the Pretext of Honour) Act, 2016 introduced Section 311 proviso, mandating that in cases of fasad-fil-arz (including honour killings), even if the heirs pardon the offender, the court must award imprisonment for life as ta'zir.\n\nThe 2016 amendment was a response to the widespread practice of honour killings where families would pardon the killer, effectively allowing murderers to escape punishment.",
    relatedSections: [
      "Section 299 PPC — Definitions of qatl, hurt, etc.",
      "Section 304 PPC — Proof of qatl-i-amd liable to qisas",
      "Section 309 PPC — Qatl-i-amd not liable to qisas",
      "Section 310 PPC — Waiver or compounding of qisas in qatl-i-amd",
      "Section 311 PPC — Ta'zir after waiver or compounding of qisas",
      "Section 338-E PPC — Diyat (blood money) provisions",
    ],
    createdAt: "2025-07-20T08:00:00Z",
    conversation: [
      {
        id: "lsa-005-m1",
        role: "user",
        content:
          "What are the categories of punishment for murder (Qatl-i-Amd) under Section 302?",
        timestamp: "2025-07-20T08:00:00Z",
      },
      {
        id: "lsa-005-m2",
        role: "assistant",
        content:
          "Section 302 provides three tiers of punishment: (1) death as qisas when proved through direct testimony or confession, (2) death or life imprisonment as ta'zir when qisas-level proof is unavailable, and (3) imprisonment up to 25 years where qisas is inapplicable under Islamic injunctions. The heirs of the deceased retain the right to waive or compound qisas.",
        timestamp: "2025-07-20T08:01:00Z",
        citations: [
          {
            id: "lsa-005-c1",
            caseName: "Muhammad Akram v. The State",
            citation: "PLD 2001 SC 96",
            court: "Supreme Court of Pakistan",
            year: "2001",
            relevance: "Right of qisas belongs to heirs; State retains ta'zir power",
            snippet:
              "The right of qisas vests in the heirs of the deceased; however, the State retains the power to impose ta'zir even after compounding.",
          },
        ],
      },
      {
        id: "lsa-005-m3",
        role: "user",
        content:
          "What about honour killings — can the family still pardon the killer?",
        timestamp: "2025-07-20T08:03:00Z",
      },
      {
        id: "lsa-005-m4",
        role: "assistant",
        content:
          "After the Criminal Law (Amendment) Act, 2016, honour killings are treated as fasad-fil-arz (mischief on earth). Even if the heirs pardon the offender under qisas provisions, the court must impose a mandatory minimum sentence of imprisonment for life as ta'zir under the amended Section 311 proviso. The Supreme Court in Sughran Bibi v. The State (PLD 2018 SC 595) upheld this amendment.",
        timestamp: "2025-07-20T08:04:00Z",
        citations: [
          {
            id: "lsa-005-c2",
            caseName: "Sughran Bibi v. The State",
            citation: "PLD 2018 SC 595",
            court: "Supreme Court of Pakistan",
            year: "2018",
            relevance: "Honour killing convictions; mandatory life imprisonment even after pardon",
            snippet:
              "In fasad-fil-arz cases including honour killings, the court shall award imprisonment for life as ta'zir even if qisas is compounded by the heirs.",
          },
        ],
      },
    ],
  },
  {
    id: "lsa-006",
    statuteId: "lstat-005",
    statuteName: "Qanun-e-Shahadat Order",
    sectionNumber: "76",
    query: "Admissibility of confessions under Article 76 of Qanun-e-Shahadat Order",
    plainLanguage:
      "Article 76 of the Qanun-e-Shahadat Order (QSO) lays down strict rules regarding the admissibility of confessions:\n\n1. No confession made to a police officer is admissible in evidence against the accused.\n2. No confession made while in police custody is admissible unless it was made in the immediate presence of a Magistrate.\n3. A retracted confession can be used if the court is satisfied that it was made voluntarily and is true.\n\nThe rationale behind this rule is to protect the accused from coerced or involuntary confessions extracted through police pressure or torture. It ensures that confessions used in court have the safeguard of judicial oversight.",
    judicialInterpretations:
      "The Supreme Court in Azeem Khan v. Mujahid Khan (2016 SCMR 274) held that a confession recorded before a Magistrate must satisfy three tests: (1) it must be voluntary, (2) the Magistrate must have administered proper warnings to the accused, and (3) the accused must have been given sufficient time to reflect.\n\nIn Naveed Asghar v. The State (PLD 2021 SC 600), the Supreme Court laid down comprehensive guidelines for recording confessions under Section 164 CrPC read with Article 76 QSO, emphasizing that the Magistrate must satisfy himself that the confession is voluntary and not induced by threat, promise, or inducement.\n\nThe Lahore High Court in Muhammad Aslam v. The State (2019 PCrLJ 345) held that a confession retracted at the earliest opportunity loses its evidentiary value unless there is strong corroborative evidence.",
    amendmentsHistory:
      "Article 76 of the QSO corresponds to the former Section 25 and 26 of the Indian Evidence Act, 1872, which it replaced in 1984. The substantive content remained largely the same, but the numbering and organization were revised.\n\nThe Qanun-e-Shahadat (Amendment) Ordinance, 2002 made minor procedural amendments to clarify the role of the Magistrate in recording confessions.\n\nThe Anti-Terrorism Act, 1997 created a separate regime for confessions in terrorism cases, initially allowing confessions to police officers of certain rank to be admissible. However, this provision was struck down by the courts as violating fundamental rights.",
    relatedSections: [
      "Article 77 QSO — Confession caused by inducement, threat, or promise",
      "Article 78 QSO — Dying declarations",
      "Section 164 CrPC — Recording of confessions and statements by Magistrate",
      "Article 14 Constitution — Prohibition against torture",
    ],
    createdAt: "2025-08-01T15:00:00Z",
    conversation: [
      {
        id: "lsa-006-m1",
        role: "user",
        content:
          "How are confessions treated under the Qanun-e-Shahadat Order?",
        timestamp: "2025-08-01T15:00:00Z",
      },
      {
        id: "lsa-006-m2",
        role: "assistant",
        content:
          "Under Article 76 QSO, confessions to police officers are inadmissible. Confessions in police custody are only admissible if made before a Magistrate. The Magistrate must ensure the confession is voluntary, administer warnings, and allow the accused time to reflect before recording the statement.",
        timestamp: "2025-08-01T15:01:00Z",
        citations: [
          {
            id: "lsa-006-c1",
            caseName: "Azeem Khan v. Mujahid Khan",
            citation: "2016 SCMR 274",
            court: "Supreme Court of Pakistan",
            year: "2016",
            relevance: "Three-part test for admissibility of judicial confessions",
            snippet:
              "A confession must satisfy three tests: voluntariness, proper Magistrate warnings, and adequate time for reflection.",
          },
        ],
      },
      {
        id: "lsa-006-m3",
        role: "user",
        content:
          "What if the accused retracts the confession?",
        timestamp: "2025-08-01T15:03:00Z",
      },
      {
        id: "lsa-006-m4",
        role: "assistant",
        content:
          "A retracted confession is not automatically excluded, but its evidentiary weight is significantly diminished. The Lahore High Court in Muhammad Aslam v. The State (2019 PCrLJ 345) held that a confession retracted at the earliest opportunity loses its evidentiary value unless there is strong corroborative evidence establishing its truthfulness. The court must exercise great caution before convicting on a retracted confession alone.",
        timestamp: "2025-08-01T15:04:00Z",
        citations: [
          {
            id: "lsa-006-c2",
            caseName: "Muhammad Aslam v. The State",
            citation: "2019 PCrLJ 345",
            court: "Lahore High Court",
            year: "2019",
            relevance: "Evidentiary value of retracted confessions",
            snippet:
              "A retracted confession loses its evidentiary value unless corroborated by strong independent evidence.",
          },
        ],
      },
    ],
  },
  {
    id: "lsa-007",
    statuteId: "lstat-004",
    statuteName: "Constitution of the Islamic Republic of Pakistan",
    sectionNumber: "199",
    query: "Scope of writ jurisdiction under Article 199 of the Constitution",
    plainLanguage:
      "Article 199 confers writ jurisdiction upon the High Courts of Pakistan. This is the constitutional remedy through which citizens can challenge illegal, unlawful, or unconstitutional actions by public authorities.\n\nThe High Court can issue five types of writs:\n1. **Habeas Corpus** — To secure the release of a person illegally detained.\n2. **Mandamus** — To compel a public authority to perform a duty it is legally bound to perform.\n3. **Prohibition** — To prevent a lower court or tribunal from exceeding its jurisdiction.\n4. **Certiorari** — To quash an order passed without jurisdiction or in violation of natural justice.\n5. **Quo Warranto** — To challenge the authority of a person holding a public office.\n\nKey limitations: No writ lies against military personnel (Article 199(3)), and the High Court cannot exercise jurisdiction outside its territorial limits (Article 199(5)).",
    judicialInterpretations:
      "In Miss Asma Jilani v. Government of the Punjab (PLD 1972 SC 139), the Supreme Court affirmed that writ jurisdiction is a constitutional safeguard that must be exercised to protect fundamental rights.\n\nThe Supreme Court in Mst. Shahida Zahir Abbasi v. President of Pakistan (PLD 1996 SC 632) held that the existence of an alternative remedy does not automatically bar writ jurisdiction, particularly where fundamental rights are at stake.\n\nIn Pakistan International Airlines v. Tanweer-ur-Rehman (PLD 2010 SC 676), the Court applied a functional test, holding that statutory corporations performing public functions are amenable to writ jurisdiction regardless of their corporate form.",
    amendmentsHistory:
      "Article 199 was part of the original Constitution of 1973. The Eighth Amendment (1985) made certain modifications to the scope of writ jurisdiction, particularly in relation to presidential powers.\n\nThe Eighteenth Amendment (2010) restored several aspects of writ jurisdiction that had been curtailed by earlier military-era amendments. It reaffirmed the independence of the High Courts and their constitutional role as guardians of fundamental rights.\n\nThe Twenty-first Amendment (2015) temporarily ousted writ jurisdiction in matters relating to military courts established to try terrorism suspects, though this was subject to significant judicial challenge.",
    relatedSections: [
      "Article 184(3) — Original jurisdiction of Supreme Court for fundamental rights",
      "Article 4 — Right of individuals to be dealt with in accordance with law",
      "Article 175 — Establishment and jurisdiction of courts",
      "Article 8 — Laws inconsistent with fundamental rights to be void",
    ],
    createdAt: "2025-08-10T10:00:00Z",
    conversation: [
      {
        id: "lsa-007-m1",
        role: "user",
        content:
          "What is the scope of writ jurisdiction under Article 199?",
        timestamp: "2025-08-10T10:00:00Z",
      },
      {
        id: "lsa-007-m2",
        role: "assistant",
        content:
          "Article 199 empowers the High Courts to issue five types of writs: habeas corpus, mandamus, prohibition, certiorari, and quo warranto. The jurisdiction lies against any person performing functions in connection with the affairs of the Federation, Province, or local authority. Key limitations include territorial restrictions and exemption for armed forces personnel.",
        timestamp: "2025-08-10T10:01:00Z",
        citations: [
          {
            id: "lsa-007-c1",
            caseName: "Miss Asma Jilani v. Government of the Punjab",
            citation: "PLD 1972 SC 139",
            court: "Supreme Court of Pakistan",
            year: "1972",
            relevance: "Constitutional safeguard nature of writ jurisdiction",
            snippet:
              "Writ jurisdiction is a constitutional safeguard and must be exercised to protect fundamental rights.",
          },
        ],
      },
      {
        id: "lsa-007-m3",
        role: "user",
        content:
          "Does the availability of an alternative remedy bar writ jurisdiction?",
        timestamp: "2025-08-10T10:03:00Z",
      },
      {
        id: "lsa-007-m4",
        role: "assistant",
        content:
          "Not necessarily. While Article 199 states that the High Court exercises jurisdiction where 'no other adequate remedy is provided by law,' the Supreme Court in Mst. Shahida Zahir Abbasi (PLD 1996 SC 632) held that this bar is not absolute. Where fundamental rights are involved, the High Court retains jurisdiction regardless of alternative remedies. The adequacy of the alternative remedy must be assessed in each case.",
        timestamp: "2025-08-10T10:04:00Z",
        citations: [
          {
            id: "lsa-007-c2",
            caseName: "Mst. Shahida Zahir Abbasi v. President of Pakistan",
            citation: "PLD 1996 SC 632",
            court: "Supreme Court of Pakistan",
            year: "1996",
            relevance: "Alternative remedy does not bar writ when fundamental rights at stake",
            snippet:
              "The existence of an alternative remedy does not bar writ jurisdiction where fundamental rights are at stake.",
          },
        ],
      },
    ],
  },
  {
    id: "lsa-008",
    statuteId: "lstat-003",
    statuteName: "Code of Civil Procedure",
    sectionNumber: "11",
    query: "Doctrine of Res Judicata under Section 11 CPC",
    plainLanguage:
      "Section 11 CPC embodies the doctrine of res judicata, which prevents the same issue from being litigated again between the same parties.\n\nThe requirements for res judicata to apply are:\n1. The matter directly and substantially in issue in the subsequent suit was also directly and substantially in issue in the former suit.\n2. The former suit was between the same parties (or parties claiming under them).\n3. The parties were litigating under the same title.\n4. The former suit was decided by a court competent to try the subsequent suit.\n5. The issue was heard and finally decided in the former suit.\n\nThe purpose is to prevent multiplicity of proceedings, protect judicial resources, and give finality to judgments. No person should be vexed twice for the same cause.",
    judicialInterpretations:
      "The Supreme Court in Syed Mehmood-ul-Hassan v. Syed Mohsin-ul-Hassan (PLD 2003 SC 116) held that res judicata is a matter of public policy based on the principle that litigation must come to an end. The bar applies not only to issues actually raised but also to issues that could and ought to have been raised in the earlier proceedings (constructive res judicata).\n\nIn Muhammad Yousaf v. Nazar Hussain (2017 SCMR 813), the Court clarified that res judicata operates as a bar to the trial of the suit itself, not merely as a rule of evidence. The court must decline jurisdiction if res judicata is established.\n\nThe Lahore High Court in Ghulam Rasool v. Mst. Amina Bibi (2020 CLC 567) held that res judicata does not apply to consent decrees if the consent was obtained by fraud or misrepresentation.",
    amendmentsHistory:
      "Section 11 CPC has remained substantially unchanged since its enactment in 1908. The doctrine traces its roots to Roman law (res judicata pro veritate accipitur — a thing adjudicated is taken as truth) and was codified by the British in India.\n\nThe West Pakistan Civil Courts Ordinance, 1962 did not modify Section 11 but supplemented it with additional procedural provisions for preliminary issues.\n\nJudicial interpretation has expanded the doctrine through concepts like constructive res judicata (matters that could have been raised but were not) and the extension of the doctrine to writ proceedings and administrative adjudications.",
    relatedSections: [
      "Section 10 CPC — Res sub judice (stay of suit where same matter pending)",
      "Section 12 CPC — Bar to suit (including fraud upon the court)",
      "Section 100 CPC — Second appeal on questions of law",
      "Order II Rule 2 CPC — Suit to include whole claim",
    ],
    createdAt: "2025-08-15T16:30:00Z",
    conversation: [
      {
        id: "lsa-008-m1",
        role: "user",
        content:
          "Explain the doctrine of res judicata under Section 11 CPC.",
        timestamp: "2025-08-15T16:30:00Z",
      },
      {
        id: "lsa-008-m2",
        role: "assistant",
        content:
          "Section 11 CPC prevents re-litigation of issues that have already been decided between the same parties by a competent court. Five conditions must be met: same issue, same parties, same title, competent court, and final decision in the earlier suit. The doctrine extends to constructive res judicata — matters that should have been raised in the earlier proceedings.",
        timestamp: "2025-08-15T16:31:00Z",
        citations: [
          {
            id: "lsa-008-c1",
            caseName: "Syed Mehmood-ul-Hassan v. Syed Mohsin-ul-Hassan",
            citation: "PLD 2003 SC 116",
            court: "Supreme Court of Pakistan",
            year: "2003",
            relevance: "Res judicata as public policy; constructive res judicata",
            snippet:
              "Res judicata is a matter of public policy; it bars not only issues actually raised but also those that could and ought to have been raised.",
          },
        ],
      },
      {
        id: "lsa-008-m3",
        role: "user",
        content:
          "Does res judicata apply if the earlier decree was obtained by fraud?",
        timestamp: "2025-08-15T16:33:00Z",
      },
      {
        id: "lsa-008-m4",
        role: "assistant",
        content:
          "No. The Lahore High Court in Ghulam Rasool v. Mst. Amina Bibi (2020 CLC 567) held that res judicata does not apply to consent decrees obtained by fraud or misrepresentation. A decree obtained by fraud is a nullity in the eyes of the law, and it can be challenged under Section 12(2) CPC which specifically addresses fraud upon the court. The principle is that 'fraud vitiates the most solemn proceedings.'",
        timestamp: "2025-08-15T16:34:00Z",
        citations: [
          {
            id: "lsa-008-c2",
            caseName: "Ghulam Rasool v. Mst. Amina Bibi",
            citation: "2020 CLC 567",
            court: "Lahore High Court",
            year: "2020",
            relevance: "Res judicata inapplicable to fraudulent consent decrees",
            snippet:
              "A decree obtained by fraud is a nullity; res judicata cannot shield a judgment procured through misrepresentation.",
          },
        ],
      },
    ],
  },
];
