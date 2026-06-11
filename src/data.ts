import { Opportunity, DirectoryEntry, VisaFreeProgram, VisaSponsorshipProgram, ApprovedSponsorCompany, SponsoredJob } from "./types";

const LAST_VERIFIED_DATE = "June 5, 2026";

export const DIRECTORY_ENTRIES: DirectoryEntry[] = [
  {
    id: "innovate-uk",
    title: "Innovate UK Tech",
    companyName: "Innovate UK",
    location: "London, United Kingdom",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFmcdnJWahA1025s_5YmRNMIlcX0zq8OQE4xhgop9zGm20ckl6EXhnpANcSGmWL_PQ3jhxXywdD6UxLZ19TMEzo7eX2gTz2TwcA4C8bLM4veBQh6jaXoOd1iszcf91cUmHC4ddKtcqkdPj4TBXpsYQADmunubDkP-kyGh1u2jWEh2gPnB2Fs9xA5A-qFgWgOLIr1ubUf61mECuhbA2xdkOinyFQyBb-5_CDnB2NWEMzNXTGPzRRHZUnjGxJnJtVIej6SmU4SEcXzGQ",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_Lo8W_eu8WldSplRXPss2-0xQodaNv-M-gFknXU-T3QvRtAdeW0ihPrnQ5X1jzLHsy0wdPpO5ZuaHMVj1pwLHyNOlmuGRb1aMsWmUdZcHnQuJ7hthFyfFA4C9d7hThEWbYxxo0USBNpWvZUfGC0_3m1pTMULEHWBdTsPTpH83oy9yxJ7mf05T5OG6Uai3Vq-vCM74PEm7zxnCcU5iGNbZcf6L9bCBJuxuh4JTlNaDKROdEIsb7k0r_TCBcAX5Cacx57h14N-4Htcq",
    isGovernmentApproved: true,
    tags: ["VISA SPONSORED", "FULL-TIME"]
  },
  {
    id: "medlink-canada",
    title: "MedLink Canada",
    companyName: "MedLink Health",
    location: "Toronto, Canada",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFCLYPHXN0JZ0_e0l6aUJbduC8UqWi-Vcl2j3nTwDYL_O_uTiMbzI3H9Nx97q35ZCy7kmeJ7Mir46z1HMvO7uBBsEUDR5BeoMgoMFM5kLHEhmJfCIzi8glk-Y2GqyZSMDNbIFFBrujsV1fCYsCk_aq7c68h2f7wWBrxvwF8O39wiJinyv7-LmDxKDghOOKyyOni3K1eCikcyHo4hztU_APBC_1OyRPnOSJF2z_zzyay_1d93SYMvmnjElIOmLrNIdZJ4HY6PgOwO1D",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzcgvOthYLRVxPhYURvTdJyNF1fTsnamoqs8NPk3h9OAd7ko9FdbDFY0HyH_wvstRxzw7cXUTeN5bnIJKon6epVcNZKqJVn7i4laNeR00xZRNTnnkfcVNPxdYBbQvlOJwnvypCjF3_TicEvVNMb2yWL01WWXuwXcSW-Bq2LpDkGC3R-1B551rfBF-HeXkNvFy3p0Kol6CUGA_4ORCsvOBQdUZXS0Fm86WaO4fPiKZjt9sSLaaJ8GCSI3F4Cva5sCFcRW-_nNRrpiGK",
    isGovernmentApproved: true,
    tags: ["VISA SPONSORED", "FAST TRACK"]
  },
  {
    id: "berlin-eng",
    title: "Berlin Eng. Group",
    companyName: "Berlin Engineering",
    location: "Berlin, Germany",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhrzmj92aUE7zzrNqJI4XuLz-ksVU98iu29TS3l63Phb1nph7-cEGXRywxMFJy-ZhEusqBzDrFqy-nMdXGpJVD1GSZcXlECB6Qh1TnVgqTB5quRGL62rWlAHORSXjrOlNJGIVsXvD5G-LkjpINviIBYmjUoswHmbOPTkyip4sQDfnrTim1Odi9cc4vlDm94LRDRsFCyFFAWGc-19SYQZuer3id8ge2d5-a5o9c5vLVQtON3wNrk3B-uJF9JAHsqjz-z3XnpGUQw7NY",
    isGovernmentApproved: true,
    tags: ["VISA SPONSORED", "CLOSING SOON"]
  }
];

export const VISA_FREE_PROGRAMS: VisaFreeProgram[] = [
  {
    id: "ecowas-passport-protocol",
    countryOrRegion: "West Africa Regions",
    programName: "ECOWAS Regional Passport Free Entry Protocol",
    officialSiteUrl: "https://ecowas.int",
    description: "Multi-lateral binding treaty allowing all passport holders belonging to the 15 West African representative territories complete exemption from visitor visa prerequisites, ensuring fast-track biometric immigration clearance on entry.",
    eligibilityDescription: "Must possess a valid national passport or travel document issued by any ECOWAS member nation (e.g., Nigeria, Ghana, Senegal).",
    keyLinkText: "View ECOWAS Travel Protocols"
  },
  {
    id: "seychelles-entry-waiver",
    countryOrRegion: "Seychelles",
    programName: "Seychelles Universal Visitor Visa Exemption Scheme",
    officialSiteUrl: "https://www.ics.gov.sc",
    description: "Progressive visa-on-arrival scheme offering direct waiver facilities for travel and short-term study visits. Guarantees free biometric entry clearance for 30 to 90 continuous days to support professional research and cross-border networks.",
    eligibilityDescription: "Valid return ticket, confirmed residence/hotel booking, and sufficient proof of travel maintenance capital.",
    keyLinkText: "Official Seychelles Immigration Registry"
  },
  {
    id: "namibia-remoteexemption",
    countryOrRegion: "Namibia",
    programName: "Namibia Digital Nomad & Research Residence Waiver",
    officialSiteUrl: "https://www.namibianomadvisa.com",
    description: "Official government initiative created for self-reliant scholars, engineers, and digital nomads, allowing them to reside, coordinate remote bootcamps, and perform seminars safely in Namibia for up to 6 months without custom corporate sponsorships.",
    eligibilityDescription: "Demonstrate minimum self-earned remote income of $2,000 USD monthly and submit formal background clearance documents.",
    keyLinkText: "Namibia Nomad Visa Dashboard"
  },
  {
    id: "east-africa-unified-visa",
    countryOrRegion: "Kenya / Rwanda / Uganda",
    programName: "East African Community Unified Mobility Agreement",
    officialSiteUrl: "https://www.migration.gov.rw",
    description: "Multilateral regional tourist waiver permitting flexible combined travel across East Africa. Perfect for delegates attending regional summits, science seminars, and educational workshops without separate visa fees.",
    eligibilityDescription: "Single border-clearance application processed by the primary country of destination.",
    keyLinkText: "East Africa Joint Visa Authority"
  }
];

export const VISA_SPONSORED_PROGRAMS: VisaSponsorshipProgram[] = [
  {
    id: "germany-chancenkarte",
    country: "Germany",
    programName: "Germany Opportunity Card (Chancenkarte Pathway)",
    officialSiteUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/opportunity-card",
    description: "Points-based visa sponsorship policy facilitating targeted migration of talented African graduates and technologists to Germany. Allows applicants to enter the country to search for high-growth jobs matched with certified corporate channels.",
    eligibilityDescription: "Hold a recognized university degree (BSc/MSc) or technical certification, basic German (A1) or fluent English (B2).",
    keyLinkText: "Access Germany Chancenkarte Portal"
  },
  {
    id: "uk-global-talent-path",
    country: "United Kingdom",
    programName: "UK Global Talent Scholarship & Research Sponsorship",
    officialSiteUrl: "https://www.gov.uk/global-talent",
    description: "A highly prestigious visa stream designed for world-class technical researchers, engineers, academic scholars, and innovators looking to lead development laboratories or research departments in the United Kingdom.",
    eligibilityDescription: "Endorsement letter by an approved UK academic body (e.g., Royal Society, Royal Academy of Engineering) or winning a qualified global award.",
    keyLinkText: "UK GOV Global Talent Portal"
  },
  {
    id: "canada-provincial-nominee",
    country: "Canada",
    programName: "Canada Provincial Nominee Program (Academic Support PNP)",
    officialSiteUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html",
    description: "State-level direct visa nomination program tailored to support skilled scholars, academic educators, and developers looking to settle. Leverages express fast-track processing with provincial visa guarantees.",
    eligibilityDescription: "A permanent job offer from a certified local Canadian employer or a post-graduate qualification completed from a Canadian University.",
    keyLinkText: "Canada Provincial Sponsorship Guides"
  },
  {
    id: "usa-j1-exchange-research",
    country: "United States",
    programName: "US Exchange Visitor Program (J-1 Research & Seminar Visa)",
    officialSiteUrl: "https://j1visa.state.gov/programs/research-scholar/",
    description: "Immigration-approved visa pathway enabling qualified African academics, physicians, and engineers to enter US schools, corporate research hubs, and laboratories for up to 5 years, sponsored by authorized US organizations.",
    eligibilityDescription: "Selection as a research scholar, presenter, or doctorate associate by an accredited US university or corporate sponsor.",
    keyLinkText: "US State Department J-1 Exchange Portal"
  }
];

