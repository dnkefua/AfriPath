import { Opportunity, DirectoryEntry, VisaQuickLink, ActiveTrack, UserProfile, VisaFreeProgram, VisaSponsorshipProgram, ApprovedSponsorCompany, SponsoredJob } from "./types";

export const USER_PROFILES: UserProfile[] = [
  {
    name: "Amara",
    email: "loveline082022@gmail.com",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWaYY3_IX4OlPDThIHTapwGKIfS03q47Cwzu-3GNms1c0a3OtxJpHPY_vGoD0pPs8eQst2WeMlcBP72GsvNSsNRP00MgRe14HRBZKoVeAdZAbD7gNCIxSSj3dOTv0PH2QxwYG8Gyy9J0wt2dradPWW0VHhy7wfCKBJuGWvkiQLP8EOlZLl0rN9oL6XbN9dCNauhKj_yvLymxqibSQABhPS48qzHo08zBl9JdQ85RDawv5SyMXLTKWZ1j41pEDI-oOHB1h2vciTV1oL"
  },
  {
    name: "Kwame",
    email: "kwame.dev@gmail.com",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQoJcB5DId0Vn21Y5NhxdSIXjYWmBULNdYBN1v8iq3KqggVTMB9hPFL6pvrArOyFkc7S2h-u1UrRnh-nydt_OtKJcK8JD8t1qIAQ19QpjMGMPJhovuP5rPm2cXK3xwWh6eBm2WXRC7-k8mFcTTWk9RZMYD45IUSMrjGqBT7E0mBH5yTuxgWHn8wpkhj6IznlgNMIC1YC4wW2SKdk7A5kNQEyT57z-lJS1XaL1RP5RzdvagNKJ9IEtZ9nyh3vo5jreBV8N81J93Rln5"
  }
];

export const INITIAL_ACTIVE_TRACKS: ActiveTrack[] = [
  {
    id: "oxford-scholars-2025",
    opportunityTitle: "Oxford Postgraduate Research Program",
    type: "School",
    currentPhase: 2,
    totalPhases: 4,
    phases: [
      "Profile Verified",
      "Document Review",
      "Committee Verification",
      "Visa Approved"
    ],
    lastUpdated: "Recently updated"
  },
  {
    id: "daad-application",
    opportunityTitle: "DAAD Germany Academic Scholarship",
    type: "School",
    currentPhase: 1,
    totalPhases: 4,
    phases: [
      "Document Review",
      "Sponsor Approval",
      "Consulate Visa Issuance",
      "Arrived Abroad"
    ],
    lastUpdated: "3 hours ago"
  }
];

export const VISA_QUICK_LINKS: VisaQuickLink[] = [
  { id: "ecowas", title: "ECOWAS Region", iconName: "Globe" },
  { id: "nomad", title: "Digital Nomad Hubs", iconName: "Plane" },
  { id: "sadc", title: "SADC Protocol", iconName: "Award" }
];

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

