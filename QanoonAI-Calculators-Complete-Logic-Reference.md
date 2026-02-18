# QanoonAI Calculators — Complete Calculation Logic & Data Reference

> This document contains EVERYTHING needed to implement working, legally accurate calculators for QanoonAI. All rates, formulas, rules, edge cases, and legal references are included. This is the single source of truth for the calculator portal backend logic.
>
> **Tax Year**: 2026 (July 1, 2025 – June 30, 2026) based on Finance Act 2025.
> **Legal Year**: All limitation periods per Limitation Act, 1908 (as amended).
> **Islamic Law**: Hanafi and Shia (Ja'fari) schools for inheritance.

---

## TABLE OF CONTENTS

1. [Income Tax Calculator](#1-income-tax-calculator)
2. [Withholding Tax Calculator](#2-withholding-tax-calculator)
3. [Capital Gains Tax Calculator](#3-capital-gains-tax-calculator)
4. [Sales Tax Calculator](#4-sales-tax-calculator)
5. [Customs Duty Calculator](#5-customs-duty-calculator)
6. [Tax Penalties Calculator](#6-tax-penalties-calculator)
7. [Inheritance Calculator (Hanafi)](#7-inheritance-calculator-hanafi)
8. [Inheritance Calculator (Shia / Ja'fari)](#8-inheritance-calculator-shia)
9. [Limitation / Time-Bar Calculator](#9-limitation--time-bar-calculator)
10. [Zakat Calculator](#10-zakat-calculator)
11. [Damages Calculator](#11-damages-calculator)
12. [Iddat Period Calculator](#12-iddat-period-calculator)

---

## 1. INCOME TAX CALCULATOR

**Legal Basis**: Income Tax Ordinance, 2001 — First Schedule, Part I, Division I (Salary) and Division I (Non-Salary). As amended by Finance Act, 2025.

### Inputs Required
- Annual taxable income (PKR)
- Income type: Salaried or Non-Salaried/Business
- For salaried: whether salary income is ≥75% of total income (determines which slab applies)
- Filing status: Active Taxpayer (Filer) or Non-Filer (for informational purposes)

### Tax Slabs — SALARIED Individuals (TY 2026)
Applicable where salary income is 75% or more of total taxable income.

| Slab | Taxable Income (PKR) | Tax Rate |
|------|---------------------|----------|
| 1 | Up to 600,000 | 0% |
| 2 | 600,001 – 1,200,000 | 1% of amount exceeding 600,000 |
| 3 | 1,200,001 – 2,200,000 | Rs. 6,000 + 11% of amount exceeding 1,200,000 |
| 4 | 2,200,001 – 3,200,000 | Rs. 116,000 + 23% of amount exceeding 2,200,000 |
| 5 | 3,200,001 – 4,100,000 | Rs. 346,000 + 30% of amount exceeding 3,200,000 |
| 6 | Above 4,100,000 | Rs. 616,000 + 35% of amount exceeding 4,100,000 |

**Surcharge**: If taxable income exceeds Rs. 10,000,000 → additional surcharge of **9%** of the total tax liability.

### Tax Slabs — NON-SALARIED Individuals & AOPs (TY 2026)
Applicable to individuals whose salary income is less than 75% of total taxable income, and to all Associations of Persons (AOPs).

| Slab | Taxable Income (PKR) | Tax Rate |
|------|---------------------|----------|
| 1 | Up to 600,000 | 0% |
| 2 | 600,001 – 1,200,000 | 15% of amount exceeding 600,000 |
| 3 | 1,200,001 – 1,600,000 | Rs. 90,000 + 20% of amount exceeding 1,200,000 |
| 4 | 1,600,001 – 3,200,000 | Rs. 170,000 + 30% of amount exceeding 1,600,000 |
| 5 | 3,200,001 – 5,600,000 | Rs. 650,000 + 40% of amount exceeding 3,200,000 |
| 6 | Above 5,600,000 | Rs. 1,610,000 + 45% of amount exceeding 5,600,000 |

**Surcharge**: If taxable income exceeds Rs. 10,000,000 → additional surcharge of **10%** of total tax liability (for non-salaried/AOP).

### Calculation Formula
```
function calculateIncomeTax(income, type) {
  const slabs = type === 'salaried' ? SALARIED_SLABS : NON_SALARIED_SLABS;
  let tax = 0;
  
  for (const slab of slabs) {
    if (income > slab.upperLimit) {
      tax = slab.fixedTax; // Will be overwritten by next matching slab
    } else if (income > slab.lowerLimit) {
      tax = slab.fixedTax + (income - slab.lowerLimit) * slab.rate;
      break;
    }
  }
  
  // Apply surcharge
  const surchargeThreshold = 10_000_000;
  const surchargeRate = type === 'salaried' ? 0.09 : 0.10;
  if (income > surchargeThreshold) {
    tax += tax * surchargeRate;
  }
  
  return { annualTax: tax, monthlyTax: tax / 12, effectiveRate: (tax / income) * 100 };
}
```

### Output
- Annual tax liability
- Monthly tax liability
- Effective tax rate (%)
- Breakdown by slab (how much tax at each slab)
- Surcharge amount (if applicable)

### Legal Reference for Breakdown
- Section 149 of Income Tax Ordinance, 2001
- First Schedule, Part I, Division I
- Finance Act, 2025

---

## 2. WITHHOLDING TAX CALCULATOR

**Legal Basis**: Income Tax Ordinance, 2001 — Sections 148–236Z. KPMG Withholding Tax Rate Card TY 2026.

### Inputs Required
- Type of payment (dropdown with categories)
- Taxpayer type: Individual/AOP or Company
- Active Taxpayer List status: Filer (Active) or Non-Filer (Inactive)
- Payment amount (PKR)

### Major WHT Categories and Rates

#### A. Imports (Section 148)
| Category | Active Rate | Inactive Rate | Status |
|----------|------------|---------------|--------|
| Part I of 12th Schedule goods | 1% | 2% | Minimum |
| Part II of 12th Schedule (non-commercial) | 2% | 4% | Minimum |
| Part III of 12th Schedule (non-commercial) | 5.5% | 11% | Minimum |
| Manufacturers under rescinded SRO 1125 | 1% | 2% | Adjustable |
| Pharma products (not made in PK, DRAP cert) | 4% | 8% | Minimum |
| EV CKD kits (≤50kWh cars, ≤150kWh LCV) | 1% | 2% | Minimum |
| Commercial importer – Part II | 3.5% | 7% | Minimum |
| Commercial importer – Part III | 6% | 12% | Minimum |

#### B. Salary (Section 149)
Same slabs as Income Tax Calculator (salaried). See Section 1 above.

#### C. Dividends (Section 150)
| Category | Active Rate | Inactive Rate | Status |
|----------|------------|---------------|--------|
| IPP pass-through | 7.5% | 15% | Final |
| Company with exemption/losses/credit | 25% | 50% | Final |
| REIT | 15% | 30% | Final |
| Mutual Fund – Debt (Corporate) | 29% | 58% | Final |
| Mutual Fund – Debt (Others) | 25% | 50% | Final |
| Mutual Fund – Equity | 15% | 30% | Final |
| Any other case | 15% | 30% | Final |

#### D. Profit on Debt (Section 151)
| Category | Active Rate | Inactive Rate | Status |
|----------|------------|---------------|--------|
| National Savings Scheme / Post Office | 15% | 30% | Final (Min if >5M) |
| Bank deposits | 20% | 40% | Final (Min if >5M) |
| Government securities (Individual) | 15% | 30% | Final (Min if >5M) |
| Government securities (Company/AOP) | 20% | 40% | Adjustable |
| Bonds/debentures/certificates | 15% | 30% | Final (Min if >5M) |

#### E. Goods, Services & Contracts (Section 153)
| Category | Active Rate | Inactive Rate | Status |
|----------|------------|---------------|--------|
| Rice, cotton seed oil, edible oil | 1.5% | 3% | Minimum |
| Distributors – cigarettes | 2.5% | 5% | Minimum |
| Distributors – pharma | 1% | 2% | Minimum |
| FMCG distributors (ATL in IT & ST) | 0.25% | 0.25% | Minimum |
| Gold/silver supplies | 1% | 2% | Adjustable |
| Sale of goods – Company | 5% | 10% | Minimum |
| Sale of goods – Company (toll mfg) | 9% | 18% | Minimum |
| Sale of goods – Other | 5.5% | 11% | Minimum |
| Specified services (transport, freight, etc.) | 6% | 12% | Minimum |
| IT services | 4% | 8% | Minimum |
| Oil tanker contractor | 2% | 4% | Minimum |
| Other services – Company | 15% | 30% | Minimum |
| Other services – Others | 15% | 30% | Minimum |
| Media advertisement | 1.5% | 3% | Minimum |
| Contracts – Company | 7.5% | 15% | Minimum |
| Contracts – Others | 8% | 16% | Minimum |
| Contracts – Sports person | 15% | 30% | Minimum |

#### F. Rental Income (Section 155)
| Gross Annual Rent (PKR) | Rate |
|--------------------------|------|
| Up to 300,000 | 0% |
| 300,001 – 600,000 | 5% |
| 600,001 – 2,000,000 | Rs. 15,000 + 10% of excess over 600,000 |
| Above 2,000,000 | Rs. 155,000 + 25% of excess over 2,000,000 |
- Company as tenant: flat 15% / 30% (active/inactive)

#### G. Property Sale/Transfer (Section 236C)
| Consideration (PKR) | Active Filer | Late Filer | Non-Filer |
|---------------------|-------------|------------|-----------|
| Up to 50M | 4.5% | 7.5% | 11.5% |
| 50M – 100M | 5% | 8.5% | 11.5% |
| Above 100M | 5.5% | 9.5% | 11.5% |

#### H. Property Purchase (Section 236K)
| Fair Market Value (PKR) | Active Filer | Late Filer | Non-Filer |
|------------------------|-------------|------------|-----------|
| Up to 50M | 1.5% | 4.5% | 10.5% |
| 50M – 100M | 2% | 5.5% | 14.5% |
| Above 100M | 2.5% | 6.5% | 18.5% |

#### I. Other Key Sections
| Section | Description | Active | Inactive |
|---------|------------|--------|----------|
| 231AB | Cash withdrawal >50K/day | 0% | 0.8% |
| 233-I | Ad agent commission | 10% | 20% |
| 233-II | Life insurance agent (<0.5M) | 8% | 16% |
| 233-III | Other brokerage/commission | 12% | 24% |
| 236 | Telephone bill >1,000 | 10% | 10% |
| 236-II | Internet/prepaid cards | 15% | 75% (non-filer) |
| 236CB | Functions/gatherings | 10% | 10% |
| 236Y | Remittance abroad via cards | 5% | 10% |
| 236Z | Bonus shares | 10% | 10% |

### Calculation Formula
```
WHT = paymentAmount × applicableRate
// Rate depends on: section, payment type, taxpayer type, ATL status
// Inactive taxpayer rate = Active rate × 2 (in most cases per Tenth Schedule)
```

### Output
- WHT amount
- Applicable section reference
- Rate applied (active vs inactive)
- Tax status (Final / Minimum / Adjustable)
- Net amount after WHT

---

## 3. CAPITAL GAINS TAX CALCULATOR

**Legal Basis**: Income Tax Ordinance, 2001 — Section 37A (listed securities), Section 37 (immovable property).

### Inputs Required
- Asset type: Listed Securities / Immovable Property / Other Movable Assets
- Acquisition date
- Disposal date
- Cost of acquisition (PKR)
- Sale proceeds (PKR)
- ATL status at time of acquisition AND disposal
- For property: type (open plot / constructed / flat)

### A. Listed Securities (PSX, PMEX, Mutual Funds)

#### Securities acquired BEFORE July 1, 2013
- **Tax Rate: 0%** (exempt)

#### Securities acquired July 1, 2013 – June 30, 2022
- **Tax Rate: 12.5%** (flat, irrespective of holding period)

#### Securities acquired July 1, 2022 – June 30, 2024
Progressive rates based on holding period:

| Holding Period | Tax Rate |
|---------------|----------|
| Less than 1 year | 15% |
| 1 year to less than 2 years | 12.5% |
| 2 years to less than 3 years | 10% |
| 3 years to less than 4 years | 7.5% |
| 4 years to less than 5 years | 5% |
| 5 years to less than 6 years | 2.5% |
| 6 years or more | 0% |

#### Securities acquired on or after July 1, 2024
- **ATL Filers: Flat 15%** (regardless of holding period)
- **Non-ATL: Normal income tax slab rates apply** (minimum 15%)

#### Securities acquired on or after July 1, 2025
- **All investors: Flat 15%** (regardless of ATL status)

#### PMEX (Pakistan Mercantile Exchange)
- **Flat 5%** on all future commodity contracts (from July 1, 2025 onwards, regardless of ATL status)

### B. Immovable Property

#### Property acquired on or after July 1, 2024 (NEW REGIME)
- **ATL Filers: Flat 15%** on capital gain (regardless of holding period)
- **Non-ATL: Progressive income tax slab rates apply**

#### Property acquired before July 1, 2024 (OLD REGIME)
Progressive rates based on holding period and property type:

**Open Plots:**
| Holding Period | Filer Rate | Non-Filer Rate |
|---------------|-----------|----------------|
| Up to 1 year | 15% | 45% |
| 1–2 years | 12.5% | 37.5% |
| 2–3 years | 10% | 30% |
| 3–4 years | 7.5% | 22.5% |
| 4–5 years | 5% | 15% |
| 5–6 years | 2.5% | 7.5% |
| Over 6 years | 0% | 0% |

**Constructed Property / Flats:**
| Holding Period | Filer Rate | Non-Filer Rate |
|---------------|-----------|----------------|
| Up to 1 year | 15% | 45% |
| 1–2 years | 10% | 30% |
| 2–3 years | 7.5% | 22.5% |
| 3–4 years | 5% | 15% |
| 4+ years | 0% | 0% |

### C. Other Movable Capital Assets
- Taxed at **normal income tax slab rates**
- Full gain is taxable regardless of holding period

### Calculation Formula
```
capitalGain = saleProceeds - costOfAcquisition - allowableExpenses
holdingPeriod = disposalDate - acquisitionDate (in years)
applicableRate = getRate(assetType, acquisitionDate, holdingPeriod, atlStatus)
cgt = capitalGain × applicableRate
```

### Output
- Capital gain amount
- Holding period (years, months)
- Applicable tax rate
- CGT payable
- Net proceeds after CGT
- Legal reference (section 37 or 37A)

---

## 4. SALES TAX CALCULATOR

**Legal Basis**: Sales Tax Act, 1990 — Section 3. As amended by Finance Act, 2025.

### Inputs Required
- Transaction type: Supply of Goods / Import of Goods / Services
- Value of supply/import (PKR)
- Whether goods are in Third Schedule (retail price basis)
- Whether goods are in Eighth Schedule (special rates)
- Whether goods are in Sixth Schedule (exempt)
- Province for services (if applicable)
- Buyer status: Registered or Unregistered

### Standard Rates

| Category | Rate |
|----------|------|
| **Standard rate on goods** | **18%** |
| **Further tax (supply to unregistered person)** | **4%** (additional) |
| **Zero-rated supplies** | 0% (but input tax claimable) |
| **Exempt supplies** | No tax (no input tax claimable) |

### Sales Tax on Services (by Province)
| Province/Territory | Rate |
|-------------------|------|
| Islamabad Capital Territory | 15% |
| Punjab | 16% |
| Sindh | 15% |
| Khyber Pakhtunkhwa | 15% |
| Balochistan | 15% |

### Calculation Formula
```
// Standard goods
salesTax = valueOfSupply × 0.18

// If supply to unregistered person
furtherTax = valueOfSupply × 0.04
totalTax = salesTax + furtherTax

// For imported goods
salesTaxOnImport = (assessableValue + customsDuty + federalExciseDuty) × 0.18

// For Third Schedule goods (retail price basis)
salesTax = retailPrice × 0.18  // applied on MRP, not value of supply

// For services
salesTax = valueOfService × provincialRate
```

### Special Eighth Schedule Rates
Many goods have reduced rates under the Eighth Schedule. Common ones:
- Locally manufactured mobile phones: varies by value (e.g., 18% on value above certain thresholds)
- Sugar, cement, fertilizer: various special rates
- Edible oils, ghee: special rates

### Output
- Sales tax amount
- Further tax (if applicable)
- Total tax
- Effective rate
- Tax-inclusive price
- Legal reference (Section 3, relevant Schedule)

---

## 5. CUSTOMS DUTY CALCULATOR

**Legal Basis**: Customs Act, 1969. Pakistan Customs Tariff based on HS Code classification.

### Inputs Required
- HS Code (or product description for lookup)
- Assessable value / CIF value (PKR)
- Country of origin (for preferential rates under FTAs)
- Whether importer is a commercial importer or industrial user

### Standard Duty Slabs
Pakistan uses the following general customs duty rates:

| Category | Rate Range |
|----------|-----------|
| Raw materials | 0% – 3% |
| Semi-finished goods | 5% – 11% |
| Finished goods | 16% – 20% |
| Luxury/non-essential | 20% – 30% |
| Vehicles (CBU) | 25% – 100%+ |
| Agricultural inputs | 0% – 5% |

### Additional Levies on Import
| Levy | Basis | Rate |
|------|-------|------|
| Customs Duty (CD) | CIF value | Per HS code |
| Regulatory Duty (RD) | CIF value | Varies (0–90%) |
| Additional Customs Duty (ACD) | CIF + CD | 2% (on most goods) |
| Federal Excise Duty (FED) | CIF + CD | Varies by product |
| Sales Tax | CIF + CD + FED | 18% (standard) |
| Income Tax (WHT u/s 148) | CIF + CD + ST + FED | 1–6% (per schedule) |

### Total Landed Cost Calculation
```
cifValue = costOfGoods + insurance + freight
customsDuty = cifValue × cdRate
regulatoryDuty = cifValue × rdRate  // if applicable
acd = (cifValue + customsDuty) × 0.02  // if applicable
fed = (cifValue + customsDuty) × fedRate  // if applicable
salesTax = (cifValue + customsDuty + fed) × 0.18
incomeTax = (cifValue + customsDuty + salesTax + fed) × whtRate

totalDutyAndTaxes = customsDuty + regulatoryDuty + acd + fed + salesTax + incomeTax
landedCost = cifValue + totalDutyAndTaxes
```

### Implementation Note
Since HS codes number in the thousands, the calculator should offer:
- A simplified version with common product categories and approximate duty rates
- A manual entry mode where the user enters the duty rate percentage themselves
- Common categories: Electronics, Vehicles, Machinery, Food items, Textiles, Chemicals, etc.

### Output
- Customs Duty amount
- All additional levies (RD, ACD, FED, ST, IT)
- Total duties and taxes
- Total landed cost
- Duty as percentage of CIF value

---

## 6. TAX PENALTIES CALCULATOR

**Legal Basis**: Income Tax Ordinance, 2001 — Section 182 (penalties), Section 205 (default surcharge).

### Inputs Required
- Type of default (late filing, non-filing, late payment, etc.)
- Tax amount involved (PKR)
- Due date
- Actual filing/payment date
- Taxpayer type (Individual/AOP/Company)

### Penalty Categories

#### A. Late Filing of Return (Section 182)
| Taxpayer | Penalty |
|----------|---------|
| Individual (income ≤ Rs. 1M) | Rs. 1,000 |
| Individual (income > Rs. 1M but ≤ Rs. 5M) | Rs. 5,000 |
| Individual (income > Rs. 5M) | Rs. 25,000 |
| AOP | Rs. 25,000 |
| Company | Rs. 50,000 |

**Additional**: Rs. 100/day for each day of continued default after order, up to maximum of 25% of the tax payable or Rs. 200,000, whichever is higher.

#### B. Default Surcharge on Late Payment (Section 205)
- Rate: **12% per annum** (KIBOR + 3%, but simplified as 12% for current period)
- Calculated from the due date of payment to the actual date of payment
- Formula: `surcharge = taxDue × (12/100) × (daysLate / 365)`

#### C. Non-Filing Penalty
- Minimum penalty: Rs. 25,000 or 0.1% of taxable income, whichever is higher
- Additional consequences: placed on non-filer list (100% higher WHT rates)

#### D. Failure to Furnish Withholding Tax Statement (Section 182)
- Penalty: Rs. 2,500 per day of default (for companies/AOPs)

#### E. Concealment of Income / Tax Fraud
- Penalty: Amount of tax sought to be evaded, or Rs. 25,000, whichever is greater
- Criminal prosecution possible

### Calculation Formula
```
function calculatePenalty(type, taxAmount, dueDate, actualDate, taxpayerType) {
  const daysLate = daysBetween(dueDate, actualDate);
  
  if (type === 'late_filing') {
    return getLateFilingPenalty(taxpayerType, taxAmount);
  }
  
  if (type === 'default_surcharge') {
    const annualRate = 0.12; // 12% per annum
    return taxAmount * annualRate * (daysLate / 365);
  }
  
  if (type === 'late_filing_daily') {
    const dailyPenalty = 100;
    const maxPenalty = Math.max(taxAmount * 0.25, 200000);
    return Math.min(daysLate * dailyPenalty, maxPenalty);
  }
}
```

### Output
- Penalty amount
- Default surcharge amount
- Total additional liability
- Days of default
- Legal reference
- Advisory note about consequences of continued non-compliance

---

## 7. INHERITANCE CALCULATOR (HANAFI)

**Legal Basis**: Muslim Family Laws Ordinance, 1961. Quranic injunctions (Surah An-Nisa, 4:11-12, 4:176). Hanafi jurisprudence (majority school in Pakistan).

### Inputs Required
- Gender of deceased (Male / Female)
- Total estate value after debts, funeral expenses, and wasiyyah (bequest up to 1/3)
- Surviving heirs (tick which ones survive):
  - Husband / Wife (and number of wives, max 4)
  - Father
  - Mother
  - Sons (number)
  - Daughters (number)
  - Paternal Grandfather
  - Paternal Grandmother
  - Maternal Grandmother
  - Full Brothers (number)
  - Full Sisters (number)
  - Paternal Half-Brothers (number)
  - Paternal Half-Sisters (number)
  - Maternal Half-Brothers (number)
  - Maternal Half-Sisters (number)
  - Son's Sons (number)
  - Son's Daughters (number)

### Pre-Distribution Deductions (in order)
1. **Funeral and burial expenses**
2. **Debts** of the deceased
3. **Wasiyyah (bequest)**: Maximum 1/3 of estate, and NOT to any legal heir (unless other heirs consent)
4. Remaining = **Net Distributable Estate**

### Fixed Share Holders (Ashab al-Furud) — Hanafi School

| Heir | Condition | Share |
|------|-----------|-------|
| **Husband** | No children/grandchildren | 1/2 |
| **Husband** | With children/grandchildren | 1/4 |
| **Wife** | No children/grandchildren | 1/4 |
| **Wife** | With children/grandchildren | 1/8 |
| **Father** | With son(s) | 1/6 |
| **Father** | No son, with daughter(s) | 1/6 + residue |
| **Father** | No children at all | Residue (asaba) |
| **Mother** | With children or 2+ siblings | 1/6 |
| **Mother** | No children, <2 siblings | 1/3 |
| **Mother** | No children, with spouse + father only | 1/3 of remainder after spouse's share |
| **Daughter(s)** | One, no son | 1/2 |
| **Daughter(s)** | Two or more, no son | 2/3 (shared equally) |
| **Daughter(s)** | With son(s) | Residue (son gets 2× daughter's share) |
| **Son's Daughter(s)** | One, no daughter, no son | 1/2 |
| **Son's Daughter(s)** | With one daughter, no son | 1/6 (to complete 2/3) |
| **Son's Daughter(s)** | Two+ daughters exist | Excluded (unless son's son exists) |
| **Full Sister(s)** | One, no children, no father, no brother | 1/2 |
| **Full Sister(s)** | Two+, no children, no father, no brother | 2/3 (shared equally) |
| **Full Sister(s)** | With full brother | Residue (brother gets 2× sister) |
| **Paternal Half-Sister** | One, no full sister, no children, no father | 1/2 |
| **Paternal Half-Sister** | With one full sister | 1/6 (to complete 2/3) |
| **Maternal Half-Siblings** | One | 1/6 |
| **Maternal Half-Siblings** | Two or more | 1/3 (shared equally, male = female) |
| **Paternal Grandfather** | Same rules as father (in his absence) | Same as father |
| **Paternal Grandmother** | No mother alive | 1/6 |
| **Maternal Grandmother** | No mother alive | 1/6 |

### Blocking (Hajb) Rules — Hanafi
These heirs COMPLETELY BLOCK others:

| Blocker | Blocks |
|---------|--------|
| Son | Son's son, son's daughter, brothers, sisters |
| Father | Grandfather, grandmother (paternal), brothers, sisters |
| Son's Son | Son's son's son (at lower level) |
| Full Brother | Paternal half-brother, paternal half-sister |
| Full Sister (as residuary with daughter) | Paternal half-sister |

**Note in Hanafi**: Grandfather **completely blocks** brothers and sisters. This is a KEY difference from Shafi'i/Maliki schools.

### Residuary Heirs (Asaba) — Hanafi
After fixed shares are distributed, the residue goes to:
1. Son(s) — if daughters also present, son gets 2× daughter
2. Father (if no sons)
3. Paternal grandfather (if no father and no sons)
4. Full brother(s) — if full sisters also present, brother gets 2× sister
5. Paternal half-brother(s)
6. Full brother's son(s)
7. Paternal half-brother's son(s)

### Awl (Increase) — When Total Shares Exceed the Estate
If fixed shares add up to MORE than 1 (one), every share is proportionally reduced. This is called **Awl**.

Example: Husband (1/2) + 2 Full Sisters (2/3) + Mother (1/6) = 1/2 + 2/3 + 1/6 = 8/6 > 1
Solution: Convert to common denominator (6), then increase base from 6 to 8. Each heir's share is reduced proportionally.

### Radd (Return) — When Total Shares Are Less Than the Estate
If fixed shares add up to LESS than 1 and there are no residuary heirs, the surplus is returned (radd) proportionally to the fixed share holders **except the spouse**.

**Hanafi exception**: Spouse does NOT receive radd. Surplus goes to other fixed-share holders proportionally.

### Algorithm
```
1. Deduct funeral expenses, debts, wasiyyah
2. Identify all surviving heirs
3. Apply blocking rules to remove excluded heirs
4. Assign fixed shares to Ashab al-Furud
5. Calculate total fixed shares
6. If total > 1: Apply Awl (proportional reduction)
7. If total < 1 and residuary heirs exist: Give residue to Asaba
8. If total < 1 and NO residuary: Apply Radd (return to fixed holders except spouse)
9. If total = 1: Perfect distribution (Kamil)
10. Convert fractions to actual PKR amounts
```

---

## 8. INHERITANCE CALCULATOR (SHIA / JA'FARI)

**Legal Basis**: Ja'fari (Twelver Shia) jurisprudence. Applicable in Pakistan under Muslim Personal Law (Shariat) Application Act, 1962.

### Key Differences from Hanafi

The Shia system is **class-based**. Heirs are divided into three classes, and a higher class COMPLETELY excludes lower classes.

### Classes of Heirs (Shia)

**Class I**: Parents + Children (and their descendants)
**Class II**: Grandparents + Siblings (and their descendants)
**Class III**: Paternal and Maternal Uncles/Aunts (and their descendants)

**Rule**: If ANY heir from Class I survives, ALL of Class II and III are excluded. If any Class II heir survives, all Class III are excluded.

**Spouse** is NOT in any class — spouse ALWAYS inherits regardless of which class is inheriting.

### Fixed Shares (Shia)

| Heir | Condition | Share |
|------|-----------|-------|
| **Husband** | No children | 1/2 |
| **Husband** | With children | 1/4 |
| **Wife** | No children | 1/4 |
| **Wife** | With children | 1/8 |
| **Father** | With son(s) | 1/6 |
| **Father** | No children | Residue |
| **Mother** | With children or 2+ siblings | 1/6 |
| **Mother** | No children, <2 siblings | 1/3 |
| **One daughter** | No son | 1/2 |
| **Two+ daughters** | No son | 2/3 |
| **With son(s)** | Sons and daughters | Residue (2:1 ratio) |

### Key Shia Differences
1. **Grandfather does NOT block siblings** (both inherit together in Class II)
2. **Maternal relatives inherit** alongside paternal relatives (1/3 maternal, 2/3 paternal division)
3. **Radd (return)**: Surplus goes back to ALL fixed-share holders **INCLUDING the spouse** (unlike Hanafi)
4. **No Awl**: Shia school does NOT recognize Awl. Instead, if total exceeds 1, the reduction falls on daughters/sisters (not on all proportionally)
5. **Maternal grandmother and paternal grandmother**: Both can inherit 1/6 in absence of mother
6. **Son's daughter**: Treated same as daughter when son's son also present

### Algorithm
```
1. Deduct funeral expenses, debts, wasiyyah
2. Identify surviving heirs and classify into Class I, II, or III
3. Highest class with survivors takes precedence
4. Assign spouse share first (1/4 or 1/8, or 1/2 or 1/4)
5. Distribute remaining among class heirs per Ja'fari rules
6. If residue remains and no residuary: Apply Radd (INCLUDING spouse)
7. If shares exceed estate: Reduce from daughters/sisters share (NOT Awl)
```

---

## 9. LIMITATION / TIME-BAR CALCULATOR

**Legal Basis**: Limitation Act, 1908 (Act IX of 1908), as applicable in Pakistan. First Schedule.

### Inputs Required
- Type of legal action (suit, appeal, application, execution)
- Category of suit/action (from dropdown)
- Date when cause of action arose / right to sue accrued
- Any period of legal disability (minority, insanity)
- Whether defendant was absent from Pakistan

### Key Limitation Periods — SUITS (First Division of First Schedule)

#### Part I — Three Years
| Article | Description | Period | Starts From |
|---------|------------|--------|-------------|
| 14 | For compensation for injury (not herein provided for) | 3 years | When injury occurs |
| 15 | For compensation for inducing a person to break a contract | 3 years | When contract is broken |
| 22 | For money payable for money lent | 3 years | When money is lent |
| 23 | For money deposited under an obligation | 3 years | When payment becomes due |
| 24 | For price of goods sold and delivered | 3 years | When price becomes payable |
| 26 | For money payable under a decree or order | 3 years | Date of decree/order |
| 27 | For balance due on a mutual, open, current account | 3 years | Close of year or last item |
| 29 | For compensation for breach of contract | 3 years | When contract is broken |
| 30 | For compensation for breach of promise of marriage | 3 years | When breach occurs |

#### Part V — Six Years
| Article | Description | Period | Starts From |
|---------|------------|--------|-------------|
| 91 | For possession based on title | 6 years | When right to sue accrues |
| 92 | For interest upon money charged upon immovable property | 6 years | When interest becomes due |
| 120 | For a declaration (general) | 6 years | When right to sue first accrues |

#### Part VII — Twelve Years
| Article | Description | Period | Starts From |
|---------|------------|--------|-------------|
| 141 | For possession of immovable property when plaintiff has been dispossessed | 12 years | Date of dispossession |
| 142 | For possession of immovable property based on title | 12 years | When possession becomes adverse |
| 144 | For possession of immovable property based on prior possession | 12 years | Date of dispossession |

### Key Limitation Periods — APPEALS (Second Division)
| Article | Description | Period |
|---------|------------|--------|
| 150 | Appeal from death sentence to High Court | 7 days |
| 151 | Appeal from order of High Court (original side) | 20 days |
| 154 | Appeal to any court other than High Court | 30 days |
| 155 | Criminal appeal to High Court | 60 days |
| 156 | Civil appeal to High Court | 90 days |

### Key Limitation Periods — APPLICATIONS (Third Division)
| Article | Description | Period |
|---------|------------|--------|
| 164 | For execution of a decree or order | 3 years |
| 181 | For review of judgment (civil) | 30 days |

### Commonly Used Periods (Quick Reference)
| Action Type | Period |
|------------|--------|
| Recovery of money / breach of contract | 3 years |
| Suit for declaration | 6 years |
| Recovery of possession of immovable property | 12 years |
| Civil appeal to High Court | 90 days |
| Criminal appeal to High Court | 60 days |
| Appeal to lower appellate court | 30 days |
| Execution of decree | 3 years |
| Review of judgment | 30 days |
| Rent recovery | 3 years |
| Pre-emption suit | 4 months (120 days) |
| Suit for specific performance | 3 years |
| Tort / compensation for injury | 3 years |

### Exclusions (Section 12-15)
- Day from which limitation runs is EXCLUDED
- Time for obtaining certified copy of judgment is EXCLUDED from appeal period
- Time of proceeding bona fide in wrong court is EXCLUDED
- Time of legal disability (minority, insanity) extends the period
- Defendant's absence from Pakistan extends the period

### Calculation Formula
```
function calculateLimitation(actionType, causeOfActionDate, today) {
  const limitationPeriod = getLimitationPeriod(actionType); // in days
  const deadline = addDays(causeOfActionDate, limitationPeriod);
  const daysRemaining = daysBetween(today, deadline);
  const isTimeBarred = today > deadline;
  
  return {
    limitationPeriod,
    deadline,
    daysRemaining: isTimeBarred ? 0 : daysRemaining,
    isTimeBarred,
    legalReference: getArticleReference(actionType),
    urgency: getUrgencyLevel(daysRemaining) // green/yellow/red
  };
}
```

### Output
- Limitation period (years/days)
- Deadline date
- Days remaining / Days overdue
- Whether case is time-barred (YES/NO)
- Urgency indicator (Green: >90 days, Yellow: 30-90 days, Red: <30 days)
- Relevant Article of First Schedule
- Note about possible exclusions (Section 5 condonation of delay)

---

## 10. ZAKAT CALCULATOR

**Legal Basis**: Zakat and Ushr Ordinance, 1980 (XVIII of 1980). Islamic jurisprudence (Hanafi and general principles).

### Inputs Required
- Cash in hand and bank accounts (PKR)
- Gold (weight in grams or tolas, and current market value)
- Silver (weight in grams or tolas, and current market value)
- Value of trade goods / business inventory
- Investment in shares / mutual funds / stocks (current market value)
- Money owed TO you (receivables likely to be collected)
- Agricultural produce (if applicable)
- Outstanding debts owed BY you (to be deducted)
- Date of calculation (for Hijri year reference)

### Nisab (Minimum Threshold)
Zakat is only obligatory if your total zakatable wealth exceeds the Nisab.

**Nisab is calculated as the LESSER of:**
- Value of **87.48 grams of gold** (7.5 tolas)
- Value of **612.36 grams of silver** (52.5 tolas)

In practice, the silver nisab is almost always lower and is the standard threshold used.

**Note**: Current market prices of gold and silver should be used. The calculator should either use hardcoded approximate values or allow user to input current prices.

### Zakat Rate
- **2.5%** (1/40th) of total zakatable wealth above Nisab

### Zakatable Assets
| Asset | Zakatable? |
|-------|-----------|
| Cash (bank accounts, savings) | Yes |
| Gold and silver | Yes (above nisab) |
| Trade goods / business inventory | Yes (at market value) |
| Shares / stocks / mutual funds | Yes (at current market value) |
| Rental income (accumulated) | Yes (as cash) |
| Money lent to others (expected to be returned) | Yes |
| Agricultural produce | Yes (10% rain-fed, 5% irrigated — separate calculation) |
| Primary residence | No |
| Personal use items (clothes, car, furniture) | No |
| Land not for trade | No |
| Fixed assets of business (machinery, premises) | No |
| Debts owed by you | Deducted from total |

### Calculation Formula
```
totalZakatableWealth = cash + goldValue + silverValue + tradeGoods 
                     + investmentValue + receivables - debtOwed

if (totalZakatableWealth >= nisab) {
  zakat = totalZakatableWealth × 0.025;
} else {
  zakat = 0; // Below nisab, no zakat due
}
```

### Gold/Silver Conversion
- 1 Tola = 11.664 grams
- Gold Nisab = 7.5 tolas = 87.48 grams
- Silver Nisab = 52.5 tolas = 612.36 grams

### Output
- Total zakatable wealth
- Nisab threshold (with current gold/silver prices)
- Whether Nisab is met (YES/NO)
- Zakat payable (2.5%)
- Breakdown by asset category
- Note: Zakat is calculated on the Hijri year (lunar calendar, approximately 354 days)

---

## 11. DAMAGES CALCULATOR

**Legal Basis**: Various — Fatal Accidents Act, 1855; Motor Vehicles Act, 1939; Pakistan Penal Code; Civil procedure. Case law from Supreme Court and High Courts of Pakistan.

### Inputs Required
- Type of case: Personal Injury / Fatal Accident / Property Damage / Breach of Contract
- For personal injury/fatal: age of victim, monthly income, dependents
- For property: value of property, extent of damage
- Nature of injuries (if personal injury)
- Whether claim is against government or private party

### A. Fatal Accident Compensation
Pakistani courts use a **multiplier method** based on the deceased's income and remaining working years.

**Formula**:
```
compensation = annualIncome × multiplier × dependencyRatio
```

| Age at Death | Multiplier (approximate) |
|-------------|-------------------------|
| 20-25 | 15-18 |
| 26-30 | 14-16 |
| 31-35 | 13-15 |
| 36-40 | 12-14 |
| 41-45 | 10-12 |
| 46-50 | 8-10 |
| 51-55 | 6-8 |
| 56-60 | 4-6 |
| 60+ | 2-4 |

**Dependency ratio**: typically 2/3 (67%) of the deceased's income was spent on dependents.

**Additional heads of compensation**:
- Loss of consortium: Rs. 100,000 – Rs. 500,000
- Funeral expenses: Actual (typically Rs. 50,000 – Rs. 200,000)
- Loss of estate: Varies
- Pain and suffering (before death): Varies

### B. Personal Injury Compensation
- Medical expenses (actual + future estimated)
- Loss of earning capacity (% disability × remaining working years × income)
- Pain and suffering: Court's discretion, typically Rs. 100,000 – Rs. 2,000,000
- Disfigurement: Additional compensation

### C. Property Damage
```
compensation = fairMarketValue - salvageValue  // if total loss
compensation = repairCost  // if repairable
```

### D. Breach of Contract
- Actual damages / losses incurred
- Lost profits (if provable)
- Interest on delayed payments

### Important Note
This calculator provides **estimates only**. Pakistani courts have wide discretion in awarding damages. The calculator should include a prominent disclaimer:

> "This is an estimate based on general principles and reported case law. Actual court awards may vary significantly based on the specific facts, jurisdiction, and judge's discretion."

### Output
- Estimated compensation range (low – high)
- Breakdown by head of damages
- Multiplier used and rationale
- Relevant legal reference
- Disclaimer about estimates

---

## 12. IDDAT PERIOD CALCULATOR

**Legal Basis**: Muslim Family Laws Ordinance, 1961 — Section 7. Quran (Surah Al-Baqarah 2:228, 2:234, 65:4). Hanafi jurisprudence.

### Inputs Required
- Reason for Iddat: Divorce (Talaq) / Khula / Annulment / Death of Husband
- Date of divorce/death/annulment
- Whether the woman is pregnant
- Whether the woman has menstrual cycles (pre or post-menopausal)
- Type of divorce: Revocable (Talaq-e-Raji) or Irrevocable (Talaq-e-Bain)

### Iddat Periods

#### A. Divorce (Talaq / Khula / Judicial Divorce)
| Condition | Iddat Period | Calculation |
|-----------|-------------|-------------|
| Woman has menstrual cycles | **3 menstrual cycles (tuhr)** | ≈ 90 days (3 months) from date of divorce |
| Woman is post-menopausal | **3 lunar months** | 3 × 29.5 = ~89 days |
| Woman is pregnant | **Until delivery** | However long pregnancy lasts |
| Marriage not consummated | **No iddat** | 0 days |

**Note per MFLO Section 7**: Talaq is not effective until 90 days from date of written notice to the Chairman of the Union Council/Arbitration Council. So effectively:
- Talaq notice → 90 days reconciliation period → if no reconciliation, talaq becomes effective → iddat starts (or runs concurrently depending on interpretation)

#### B. Death of Husband
| Condition | Iddat Period | Calculation |
|-----------|-------------|-------------|
| Not pregnant | **4 months and 10 days** | 130 days from date of death |
| Pregnant | **Until delivery** or 4 months 10 days, whichever is LONGER |

### Key Rules
1. Iddat begins from the **date of talaq/divorce**, NOT from the date of court decree (in case of contested divorce, it depends on the type)
2. For death, iddat begins from the **date of death**, not from when the widow learns of it (Hanafi view)
3. During iddat after revocable talaq, the husband can take the wife back (rujoo)
4. During iddat after death, the widow must observe mourning (no marriage, limited going out)

### Calculation Formula
```
function calculateIddat(reason, eventDate, isPregnant, hasMenstruation, isConsummated) {
  if (!isConsummated && reason !== 'death') {
    return { days: 0, endDate: eventDate, note: "No iddat required - marriage not consummated" };
  }
  
  if (isPregnant) {
    return { 
      note: "Iddat continues until delivery of the child",
      estimatedEnd: "Depends on pregnancy stage"
    };
  }
  
  if (reason === 'death') {
    const days = 130; // 4 months and 10 days
    return { days, endDate: addDays(eventDate, days) };
  }
  
  if (reason === 'divorce' || reason === 'khula') {
    const days = 90; // 3 menstrual cycles ≈ 90 days
    return { days, endDate: addDays(eventDate, days) };
  }
}
```

### Output
- Iddat period in days
- Start date
- End date
- Type of iddat
- Whether husband can revoke divorce during iddat (only in Talaq-e-Raji)
- Legal reference (Surah Al-Baqarah, MFLO Section 7)
- Note about pregnancy exception

---

## IMPLEMENTATION NOTES FOR DEVELOPERS

### Data Architecture
All calculator data (tax slabs, rates, limitation periods) should be stored in separate constant files/objects so they can be easily updated when laws change (typically annually with the Finance Act).

```
/constants/
  incomeTaxSlabs.ts      // Updated annually
  withholdingRates.ts    // Updated annually
  capitalGainRates.ts    // Updated annually
  salesTaxRates.ts       // Updated as needed
  limitationPeriods.ts   // Rarely changes
  inheritanceRules.ts    // Very rarely changes
  zakatNisab.ts          // Nisab values, allow manual override
```

### Accuracy Warning
Every calculator result page should include:

> **Disclaimer**: This calculator provides estimates based on the laws and rates in effect as of [date]. Tax laws change annually through the Finance Act. Inheritance calculations involve complex legal principles that may vary based on specific circumstances. Always consult a qualified legal or tax professional before making decisions based on these calculations. QanoonAI is not responsible for any decisions made based on calculator results.

### Print Report Template
Each calculator's printable report should include:
1. QanoonAI logo and branding
2. Calculator name
3. Date of calculation
4. All inputs entered
5. Complete results with breakdown
6. Legal references cited
7. Disclaimer
8. "Powered by QanoonAI — Pakistan's First AI Legal Platform"

### Update Cadence
- **Tax calculators** (Income, WHT, CGT, Sales, Customs, Penalties): Update after every Finance Act (usually June/July each year)
- **Inheritance**: Very stable, rarely needs updates
- **Limitation**: Very stable, rarely needs updates
- **Zakat**: Nisab changes with gold/silver prices (allow manual input)
- **Iddat**: Very stable
- **Damages**: Periodic updates based on new case law