export const APPROVED_SPONSOR_COMPANIES: ApprovedSponsorCompany[] = [
  {
    id: "haleon-tech-uk",
    country: "United Kingdom",
    companyName: "Haleon Global Technologies",
    industry: "Information Technology & Healthcare Tech",
    officialRegistryLink: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers",
    description: "Highly ranked certified UK sponsor organization with an active tier 2 quota for overseas analytical science, software system automation engineering, and computational bio-sciences.",
    approvedStatus: true,
    activeRolesCount: 14
  },
  {
    id: "siemens-mobility-de",
    country: "Germany",
    companyName: "Siemens AG Infrastructure Hub",
    industry: "Engineering & Renewable Energy",
    officialRegistryLink: "https://www.make-it-in-germany.com",
    description: "Government-approved engineering enterprise carrying certified fast-track visa processing targets for global scientists, climate tech engineers, and hardware architects from Sub-Saharan countries.",
    approvedStatus: true,
    activeRolesCount: 28
  },
  {
    id: "biomedics-labs-ca",
    country: "Canada",
    companyName: "BioMedical Research Labs Toronto",
    industry: "Biotech & Medical Science",
    officialRegistryLink: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/hire-foreign-worker/temporary/approved-employers.html",
    description: "Licensed organization authorizing LMIA-exempt fast-track entry for analytical testing experts, computational biology scholars, and foreign medical trainees with provincial health sponsorships.",
    approvedStatus: true,
    activeRolesCount: 9
  },
  {
    id: "aspirant-group-us",
    country: "United States",
    companyName: "Aspirant Applied Systems Inc.",
    industry: "Agritech & Software Systems",
    officialRegistryLink: "https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub",
    description: "Fully certified corporate enterprise registered on the USCIS H-1B data hub, actively recruiting talent for global research fellowships, machine learning clinics, and agritech projects.",
    approvedStatus: true,
    activeRolesCount: 19
  }
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "oxford-clarendon-postgrad",
    title: "Postgraduate School of Science & Tech - Oxford Clarendon Scholarships",
    type: "School",
    description: "The Clarendon Fund is a major graduate scholarship scheme at the University of Oxford, offering around 160 fully funded scholarships every year to outstanding graduate students of African and international descent. Academic merit and potential are assessed across all degree-bearing courses at graduate level, providing complete tuition, standard fees, and a generous grant for living expenses.",
    eligibility: [
      "African national with an excellent First Class or high GPA equivalent undergraduate academic record.",
      "Secured an offer for a full-time MSc or DPhil study at Oxford University.",
      "Demonstrate outstanding commitment to contributing to education and growth sectors in Sub-Saharan Africa.",
      "Excellent references and a robust academic research proposal."
    ],
    benefits: [
      { label: "Full Tuition", value: "100% University & College Fees", iconName: "DollarSign" },
      { label: "Annual Stipend", value: "£19,100 per annum for living expenses", iconName: "Home" },
      { label: "Travel Award", value: "Round-trip economy flight booking", iconName: "Plane" },
      { label: "Health Surcharge", value: "Global NHS health fee fully covered", iconName: "Heart" }
    ],
    location: "Oxford University, United Kingdom",
    deadline: "January 10, 2027",
    rawDeadlineDate: "2027-01-10",
    badge: "Fully Funded",
    stipend: "£19,100 / year",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqjtuZm-5kV0OlLPEqD6aw4SuZy-_CS4-97MbcOpkRlsTfViPHIVtW3CCQNWgDIRF7jBzOvvtYwk_oOOFiT1l_MAMWD9QXV9ayuEeji7Uchsp4WtvJPMk-iiSm3ORYvp5QZIirEkE5nodJxmzMt-Rw6UEf1ejwVopM_SG_xMLEZxczJx5o32vRCWAyx4INrR0RGjToNARjvciaJN5R9ImLAoZFGrNIvnOAjJFdyupRwuo_-I2aAbpWnF0xZt-RymzdUy6JVZlBUbuW",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "United Kingdom"
  },
  {
    id: "toronto-african-scholars",
    title: "University of Toronto African Leaders Graduate Merit Scholarship",
    type: "School",
    description: "Established to support exceptional graduate researchers from African nations, this program targets scholars wishing to pursue advanced studies within the University of Toronto's world-renowned departments. Covers full university fees, health insurances, and matches students with dedicated research mentors and stipend facilities during their residency.",
    eligibility: [
      "Citizen of an African country.",
      "Completed undergraduate credentials with First Class honors.",
      "Applied or secured preliminary admission to a qualifying graduate program at the University of Toronto.",
      "Submit two academic sponsor recommendation reports."
    ],
    benefits: [
      { label: "Full Funding", value: "100% Tuition program fees waiver", iconName: "DollarSign" },
      { label: "Living Allowance", value: "$24,500 CAD annual stipend package", iconName: "Home" },
      { label: "Immigration Support", value: "Direct study permit support & guidance", iconName: "Shield" },
      { label: "Medical Care", value: "UHIP comprehensive healthcare plan", iconName: "Heart" }
    ],
    location: "University of Toronto, Canada",
    deadline: "February 15, 2027",
    rawDeadlineDate: "2027-02-15",
    badge: "Fully Funded",
    stipend: "$24,500 CAD / year",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFCLYPHXN0JZ0_e0l6aUJbduC8UqWi-Vcl2j3nTwDYL_O_uTiMbzI3H9Nx97q35ZCy7kmeJ7Mir46z1HMvO7uBBsEUDR5BeoMgoMFM5kLHEhmJfCIzi8glk-Y2GqyZSMDNbIFFBrujsV1fCYsCk_aq7c68h2f7wWBrxvwF8O39wiJinyv7-LmDxKDghOOKyyOni3K1eCikcyHo4hztU_APBC_1OyRPnOSJF2z_zzyay_1d93SYMvmnjElIOmLrNIdZJ4HY6PgOwO1D",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences"],
    region: "Canada"
  },
  {
    id: "berlin-genai-workshop",
    title: "Global Tech Leaders Artificial Intelligence & Systems Design Workshop",
    type: "Workshop",
    description: "This intensive, highly specialized workshop focuses on training next-generation tech leaders and engineering grads from Africa. Co-sponsored by German digital industries, it offers rigorous hand-on laboratory sessions in scalable deep learning networks, system architecture design, and features high-level networking with Venture Capital entities in Berlin Allee.",
    eligibility: [
      "Academic background in Software Engineering, Computer Science or equivalent technical fields.",
      "Basic coding experience in Python, TypeScript, or data science frameworks.",
      "Must be an African national looking to collaborate with European tech clusters.",
      "Submit a Github profile or professional project portfolio link."
    ],
    benefits: [
      { label: "Travel Grant", value: "Round-trip economy flights to Berlin covered", iconName: "Plane" },
      { label: "Schengen Visa", value: "Priority corporate fast-track support letters", iconName: "Shield" },
      { label: "Room & Board", value: "Fully paid hotel lodging during the 2-week workshop", iconName: "Home" },
      { label: "Lab Equipment", value: "Complimentary developer kits & GPU credits", iconName: "BookOpen" }
    ],
    location: "Berlin, Germany",
    deadline: "November 20, 2026",
    rawDeadlineDate: "2026-11-20",
    badge: "Visa Sponsored",
    stipend: "Full Travel Grant + Hotel",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Information Technology"],
    region: "Germany"
  },
  {
    id: "next-einstein-forum-conf",
    title: "Next Einstein Forum Global Science & Academic Innovation Conference",
    type: "Conference",
    description: "The NEF Global Conference is the premier scientific gathering of African innovators and international partners. Promotes cross-border collaboration in computational physics, vaccine development, and sustainable systems. Offers specialized fully funded delegates passes, travel grants, and Schengen/International visa fast-track codes for selected young academic researchers from Africa.",
    eligibility: [
      "Under 35 years of age.",
      "Academic credentials in life sciences, engineering, or scientific studies.",
      "Submit an abstract of a current research paper, project model, or field study.",
      "Letter of support from your faculty dean or advisor."
    ],
    benefits: [
      { label: "Delegate Grant", value: "Complete waiver of conference entry and materials", iconName: "DollarSign" },
      { label: "Flight support", value: "International round-trip ticket provided", iconName: "Plane" },
      { label: "Sponsorship", value: "Diplomatic note for immediate visa dispatch", iconName: "Shield" },
      { label: "Networking", value: "Direct pairing sessions with world-class faculty chairs", iconName: "Award" }
    ],
    location: "Kigali, Rwanda (International Delegate Chapters)",
    deadline: "December 05, 2026",
    rawDeadlineDate: "2026-12-05",
    badge: "Travel Grant Available",
    stipend: "Full Travel & Delegate Grant",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArqn7dJE-NlfreHP4MMBOtohfmANqHfxpgS34pmI_LEHhkdof_2gTDREQQMVq-80AxpUcEVMqU8gVK2qg3ecGcuROhMJSfyFRk77qJHvZX6Vs5it_5aSK1oY5H6JWEmFXSCInXFpmw1i3h-b-Pb7bIQYHAKZSCWjmMXXpawrPqo4wDL3S5N1LFUT-xjqH8ko2zGn5KlK1m_ujU736J0SPG6GqhxAOUslZJGU4dwc7ilRSmz8YcEFhj5thBEg_m9YubQ62eYhee59HD",
    fieldOfStudy: ["Medicine", "Engineering", "Social Sciences"],
    region: "Remote"
  },
  {
    id: "london-med-seminar",
    title: "NCLEX-RN Professional Licensure Preparatory & Clinical Practice Seminar",
    type: "Seminar",
    description: "An intensive clinical preparation seminar designed for qualified African healthcare professionals wishing to transition into national global healthcare systems. Provides full classroom NCLEX tutorials, clinical OSCE scenario reviews, and direct connection with UK National Health channels. Features fully sponsored training seats partnered with authorized visa-sponsoring employers.",
    eligibility: [
      "National Nursing Diploma or Bachelor of Science in Nursing (BScN) from a recognized African institution.",
      "Registered Nurse credentials in country of residence.",
      "IELTS / OET language proficiency certification at target scores.",
      "Intention to relocate securely on certified UK Health and Care visa tracks."
    ],
    benefits: [
      { label: "Education Scholarship", value: "100% preparatory class fee coverage", iconName: "BookOpen" },
      { label: "OSCE Fast-track", value: "Interactive mock labs and OSCE fee sponsorship", iconName: "Award" },
      { label: "Direct Sponsoring", value: "One-on-one matches with government registered health chains", iconName: "Shield" },
      { label: "Flight Stipend", value: "Arrival airfare reimbursement on offer finalization", iconName: "Plane" }
    ],
    location: "London, United Kingdom (and Online Chapters)",
    deadline: "September 30, 2026",
    rawDeadlineDate: "2026-09-30",
    badge: "Visa Sponsored",
    stipend: "Full Sponsoring + Study Budget",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDojIQ06HYWK_A_fCCREauj_fx1u7-vrMS0FuStxYUiBtrR5RLflWpxNKdgaakBzwJIgZ5UCYgH-fuB3bCosiXFtrroOT27lnsNHkCqqm6Wg7k820NxzGVpLtshDvgwd9_HypB3Z8y5-XDzOSm-FSIUD-FPe1-IwzeXrdyuCiJ5xMIvCFwZZjoWHVHo3cFL3Mmd0LN29Hzxs19NgqWGDocNqPwnVn5Cr9Gk9mEy1V2Rc8u4w-LEteVeP6MBBZ63MaqSNpvV5UnXiGea",
    fieldOfStudy: ["Medicine"],
    region: "United Kingdom"
  },
  {
    id: "usmle-residency-prep-seminar",
    title: "US Medical Residency & USMLE Strategy Seminar with J-1 Visa Support",
    type: "Seminar",
    description: "A comprehensive strategizing and academic seminar aligning medical graduates with the US clinical match pipeline. Features interactive residency essay planning panels, high-fidelity USMLE Step exam simulation clinics, and key workshops on earning clinical clerkships. Program grants scholarship packages covering program costs and J-1 research sponsor introductions.",
    eligibility: [
      "Medical degree (MD/MBBS or equivalent) from an accredited African Medical Faculty.",
      "Completed Step 1 or actively registered for USMLE examinations.",
      "Academic goal is pursuing Clinical Residency or research fellowships inside US Hospitals.",
      "Two letters of support from medical research faculty members."
    ],
    benefits: [
      { label: "Full Seminar Waiver", value: "Tutoring, syllabus guides, and matching system tools", iconName: "DollarSign" },
      { label: "Sponsor pairing", value: "Direct interviews with J-1 research visa hosts", iconName: "Shield" },
      { label: "Clinical Electives", value: "Guaranteed observership slot matches at US hospitals", iconName: "BookOpen" }
    ],
    location: "Chicago, United States",
    deadline: "October 15, 2026",
    rawDeadlineDate: "2026-10-15",
    badge: "Verified",
    stipend: "Free Program Fees + Visa Mentor",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyfQQRZ6UbzGeJwZZkV5xKRKAOCnPmkpSyI9fc1choOTD__MRSr3Nf4XXivcd3mXRGlKOzZde2mU8HCkbc7kl1wsjhC4sWbB4tXxjb_DY5SSewnG1WXxo52TgHOiUuWROQei7PUKgZael3wtZRHRkRjb1q6YKaPl_p4bE_UmHGBH7NKBpRHtPF5LRRLihUzcNYdfGDrKsRTkLufhifKxKaP2GkTLkqfcpoN2pXnlbtSmZ5dHzYf6rPjVSIUOYHl2XwUfMLOrBCpmNJ",
    fieldOfStudy: ["Medicine"],
    region: "USA"
  },
  {
    id: "nhs-international-nurse-cohort",
    title: "International Registered Nurse Cohort - UK Health Sponsorship",
    type: "Job",
    description: "Curated international hiring pathway for registered nurses outside the United Kingdom. This is not a domestic-only job listing: the pathway is selected because it requires overseas registration conversion, English language evidence, and Certificate of Sponsorship support under the UK Health and Care Worker route.",
    eligibility: [
      "Qualified registered nurse outside the United Kingdom with home-country registration.",
      "Eligible to begin or complete NMC registration, CBT, OSCE, IELTS, or OET requirements.",
      "Prepared to relocate under a UK Health and Care Worker visa with employer Certificate of Sponsorship.",
      "Clinical ward, adult nursing, theatre, or acute-care experience preferred."
    ],
    benefits: [
      { label: "Visa Sponsorship", value: "Employer Certificate of Sponsorship route identified", iconName: "Shield" },
      { label: "International Pathway", value: "Designed for overseas nurse conversion", iconName: "Briefcase" },
      { label: "Relocation Support", value: "Arrival, onboarding, and compliance checklist support", iconName: "Plane" },
      { label: "Career Track", value: "Structured NHS Band 5 transition pathway", iconName: "Award" }
    ],
    location: "London, United Kingdom",
    deadline: "Rolling intake - reviewed monthly",
    rawDeadlineDate: "2026-12-31",
    badge: "International Hiring",
    stipend: "GBP 28,000+ / year",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDojIQ06HYWK_A_fCCREauj_fx1u7-vrMS0FuStxYUiBtrR5RLflWpxNKdgaakBzwJIgZ5UCYgH-fuB3bCosiXFtrroOT27lnsNHkCqqm6Wg7k820NxzGVpLtshDvgwd9_HypB3Z8y5-XDzOSm-FSIUD-FPe1-IwzeXrdyuCiJ5xMIvCFwZZjoWHVHo3cFL3Mmd0LN29Hzxs19NgqWGDocNqPwnVn5Cr9Gk9mEy1V2Rc8u4w-LEteVeP6MBBZ63MaqSNpvV5UnXiGea",
    fieldOfStudy: ["Medicine"],
    region: "United Kingdom",
    internationalApplicantPolicy: "Visa Sponsorship",
    curationEvidence: [
      "Selected because the role is suitable for overseas nurses, not only local citizens.",
      "Requires or supports work authorization through a recognized health worker sponsorship route.",
      "Eligibility includes international credential conversion and English language evidence."
    ]
  },
  {
    id: "canada-global-talent-sre",
    title: "Cloud Site Reliability Engineer - Global Talent Sponsorship Track",
    type: "Job",
    description: "Curated technical role for experienced engineers outside Canada where the employer can assess foreign applicants through a work-permit pathway. This listing is treated as internationally eligible because the hiring workflow includes work authorization review, relocation readiness, and Global Talent Stream style documentation.",
    eligibility: [
      "Cloud, SRE, DevOps, or platform engineering portfolio with production systems experience.",
      "Able to provide passport, education, employment references, and relocation documents.",
      "Open to employer-led work permit processing or compliant remote-to-relocation onboarding.",
      "Strong Kubernetes, Terraform, observability, and incident response experience."
    ],
    benefits: [
      { label: "Work Permit Track", value: "Employer work authorization review required", iconName: "Shield" },
      { label: "International Applicants", value: "Foreign candidates can be screened for relocation fit", iconName: "Briefcase" },
      { label: "Relocation Plan", value: "Document checklist and interview readiness milestones", iconName: "Plane" },
      { label: "High Skill Route", value: "Aligned to cloud and critical technology shortages", iconName: "Award" }
    ],
    location: "Toronto, Canada",
    deadline: "August 30, 2026",
    rawDeadlineDate: "2026-08-30",
    badge: "International Hiring",
    stipend: "$85,000 - $110,000 CAD / year",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Information Technology"],
    region: "Canada",
    internationalApplicantPolicy: "Work Permit Required",
    curationEvidence: [
      "Selected because foreign applicants require work-permit screening before offer finalization.",
      "Role maps to high-skill technology shortage pathways rather than domestic-only hiring.",
      "Application checklist includes relocation documentation and employer authorization review."
    ]
  },
  {
    id: "unv-digital-health-volunteer",
    title: "UN-Style Digital Health Data Volunteer Placement",
    type: "Volunteer",
    description: "International volunteer placement for data analysts, medical students, and civic technologists supporting digital health reporting, public health dashboards, and cross-border field data quality. The placement is curated for applicants who want global experience without treating it as a local employment posting.",
    eligibility: [
      "Background in medicine, public health, data analysis, software, or community research.",
      "Able to commit 8-12 hours weekly for remote coordination or short field missions.",
      "Comfortable supporting multilingual teams and humanitarian reporting workflows.",
      "Portfolio, academic reference, or community service evidence recommended."
    ],
    benefits: [
      { label: "Global Experience", value: "International public health project exposure", iconName: "Award" },
      { label: "Volunteer Credential", value: "Completion letter and project reference", iconName: "Award" },
      { label: "Remote Friendly", value: "Remote-first placement with optional field coordination", iconName: "Home" },
      { label: "Mentorship", value: "Guided contribution plan and weekly check-ins", iconName: "Heart" }
    ],
    location: "Remote / Africa Regional Programs",
    deadline: "October 01, 2026",
    rawDeadlineDate: "2026-10-01",
    badge: "Volunteer Placement",
    stipend: "Volunteer - reference and field support",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArqn7dJE-NlfreHP4MMBOtohfmANqHfxpgS34pmI_LEHhkdof_2gTDREQQMVq-80AxpUcEVMqU8gVK2qg3ecGcuROhMJSfyFRk77qJHvZX6Vs5it_5aSK1oY5H6JWEmFXSCInXFpmw1i3h-b-Pb7bIQYHAKZSCWjmMXXpawrPqo4wDL3S5N1LFUT-xjqH8ko2zGn5KlK1m_ujU736J0SPG6GqhxAOUslZJGU4dwc7ilRSmz8YcEFhj5thBEg_m9YubQ62eYhee59HD",
    fieldOfStudy: ["Medicine", "Social Sciences", "Information Technology"],
    region: "Remote",
    internationalApplicantPolicy: "Remote International",
    volunteerCommitment: "8-12 hours per week for 12 weeks",
    curationEvidence: [
      "Selected as an international volunteer placement rather than a domestic job.",
      "Open to remote applicants across countries with portfolio or service evidence.",
      "Designed for public-good experience, mentoring, and cross-border project exposure."
    ]
  },
  {
    id: "chevening-global-masters-2027",
    title: "Chevening Global Master's Scholarship",
    type: "School",
    description: "UK government-funded master's scholarship for emerging leaders from eligible countries. Curated for AfriPath because it is built for international applicants, includes university tuition, arrival and return travel, visa support costs through the award package, and a monthly living allowance.",
    eligibility: [
      "Citizen of a Chevening-eligible country and able to return home after the award period.",
      "Completed undergraduate degree suitable for UK master's admission.",
      "At least two years of work, leadership, community, or professional experience.",
      "Apply to eligible UK master's courses and submit a competitive leadership narrative."
    ],
    benefits: [
      { label: "Full Tuition", value: "University tuition covered within award rules", iconName: "DollarSign" },
      { label: "Monthly Stipend", value: "Living allowance for the study period", iconName: "Home" },
      { label: "Travel", value: "Economy travel to and from the UK", iconName: "Plane" },
      { label: "Visa Support", value: "Arrival, visa, and grant support items included", iconName: "Shield" }
    ],
    location: "United Kingdom",
    deadline: "Next cycle expected 2026",
    rawDeadlineDate: "2026-11-05",
    badge: "Fully Funded",
    stipend: "Full tuition + monthly stipend",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqjtuZm-5kV0OlLPEqD6aw4SuZy-_CS4-97MbcOpkRlsTfViPHIVtW3CCQNWgDIRF7jBzOvvtYwk_oOOFiT1l_MAMWD9QXV9ayuEeji7Uchsp4WtvJPMk-iiSm3ORYvp5QZIirEkE5nodJxmzMt-Rw6UEf1ejwVopM_SG_xMLEZxczJx5o32vRCWAyx4INrR0RGjToNARjvciaJN5R9ImLAoZFGrNIvnOAjJFdyupRwuo_-I2aAbpWnF0xZt-RymzdUy6JVZlBUbuW",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "United Kingdom",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://www.chevening.org/scholarships/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official UK government scholarship for international applicants from eligible countries.",
      "Award package includes tuition, travel, and living allowance rather than a partial discount.",
      "Strong fit for African professionals with leadership and return-impact narratives."
    ]
  },
  {
    id: "erasmus-mundus-joint-masters-2027",
    title: "Erasmus Mundus Joint Masters Scholarships",
    type: "School",
    description: "European Union-funded joint master's scholarships delivered by international university consortia. Selected because students study across at least two countries, apply as international candidates, and can receive a scholarship covering participation costs, travel, visa-related costs, and living expenses.",
    eligibility: [
      "Hold a bachelor's degree or recognized equivalent by the start of the programme.",
      "Apply directly to an Erasmus Mundus Joint Masters consortium.",
      "Meet each consortium's academic, language, and document requirements.",
      "Prepare for mobility across multiple European study locations."
    ],
    benefits: [
      { label: "Participation Costs", value: "Programme participation costs covered", iconName: "DollarSign" },
      { label: "Travel", value: "Travel and installation support possible", iconName: "Plane" },
      { label: "Living Allowance", value: "Monthly subsistence support through scholarship", iconName: "Home" },
      { label: "Multi-Country Mobility", value: "Study in at least two countries", iconName: "Award" }
    ],
    location: "European Union / Partner Universities",
    deadline: "Varies by consortium",
    rawDeadlineDate: "2027-01-15",
    badge: "Fully Funded",
    stipend: "EU scholarship package",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "Germany",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://education.ec.europa.eu/education-levels/higher-education/erasmus-mundus",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official EU programme for master's-level international mobility.",
      "Applicants apply to international consortia, not domestic-only university seats.",
      "Scholarship can include living, travel, visa, and installation support."
    ]
  },
  {
    id: "daad-epos-development-postgrad",
    title: "DAAD Development-Related Postgraduate Courses (EPOS)",
    type: "School",
    description: "German Academic Exchange Service scholarship for development-related postgraduate study. Curated because it targets professionals from developing and newly industrialized countries and supports international study in Germany with monthly payments, insurance, and travel allowance.",
    eligibility: [
      "Graduate from a developing or newly industrialized country.",
      "At least two years of relevant professional experience after first degree.",
      "Academic background aligned to a selected development-related postgraduate course.",
      "Demonstrate development impact and return contribution in the application."
    ],
    benefits: [
      { label: "Monthly Funding", value: "Monthly scholarship payment by degree level", iconName: "Home" },
      { label: "Insurance", value: "Health, accident, and liability insurance support", iconName: "Heart" },
      { label: "Travel Allowance", value: "Travel allowance where not covered elsewhere", iconName: "Plane" },
      { label: "German Study Route", value: "Structured international postgraduate route", iconName: "BookOpen" }
    ],
    location: "Germany",
    deadline: "Varies by selected course",
    rawDeadlineDate: "2026-10-31",
    badge: "Fully Funded",
    stipend: "Monthly DAAD scholarship",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "Germany",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://www.daad.de/en/information-services-for-higher-education-institutions/further-information-on-daad-programmes/epos/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official DAAD funding line for applicants from developing and newly industrialized countries.",
      "Requires professional experience, making it especially relevant for African career changemakers.",
      "Funding support includes monthly payments, insurance, and possible travel allowance."
    ]
  },
  {
    id: "gates-cambridge-global-postgrad",
    title: "Gates Cambridge Scholarship",
    type: "School",
    description: "Full-cost postgraduate scholarship at the University of Cambridge for outstanding applicants from outside the United Kingdom. Selected because the programme is explicitly international, highly funded, and open across disciplines at master's and PhD level.",
    eligibility: [
      "Citizen of any country outside the United Kingdom.",
      "Apply for an eligible postgraduate degree at the University of Cambridge.",
      "Show outstanding intellectual ability and reasons for course choice.",
      "Demonstrate leadership potential and commitment to improving lives."
    ],
    benefits: [
      { label: "University Fees", value: "Composition fee covered at the appropriate rate", iconName: "DollarSign" },
      { label: "Maintenance", value: "Maintenance allowance for a single student", iconName: "Home" },
      { label: "Travel", value: "Economy airfare at beginning and end of course", iconName: "Plane" },
      { label: "Additional Funding", value: "Discretionary family, fieldwork, and hardship support", iconName: "Award" }
    ],
    location: "Cambridge, United Kingdom",
    deadline: "Course deadline varies",
    rawDeadlineDate: "2027-01-05",
    badge: "Fully Funded",
    stipend: "Full-cost award",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqjtuZm-5kV0OlLPEqD6aw4SuZy-_CS4-97MbcOpkRlsTfViPHIVtW3CCQNWgDIRF7jBzOvvtYwk_oOOFiT1l_MAMWD9QXV9ayuEeji7Uchsp4WtvJPMk-iiSm3ORYvp5QZIirEkE5nodJxmzMt-Rw6UEf1ejwVopM_SG_xMLEZxczJx5o32vRCWAyx4INrR0RGjToNARjvciaJN5R9ImLAoZFGrNIvnOAjJFdyupRwuo_-I2aAbpWnF0xZt-RymzdUy6JVZlBUbuW",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "United Kingdom",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://www.gatescambridge.org/programme/the-scholarship/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Cambridge postgraduate scholarship for non-UK citizens.",
      "Full-cost package is appropriate for users seeking fully funded study.",
      "Selection criteria align with AfriPath leadership and global-impact positioning."
    ]
  },
  {
    id: "rhodes-global-scholarship",
    title: "Rhodes Scholarship Global and Constituency Awards",
    type: "School",
    description: "Fully funded postgraduate scholarship to the University of Oxford. Curated because Rhodes constituencies include several African countries and the global route supports applicants who do not fit an existing constituency.",
    eligibility: [
      "Meet citizenship or residency rules for an eligible Rhodes constituency or global scholarship route.",
      "Complete undergraduate degree before Oxford entry.",
      "Show academic excellence, leadership, service, and character.",
      "Apply to eligible Oxford postgraduate courses."
    ],
    benefits: [
      { label: "Course Fees", value: "Oxford course fees covered", iconName: "DollarSign" },
      { label: "Stipend", value: "Annual stipend for living costs", iconName: "Home" },
      { label: "Travel", value: "Travel support to and from Oxford", iconName: "Plane" },
      { label: "Leadership Network", value: "Rhodes global scholar community", iconName: "Award" }
    ],
    location: "Oxford, United Kingdom",
    deadline: "Constituency deadlines vary",
    rawDeadlineDate: "2026-10-01",
    badge: "Fully Funded",
    stipend: "Full fees + stipend",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqjtuZm-5kV0OlLPEqD6aw4SuZy-_CS4-97MbcOpkRlsTfViPHIVtW3CCQNWgDIRF7jBzOvvtYwk_oOOFiT1l_MAMWD9QXV9ayuEeji7Uchsp4WtvJPMk-iiSm3ORYvp5QZIirEkE5nodJxmzMt-Rw6UEf1ejwVopM_SG_xMLEZxczJx5o32vRCWAyx4INrR0RGjToNARjvciaJN5R9ImLAoZFGrNIvnOAjJFdyupRwuo_-I2aAbpWnF0xZt-RymzdUy6JVZlBUbuW",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "United Kingdom",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Oxford scholarship with country and global application routes.",
      "Not a domestic-only award; eligible applicants apply through constituency rules.",
      "Full funding and leadership network make it a high-value pathway."
    ]
  },
  {
    id: "mastercard-foundation-scholars-africa",
    title: "Mastercard Foundation Scholars Program",
    type: "School",
    description: "Large-scale scholarship and leadership initiative supporting talented young people, primarily from Africa, through partner universities and institutions. Curated because it is Africa-centered, opportunity-rich, and built around education, transition support, and impact leadership.",
    eligibility: [
      "African student or young leader meeting a partner institution's admission criteria.",
      "Strong academic record and demonstrated financial need where required.",
      "Leadership, community service, and return-impact commitment.",
      "Apply through a current Mastercard Foundation partner institution."
    ],
    benefits: [
      { label: "Education Funding", value: "Partner-based tuition and study support", iconName: "DollarSign" },
      { label: "Leadership Support", value: "Leadership, mentorship, and transition programming", iconName: "Award" },
      { label: "Community", value: "Pan-African scholar and alumni network", iconName: "Heart" },
      { label: "Career Path", value: "Support for work transition and social impact", iconName: "Briefcase" }
    ],
    location: "Africa / Global Partner Universities",
    deadline: "Varies by partner institution",
    rawDeadlineDate: "2026-12-15",
    badge: "Fully Funded",
    stipend: "Partner-dependent full scholarship",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArqn7dJE-NlfreHP4MMBOtohfmANqHfxpgS34pmI_LEHhkdof_2gTDREQQMVq-80AxpUcEVMqU8gVK2qg3ecGcuROhMJSfyFRk77qJHvZX6Vs5it_5aSK1oY5H6JWEmFXSCInXFpmw1i3h-b-Pb7bIQYHAKZSCWjmMXXpawrPqo4wDL3S5N1LFUT-xjqH8ko2zGn5KlK1m_ujU736J0SPG6GqhxAOUslZJGU4dwc7ilRSmz8YcEFhj5thBEg_m9YubQ62eYhee59HD",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "Remote",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Mastercard Foundation programme focused on African talent and partner institutions.",
      "Application route is through partner universities, so deadlines and benefits vary by host.",
      "Strong fit for users seeking funded education plus leadership and career transition support."
    ]
  },
  {
    id: "germany-triple-win-nursing",
    title: "Germany Triple Win International Nursing Recruitment",
    type: "Job",
    description: "International recruitment route for qualified nurses seeking employment in Germany through cooperation between Germany's Federal Employment Agency and international partners. Curated because it is explicitly built for foreign nurse recruitment and professional recognition rather than ordinary domestic hiring.",
    eligibility: [
      "Nursing qualification and clinical experience from a participating country or recognized recruitment route.",
      "Prepared for German language training and professional recognition steps.",
      "Able to provide education, registration, passport, and employment documents.",
      "Committed to relocation and employer matching under the German nursing pathway."
    ],
    benefits: [
      { label: "International Recruitment", value: "Structured foreign-nurse hiring route", iconName: "Briefcase" },
      { label: "Recognition Pathway", value: "Support toward German professional recognition", iconName: "Shield" },
      { label: "Language Track", value: "German language and integration preparation", iconName: "BookOpen" },
      { label: "Relocation", value: "Employer placement and relocation steps", iconName: "Plane" }
    ],
    location: "Germany",
    deadline: "Rolling recruitment",
    rawDeadlineDate: "2026-12-31",
    badge: "International Hiring",
    stipend: "German nursing salary by employer",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDojIQ06HYWK_A_fCCREauj_fx1u7-vrMS0FuStxYUiBtrR5RLflWpxNKdgaakBzwJIgZ5UCYgH-fuB3bCosiXFtrroOT27lnsNHkCqqm6Wg7k820NxzGVpLtshDvgwd9_HypB3Z8y5-XDzOSm-FSIUD-FPe1-IwzeXrdyuCiJ5xMIvCFwZZjoWHVHo3cFL3Mmd0LN29Hzxs19NgqWGDocNqPwnVn5Cr9Gk9mEy1V2Rc8u4w-LEteVeP6MBBZ63MaqSNpvV5UnXiGea",
    fieldOfStudy: ["Medicine"],
    region: "Germany",
    internationalApplicantPolicy: "Visa Sponsorship",
    sourceUrl: "https://www.arbeitsagentur.de/vor-ort/zav/personal-aus-dem-ausland/gesundheit-pflege/triple-win/das-programm",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Selected because the route exists to recruit nurses from outside Germany.",
      "Requires recognition, language, and relocation preparation rather than domestic-only credentials.",
      "Maps directly to a real international hiring shortage pathway."
    ]
  },
  {
    id: "canada-global-talent-tech-track",
    title: "Canada Global Talent Stream Tech Hiring Pathway",
    type: "Job",
    description: "Curated pathway for high-skill technology roles where Canadian employers can hire foreign workers through the Global Talent Stream. This is included as a job pathway because it requires employer-led work authorization and is explicitly designed for specialized global talent.",
    eligibility: [
      "High-skill software, data, AI, cybersecurity, cloud, or engineering profile.",
      "Canadian employer willing to process Global Talent Stream or equivalent work permit documents.",
      "Strong proof of experience, education, portfolio, and references.",
      "Prepared to satisfy work permit, biometrics, and relocation documentation."
    ],
    benefits: [
      { label: "Work Permit Track", value: "Employer-led foreign worker pathway", iconName: "Shield" },
      { label: "Tech Shortage Fit", value: "Targets specialized high-demand roles", iconName: "Briefcase" },
      { label: "Processing Priority", value: "Designed for faster skilled-worker processing", iconName: "Calendar" },
      { label: "Relocation Ready", value: "Structured documents and employer compliance plan", iconName: "Plane" }
    ],
    location: "Canada",
    deadline: "Employer intake varies",
    rawDeadlineDate: "2026-12-31",
    badge: "International Hiring",
    stipend: "Employer salary by role",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Information Technology"],
    region: "Canada",
    internationalApplicantPolicy: "Work Permit Required",
    sourceUrl: "https://www.canada.ca/en/employment-social-development/services/foreign-workers/global-talent.html",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Canadian route for employers hiring specialized foreign workers.",
      "Not a regular domestic posting; foreign-worker compliance is central to the pathway.",
      "Best used with curated employer roles that explicitly support work permit processing."
    ]
  },
  {
    id: "vso-international-skilled-volunteer",
    title: "VSO International Skilled Volunteer Placements",
    type: "Volunteer",
    description: "International volunteer placements for experienced professionals in education, health, livelihoods, and resilience programmes. Curated because applicants contribute skills across borders and placements can include practical support rather than being a local-only volunteer notice.",
    eligibility: [
      "Professional, academic, or community expertise relevant to a current placement.",
      "Ability to commit to a placement duration set by the role.",
      "Strong cross-cultural communication and safeguarding readiness.",
      "Meet placement-specific health, travel, reference, and background checks."
    ],
    benefits: [
      { label: "Global Placement", value: "International development volunteer experience", iconName: "Award" },
      { label: "Support Package", value: "Placement support varies by assignment", iconName: "Heart" },
      { label: "Field Learning", value: "Cross-border professional development", iconName: "BookOpen" },
      { label: "Impact Work", value: "Education, health, and livelihoods programmes", iconName: "Briefcase" }
    ],
    location: "Africa / Asia / Global Placements",
    deadline: "Rolling placements",
    rawDeadlineDate: "2026-12-31",
    badge: "Volunteer Placement",
    stipend: "Volunteer support package varies",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArqn7dJE-NlfreHP4MMBOtohfmANqHfxpgS34pmI_LEHhkdof_2gTDREQQMVq-80AxpUcEVMqU8gVK2qg3ecGcuROhMJSfyFRk77qJHvZX6Vs5it_5aSK1oY5H6JWEmFXSCInXFpmw1i3h-b-Pb7bIQYHAKZSCWjmMXXpawrPqo4wDL3S5N1LFUT-xjqH8ko2zGn5KlK1m_ujU736J0SPG6GqhxAOUslZJGU4dwc7ilRSmz8YcEFhj5thBEg_m9YubQ62eYhee59HD",
    fieldOfStudy: ["Medicine", "Social Sciences", "Information Technology", "Engineering"],
    region: "Remote",
    internationalApplicantPolicy: "International Applicants Eligible",
    volunteerCommitment: "Placement duration varies by role",
    sourceUrl: "https://www.vsointernational.org/volunteering",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "International volunteer organization with skills-based placement model.",
      "Good fit for professionals seeking credible service experience and references.",
      "Requires placement-specific checks, so it is more curated than informal volunteering."
    ]
  },
  {
    id: "un-volunteers-online-global",
    title: "UN Volunteers Online Volunteering",
    type: "Volunteer",
    description: "Remote international volunteering route through the United Nations Volunteers platform. Curated because users can contribute across countries without relocation while building credible international service evidence in research, data, translation, technology, communications, and programme support.",
    eligibility: [
      "Create a UNV profile and apply to online assignments matching your skills.",
      "Relevant writing, research, translation, design, data, technology, or community expertise.",
      "Able to meet remote deadlines and collaborate with international host entities.",
      "Portfolio, prior service, or professional proof strengthens selection."
    ],
    benefits: [
      { label: "Remote Global Service", value: "Online UN-linked assignments", iconName: "Home" },
      { label: "Credential", value: "Assignment record and host reference potential", iconName: "Award" },
      { label: "Flexible Commitment", value: "Project-based remote contribution", iconName: "Calendar" },
      { label: "Cross-Border Impact", value: "Support UN and development partners", iconName: "Heart" }
    ],
    location: "Remote / Global",
    deadline: "Rolling assignments",
    rawDeadlineDate: "2026-12-31",
    badge: "Volunteer Placement",
    stipend: "Volunteer - remote experience",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArqn7dJE-NlfreHP4MMBOtohfmANqHfxpgS34pmI_LEHhkdof_2gTDREQQMVq-80AxpUcEVMqU8gVK2qg3ecGcuROhMJSfyFRk77qJHvZX6Vs5it_5aSK1oY5H6JWEmFXSCInXFpmw1i3h-b-Pb7bIQYHAKZSCWjmMXXpawrPqo4wDL3S5N1LFUT-xjqH8ko2zGn5KlK1m_ujU736J0SPG6GqhxAOUslZJGU4dwc7ilRSmz8YcEFhj5thBEg_m9YubQ62eYhee59HD",
    fieldOfStudy: ["Medicine", "Social Sciences", "Information Technology", "Engineering"],
    region: "Remote",
    internationalApplicantPolicy: "Remote International",
    volunteerCommitment: "Remote assignment duration varies",
    sourceUrl: "https://www.unv.org/become-online-volunteer",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official UNV online route for international remote volunteers.",
      "Open assignment model makes it useful for users who cannot relocate immediately.",
      "Strong source of credible service evidence for scholarships, fellowships, and development careers."
    ]
  },
  {
    id: "european-solidarity-corps-volunteering",
    title: "European Solidarity Corps Volunteering Abroad",
    type: "Volunteer",
    description: "European volunteering route for young people seeking funded solidarity projects abroad. Curated because it can include international volunteering, travel support, accommodation, food, insurance, and learning support through approved projects.",
    eligibility: [
      "Usually aged 18 to 30 for volunteering activities.",
      "Register on the European Solidarity Corps portal and apply to eligible projects.",
      "Meet project, nationality, residence, language, and travel-document requirements.",
      "Commit to a full-time volunteer project duration selected by the host."
    ],
    benefits: [
      { label: "Travel Support", value: "Travel support may be provided by project rules", iconName: "Plane" },
      { label: "Accommodation", value: "Housing and food support through hosted projects", iconName: "Home" },
      { label: "Insurance", value: "Insurance and learning support available", iconName: "Shield" },
      { label: "Youth Mobility", value: "Structured volunteering abroad", iconName: "Award" }
    ],
    location: "Europe / Partner Countries",
    deadline: "Project deadlines vary",
    rawDeadlineDate: "2026-12-31",
    badge: "Volunteer Placement",
    stipend: "Project support package",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Social Sciences", "Engineering", "Medicine", "Information Technology"],
    region: "Germany",
    internationalApplicantPolicy: "International Applicants Eligible",
    volunteerCommitment: "Full-time project duration varies",
    sourceUrl: "https://europa.eu/youreurope/citizens/education/volunteering/where-to-start/index_en.htm",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official EU youth volunteering information source.",
      "Project support can include travel, accommodation, food, insurance, and learning support.",
      "Best for eligible youth seeking structured international service rather than informal volunteering."
    ]
  },
  {
    id: "commonwealth-shared-scholarships-2027",
    title: "Commonwealth Shared Scholarships",
    type: "School",
    description: "UK master's scholarship route for candidates from eligible developing Commonwealth countries who could not otherwise afford UK study. Curated because it is explicitly international, development-focused, and commonly covers tuition, travel, and living support through host universities and the Commonwealth Scholarship Commission.",
    eligibility: [
      "Citizen of, or refugee status from, an eligible developing Commonwealth country.",
      "Normally resident in an eligible Commonwealth country.",
      "Hold an undergraduate degree at the level required by the host university.",
      "Commit to return home and contribute to development impact after study."
    ],
    benefits: [
      { label: "Tuition", value: "Approved master's tuition support", iconName: "DollarSign" },
      { label: "Travel", value: "Return travel support to the UK", iconName: "Plane" },
      { label: "Stipend", value: "Living allowance during the award", iconName: "Home" },
      { label: "Development Route", value: "Designed for development impact", iconName: "Award" }
    ],
    location: "United Kingdom",
    deadline: "Cycle varies by host university",
    rawDeadlineDate: "2026-12-15",
    badge: "Fully Funded",
    stipend: "Tuition + travel + stipend",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqjtuZm-5kV0OlLPEqD6aw4SuZy-_CS4-97MbcOpkRlsTfViPHIVtW3CCQNWgDIRF7jBzOvvtYwk_oOOFiT1l_MAMWD9QXV9ayuEeji7Uchsp4WtvJPMk-iiSm3ORYvp5QZIirEkE5nodJxmzMt-Rw6UEf1ejwVopM_SG_xMLEZxczJx5o32vRCWAyx4INrR0RGjToNARjvciaJN5R9ImLAoZFGrNIvnOAjJFdyupRwuo_-I2aAbpWnF0xZt-RymzdUy6JVZlBUbuW",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "United Kingdom",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://cscuk.fcdo.gov.uk/scholarships/commonwealth-shared-scholarships/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Commonwealth Scholarship Commission route for developing Commonwealth countries.",
      "Selected because the opportunity is designed for international applicants who need full funding.",
      "Best suited for development-aligned master's applicants with a strong return-impact case."
    ]
  },
  {
    id: "fulbright-foreign-student-program",
    title: "Fulbright Foreign Student Program",
    type: "Fellowship",
    description: "U.S. Department of State exchange programme enabling graduate students, young professionals, and artists from outside the United States to study or conduct research at U.S. institutions. Curated because non-U.S. citizens apply through country-specific Fulbright Commissions or U.S. Embassies.",
    eligibility: [
      "Non-U.S. citizen applying through the Fulbright route for their country of citizenship.",
      "Graduate student, young professional, or artist profile suitable for U.S. study or research.",
      "Meet country-specific academic, language, and leadership requirements.",
      "Prepare for exchange-visitor conditions and return-impact expectations."
    ],
    benefits: [
      { label: "Graduate Study", value: "U.S. study or research placement", iconName: "BookOpen" },
      { label: "Exchange Visa", value: "J-1 exchange framework by country programme", iconName: "Shield" },
      { label: "Global Network", value: "Fulbright alumni and leadership network", iconName: "Award" },
      { label: "Country-Specific Funding", value: "Grant terms vary by country", iconName: "DollarSign" }
    ],
    location: "United States",
    deadline: "Varies by country",
    rawDeadlineDate: "2026-10-31",
    badge: "Fully Funded",
    stipend: "Country-specific Fulbright grant",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyfQQRZ6UbzGeJwZZkV5xKRKAOCnPmkpSyI9fc1choOTD__MRSr3Nf4XXivcd3mXRGlKOzZde2mU8HCkbc7kl1wsjhC4sWbB4tXxjb_DY5SSewnG1WXxo52TgHOiUuWROQei7PUKgZael3wtZRHRkRjb1q6YKaPl_p4bE_UmHGBH7NKBpRHtPF5LRRLihUzcNYdfGDrKsRTkLufhifKxKaP2GkTLkqfcpoN2pXnlbtSmZ5dHzYf6rPjVSIUOYHl2XwUfMLOrBCpmNJ",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "USA",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://fulbrightprogram.org/apply/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Fulbright page confirms non-U.S. citizen student, scholar, educator, and professional routes.",
      "Foreign Student Program is explicitly for applicants from abroad to study or research in the U.S.",
      "Country-specific application rules make it suitable for AfriPath passport-aware matching."
    ]
  },
  {
    id: "swedish-institute-global-professionals",
    title: "Swedish Institute Scholarship for Global Professionals",
    type: "School",
    description: "Swedish government scholarship for master's studies in Sweden for global professionals from selected countries. Curated for AfriPath because it targets international professionals with leadership potential and can cover tuition, living allowance, travel grant, and professional network access.",
    eligibility: [
      "Citizen of an eligible country listed for the current Swedish Institute call.",
      "Apply to and be admitted to an eligible master's programme in Sweden.",
      "Demonstrate leadership experience and professional background.",
      "Be liable to pay tuition fees to Swedish universities."
    ],
    benefits: [
      { label: "Tuition", value: "Full tuition fee coverage", iconName: "DollarSign" },
      { label: "Living Allowance", value: "Monthly payment for living costs", iconName: "Home" },
      { label: "Travel Grant", value: "One-time travel grant for eligible scholars", iconName: "Plane" },
      { label: "Professional Network", value: "SI Network for Global Professionals", iconName: "Award" }
    ],
    location: "Sweden",
    deadline: "Annual February window",
    rawDeadlineDate: "2027-02-28",
    badge: "Fully Funded",
    stipend: "Tuition + monthly allowance",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "Germany",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Swedish Institute scholarship for global professionals from selected countries.",
      "Requires admission to eligible Swedish master's programmes, making it a concrete study pathway.",
      "Good AfriPath fit for professionals with leadership, public-service, or development narratives."
    ]
  },
  {
    id: "vlir-uos-icp-connect-scholarships",
    title: "VLIR-UOS ICP Connect Study Scholarships",
    type: "School",
    description: "Belgian development scholarship for students from eligible countries in Africa, Asia, and Latin America to attend accredited international study programmes in Flanders. Curated because the programme is designed for international applicants and covers tuition, travel, insurance, and living expenses.",
    eligibility: [
      "Nationality and residence in an eligible VLIR-UOS country at application time.",
      "Apply to one of the eligible ICP Connect study programmes.",
      "Meet programme-specific academic and language requirements.",
      "Respect age, prior scholarship, and selection-priority rules for the intake year."
    ],
    benefits: [
      { label: "Tuition", value: "Tuition fee support", iconName: "DollarSign" },
      { label: "Travel", value: "International travel support", iconName: "Plane" },
      { label: "Insurance", value: "Insurance included in scholarship package", iconName: "Shield" },
      { label: "Living Costs", value: "Board and lodging support", iconName: "Home" }
    ],
    location: "Flanders, Belgium",
    deadline: "Programme deadlines vary",
    rawDeadlineDate: "2027-02-28",
    badge: "Fully Funded",
    stipend: "Tuition + travel + insurance + living",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "Germany",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://www.vliruos.be/get-funded/study-scholarships",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official VLIR-UOS scholarship for applicants from eligible African, Asian, and Latin American countries.",
      "Scholarship covers tuition, travel, insurance, and living expenses for full programme duration.",
      "Strong fit for development-oriented applicants seeking English-taught study in Belgium."
    ]
  },
  {
    id: "mext-research-student-scholarship",
    title: "Japanese Government MEXT Research Student Scholarship",
    type: "School",
    description: "Japanese Government scholarship for foreign students selected through embassy, consulate, university, or authority recommendation routes. Curated because it is an official international-student pathway into Japanese higher education and research.",
    eligibility: [
      "International applicant following embassy, university, or authority recommendation rules.",
      "Research or study plan aligned with a Japanese higher education institution.",
      "Meet age, academic, language, health, and arrival requirements for the call.",
      "Prepare application through the relevant Japanese embassy or institution route."
    ],
    benefits: [
      { label: "Tuition", value: "Japanese government scholarship support", iconName: "DollarSign" },
      { label: "Research Route", value: "Higher education and research placement", iconName: "BookOpen" },
      { label: "Travel", value: "Travel support may apply by route", iconName: "Plane" },
      { label: "International Student", value: "Official foreign student support system", iconName: "Shield" }
    ],
    location: "Japan",
    deadline: "Embassy and university deadlines vary",
    rawDeadlineDate: "2027-05-31",
    badge: "Fully Funded",
    stipend: "MEXT scholarship package",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArqn7dJE-NlfreHP4MMBOtohfmANqHfxpgS34pmI_LEHhkdof_2gTDREQQMVq-80AxpUcEVMqU8gVK2qg3ecGcuROhMJSfyFRk77qJHvZX6Vs5it_5aSK1oY5H6JWEmFXSCInXFpmw1i3h-b-Pb7bIQYHAKZSCWjmMXXpawrPqo4wDL3S5N1LFUT-xjqH8ko2zGn5KlK1m_ujU736J0SPG6GqhxAOUslZJGU4dwc7ilRSmz8YcEFhj5thBEg_m9YubQ62eYhee59HD",
    fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
    region: "Remote",
    internationalApplicantPolicy: "International Applicants Eligible",
    sourceUrl: "https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official MEXT page states Japanese government scholarships support foreign students.",
      "Selection routes include Japanese Embassy, Consulate General, university, or authority recommendation.",
      "Best for research-oriented applicants who can prepare a clear academic plan."
    ]
  },
  {
    id: "uk-skilled-worker-health-education-route",
    title: "UK Skilled Worker Health & Education Sponsorship Route",
    type: "Job",
    description: "Curated international employment route for qualified professionals applying to eligible UK health, care, education, and skilled occupations through a Home Office-approved sponsor. Included because the job offer, sponsor licence, Certificate of Sponsorship, salary, and occupation-code requirements are explicit international hiring filters.",
    eligibility: [
      "Confirmed job offer from a Home Office-approved UK sponsor.",
      "Role must be in an eligible Skilled Worker or Health and Care occupation code.",
      "Meet salary, English, qualification, and professional registration rules for the role.",
      "Receive a Certificate of Sponsorship before applying for the visa."
    ],
    benefits: [
      { label: "Sponsor Licence", value: "Employer must be Home Office-approved", iconName: "Shield" },
      { label: "Work Visa Route", value: "Skilled Worker or Health and Care visa", iconName: "Briefcase" },
      { label: "Eligible Roles", value: "Occupation-code screening required", iconName: "Award" },
      { label: "Relocation Evidence", value: "CoS, passport, salary, and English documents", iconName: "Plane" }
    ],
    location: "United Kingdom",
    deadline: "Employer intake varies",
    rawDeadlineDate: "2026-12-31",
    badge: "International Hiring",
    stipend: "Salary by sponsored role",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDojIQ06HYWK_A_fCCREauj_fx1u7-vrMS0FuStxYUiBtrR5RLflWpxNKdgaakBzwJIgZ5UCYgH-fuB3bCosiXFtrroOT27lnsNHkCqqm6Wg7k820NxzGVpLtshDvgwd9_HypB3Z8y5-XDzOSm-FSIUD-FPe1-IwzeXrdyuCiJ5xMIvCFwZZjoWHVHo3cFL3Mmd0LN29Hzxs19NgqWGDocNqPwnVn5Cr9Gk9mEy1V2Rc8u4w-LEteVeP6MBBZ63MaqSNpvV5UnXiGea",
    fieldOfStudy: ["Medicine", "Engineering", "Information Technology", "Social Sciences"],
    region: "United Kingdom",
    internationalApplicantPolicy: "Visa Sponsorship",
    sourceUrl: "https://www.gov.uk/government/publications/sponsor-a-skilled-worker",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official sponsor guidance states Skilled Worker is for recruiting overseas nationals into eligible jobs.",
      "Role is curated as a pathway, not a generic job post, because sponsorship and CoS are mandatory.",
      "Health and Care roles have additional official eligibility and document rules."
    ]
  },
  {
    id: "new-zealand-green-list-health-tech",
    title: "New Zealand Green List Accredited Employer Pathway",
    type: "Job",
    description: "International hiring pathway for qualified professionals in New Zealand Green List roles, including health, engineering, and technology occupations. Curated because candidates generally need a qualifying job or offer from an accredited employer and must meet role-specific qualification, registration, or experience requirements.",
    eligibility: [
      "Target occupation appears on New Zealand's Green List.",
      "Full-time job offer or employment with an accredited employer where required.",
      "Meet qualification, registration, experience, pay, and English requirements for the role.",
      "Prepare evidence for Accredited Employer Work Visa or residence pathway."
    ],
    benefits: [
      { label: "Green List Signal", value: "Official shortage and residence-pathway roles", iconName: "Award" },
      { label: "Accredited Employer", value: "Employer accreditation required for many work routes", iconName: "Shield" },
      { label: "Residence Pathway", value: "Straight to Residence or Work to Residence possible", iconName: "Briefcase" },
      { label: "Health Roles", value: "Many health roles are listed", iconName: "Heart" }
    ],
    location: "New Zealand",
    deadline: "Employer intake varies",
    rawDeadlineDate: "2026-12-31",
    badge: "International Hiring",
    stipend: "Salary by accredited employer",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFCLYPHXN0JZ0_e0l6aUJbduC8UqWi-Vcl2j3nTwDYL_O_uTiMbzI3H9Nx97q35ZCy7kmeJ7Mir46z1HMvO7uBBsEUDR5BeoMgoMFM5kLHEhmJfCIzi8glk-Y2GqyZSMDNbIFFBrujsV1fCYsCk_aq7c68h2f7wWBrxvwF8O39wiJinyv7-LmDxKDghOOKyyOni3K1eCikcyHo4hztU_APBC_1OyRPnOSJF2z_zzyay_1d93SYMvmnjElIOmLrNIdZJ4HY6PgOwO1D",
    fieldOfStudy: ["Medicine", "Engineering", "Information Technology"],
    region: "Remote",
    internationalApplicantPolicy: "Work Permit Required",
    sourceUrl: "https://www.immigration.govt.nz/work/requirements-for-work-visas/green-list-occupations-qualifications-and-skills/green-list-roles-jobs-we-need-people-for-in-new-zealand/",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Immigration New Zealand Green List identifies roles needed in New Zealand.",
      "This is not domestic-only hiring; it depends on job offers, accredited employers, and visa eligibility.",
      "Strong fit for medical, engineering, and technology users seeking shortage-role mobility."
    ]
  },
  {
    id: "netherlands-highly-skilled-migrant-sponsor",
    title: "Netherlands Highly Skilled Migrant Recognised Sponsor Route",
    type: "Job",
    description: "International employment pathway for non-EU/EEA professionals hired by recognised sponsors in the Netherlands. Curated because the route is explicitly tied to a recognised sponsor, residence permit, salary threshold, and employer application to Dutch immigration authorities.",
    eligibility: [
      "Job offer from a Dutch employer recognised as a sponsor by IND.",
      "Meet the applicable highly skilled migrant salary threshold and contract rules.",
      "Employer submits the residence permit application or recognised-sponsor process.",
      "Applicant provides passport, background, employment, and relocation documents."
    ],
    benefits: [
      { label: "Recognised Sponsor", value: "Employer must be recognised by IND", iconName: "Shield" },
      { label: "Residence Permit", value: "Highly skilled migrant residence route", iconName: "Briefcase" },
      { label: "Salary Filter", value: "Salary threshold reduces low-quality listings", iconName: "DollarSign" },
      { label: "EU Career Base", value: "Netherlands skilled migration pathway", iconName: "Award" }
    ],
    location: "Netherlands",
    deadline: "Employer intake varies",
    rawDeadlineDate: "2026-12-31",
    badge: "International Hiring",
    stipend: "Salary by recognised sponsor",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Information Technology", "Medicine", "Social Sciences"],
    region: "Germany",
    internationalApplicantPolicy: "Visa Sponsorship",
    sourceUrl: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official IND route requires a residence permit to work as a highly skilled migrant.",
      "Employer-recognised sponsor requirement helps distinguish real sponsorship pathways from ordinary jobs.",
      "Useful for AfriPath users targeting high-skill European employment."
    ]
  },
  {
    id: "australia-skills-in-demand-core-stream",
    title: "Australia Skills in Demand Employer-Sponsored Pathway",
    type: "Job",
    description: "Employer-sponsored pathway for skilled overseas workers where Australian employers cannot source appropriately skilled local workers. Curated because the visa requires a sponsoring employer, a nominated position, and occupation eligibility under the relevant stream.",
    eligibility: [
      "Employer must sponsor or nominate the applicant for the relevant Skills in Demand stream.",
      "Occupation must meet the stream's eligible occupation requirements.",
      "Applicant must demonstrate skills, qualifications, employment background, health, and character.",
      "Job must satisfy salary and nomination requirements."
    ],
    benefits: [
      { label: "Employer Sponsored", value: "Employer nomination is central to the route", iconName: "Shield" },
      { label: "Skills Shortage", value: "Designed for roles employers cannot fill locally", iconName: "Briefcase" },
      { label: "Up to 4 Years", value: "Temporary stay length depends on stream and nomination", iconName: "Calendar" },
      { label: "Occupation Filter", value: "Role must map to the eligible list or stream", iconName: "Award" }
    ],
    location: "Australia",
    deadline: "Employer intake varies",
    rawDeadlineDate: "2026-12-31",
    badge: "International Hiring",
    stipend: "Salary by sponsoring employer",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
    fieldOfStudy: ["Engineering", "Medicine", "Information Technology"],
    region: "Remote",
    internationalApplicantPolicy: "Work Permit Required",
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skills-in-demand-visa-subclass-482/core-skills-stream",
    lastVerifiedAt: LAST_VERIFIED_DATE,
    curationEvidence: [
      "Official Australian Home Affairs page confirms employer sponsorship and occupation requirements.",
      "Included as an international hiring pathway only when paired with a real employer nomination.",
      "Useful for filtering roles that mention 482/SID sponsorship, not generic Australian job ads."
    ]
  }
];

