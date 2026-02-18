import type { ContractReview } from "./types";

export const contractReviews: ContractReview[] = [
  {
    id: "lcon-001",
    title: "Employment Agreement — Senior Software Engineer",
    fileName: "employment-agreement-farhan-ali.pdf",
    status: "Complete",
    createdAt: "2025-07-01T09:00:00Z",
    overallRisk: "Medium",
    summary:
      "This employment agreement between TechVentures (Pvt.) Ltd., Lahore and Mr. Farhan Ali covers a senior software engineer position with a two-year fixed term. The agreement includes standard provisions for compensation, benefits, and working conditions. However, several clauses contain restrictive covenants that may be unenforceable under Pakistani law, and the termination provisions disproportionately favour the employer.",
    keyTerms: [
      "Fixed-term employment: 2 years from date of execution",
      "Basic salary: PKR 350,000 per month plus allowances",
      "Probation period: 6 months with simplified termination",
      "Working hours: 9 AM to 6 PM, Monday to Friday, with reasonable overtime expectations",
      "Annual leave: 14 days paid leave per annum",
      "Medical insurance: Coverage for employee and spouse",
      "Non-compete period: 18 months post-termination within Pakistan",
      "Notice period: 3 months by employer, 1 month by employee",
    ],
    obligations: [
      "Employee must maintain confidentiality of proprietary information during and after employment",
      "Employee must assign all intellectual property created during employment to the company",
      "Company must provide medical insurance within 30 days of commencement",
      "Company must pay salary by the 5th of each month",
      "Employee must serve full notice period or pay in lieu of notice",
      "Company must conduct annual performance review by December 31 each year",
    ],
    deadlines: [
      "Probation review: 6 months from start date (January 1, 2026)",
      "First annual performance review: December 31, 2025",
      "Contract renewal notice: 90 days before expiry (April 1, 2027)",
      "Medical insurance enrollment: Within 30 days of start date",
      "IP assignment documentation: Within 14 days of creation",
    ],
    redFlags: [
      "Non-compete clause of 18 months is excessively broad and may be unenforceable under Pakistani law, which generally limits such restrictions to reasonable periods and geographic scope.",
      "Asymmetric notice periods (3 months employer / 1 month employee) could be challenged as unconscionable under the Contract Act, 1872.",
      "The IP assignment clause covers inventions made 'during the term of employment' without limiting it to company-related work, potentially capturing personal projects.",
      "No provision for gratuity or provident fund as required under applicable labour laws.",
    ],
    clauses: [
      {
        id: "lcon-001-cl1",
        title: "Non-Compete Clause (Clause 12)",
        content:
          "The Employee agrees that for a period of eighteen (18) months following the termination of this Agreement, by either party and for any reason, the Employee shall not directly or indirectly engage in, be employed by, or provide services to any business that competes with the Company within the territory of Pakistan.",
        risk: "High",
        analysis:
          "This non-compete clause is excessively broad in both duration (18 months) and geographic scope (entire Pakistan). Under Pakistani law, courts have consistently held that post-employment restraint of trade clauses must be reasonable in scope, duration, and geography. Section 27 of the Contract Act, 1872 renders agreements in restraint of trade void, with limited exceptions. The Lahore High Court in Packages Ltd. v. Shahid Hussain (2015 PLD Lahore 45) held that non-compete clauses exceeding 12 months are presumptively unreasonable. Recommend reducing to 6-12 months and limiting to the specific city or region where the company operates.",
      },
      {
        id: "lcon-001-cl2",
        title: "Intellectual Property Assignment (Clause 8)",
        content:
          "All inventions, designs, software, documentation, and other works of authorship created by the Employee during the term of this employment, whether or not created during working hours or using Company resources, shall be the exclusive property of the Company.",
        risk: "High",
        analysis:
          "This clause is overly broad as it captures IP created outside working hours and without company resources. Under the Copyright Ordinance, 1962 and the Patents Ordinance, 2000, the employer's right to employee-created IP is generally limited to works created in the course of employment and related to the employer's business. Personal projects unrelated to company work should be excluded. Recommend adding a carve-out for personal projects not related to company business and not created using company resources.",
      },
      {
        id: "lcon-001-cl3",
        title: "Termination by Employer (Clause 14)",
        content:
          "The Company may terminate this Agreement at any time during the probation period without cause by providing seven (7) days written notice. After the probation period, the Company may terminate this Agreement by providing three (3) months written notice or payment in lieu thereof.",
        risk: "Medium",
        analysis:
          "While the post-probation termination notice of three months is reasonable, the seven-day notice during probation is quite short. Additionally, the clause does not specify grounds for termination for cause, which could lead to arbitrary dismissals. The Industrial and Commercial Employment (Standing Orders) Ordinance, 1968 requires employers to provide reasons for termination. Recommend specifying grounds for cause-based termination and increasing probation notice to at least 30 days.",
      },
      {
        id: "lcon-001-cl4",
        title: "Confidentiality (Clause 10)",
        content:
          "The Employee shall not, during the term of employment or at any time thereafter, disclose to any person, firm, or corporation any Confidential Information of the Company. 'Confidential Information' includes but is not limited to trade secrets, business plans, customer lists, financial data, technical specifications, and any information marked as confidential.",
        risk: "Low",
        analysis:
          "This confidentiality clause is standard and reasonable. The definition of confidential information is appropriately broad but includes the important qualifier 'marked as confidential' for non-obvious items. The indefinite duration for trade secrets is consistent with legal norms. The clause properly protects the employer's legitimate business interests without placing unreasonable burden on the employee.",
      },
      {
        id: "lcon-001-cl5",
        title: "Dispute Resolution (Clause 18)",
        content:
          "Any dispute arising out of or in connection with this Agreement shall be resolved through arbitration in Lahore under the Arbitration Act, 1940. The arbitrator shall be appointed by mutual consent of the parties. The language of arbitration shall be English.",
        risk: "Low",
        analysis:
          "The arbitration clause is standard and appropriate for commercial disputes. Reference to the Arbitration Act, 1940 is correct for domestic arbitration in Pakistan. The provision for mutual consent in appointing the arbitrator is balanced. However, consider adding a fallback mechanism (e.g., appointment by the Lahore High Court) in case the parties cannot agree on an arbitrator.",
      },
    ],
  },
  {
    id: "lcon-002",
    title: "Commercial Lease Agreement — Office Space, Blue Area Islamabad",
    fileName: "lease-agreement-blue-area-office.pdf",
    status: "Complete",
    createdAt: "2025-07-15T11:30:00Z",
    overallRisk: "Medium",
    summary:
      "This is a commercial lease agreement for a 2,500 sq. ft. office space in Blue Area, Islamabad between Capital Properties (Pvt.) Ltd. (landlord) and Noor & Associates Law Firm (tenant). The lease is for 5 years with an option to renew. While the basic terms are market-standard for Islamabad commercial leases, several provisions regarding rent escalation, maintenance responsibilities, and early termination warrant careful review.",
    keyTerms: [
      "Lease term: 5 years commencing August 1, 2025",
      "Monthly rent: PKR 450,000 for Year 1",
      "Annual rent escalation: 10% per annum",
      "Security deposit: PKR 1,350,000 (equivalent to 3 months rent)",
      "Permitted use: Professional legal services office",
      "Area: 2,500 sq. ft. on 4th Floor, Capital Tower",
      "Parking: 4 dedicated parking spaces included",
      "Renewal option: 3-year extension at renegotiated rent",
    ],
    obligations: [
      "Tenant to pay rent by the 1st of each month",
      "Landlord to maintain structural integrity and common areas",
      "Tenant responsible for interior maintenance and repairs",
      "Tenant to obtain written consent for any alterations or modifications",
      "Landlord to provide 24/7 security for the building",
      "Tenant to maintain commercial insurance for contents and liability",
      "Landlord to ensure uninterrupted utility supply to the premises",
    ],
    deadlines: [
      "First rent payment: August 1, 2025",
      "Security deposit: Due upon signing (July 15, 2025)",
      "Annual rent escalation: August 1 of each subsequent year",
      "Renewal option notice: 180 days before lease expiry (February 1, 2030)",
      "Insurance certificate submission: Within 30 days of commencement",
    ],
    redFlags: [
      "Annual rent escalation of 10% is above market average (typically 5-8% for Islamabad commercial properties) and compounds significantly over 5 years.",
      "No force majeure clause addressing rent obligations during unforeseen events (natural disasters, pandemics, government lockdowns).",
      "Early termination penalty of 6 months rent is excessive; market standard is 2-3 months.",
      "Landlord retains unilateral right to relocate tenant within the building with only 30 days notice.",
    ],
    clauses: [
      {
        id: "lcon-002-cl1",
        title: "Rent Escalation (Clause 5)",
        content:
          "The monthly rent shall increase by ten percent (10%) on each anniversary of the Commencement Date. The Tenant shall have no right to contest or negotiate the escalation, which shall be automatic and binding.",
        risk: "High",
        analysis:
          "A fixed 10% annual escalation is above the Islamabad commercial market average of 5-8%. Over the 5-year term, this would increase rent from PKR 450,000 to approximately PKR 658,845 — a 46% cumulative increase. The clause denying the tenant any right to contest is particularly concerning. Under the Islamabad Rent Restriction Ordinance, 2001, tenants have certain protections against unreasonable rent increases. Recommend negotiating the escalation down to 5-7% or tying it to the Consumer Price Index (CPI).",
      },
      {
        id: "lcon-002-cl2",
        title: "Early Termination (Clause 15)",
        content:
          "Either party may terminate this Lease by providing six (6) months written notice. In the event of early termination by the Tenant, the Tenant shall pay a termination fee equal to six (6) months rent at the then-prevailing rate in addition to any outstanding obligations.",
        risk: "High",
        analysis:
          "The termination penalty of 6 months rent in addition to the 6-month notice period effectively creates a 12-month financial obligation for early exit. This is excessive by market standards, where 2-3 months is typical for commercial leases in Islamabad. Furthermore, the penalty applies only to tenant-initiated termination, creating an asymmetry that may be challenged under the Contract Act, 1872 as unconscionable. Recommend reducing the penalty to 2-3 months and making it reciprocal.",
      },
      {
        id: "lcon-002-cl3",
        title: "Relocation Clause (Clause 22)",
        content:
          "The Landlord reserves the right to relocate the Tenant to comparable premises within the same building upon thirty (30) days written notice, at the Landlord's expense. 'Comparable premises' shall be determined at the sole discretion of the Landlord.",
        risk: "Medium",
        analysis:
          "This relocation clause gives the landlord unilateral power to displace the tenant with only 30 days notice. The phrase 'sole discretion of the Landlord' in determining comparability is problematic as it removes any objective standard. For a law firm, relocation disrupts client communications, signage, and established presence. Recommend either deleting this clause or adding objective criteria for 'comparable' and increasing the notice period to 90 days.",
      },
      {
        id: "lcon-002-cl4",
        title: "Maintenance and Repairs (Clause 9)",
        content:
          "The Landlord shall maintain the structural integrity of the building, including the roof, exterior walls, and foundation. The Tenant shall be responsible for all interior maintenance, repairs, and replacements, including HVAC systems, plumbing fixtures, electrical wiring, and flooring within the leased premises.",
        risk: "Medium",
        analysis:
          "The allocation of HVAC maintenance to the tenant is a significant cost burden, as commercial HVAC systems can be expensive to maintain and replace. Typically in Islamabad commercial leases, central HVAC is the landlord's responsibility. The clause also does not specify who bears the cost of pre-existing defects. Recommend clarifying that the landlord is responsible for HVAC systems serving the building and for repairing pre-existing defects identified during a joint inspection at commencement.",
      },
      {
        id: "lcon-002-cl5",
        title: "Permitted Use (Clause 3)",
        content:
          "The Premises shall be used exclusively for the purpose of operating a professional legal services office. Any change in use requires the prior written consent of the Landlord, which shall not be unreasonably withheld.",
        risk: "Low",
        analysis:
          "This is a standard permitted-use clause for commercial premises. The restriction to legal services is appropriate and the addition of 'shall not be unreasonably withheld' for changes in use provides adequate flexibility. No modifications recommended.",
      },
    ],
  },
  {
    id: "lcon-003",
    title: "Partnership Deed — Qureshi & Malik Legal Associates",
    fileName: "partnership-deed-qureshi-malik.pdf",
    status: "Complete",
    createdAt: "2025-08-05T14:00:00Z",
    overallRisk: "High",
    summary:
      "This partnership deed establishes a legal partnership between Advocate Asif Qureshi and Advocate Zainab Malik for the practice of law in Lahore. The deed covers profit-sharing, management responsibilities, capital contributions, and dissolution procedures. Several critical issues have been identified, including inadequate provisions for dispute resolution, unclear profit-sharing during partner absence, and missing provisions for intellectual property and client ownership upon dissolution.",
    keyTerms: [
      "Partnership name: Qureshi & Malik Legal Associates",
      "Principal office: 42-A, Temple Road, Lahore",
      "Capital contribution: PKR 5,000,000 by each partner (equal)",
      "Profit-sharing ratio: 60:40 (Qureshi:Malik)",
      "Duration: Indefinite, subject to dissolution provisions",
      "Drawing rights: PKR 200,000 per month per partner",
      "Bank account: Joint signatories, both required for amounts exceeding PKR 500,000",
      "Goodwill valuation: Based on 2x average annual net profit of preceding 3 years",
    ],
    obligations: [
      "Both partners to devote full professional time to the firm",
      "Advocate Qureshi to manage litigation and court appearances",
      "Advocate Malik to manage corporate advisory and client relations",
      "Both partners to contribute equally to office expenses",
      "Neither partner to engage in competing legal practice",
      "Quarterly financial reconciliation and profit distribution",
      "Annual audit by an independent chartered accountant",
    ],
    deadlines: [
      "Capital contribution: Due upon execution of deed",
      "Quarterly profit distribution: 15th of January, April, July, October",
      "Annual audit completion: Within 90 days of financial year end (September 30)",
      "Partnership registration: Within 30 days of execution under Partnership Act, 1932",
      "Dissolution notice period: 6 months written notice",
    ],
    redFlags: [
      "Unequal profit-sharing ratio (60:40) despite equal capital contribution — no documented justification for the disparity, which could lead to future disputes.",
      "No provision for profit-sharing or drawing rights during extended leave, illness, or incapacity of a partner.",
      "No clause addressing ownership of client relationships and case files upon dissolution — critical for a law firm.",
      "No arbitration or mediation clause for partner disputes; reliance on court proceedings could paralyze the firm.",
      "Missing provisions for admission of new partners or the process for converting to a limited liability partnership (LLP).",
    ],
    clauses: [
      {
        id: "lcon-003-cl1",
        title: "Profit-Sharing (Clause 6)",
        content:
          "Net profits of the Firm shall be divided between the Partners in the ratio of 60:40 (sixty percent to Advocate Qureshi and forty percent to Advocate Malik). Net profit shall be calculated after deducting all expenses, taxes, and provisions for bad debts from gross revenue.",
        risk: "High",
        analysis:
          "The unequal profit-sharing despite equal capital contributions creates an inherent imbalance. While unequal profit-sharing is permissible under the Partnership Act, 1932 if agreed by the parties, the deed does not document the rationale (e.g., seniority, client base, goodwill). This lack of justification could be challenged if the relationship sours. Under Section 13(b) of the Partnership Act, the default rule is equal sharing unless otherwise agreed. Recommend documenting the basis for the 60:40 split and including a review mechanism (e.g., annual adjustment based on revenue generation).",
      },
      {
        id: "lcon-003-cl2",
        title: "Dissolution and Goodwill (Clause 14)",
        content:
          "Upon dissolution, the goodwill of the Firm shall be valued at two times the average annual net profit of the preceding three financial years. The partner continuing the practice shall pay the outgoing partner their share of the goodwill within twelve (12) months of dissolution.",
        risk: "High",
        analysis:
          "The goodwill valuation at 2x average net profit is at the higher end of standard practice for law firms. More importantly, the 12-month payment period creates a significant cash flow burden on the continuing partner. The clause also fails to address: (1) who retains the right to the firm name, (2) allocation of ongoing cases and client relationships, and (3) the outgoing partner's obligation not to solicit firm clients. Under the Pakistan Bar Council rules, client choice is paramount, and neither partner can compel clients to stay. Recommend a more detailed dissolution framework including client notification procedures and a shorter goodwill payment timeline.",
      },
      {
        id: "lcon-003-cl3",
        title: "Non-Compete After Dissolution (Clause 16)",
        content:
          "The outgoing Partner shall not practice law within a radius of five (5) kilometres of the Firm's principal office for a period of two (2) years following dissolution.",
        risk: "High",
        analysis:
          "This non-compete clause is almost certainly unenforceable under Pakistani law. Section 27 of the Contract Act, 1872 declares agreements in restraint of trade void, with limited exceptions. Furthermore, the Legal Practitioners and Bar Councils Act, 1973 guarantees every advocate the right to practice, and a contractual restriction on this statutory right would be struck down. The Lahore High Court has consistently held such clauses in partnership deeds of professional firms to be void. Recommend removing this clause entirely or replacing it with a narrower non-solicitation clause for existing clients for a limited period.",
      },
      {
        id: "lcon-003-cl4",
        title: "Management and Decision-Making (Clause 4)",
        content:
          "Ordinary business decisions shall be taken by mutual consent of both Partners. In the event of disagreement on any ordinary matter, the decision of Advocate Qureshi shall prevail. For extraordinary matters (including admission of new partners, capital expenditure exceeding PKR 1,000,000, and changes to the partnership deed), unanimous consent shall be required.",
        risk: "Medium",
        analysis:
          "Giving Advocate Qureshi a casting vote on ordinary matters creates a power imbalance that could breed resentment, especially given the already unequal profit-sharing. Under Section 12(c) of the Partnership Act, 1932, differences on ordinary matters are decided by majority, but in a two-person partnership, this effectively means deadlock or dictatorial control. Recommend either establishing a neutral third-party mediator for deadlocked decisions or defining specific categories where each partner has primary authority based on their area of expertise.",
      },
      {
        id: "lcon-003-cl5",
        title: "Capital and Drawing Rights (Clause 5)",
        content:
          "Each Partner shall contribute PKR 5,000,000 as initial capital. Monthly drawings of PKR 200,000 per Partner are permitted. Additional drawings require mutual consent. Interest at the rate of 12% per annum shall be charged on any capital deficiency.",
        risk: "Low",
        analysis:
          "The capital contribution and drawing provisions are standard for a law firm partnership of this size. The 12% interest rate on capital deficiency is reasonable and within market norms. The mutual consent requirement for additional drawings provides appropriate checks. The clause is well-structured and balanced.",
      },
    ],
  },
  {
    id: "lcon-004",
    title: "Sale Agreement — Plot No. 45-C, DHA Phase 5, Lahore",
    fileName: "sale-agreement-dha-plot-45c.pdf",
    status: "Complete",
    createdAt: "2025-08-20T10:00:00Z",
    overallRisk: "Medium",
    summary:
      "This agreement to sell covers a 1-kanal (20-marla) residential plot in DHA Phase 5, Lahore between Mr. Imran Hussain (seller) and Mrs. Ayesha Siddiqui (buyer). The total consideration is PKR 85,000,000 with a structured payment plan. The agreement addresses title verification, possession handover, and transfer timeline. However, several important protections are missing, and the payment structure exposes the buyer to significant risk.",
    keyTerms: [
      "Property: Plot No. 45-C, Street 12, DHA Phase 5, Lahore (1 Kanal)",
      "Total consideration: PKR 85,000,000",
      "Earnest money: PKR 10,000,000 (paid at signing)",
      "Balance payment: PKR 75,000,000 (within 90 days of signing)",
      "Possession: Upon receipt of full payment",
      "Transfer: Seller to complete DHA transfer within 30 days of full payment",
      "Title: Seller warrants clear and marketable title",
      "Stamp duty and registration: To be borne by the buyer",
    ],
    obligations: [
      "Seller to deliver original allotment letter, transfer letter, and possession letter at signing",
      "Seller to provide no-objection certificate (NOC) from DHA for transfer",
      "Buyer to pay balance consideration within 90 days",
      "Seller to execute transfer documents within 30 days of full payment",
      "Seller to clear all outstanding dues (taxes, maintenance charges) before transfer",
      "Buyer to bear stamp duty, registration fees, and DHA transfer charges",
    ],
    deadlines: [
      "Earnest money payment: At signing (August 20, 2025)",
      "Title verification period: 15 days from signing (September 4, 2025)",
      "Balance payment: November 18, 2025 (90 days from signing)",
      "DHA transfer completion: December 18, 2025 (30 days after balance payment)",
      "Possession handover: Upon receipt of full payment (November 18, 2025)",
    ],
    redFlags: [
      "No title search or verification has been conducted prior to signing — the agreement relies solely on the seller's warranty of title.",
      "The 15-day title verification period is too short for a thorough title investigation, especially for DHA properties which require verification from multiple sources.",
      "No escrow arrangement for the earnest money or balance payment — the buyer pays directly to the seller with no protection if the seller defaults.",
      "The agreement does not address the consequences if DHA refuses the transfer or if there are pending litigation encumbrances on the plot.",
    ],
    clauses: [
      {
        id: "lcon-004-cl1",
        title: "Title Warranty (Clause 3)",
        content:
          "The Seller warrants and represents that the Seller is the sole and absolute owner of the Property, that the Property is free from all encumbrances, liens, charges, and claims, and that the Seller has full right and authority to sell and transfer the Property.",
        risk: "Medium",
        analysis:
          "While the title warranty is standard, it is insufficient without independent verification. In DHA properties, title must be verified from the DHA record (allotment, possession, transfer letters) and also checked against any pending litigation in the courts. The warranty should be supplemented with: (1) an obligation for the seller to provide a non-encumbrance certificate, (2) a title search by the buyer's lawyer, and (3) an indemnity clause holding the seller liable for any title defects discovered post-transfer. Under the Transfer of Property Act, 1882, the seller has implied obligations regarding title, but express provisions provide stronger protection.",
      },
      {
        id: "lcon-004-cl2",
        title: "Payment Structure (Clause 4)",
        content:
          "The Buyer shall pay the total consideration as follows: (a) PKR 10,000,000 as earnest money upon execution of this Agreement; (b) PKR 75,000,000 as balance consideration within ninety (90) days of execution. All payments shall be made through crossed cheques or bank transfers.",
        risk: "Medium",
        analysis:
          "The payment structure is straightforward but lacks protective mechanisms. There is no escrow arrangement, meaning the buyer's PKR 10,000,000 earnest money is at risk if the seller defaults or if a title defect is discovered. For a transaction of this magnitude (PKR 85 million), an escrow arrangement through a scheduled bank is strongly recommended. Additionally, there is no provision linking the balance payment to completion of title verification. Recommend making the balance payment conditional upon satisfactory title verification and establishing an escrow account.",
      },
      {
        id: "lcon-004-cl3",
        title: "Default and Remedies (Clause 8)",
        content:
          "If the Buyer fails to pay the balance consideration within the stipulated period, the Seller may forfeit the earnest money and terminate this Agreement. If the Seller fails to transfer the Property after receipt of full payment, the Buyer may seek specific performance or refund of all amounts paid with a penalty of ten percent (10%) of the total consideration.",
        risk: "Medium",
        analysis:
          "The remedies are asymmetric. The seller's forfeiture of earnest money (PKR 10 million, approximately 12% of total consideration) is a harsh penalty for delay. Conversely, the buyer's remedy of a 10% penalty for the seller's default (PKR 8.5 million) is relatively modest given the seller would have had use of PKR 85 million. Under Section 74 of the Contract Act, 1872, the court may reduce excessive penalties. Recommend equalizing the penalties and including a specific timeline for exercising remedies.",
      },
      {
        id: "lcon-004-cl4",
        title: "Possession and Risk (Clause 6)",
        content:
          "Possession of the Property shall be delivered to the Buyer upon receipt of full payment. Risk of loss or damage shall pass to the Buyer upon delivery of possession.",
        risk: "Low",
        analysis:
          "Linking possession to full payment is standard practice in Pakistani property transactions. The risk transfer upon possession is also in line with Section 55(5) of the Transfer of Property Act, 1882. However, consider adding a provision for joint inspection of the property before possession and a mechanism for addressing any physical damage discovered during inspection.",
      },
      {
        id: "lcon-004-cl5",
        title: "Governing Law and Jurisdiction (Clause 12)",
        content:
          "This Agreement shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from this Agreement shall be subject to the exclusive jurisdiction of the Civil Courts at Lahore.",
        risk: "Low",
        analysis:
          "This is a standard governing law and jurisdiction clause. The choice of Lahore courts is appropriate given the property's location in DHA Lahore. No modifications recommended.",
      },
    ],
  },
  {
    id: "lcon-005",
    title: "Professional Services Agreement — Legal Advisory for Greenfield Textile Mills",
    fileName: "services-agreement-greenfield-textiles.pdf",
    status: "Complete",
    createdAt: "2025-09-01T08:30:00Z",
    overallRisk: "Low",
    summary:
      "This professional services agreement engages Hussain & Partners (Law Firm) to provide comprehensive legal advisory services to Greenfield Textile Mills (Pvt.) Ltd. for corporate, labour, and regulatory compliance matters. The agreement is for a 1-year term with a monthly retainer model. The terms are generally balanced and well-drafted, with appropriate provisions for scope of work, fees, confidentiality, and termination.",
    keyTerms: [
      "Service provider: Hussain & Partners, Advocates & Legal Consultants",
      "Client: Greenfield Textile Mills (Pvt.) Ltd., Faisalabad",
      "Term: 12 months from September 1, 2025",
      "Monthly retainer: PKR 250,000 plus applicable taxes",
      "Scope: Corporate advisory, labour law compliance, regulatory filings, contract review",
      "Litigation: Billed separately at PKR 50,000 per hearing",
      "Payment terms: Within 15 days of invoice",
      "Out-of-pocket expenses: Reimbursed at actual cost with prior approval",
    ],
    obligations: [
      "Law Firm to assign a dedicated partner and associate to the client",
      "Law Firm to respond to queries within 2 business days",
      "Client to provide all relevant documents and information in a timely manner",
      "Client to pay monthly retainer and additional fees within 15 days of invoice",
      "Law Firm to maintain client confidentiality in accordance with Pakistan Bar Council rules",
      "Law Firm to provide monthly status reports on all pending matters",
      "Client to provide 30 days advance notice for any litigation matters",
    ],
    deadlines: [
      "First retainer payment: September 15, 2025",
      "Monthly retainer invoices: 1st of each month",
      "Payment due: Within 15 days of invoice date",
      "Quarterly review meetings: Last week of November 2025, February 2026, May 2026, August 2026",
      "Renewal notice: 60 days before expiry (July 2, 2026)",
      "Annual compliance filings: As per regulatory calendar",
    ],
    redFlags: [
      "No cap on litigation hours or maximum monthly billing — costs could escalate significantly if multiple lawsuits arise simultaneously.",
      "The indemnity clause requires the client to indemnify the law firm for claims arising from the firm's advice, which is unusual and shifts professional liability inappropriately.",
    ],
    clauses: [
      {
        id: "lcon-005-cl1",
        title: "Scope of Services (Clause 2)",
        content:
          "The Law Firm shall provide the following services: (a) general corporate advisory including board resolutions, shareholder agreements, and corporate governance; (b) labour law compliance including preparation and review of employment contracts, factory license compliance, and EOBI/SESSI registrations; (c) regulatory compliance including SECP filings, environmental compliance, and trade licence renewals; (d) review and drafting of commercial contracts. Litigation and dispute resolution services are not included in the retainer and shall be billed separately.",
        risk: "Low",
        analysis:
          "The scope of services is clearly defined and comprehensive for a textile manufacturing company. The separation of litigation from the retainer scope is prudent and market-standard. The inclusion of labour law compliance (EOBI, SESSI) and environmental compliance is particularly appropriate for a manufacturing client in Faisalabad. No significant concerns identified.",
      },
      {
        id: "lcon-005-cl2",
        title: "Fees and Payment (Clause 4)",
        content:
          "The Client shall pay the Law Firm a monthly retainer of PKR 250,000 (Rupees two hundred and fifty thousand only) plus applicable taxes. Litigation services shall be billed at PKR 50,000 per hearing. Out-of-pocket expenses (travel, court fees, filing fees, photocopying) shall be reimbursed at actual cost with prior written approval of the Client. Invoices shall be paid within fifteen (15) days of the invoice date.",
        risk: "Low",
        analysis:
          "The fee structure is transparent and market-appropriate for a mid-size law firm in Pakistan. The per-hearing litigation rate of PKR 50,000 is reasonable for commercial litigation in Faisalabad. The requirement for prior approval of out-of-pocket expenses provides the client with cost control. The 15-day payment term is standard. Recommend adding a late payment interest clause (e.g., SBP policy rate plus 2%) to incentivize timely payment.",
      },
      {
        id: "lcon-005-cl3",
        title: "Indemnification (Clause 10)",
        content:
          "The Client agrees to indemnify and hold harmless the Law Firm, its partners, associates, and employees from and against any claims, losses, damages, or expenses arising from: (a) the Client's failure to disclose material information; (b) the Client's implementation of legal advice in a manner inconsistent with the Law Firm's recommendations; (c) any claims brought by third parties in connection with the services provided under this Agreement.",
        risk: "Medium",
        analysis:
          "Clause (a) and (b) are reasonable — the law firm should not be liable for advice based on incomplete information or for the client's deviation from the advice given. However, clause (c) is overly broad and could be read to transfer the law firm's professional liability to the client. Under the Pakistan Bar Council Canons of Professional Conduct, a lawyer has a duty of competence and care, and this duty cannot be contractually transferred. Recommend deleting clause (c) or narrowing it to exclude claims arising from the law firm's negligence or professional misconduct.",
      },
      {
        id: "lcon-005-cl4",
        title: "Confidentiality (Clause 8)",
        content:
          "The Law Firm shall maintain the confidentiality of all information received from the Client in the course of providing services under this Agreement, in accordance with the attorney-client privilege and the Pakistan Bar Council Canons of Professional Conduct. This obligation shall survive the termination of this Agreement.",
        risk: "Low",
        analysis:
          "This confidentiality clause is well-drafted and appropriately references both the legal principle of attorney-client privilege and the professional obligations under the Bar Council rules. The survival clause ensures protection continues after the engagement ends. This is standard and appropriate for a legal services engagement.",
      },
      {
        id: "lcon-005-cl5",
        title: "Termination (Clause 12)",
        content:
          "Either party may terminate this Agreement by providing sixty (60) days written notice. Upon termination, the Law Firm shall deliver all client files, documents, and work product to the Client within thirty (30) days. The Client shall pay all outstanding fees and expenses within fifteen (15) days of termination.",
        risk: "Low",
        analysis:
          "The termination clause is balanced with equal rights for both parties. The 60-day notice period is reasonable, providing adequate time for transition. The requirement to return client files within 30 days is consistent with professional obligations under the Bar Council rules. The payment obligation upon termination protects the law firm from unpaid fees. No modifications recommended.",
      },
    ],
  },
];
