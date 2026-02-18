import type { ResearchConversation } from "./types";

export const lawyerResearchConversations: ResearchConversation[] = [
  {
    id: "lres-001",
    title: "Fundamental Rights under Article 25 – Right to Equality",
    createdAt: "2025-06-12T09:30:00Z",
    messages: [
      {
        id: "lres-001-m1",
        role: "user",
        content:
          "What does Article 25 of the Constitution of Pakistan guarantee and how have courts interpreted the right to equality?",
        timestamp: "2025-06-12T09:30:00Z",
      },
      {
        id: "lres-001-m2",
        role: "assistant",
        content:
          "Article 25 of the Constitution of Pakistan, 1973 guarantees the right to equality before the law and equal protection of the law. Clause (1) states that all citizens are equal before the law and are entitled to equal protection of the law. Clause (2) prohibits discrimination on the basis of sex alone, while Clause (3) permits the State to make special provisions for the protection of women and children.\n\nThe Supreme Court has consistently interpreted Article 25 to mean that persons similarly situated must be treated alike. The principle does not prohibit classification, but any classification must be founded on an intelligible differentia that has a rational nexus with the object sought to be achieved by the legislation.",
        timestamp: "2025-06-12T09:30:15Z",
        citations: [
          {
            id: "c-001-1",
            caseName: "Shirin Munir v. Government of Punjab",
            citation: "PLD 1990 SC 295",
            court: "Supreme Court of Pakistan",
            year: "1990",
            relevance:
              "Landmark ruling on gender-based classification under Article 25",
            snippet:
              "The classification must have a rational nexus with the object of the statute; otherwise it would be hit by Article 25.",
          },
          {
            id: "c-001-2",
            caseName:
              "I.A. Sherwani v. Government of Pakistan",
            citation: "1991 SCMR 1041",
            court: "Supreme Court of Pakistan",
            year: "1991",
            relevance:
              "Elaborated the test for reasonable classification under Article 25",
            snippet:
              "Equality before law does not mean that all laws must be general in character and universal in application.",
          },
        ],
      },
      {
        id: "lres-001-m3",
        role: "user",
        content:
          "How does this interact with Article 27 regarding discrimination in services?",
        timestamp: "2025-06-12T09:32:00Z",
      },
      {
        id: "lres-001-m4",
        role: "assistant",
        content:
          "Article 27 specifically addresses discrimination in appointments to public services. It provides that no citizen otherwise qualified for appointment in the service of Pakistan shall be discriminated against on the ground only of race, religion, caste, sex, residence, or place of birth.\n\nHowever, Article 27(2) allows for reservation of posts for persons belonging to any class or area to secure their adequate representation in the service of Pakistan for a maximum period of forty years (from the commencement of the Constitution). The interplay between Articles 25 and 27 has been extensively discussed in quota-related cases, where the courts have held that merit-based selection is the rule, and quotas are an exception permitted by the Constitution to address historical imbalances.",
        timestamp: "2025-06-12T09:32:20Z",
        citations: [
          {
            id: "c-001-3",
            caseName: "Province of Sindh v. M.Q.M.",
            citation: "PLD 2014 SC 531",
            court: "Supreme Court of Pakistan",
            year: "2014",
            relevance:
              "Discussed quota system and its constitutional validity under Articles 25 and 27",
            snippet:
              "Quota is an exception to the rule of merit and must be applied strictly within constitutional limits.",
          },
          {
            id: "c-001-4",
            caseName: "Tariq Aziz-ud-Din v. Government of Pakistan",
            citation: "2010 SCMR 1301",
            court: "Supreme Court of Pakistan",
            year: "2010",
            relevance:
              "Affirmed that Article 27 permits reasonable classification for adequate representation",
            snippet:
              "The quota system is a temporary measure designed to ensure adequate representation; it cannot be used to perpetuate privilege.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-002",
    title: "Constitutional Jurisdiction of High Courts – Article 199",
    createdAt: "2025-06-15T14:00:00Z",
    messages: [
      {
        id: "lres-002-m1",
        role: "user",
        content:
          "Explain the scope and limitations of writ jurisdiction under Article 199 of the Constitution.",
        timestamp: "2025-06-15T14:00:00Z",
      },
      {
        id: "lres-002-m2",
        role: "assistant",
        content:
          "Article 199 of the Constitution of Pakistan, 1973 confers writ jurisdiction upon the High Courts. Under this provision, a High Court may issue directions, orders, or writs including habeas corpus, mandamus, prohibition, quo warranto, and certiorari.\n\nThe key conditions for invoking this jurisdiction are:\n1. The action complained of must involve a person performing functions in connection with the affairs of the Federation, Province, or a local authority.\n2. The petitioner must have no other adequate remedy available.\n3. The petition must not be barred by limitation or laches.\n4. The High Court has territorial jurisdiction over the matter.\n\nArticle 199(3) specifically bars the exercise of writ jurisdiction in respect of a matter relating to the Armed Forces. Article 199(5) limits jurisdiction to persons or authorities within the territorial jurisdiction of the concerned High Court.",
        timestamp: "2025-06-15T14:00:20Z",
        citations: [
          {
            id: "c-002-1",
            caseName:
              "Miss Asma Jilani v. Government of the Punjab",
            citation: "PLD 1972 SC 139",
            court: "Supreme Court of Pakistan",
            year: "1972",
            relevance:
              "Seminal case on the scope of constitutional writ jurisdiction",
            snippet:
              "The writ jurisdiction is a constitutional safeguard and must be exercised to protect fundamental rights.",
          },
          {
            id: "c-002-2",
            caseName:
              "Mst. Shahida Zahir Abbasi v. President of Pakistan",
            citation: "PLD 1996 SC 632",
            court: "Supreme Court of Pakistan",
            year: "1996",
            relevance:
              "Discussed when alternative remedy bars writ jurisdiction",
            snippet:
              "The existence of an alternative remedy does not bar writ jurisdiction where fundamental rights are at stake.",
          },
        ],
      },
      {
        id: "lres-002-m3",
        role: "user",
        content:
          "Can the High Court exercise writ jurisdiction against private parties?",
        timestamp: "2025-06-15T14:02:00Z",
      },
      {
        id: "lres-002-m4",
        role: "assistant",
        content:
          "Generally, writ jurisdiction under Article 199 is available only against persons performing functions in connection with the affairs of the Federation, Province, or a local authority. However, the courts have expanded this scope in certain situations:\n\n1. Where a private entity performs public functions or exercises statutory authority, it may be amenable to writ jurisdiction.\n2. Where a private entity acts under the authority of or in concert with a public body.\n3. For enforcement of fundamental rights under Article 199(1)(c), the Court can issue orders to any person, including private parties, where fundamental rights are being violated.\n\nThe trend in recent jurisprudence has been towards a functional test rather than a formal test – if the function performed is public in nature, writ jurisdiction may lie regardless of whether the entity is technically private.",
        timestamp: "2025-06-15T14:02:25Z",
        citations: [
          {
            id: "c-002-3",
            caseName: "Human Rights Case No. 4668 of 2006",
            citation: "PLD 2007 SC 394",
            court: "Supreme Court of Pakistan",
            year: "2007",
            relevance:
              "Expanded writ jurisdiction to cover private entities performing public functions",
            snippet:
              "Where fundamental rights are at stake, the nature of the entity is less important than the nature of the function performed.",
          },
        ],
      },
      {
        id: "lres-002-m5",
        role: "assistant",
        content:
          "Additionally, the concept of 'State action' has been gradually broadened. In cases involving privatized utilities and educational institutions receiving government grants, the courts have held that writ jurisdiction may be invoked. The rationale is that when the State delegates its functions to private bodies, the constitutional protections should follow those functions.",
        timestamp: "2025-06-15T14:03:00Z",
        citations: [
          {
            id: "c-002-4",
            caseName: "Pakistan International Airlines v. Tanweer-ur-Rehman",
            citation: "PLD 2010 SC 676",
            court: "Supreme Court of Pakistan",
            year: "2010",
            relevance:
              "PIA, though a corporation, was held amenable to writ jurisdiction as a statutory entity performing public functions",
            snippet:
              "Entities created by statute and performing functions of public importance remain within the ambit of Article 199.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-003",
    title: "Pre-emption Rights under Punjab Pre-emption Act 1991",
    createdAt: "2025-07-01T11:00:00Z",
    messages: [
      {
        id: "lres-003-m1",
        role: "user",
        content:
          "Who has the right of pre-emption in Punjab and what is the hierarchy of pre-emptors?",
        timestamp: "2025-07-01T11:00:00Z",
      },
      {
        id: "lres-003-m2",
        role: "assistant",
        content:
          "Under the Punjab Pre-emption Act, 1991, the right of pre-emption is available to persons who have a specified relationship with the property being sold. The Act establishes a hierarchy of pre-emptors in Section 6:\n\n1. **First Category – Shafi-i-Sharik (Co-sharer):** A person who shares in the ownership of the property being sold.\n2. **Second Category – Shafi-i-Khalit (Adjoining owner with shared amenities):** A person who owns immovable property that shares a common pathway, drainage, or water course with the property sold.\n3. **Third Category – Shafi-i-Jar (Adjoining owner):** A person who owns property adjoining the property sold.\n\nThe right is exercisable only in respect of immovable property situated in rural or urban areas of Punjab. The pre-emptor must exercise the right within the prescribed limitation period, which is generally one year from the date of registration of the sale.",
        timestamp: "2025-07-01T11:00:30Z",
        citations: [
          {
            id: "c-003-1",
            caseName: "Mst. Ghulam Fatima v. Muhammad Sharif",
            citation: "2008 SCMR 1156",
            court: "Supreme Court of Pakistan",
            year: "2008",
            relevance:
              "Hierarchy of pre-emptors and priority of co-sharer over adjoining owners",
            snippet:
              "A co-sharer has a superior right of pre-emption over an adjoining owner.",
          },
          {
            id: "c-003-2",
            caseName: "Muhammad Aslam v. Ghulam Mustafa",
            citation: "2012 CLC 1589",
            court: "Lahore High Court",
            year: "2012",
            relevance:
              "Discussed requirements for establishing right of pre-emption as Shafi-i-Khalit",
            snippet:
              "The claimant must prove the existence of a common amenity such as a shared pathway at the time of the sale.",
          },
        ],
      },
      {
        id: "lres-003-m3",
        role: "user",
        content:
          "What are the grounds for refusal of a pre-emption suit?",
        timestamp: "2025-07-01T11:02:00Z",
      },
      {
        id: "lres-003-m4",
        role: "assistant",
        content:
          "A pre-emption suit may be refused on several grounds:\n\n1. **Talb-i-Muwathibat (Demand on First Notice):** The pre-emptor must make an immediate demand upon learning of the sale. Failure to perform Talb-i-Muwathibat within the required timeframe is fatal to the claim.\n2. **Talb-i-Ishhad (Demand with Witnesses):** Following Talb-i-Muwathibat, the pre-emptor must make a formal demand before two witnesses in the presence of the buyer or seller or at the property. This must be done within a reasonable time.\n3. **Limitation:** The suit must be filed within one year of the date of the sale.\n4. **No Genuine Relationship:** If the pre-emptor fails to establish any of the three categories of relationship with the property.\n5. **Partial Pre-emption:** Attempting to pre-empt only part of the property when it was sold as a whole.\n6. **Changed Circumstances:** If the character of the property has changed fundamentally between the sale and the institution of the suit.",
        timestamp: "2025-07-01T11:02:30Z",
        citations: [
          {
            id: "c-003-3",
            caseName: "Allah Ditta v. Muhammad Rafiq",
            citation: "2016 SCMR 950",
            court: "Supreme Court of Pakistan",
            year: "2016",
            relevance:
              "Talb-i-Muwathibat is a mandatory requirement; delay defeats the right",
            snippet:
              "The demand of Talb-i-Muwathibat is a condition precedent and must be immediate and unconditional.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-004",
    title: "Dissolution of Muslim Marriage – Khula Procedure",
    createdAt: "2025-07-10T08:45:00Z",
    messages: [
      {
        id: "lres-004-m1",
        role: "user",
        content:
          "What is the procedure for obtaining khula in Pakistan and what are the grounds under the Dissolution of Muslim Marriages Act, 1939?",
        timestamp: "2025-07-10T08:45:00Z",
      },
      {
        id: "lres-004-m2",
        role: "assistant",
        content:
          "Khula is a form of judicial divorce at the instance of the wife under Islamic law. In Pakistan, the procedure is primarily governed by the Dissolution of Muslim Marriages Act, 1939 (DMMA), read with the West Pakistan Family Courts Act, 1964.\n\n**Procedure:**\n1. The wife files a suit for dissolution of marriage in the Family Court having jurisdiction.\n2. If seeking khula specifically, she expresses her willingness to return the dower (haq mehr) and relinquish her financial claims.\n3. The court attempts reconciliation and may refer the matter to an arbitration council.\n4. If reconciliation fails, the court grants the decree of khula.\n\n**Grounds under DMMA Section 2:**\n- Whereabouts of husband unknown for four years\n- Failure to maintain wife for two years\n- Husband sentenced to imprisonment for seven years or more\n- Failure to perform marital obligations for three years\n- Husband's impotence at the time of marriage and continuing\n- Husband's insanity or suffering from leprosy or a virulent venereal disease for two years\n- Cruelty by the husband\n- Any other ground recognized as valid for dissolution under Muslim law",
        timestamp: "2025-07-10T08:45:30Z",
        citations: [
          {
            id: "c-004-1",
            caseName: "Khurshid Bibi v. Muhammad Amin",
            citation: "PLD 1967 SC 97",
            court: "Supreme Court of Pakistan",
            year: "1967",
            relevance:
              "Landmark decision affirming wife's right to khula without husband's consent",
            snippet:
              "If the wife is prepared to forgo her dower and other financial benefits, the Court can grant khula even without the husband's consent.",
          },
          {
            id: "c-004-2",
            caseName: "Balqis Fatima v. Najm-ul-Ikram Qureshi",
            citation: "PLD 1959 Lahore 566",
            court: "Lahore High Court",
            year: "1959",
            relevance:
              "Early authority on cruelty as a ground for dissolution under DMMA",
            snippet:
              "Cruelty need not be physical; persistent mental cruelty is equally a valid ground for dissolution.",
          },
        ],
      },
      {
        id: "lres-004-m3",
        role: "user",
        content: "Does the wife need to return the full dower amount?",
        timestamp: "2025-07-10T08:47:00Z",
      },
      {
        id: "lres-004-m4",
        role: "assistant",
        content:
          "The question of whether the wife must return the full dower has evolved through judicial interpretation:\n\n1. **Traditional View:** Under classical Islamic jurisprudence, khula required the wife to return the entire dower (haq mehr).\n2. **Modern Judicial Position:** Pakistani courts have adopted a more flexible approach. The Supreme Court has held that the Family Court has discretion to determine the amount to be returned, considering the circumstances of each case.\n3. **Where Husband is at Fault:** If the husband's conduct is the cause of breakdown, courts have reduced the amount the wife must return, sometimes to a nominal sum.\n4. **Where Dower Was Not Paid:** If the dower was never actually paid by the husband, there is nothing to return, and the court may grant khula without any financial condition.\n\nThe key principle is that khula is not punitive; it is the wife exercising her right to exit the marriage, and the return of dower is a matter of equity, not a strict precondition.",
        timestamp: "2025-07-10T08:47:30Z",
        citations: [
          {
            id: "c-004-3",
            caseName: "Mst. Naseem Akhtar v. Muhammad Rafiq",
            citation: "2006 MLD 257",
            court: "Lahore High Court",
            year: "2006",
            relevance:
              "Discretion of Family Court in determining dower return in khula",
            snippet:
              "The Family Court is not bound to insist upon return of the full amount of dower; it may fix a reasonable amount considering the totality of circumstances.",
          },
          {
            id: "c-004-4",
            caseName: "Noor Bibi v. Pir Bux",
            citation: "2015 CLC 422",
            court: "Sindh High Court",
            year: "2015",
            relevance:
              "Where dower was unpaid, return is not a precondition for khula",
            snippet:
              "Where the husband has not paid the dower, insisting on its return would be unjust and inequitable.",
          },
        ],
      },
      {
        id: "lres-004-m5",
        role: "user",
        content:
          "What about the iddat period after khula?",
        timestamp: "2025-07-10T08:49:00Z",
      },
      {
        id: "lres-004-m6",
        role: "assistant",
        content:
          "After khula, the wife must observe the iddat period as prescribed under Islamic law:\n\n1. **Duration:** The standard iddat period after khula is three menstrual cycles (if the wife is of menstruating age) or three lunar months (if she is not). If the wife is pregnant, the iddat continues until delivery.\n2. **Commencement:** The iddat begins from the date of the decree of the court granting khula, not from the date of separation.\n3. **Maintenance during Iddat:** The husband is generally obligated to provide maintenance during the iddat period, even in khula cases. However, this is a contested area and depends on the terms of the khula decree.\n4. **Remarriage:** The wife cannot remarry during the iddat period. A marriage contracted during iddat is void.\n\nThe Family Courts Act, 1964 requires that the court specify the effective date and the commencement of the iddat period in the khula decree to avoid any ambiguity.",
        timestamp: "2025-07-10T08:49:30Z",
        citations: [
          {
            id: "c-004-5",
            caseName: "Muhammad Aslam v. Mst. Razia Begum",
            citation: "2009 YLR 567",
            court: "Lahore High Court",
            year: "2009",
            relevance:
              "Maintenance obligation of husband during iddat period after khula",
            snippet:
              "The husband remains obligated to provide maintenance during the iddat period unless the khula decree specifically provides otherwise.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-005",
    title: "Bail Provisions under Cr.P.C. – Sections 496-498",
    createdAt: "2025-07-15T16:00:00Z",
    messages: [
      {
        id: "lres-005-m1",
        role: "user",
        content:
          "What are the key provisions governing bail in Pakistan under the Code of Criminal Procedure?",
        timestamp: "2025-07-15T16:00:00Z",
      },
      {
        id: "lres-005-m2",
        role: "assistant",
        content:
          "Bail in Pakistan is governed by Sections 496 to 498 of the Code of Criminal Procedure, 1898 (Cr.P.C.):\n\n**Section 496 – Bail in Bailable Offences:**\nWhen a person accused of a bailable offence is arrested or detained, bail is a matter of right. The police officer or court must release the accused on bail if they are prepared to furnish bail.\n\n**Section 497 – Bail in Non-Bailable Offences:**\nFor non-bailable offences, bail is at the discretion of the court. The court considers:\n- Whether there are reasonable grounds for believing the accused is guilty of an offence punishable with death or imprisonment for life.\n- The nature and gravity of the charge.\n- The severity of the punishment.\n- The danger of the accused absconding.\n- Whether the accused is likely to tamper with evidence or influence witnesses.\n\nSection 497(2) provides for bail where the investigation or trial is not concluded within a reasonable time.\n\n**Section 498 – Bail by High Court or Sessions Court:**\nThe High Court or Court of Session may direct that any person accused of a non-bailable offence be released on bail. This is the provision under which most pre-arrest bail (anticipatory bail) applications are filed.",
        timestamp: "2025-07-15T16:00:30Z",
        citations: [
          {
            id: "c-005-1",
            caseName: "Tariq Bashir v. The State",
            citation: "PLD 1995 SC 34",
            court: "Supreme Court of Pakistan",
            year: "1995",
            relevance:
              "Established comprehensive principles for grant of bail in non-bailable offences",
            snippet:
              "Bail is the rule and jail is the exception; the accused is presumed innocent until proved guilty.",
          },
          {
            id: "c-005-2",
            caseName: "State v. Syed Qaim Ali Shah",
            citation: "1992 SCMR 2192",
            court: "Supreme Court of Pakistan",
            year: "1992",
            relevance:
              "Discussed factors for grant or refusal of bail under Section 497",
            snippet:
              "The court must consider the totality of circumstances, including the nature of the offence, the evidence, and the likelihood of the accused absconding.",
          },
        ],
      },
      {
        id: "lres-005-m3",
        role: "user",
        content:
          "What is the concept of pre-arrest bail and how does it work?",
        timestamp: "2025-07-15T16:02:00Z",
      },
      {
        id: "lres-005-m4",
        role: "assistant",
        content:
          "Pre-arrest bail (also called anticipatory bail or protective bail) in Pakistan is not explicitly provided for in the Cr.P.C. but has been developed through judicial interpretation of Section 498.\n\n**Key Features:**\n1. **Application:** Filed before a Session Court or High Court when a person apprehends arrest in a non-bailable offence.\n2. **Ad-Interim Bail:** The court may grant ad-interim pre-arrest bail (temporary protection) until the hearing of the bail application.\n3. **Confirmation Hearing:** The court hears arguments from both sides and either confirms or cancels the pre-arrest bail.\n4. **Conditions:** Pre-arrest bail may be subject to conditions such as appearing before the investigating officer, not leaving the country, or surrendering travel documents.\n\n**Grounds for Grant:**\n- Mala fide or ulterior motive behind the FIR\n- Political victimization\n- Involvement based on enmity or false implication\n- No direct evidence connecting the accused to the offence\n\n**Limitations:**\n- Pre-arrest bail is an extraordinary remedy and is not granted as a matter of course.\n- The courts have held that pre-arrest bail should not be used to frustrate the investigation.\n- In cases involving terrorism or national security, courts are generally reluctant to grant pre-arrest bail.",
        timestamp: "2025-07-15T16:02:30Z",
        citations: [
          {
            id: "c-005-3",
            caseName: "Muhammad Nawaz Sharif v. The State",
            citation: "PLD 2018 SC 370",
            court: "Supreme Court of Pakistan",
            year: "2018",
            relevance:
              "Reiterated principles governing the grant of pre-arrest bail",
            snippet:
              "Pre-arrest bail is an extraordinary remedy designed to prevent abuse of process; it must not be used to impede lawful investigation.",
          },
          {
            id: "c-005-4",
            caseName: "Ch. Manzoor Elahi v. The State",
            citation: "PLD 1975 SC 247",
            court: "Supreme Court of Pakistan",
            year: "1975",
            relevance:
              "Early authority on the availability of pre-arrest bail under Section 498",
            snippet:
              "Section 498 Cr.P.C. is wide enough to include within its scope the power to grant bail before arrest.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-006",
    title: "Land Revenue and Mutation – Revenue Record System in Punjab",
    createdAt: "2025-07-20T10:30:00Z",
    messages: [
      {
        id: "lres-006-m1",
        role: "user",
        content:
          "Explain the mutation process for transfer of property in Punjab and its legal significance.",
        timestamp: "2025-07-20T10:30:00Z",
      },
      {
        id: "lres-006-m2",
        role: "assistant",
        content:
          "In Punjab, land records are maintained under the Punjab Land Revenue Act, 1967. The mutation (intiqal) is the process of recording a transfer of property rights in the revenue records.\n\n**Process:**\n1. **Application:** The transferee (buyer) or transferor (seller) applies to the Patwari (revenue officer) for mutation.\n2. **Report by Patwari:** The Patwari prepares a mutation report and forwards it to the Revenue Officer (Tehsildar).\n3. **Attestation:** The Revenue Officer holds an open hearing (called a jamabandi) where both parties appear. The mutation is attested after verification of the sale deed, identity of parties, and payment of stamp duty.\n4. **Entry in Record of Rights:** Once attested, the entry is made in the Record of Rights (register haqdaran-e-zameen).\n\n**Legal Significance:**\nMutation itself does not create or extinguish title. It is merely a fiscal record maintained for the purpose of revenue collection. However, mutation entries carry a presumption of correctness under Section 44 of the Punjab Land Revenue Act and are considered important evidence of possession and ownership.",
        timestamp: "2025-07-20T10:30:30Z",
        citations: [
          {
            id: "c-006-1",
            caseName: "Ali Muhammad v. Muhammad Hussain",
            citation: "2014 SCMR 1240",
            court: "Supreme Court of Pakistan",
            year: "2014",
            relevance:
              "Clarified that mutation does not create title but is evidence of possession",
            snippet:
              "Mutation in the revenue record does not confer title; it is merely a reflection of the factual position regarding possession and ownership.",
          },
        ],
      },
      {
        id: "lres-006-m3",
        role: "user",
        content:
          "What happens if the mutation is challenged? How can someone contest a fraudulent mutation?",
        timestamp: "2025-07-20T10:32:00Z",
      },
      {
        id: "lres-006-m4",
        role: "assistant",
        content:
          "A fraudulent or illegal mutation can be challenged through multiple legal avenues:\n\n**1. Revenue Hierarchy (Administrative Remedies):**\n- An aggrieved party can file a review or appeal before the Collector or Commissioner under the Punjab Land Revenue Act.\n- The Board of Revenue can also take cognizance of fraudulent mutations.\n\n**2. Civil Court Suit:**\n- A declaratory suit under Section 42 of the Specific Relief Act, 1877 can be filed seeking a declaration that the mutation is illegal, void, or obtained through fraud.\n- The suit must be filed within the limitation period prescribed under the Limitation Act, 1908 (generally six years from the date of the mutation for fraud-related claims).\n\n**3. Criminal Proceedings:**\n- If forgery or impersonation is involved, criminal proceedings can be initiated under Sections 467/468/471 PPC.\n\n**Burden of Proof:**\nThe person challenging the mutation bears the burden of proving that it was obtained through fraud, misrepresentation, or without lawful authority. Conversely, a mutation entry carries a presumption of regularity unless rebutted by strong evidence.",
        timestamp: "2025-07-20T10:32:30Z",
        citations: [
          {
            id: "c-006-2",
            caseName: "Ghulam Ali v. Mst. Ghulam Sarwar Naqvi",
            citation: "PLD 2000 SC 415",
            court: "Supreme Court of Pakistan",
            year: "2000",
            relevance:
              "Established principles for challenging fraudulent mutations",
            snippet:
              "Where a mutation is challenged on grounds of fraud, the burden lies on the challenger to prove the same through cogent and reliable evidence.",
          },
          {
            id: "c-006-3",
            caseName: "Nazar Hussain v. Haji Khan Zaman",
            citation: "2011 SCMR 1667",
            court: "Supreme Court of Pakistan",
            year: "2011",
            relevance:
              "Limitation period for challenging fraudulent mutations through civil suit",
            snippet:
              "A suit to set aside a fraudulent mutation must be filed within six years from the date when the fraud was first known to the plaintiff.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-007",
    title: "Defamation Law in Pakistan – Civil and Criminal Remedies",
    createdAt: "2025-08-01T13:00:00Z",
    messages: [
      {
        id: "lres-007-m1",
        role: "user",
        content:
          "What legal remedies are available for defamation in Pakistan? Is it both a civil and criminal offence?",
        timestamp: "2025-08-01T13:00:00Z",
      },
      {
        id: "lres-007-m2",
        role: "assistant",
        content:
          "Yes, defamation in Pakistan is actionable both as a civil wrong (tort) and as a criminal offence.\n\n**Criminal Defamation:**\nSections 499 and 500 of the Pakistan Penal Code, 1860 (PPC) deal with criminal defamation.\n- **Section 499 (Defamation):** Defines defamation as making or publishing any imputation concerning any person, intending or knowing that such imputation will harm the reputation of that person.\n- **Section 500 (Punishment):** Simple imprisonment up to two years, or fine, or both.\n- **Exceptions (Section 499):** There are ten exceptions including truth published for public good, fair comment on public conduct, and good faith criticism.\n\n**Civil Defamation:**\nThe Defamation Ordinance, 2002 provides for civil remedies including:\n- Damages (compensatory and exemplary)\n- Injunction to restrain publication\n- Right of reply\n- Apology and retraction\n\nThe Ordinance applies to defamation through any medium including print, electronic, and online platforms.",
        timestamp: "2025-08-01T13:00:30Z",
        citations: [
          {
            id: "c-007-1",
            caseName: "Mian Muhammad Nawaz Sharif v. President of Pakistan",
            citation: "PLD 1993 SC 473",
            court: "Supreme Court of Pakistan",
            year: "1993",
            relevance:
              "Discussed constitutional protection of reputation under Article 14",
            snippet:
              "The right to reputation is an integral part of the right to dignity guaranteed under Article 14 of the Constitution.",
          },
        ],
      },
      {
        id: "lres-007-m3",
        role: "user",
        content:
          "What defenses are available against a defamation claim?",
        timestamp: "2025-08-01T13:02:00Z",
      },
      {
        id: "lres-007-m4",
        role: "assistant",
        content:
          "Several defenses are available against defamation claims in Pakistan:\n\n**1. Truth (Justification):**\nTruth is a complete defense to a civil defamation claim. Under Section 499 PPC (Exception 1), it is not defamation to impute anything which is true concerning any person if the imputation is made for the public good.\n\n**2. Fair Comment:**\nHonest opinion on matters of public interest is protected. The comment must be based on true facts and must be made without malice.\n\n**3. Privilege:**\n- **Absolute Privilege:** Covers statements made in judicial proceedings, parliamentary proceedings, and official communications.\n- **Qualified Privilege:** Covers statements made in good faith in discharge of a public or private duty, or in protection of one's own interests.\n\n**4. Consent:**\nIf the person consented to the publication, it is a valid defense.\n\n**5. Limitation:**\n- Criminal complaints must be filed within one year.\n- Civil suits under the Defamation Ordinance, 2002 must be filed within one year of the publication.",
        timestamp: "2025-08-01T13:02:30Z",
        citations: [
          {
            id: "c-007-2",
            caseName: "Hamid Mir v. Mubashir Lucman",
            citation: "2016 CLC 1256",
            court: "Islamabad High Court",
            year: "2016",
            relevance:
              "Fair comment defense in the context of media defamation",
            snippet:
              "Fair comment on matters of public interest requires that the underlying facts be true and the comment be made without malice.",
          },
          {
            id: "c-007-3",
            caseName: "Rauf Klasra v. Nawaz Sharif",
            citation: "2015 PLD Islamabad 89",
            court: "Islamabad High Court",
            year: "2015",
            relevance:
              "Qualified privilege defense for journalists reporting on matters of public interest",
            snippet:
              "A journalist acting in good faith and in discharge of a public duty is entitled to the defense of qualified privilege.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-008",
    title: "Specific Performance of Agreements to Sell Immovable Property",
    createdAt: "2025-08-10T09:15:00Z",
    messages: [
      {
        id: "lres-008-m1",
        role: "user",
        content:
          "When can a court grant specific performance of an agreement to sell immovable property in Pakistan?",
        timestamp: "2025-08-10T09:15:00Z",
      },
      {
        id: "lres-008-m2",
        role: "assistant",
        content:
          "Specific performance of an agreement to sell immovable property is governed by the Specific Relief Act, 1877 (Sections 12 to 22).\n\n**When Granted (Section 12):**\nSpecific performance may be granted when:\n1. There exists a valid, enforceable contract.\n2. The contract is specific enough to be enforced.\n3. The plaintiff has performed or has always been ready and willing to perform their part of the contract.\n4. Monetary compensation would not be an adequate remedy (since each piece of immovable property is considered unique, this is generally presumed).\n\n**When Not Granted (Section 21):**\nSpecific performance is not granted in the following cases:\n- Where monetary compensation is an adequate remedy.\n- Where the contract involves personal skill or volition.\n- Where the contract is determinable in nature.\n- Where the contract is inequitable, obtained through unfair means, or involves undue hardship.\n\n**Requirements:**\n- The agreement must be in writing and registered (or at minimum, supported by part performance under Section 53A of the Transfer of Property Act, 1882).\n- The plaintiff must demonstrate readiness and willingness to perform throughout.\n- The suit must be filed within the limitation period (three years from the date fixed for performance, under the Limitation Act, 1908).",
        timestamp: "2025-08-10T09:15:30Z",
        citations: [
          {
            id: "c-008-1",
            caseName: "Muhammad Ismail v. Rukan Din",
            citation: "PLD 2005 SC 293",
            court: "Supreme Court of Pakistan",
            year: "2005",
            relevance:
              "Readiness and willingness as essential conditions for specific performance",
            snippet:
              "The plaintiff seeking specific performance must prove that he was at all material times ready and willing to perform his part of the contract.",
          },
          {
            id: "c-008-2",
            caseName: "Rehmatullah v. Rab Nawaz",
            citation: "2017 SCMR 596",
            court: "Supreme Court of Pakistan",
            year: "2017",
            relevance:
              "Where agreement to sell was unregistered, specific performance was refused",
            snippet:
              "An unregistered agreement to sell, not supported by part performance, cannot form the basis of a suit for specific performance.",
          },
        ],
      },
      {
        id: "lres-008-m3",
        role: "user",
        content:
          "What is the role of Section 53A of the Transfer of Property Act?",
        timestamp: "2025-08-10T09:17:00Z",
      },
      {
        id: "lres-008-m4",
        role: "assistant",
        content:
          "Section 53A of the Transfer of Property Act, 1882 provides the doctrine of part performance, which is a significant exception to the requirement of registration:\n\n**Key Elements:**\n1. There must be a contract for transfer of immovable property.\n2. The transferee has taken possession in part performance of the contract.\n3. The transferee has done some act in furtherance of the contract.\n4. The transferee has performed or is willing to perform their part of the contract.\n\n**Effect:**\nWhen these conditions are met, the transferor is barred from enforcing any right against the transferee that would be inconsistent with the contract, even if the contract is unregistered.\n\n**Limitations:**\n- Section 53A is a shield, not a sword. It can be used as a defense against the transferor's claim for recovery of possession, but it cannot independently form the basis of a suit for specific performance.\n- The possession must be referable to the contract and not to any other arrangement.\n- The doctrine is not available if the contract is vitiated by fraud or misrepresentation.",
        timestamp: "2025-08-10T09:17:30Z",
        citations: [
          {
            id: "c-008-3",
            caseName: "Sughra Begum v. Qaiser Pervez",
            citation: "PLD 2015 SC 177",
            court: "Supreme Court of Pakistan",
            year: "2015",
            relevance:
              "Section 53A is a shield, not a sword – cannot be used for seeking possession",
            snippet:
              "The doctrine of part performance under Section 53A is defensive in nature; it cannot be used as an offensive weapon to claim title or possession.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-009",
    title: "Cybercrime Offences under PECA 2016",
    createdAt: "2025-08-15T11:00:00Z",
    messages: [
      {
        id: "lres-009-m1",
        role: "user",
        content:
          "What are the major offences and penalties under the Prevention of Electronic Crimes Act (PECA) 2016?",
        timestamp: "2025-08-15T11:00:00Z",
      },
      {
        id: "lres-009-m2",
        role: "assistant",
        content:
          "The Prevention of Electronic Crimes Act (PECA), 2016 is the primary legislation governing cybercrimes in Pakistan. Key offences include:\n\n**1. Unauthorized Access (Section 3):**\nAccessing an information system or data without authorization. Punishment: imprisonment up to three months, or fine up to Rs. 50,000, or both.\n\n**2. Unauthorized Copying of Data (Section 4):**\nCopying or transmission of data without authorization. Punishment: imprisonment up to six months, or fine up to Rs. 100,000, or both.\n\n**3. System Damage (Section 5):**\nInterfering with or damaging any information system. Punishment: imprisonment up to two years, or fine up to Rs. 500,000, or both.\n\n**4. Electronic Fraud (Section 13):**\nUsing information systems for fraud. Punishment: imprisonment up to two years, or fine up to Rs. 10 million, or both.\n\n**5. Electronic Forgery (Section 14):**\nCreation of forged electronic documents. Punishment: imprisonment up to three years, or fine up to Rs. 5 million, or both.\n\n**6. Cyber Stalking (Section 24):**\nStalking, intimidation, or harassment through electronic means. Punishment: imprisonment up to three years, or fine up to Rs. 1 million, or both.\n\n**7. Spamming (Section 25):**\nTransmitting unsolicited communications. Punishment: fine up to Rs. 5 million.\n\n**8. Spoofing (Section 26):**\nEstablishing a website or sending information with a counterfeit source. Punishment: imprisonment up to three years, or fine up to Rs. 500,000, or both.",
        timestamp: "2025-08-15T11:00:30Z",
        citations: [
          {
            id: "c-009-1",
            caseName: "Bytes For All v. Federation of Pakistan",
            citation: "W.P. No. 958/2018 IHC",
            court: "Islamabad High Court",
            year: "2018",
            relevance:
              "Constitutional challenge to various provisions of PECA 2016",
            snippet:
              "Certain provisions of PECA must be interpreted in light of fundamental rights, particularly freedom of expression under Article 19.",
          },
        ],
      },
      {
        id: "lres-009-m3",
        role: "user",
        content:
          "How are social media offences dealt with under PECA?",
        timestamp: "2025-08-15T11:02:00Z",
      },
      {
        id: "lres-009-m4",
        role: "assistant",
        content:
          "Social media offences under PECA 2016 are primarily addressed through the following provisions:\n\n**Section 20 – Offences Against Dignity of a Natural Person:**\nSuperimposing a photograph of a natural person on any sexually explicit image or video, or displaying or distributing such content. Punishment: imprisonment up to five years, or fine up to Rs. 5 million, or both.\n\n**Section 21 – Offences Against Modesty and Minor:**\nCreating, distributing, or possessing content involving minors in sexually explicit conduct. Punishment: imprisonment up to seven years, or fine up to Rs. 5 million, or both.\n\n**Section 24 – Cyber Stalking:**\nRepeated contact, surveillance, or monitoring of a person through electronic means. This is frequently invoked for social media harassment.\n\n**Complaint Mechanism:**\n- Complaints can be filed with the FIA Cyber Crime Wing.\n- The victim can also approach the court directly under Section 30 PECA.\n- Under Section 29, service providers may be required to retain data and cooperate with investigations.\n\n**Challenges:**\n- The broad language of certain sections has raised concerns about misuse for suppressing free speech.\n- The Islamabad High Court has struck down parts of Section 20 as unconstitutional for being overly broad.",
        timestamp: "2025-08-15T11:02:30Z",
        citations: [
          {
            id: "c-009-2",
            caseName:
              "Zahid Khan v. The State",
            citation: "2020 MLD 1650",
            court: "Peshawar High Court",
            year: "2020",
            relevance:
              "FIR under Section 20 PECA for social media defamation – bail granted",
            snippet:
              "Section 20 PECA should not be used as a tool to stifle dissent; bail is to be granted where the offence is not of a heinous nature.",
          },
          {
            id: "c-009-3",
            caseName: "Justice Qazi Faez Isa v. The President of Pakistan",
            citation: "PLD 2021 SC 1",
            court: "Supreme Court of Pakistan",
            year: "2021",
            relevance:
              "Referenced PECA in the context of social media campaigns affecting judiciary",
            snippet:
              "The use of electronic means to malign public institutions requires careful regulation that balances free speech with institutional integrity.",
          },
        ],
      },
    ],
  },
  {
    id: "lres-010",
    title: "Blasphemy Laws – Sections 295-B and 295-C PPC",
    createdAt: "2025-08-20T15:30:00Z",
    messages: [
      {
        id: "lres-010-m1",
        role: "user",
        content:
          "What are the legal provisions and procedural safeguards regarding blasphemy cases under the PPC?",
        timestamp: "2025-08-20T15:30:00Z",
      },
      {
        id: "lres-010-m2",
        role: "assistant",
        content:
          "Blasphemy in Pakistan is addressed under Sections 295 to 298-C of the Pakistan Penal Code, 1860:\n\n**Key Provisions:**\n1. **Section 295-A:** Deliberate and malicious acts intended to outrage religious feelings. Punishment: imprisonment up to ten years, or fine, or both.\n2. **Section 295-B:** Defiling the Holy Quran. Punishment: imprisonment for life.\n3. **Section 295-C:** Use of derogatory remarks in respect of the Holy Prophet (PBUH). Punishment: death or imprisonment for life, and fine.\n4. **Section 298:** Uttering words with deliberate intent to wound religious feelings. Punishment: imprisonment up to one year, or fine, or both.\n5. **Section 298-A:** Use of derogatory remarks against holy personages. Punishment: imprisonment up to three years, or fine, or both.\n\n**Procedural Safeguards (Developed Through Case Law):**\n- The Supreme Court in Malik Muhammad Mumtaz Qadri v. The State (PLD 2016 SC 17) emphasized that the investigation must be thorough and fair.\n- The court must exercise extreme caution before framing charges.\n- Evidence of witnesses must be scrutinized carefully as false accusations are common.\n- The Supreme Court has directed that a preliminary inquiry be conducted before registration of an FIR in blasphemy cases.",
        timestamp: "2025-08-20T15:30:30Z",
        citations: [
          {
            id: "c-010-1",
            caseName: "Malik Muhammad Mumtaz Qadri v. The State",
            citation: "PLD 2016 SC 17",
            court: "Supreme Court of Pakistan",
            year: "2016",
            relevance:
              "Upheld death sentence for murder of Governor Punjab; discussed blasphemy law framework",
            snippet:
              "Taking the law into one's own hands on the pretext of religious sentiments is not permissible under any law, divine or temporal.",
          },
          {
            id: "c-010-2",
            caseName: "Asia Bibi v. The State",
            citation: "Criminal Appeal 39-L/2015 (SC)",
            court: "Supreme Court of Pakistan",
            year: "2018",
            relevance:
              "Acquittal in blasphemy case; established higher evidentiary standards",
            snippet:
              "The prosecution has failed to prove its case beyond reasonable doubt; the testimony of witnesses is full of contradictions and inconsistencies.",
          },
        ],
      },
      {
        id: "lres-010-m3",
        role: "user",
        content:
          "What procedural protections exist against false accusations?",
        timestamp: "2025-08-20T15:32:00Z",
      },
      {
        id: "lres-010-m4",
        role: "assistant",
        content:
          "Several procedural protections have been established by the superior judiciary to guard against false blasphemy accusations:\n\n**1. Preliminary Inquiry:**\nThe Supreme Court has directed that before an FIR is registered under blasphemy provisions, the concerned SP (Superintendent of Police) should conduct a preliminary inquiry to verify the credibility of the complaint.\n\n**2. Investigation by Senior Officer:**\nInvestigation of blasphemy cases should be conducted by an officer not below the rank of DSP (Deputy Superintendent of Police) to ensure impartiality.\n\n**3. Judicial Scrutiny at Bail Stage:**\nCourts must carefully examine the evidence at the bail stage and not be swayed by public pressure.\n\n**4. Punishment for False Accusation:**\nSection 194 PPC provides that giving false evidence that leads to conviction of an innocent person for a capital offence is itself punishable with death or imprisonment for life.\n\n**5. Anti-Terrorism Court Jurisdiction:**\nBlasphemy cases are not triable by Anti-Terrorism Courts unless the act itself constitutes an act of terrorism. This was clarified to prevent expedited trials that might compromise due process.\n\n**6. Supreme Court Guidelines:**\nIn the Esia Bibi case, the Supreme Court established that the standard of proof in blasphemy cases must be rigorous, and the court must ensure that the accused receives a fair trial without any external pressure.",
        timestamp: "2025-08-20T15:32:30Z",
        citations: [
          {
            id: "c-010-3",
            caseName:
              "Muhammad Mahdi v. The State",
            citation: "2015 YLR 698",
            court: "Lahore High Court",
            year: "2015",
            relevance:
              "SP-level inquiry required before registration of blasphemy FIR",
            snippet:
              "To prevent misuse of the blasphemy provisions, a preliminary inquiry by a senior police officer is a necessary safeguard.",
          },
          {
            id: "c-010-4",
            caseName: "Wasiullah v. The State",
            citation: "2018 PCrLJ 1",
            court: "Lahore High Court",
            year: "2018",
            relevance:
              "Bail in blasphemy case where evidence was found to be fabricated",
            snippet:
              "Where the evidence suggests that the accused has been falsely implicated, bail should not be refused merely on the ground of the gravity of the offence.",
          },
        ],
      },
    ],
  },
];