export const APPROVED_SPONSOR_JOBS: SponsoredJob[] = [
  {
    id: "job-nhs-nurse",
    title: "Registered Nurse - Adult Inpatient Clinical Ward",
    companyName: "Guys & St Thomas' NHS Foundation Trust",
    country: "United Kingdom",
    location: "London, United Kingdom",
    salary: "£28,407 - £34,581 / year (Band 5)",
    industry: "Healthcare & Medicine",
    officialGovernmentRegistryLink: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers",
    jobBoardUrl: "https://www.jobs.nhs.uk/",
    description: "Full-time adult inpatient ward nurse position within London's renowned NHS Foundation Trust. This opportunity is pre-backed by direct Certificate of Sponsorship (COS) quotas, ensuring fast-tracked Health and Care Visa clearance, covered healthcare surcharges, and comprehensive transition support for qualified overseas nurses.",
    requirements: [
      "Bachelor of Science in Nursing (BScN) or equivalent from a recognized institution.",
      "Valid professional Nursing Registration (RN) inside your home country.",
      "Achieved Level 7.0 (or higher) in IELTS Academic or Grade B (or higher) in all parts of the OET exam.",
      "Successfully cleared or in the process of attempting the UK NMC CBT theory examination."
    ],
    visaTypeSupported: "UK Health and Care Worker Visa",
    sponsorshipStatus: "Government Approved",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDojIQ06HYWK_A_fCCREauj_fx1u7-vrMS0FuStxYUiBtrR5RLflWpxNKdgaakBzwJIgZ5UCYgH-fuB3bCosiXFtrroOT27lnsNHkCqqm6Wg7k820NxzGVpLtshDvgwd9_HypB3Z8y5-XDzOSm-FSIUD-FPe1-IwzeXrdyuCiJ5xMIvCFwZZjoWHVHo3cFL3Mmd0LN29Hzxs19NgqWGDocNqPwnVn5Cr9Gk9mEy1V2Rc8u4w-LEteVeP6MBBZ63MaqSNpvV5UnXiGea"
  },
  {
    id: "job-siemens-cloud",
    title: "SRE & Cloud Infrastructure Architect",
    companyName: "Siemens AG Mobility Hub",
    country: "Germany",
    location: "Munich, Germany",
    salary: "€65,000 - €78,000 / year",
    industry: "Information Technology & Engineering",
    officialGovernmentRegistryLink: "https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card",
    jobBoardUrl: "https://jobs.siemens.com",
    description: "Architect and manage next-generation real-time cloud clusters for intelligent transit grids. This position is priority-pre-approved, allowing swift application of the EU Blue Card or Germany's point-based Opportunity Card (Chancenkarte) for high-potential technological innovators.",
    requirements: [
      "Degree in computer science, software systems engineering, or relevant tech experience.",
      "Deep competency in container orchestration (Kubernetes), Helm charts, and Python or Go.",
      "Functional understanding of secure infrastructure provisioning (Terraform / Ansible).",
      "Fluent English proficiency; German language skills are a strong bonus."
    ],
    visaTypeSupported: "Germany EU Blue Card",
    sponsorshipStatus: "Verified License",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2"
  },
  {
    id: "job-canada-biotech",
    title: "Clinical Bio-Computational Research Lead",
    companyName: "BioMedical Research Labs Toronto",
    country: "Canada",
    location: "Toronto, ON, Canada",
    salary: "$82,000 - $95,000 CAD / year",
    industry: "Biotech & Medicine",
    officialGovernmentRegistryLink: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/hire-foreign-worker/temporary/approved-employers.html",
    jobBoardUrl: "https://www.jobbank.gc.ca",
    description: "Coordinate high-dimensional cell sequence trials and predictive disease models. The employer is listed on the Canadian government database with a positive or exempt LMIA, making you eligible for priority 2-week processing via the Global Talent Stream.",
    requirements: [
      "Master of Science or PhD in biological computation, bioinformatics, or data analytics.",
      "Advanced capability deploying scientific python pipelines, R/Bioconductor, and GCP compute engines.",
      "Solid comprehension of healthcare analytics protocols and security guidelines."
    ],
    visaTypeSupported: "Canada Global Talent Stream (LMIA-Exempt)",
    sponsorshipStatus: "Direct Sponsorship",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFCLYPHXN0JZ0_e0l6aUJbduC8UqWi-Vcl2j3nTwDYL_O_uTiMbzI3H9Nx97q35ZCy7kmeJ7Mir46z1HMvO7uBBsEUDR5BeoMgoMFM5kLHEhmJfCIzi8glk-Y2GqyZSMDNbIFFBrujsV1fCYsCk_aq7c68h2f7wWBrxvwF8O39wiJinyv7-LmDxKDghOOKyyOni3K1eCikcyHo4hztU_APBC_1OyRPnOSJF2z_zzyay_1d93SYMvmnjElIOmLrNIdZJ4HY6PgOwO1D"
  },
  {
    id: "job-us-agritech",
    title: "Computer Vision Systems Fellow (Smart Agriculture)",
    companyName: "Aspirant Applied Systems Inc.",
    country: "United States",
    location: "Des Moines, IA, United States",
    salary: "$90,000 - $110,000 / year",
    industry: "Agritech & Software",
    officialGovernmentRegistryLink: "https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub",
    jobBoardUrl: "https://www.uscis.gov",
    description: "Design computer vision software enabling intelligent automated harvest monitoring. This role is Cap-Exempt H-1B registration compliant, enabling immediate visa processing or J-1 research scholar visa sponsorships via certified educational affiliations.",
    requirements: [
      "BSc/MSc or PhD in Computer Science, Precision Agriculture, or Robotics Engineering.",
      "Sound experience with computer vision models (YOLO), PyTorch, OpenCV, and autonomous hardware API.",
      "Prior scholarly contributions, patents, or complex open-source projects in digital imaging."
    ],
    visaTypeSupported: "US H-1B / J-1 Research Scholar Visa",
    sponsorshipStatus: "Verified License",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyfQQRZ6UbzGeJwZZkV5xKRKAOCnPmkpSyI9fc1choOTD__MRSr3Yf6rPjVSIUOYHl2XwUfMLOrBCpmNJ"
  }
];
