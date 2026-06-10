import {
  AfriPathDataset,
  ApplicantCredential,
  ApplicationDocument,
  ApplicationRecord,
  ApplicationTask,
  Opportunity,
  OpportunityCurationLead,
} from "../types";

const APPLICATION_RECORDS_KEY = "afripath_application_records";
const APPLICATION_TASKS_KEY = "afripath_application_tasks";
const APPLICATION_DOCUMENTS_KEY = "afripath_application_documents";
const APPLICANT_CREDENTIALS_KEY = "afripath_applicant_credentials";
const CURATION_LEADS_KEY = "afripath_curation_leads";
const CUSTOM_OPPORTUNITIES_KEY = "afripath_custom_opportunities";

const FALLBACK_IMAGE_BY_TYPE: Partial<Record<Opportunity["type"], string>> = {
  School: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqjtuZm-5kV0OlLPEqD6aw4SuZy-_CS4-97MbcOpkRlsTfViPHIVtW3CCQNWgDIRF7jBzOvvtYwk_oOOFiT1l_MAMWD9QXV9ayuEeji7Uchsp4WtvJPMk-iiSm3ORYvp5QZIirEkE5nodJxmzMt-Rw6UEf1ejwVopM_SG_xMLEZxczJx5o32vRCWAyx4INrR0RGjToNARjvciaJN5R9ImLAoZFGrNIvnOAjJFdyupRwuo_-I2aAbpWnF0xZt-RymzdUy6JVZlBUbuW",
  Fellowship: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyfQQRZ6UbzGeJwZZkV5xKRKAOCnPmkpSyI9fc1choOTD__MRSr3Nf4XXivcd3mXRGlKOzZde2mU8HCkbc7kl1wsjhC4sWbB4tXxjb_DY5SSewnG1WXxo52TgHOiUuWROQei7PUKgZael3wtZRHRkRjb1q6YKaPl_p4bE_UmHGBH7NKBpRHtPF5LRRLihUzcNYdfGDrKsRTkLufhifKxKaP2GkTLkqfcpoN2pXnlbtSmZ5dHzYf6rPjVSIUOYHl2XwUfMLOrBCpmNJ",
  Job: "https://lh3.googleusercontent.com/aida-public/AB6AXuDojIQ06HYWK_A_fCCREauj_fx1u7-vrMS0FuStxYUiBtrR5RLflWpxNKdgaakBzwJIgZ5UCYgH-fuB3bCosiXFtrroOT27lnsNHkCqqm6Wg7k820NxzGVpLtshDvgwd9_HypB3Z8y5-XDzOSm-FSIUD-FPe1-IwzeXrdyuCiJ5xMIvCFwZZjoWHVHo3cFL3Mmd0LN29Hzxs19NgqWGDocNqPwnVn5Cr9Gk9mEy1V2Rc8u4w-LEteVeP6MBBZ63MaqSNpvV5UnXiGea",
  Volunteer: "https://lh3.googleusercontent.com/aida-public/AB6AXuArqn7dJE-NlfreHP4MMBOtohfmANqHfxpgS34pmI_LEHhkdof_2gTDREQQMVq-80AxpUcEVMqU8gVK2qg3ecGcuROhMJSfyFRk77qJHvZX6Vs5it_5aSK1oY5H6JWEmFXSCInXFpmw1i3h-b-Pb7bIQYHAKZSCWjmMXXpawrPqo4wDL3S5N1LFUT-xjqH8ko2zGn5KlK1m_ujU736J0SPG6GqhxAOUslZJGU4dwc7ilRSmz8YcEFhj5thBEg_m9YubQ62eYhee59HD",
  Workshop: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAF7-5_64DjQB_r4AmpCN8zQ6GDZw6RJl5IBOfhQzq_fh7A5UwE4uv5fKSBt5EDCA0LV7_TdbXawvdzOMOhURNWRuj1MB5RFPD0i34Kv7GKppFe-Qp6WIMvjinenSCUDcPvKaggNWIVRteDsa6gpPWkx55F0TQpidOFnQIkGwT0kWGNvCtEkchL6UHnZ49w7wGF0Cgzp6IuhnOxtM3p8sGo6aS0ifiPkEV6dCBhv2OAUtaZhAuxnaaO8QN4LIxyahu7PKLGfM_Rt2",
};

const getFallbackImageUrl = (type: Opportunity["type"]) =>
  FALLBACK_IMAGE_BY_TYPE[type] ?? FALLBACK_IMAGE_BY_TYPE.School ?? "";

const loadCatalogDataset = async (): Promise<AfriPathDataset> => {
  const catalog = await import("../data");

  return {
    opportunities: [...catalog.OPPORTUNITIES, ...readCustomOpportunities()],
    directoryEntries: catalog.DIRECTORY_ENTRIES,
    visaFreePrograms: catalog.VISA_FREE_PROGRAMS,
    visaSponsoredPrograms: catalog.VISA_SPONSORED_PROGRAMS,
    approvedSponsorCompanies: catalog.APPROVED_SPONSOR_COMPANIES,
    approvedSponsorJobs: catalog.APPROVED_SPONSOR_JOBS,
  };
};

const delay = (duration = 180) => new Promise((resolve) => setTimeout(resolve, duration));

const readApplicationRecords = (): ApplicationRecord[] => {
  const raw = localStorage.getItem(APPLICATION_RECORDS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ApplicationRecord[];
  } catch {
    return [];
  }
};

const writeApplicationRecords = (records: ApplicationRecord[]) => {
  localStorage.setItem(APPLICATION_RECORDS_KEY, JSON.stringify(records));
};

const readApplicationTasks = (): ApplicationTask[] => {
  const raw = localStorage.getItem(APPLICATION_TASKS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ApplicationTask[];
  } catch {
    return [];
  }
};

const writeApplicationTasks = (tasks: ApplicationTask[]) => {
  localStorage.setItem(APPLICATION_TASKS_KEY, JSON.stringify(tasks));
};

const readApplicationDocuments = (): ApplicationDocument[] => {
  const raw = localStorage.getItem(APPLICATION_DOCUMENTS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as ApplicationDocument[];
  } catch {
    return [];
  }
};

const writeApplicationDocuments = (documents: ApplicationDocument[]) => {
  localStorage.setItem(APPLICATION_DOCUMENTS_KEY, JSON.stringify(documents));
};

const DEFAULT_APPLICANT_CREDENTIALS: ApplicantCredential[] = [
  {
    id: "credential-passport",
    name: "Passport bio page",
    description: "Clear scan of a valid passport identity page.",
    category: "Identity",
    ready: false,
    importance: "Core",
  },
  {
    id: "credential-cv",
    name: "Global CV or resume",
    description: "Updated CV tailored for scholarship, job, volunteer, and visa pathways.",
    category: "Career",
    ready: false,
    importance: "Core",
  },
  {
    id: "credential-transcript",
    name: "Academic transcript",
    description: "Most recent transcript, diploma, or degree certificate.",
    category: "Academic",
    ready: false,
    importance: "Core",
  },
  {
    id: "credential-statement",
    name: "Personal statement",
    description: "Reusable motivation statement or cover-letter base draft.",
    category: "Statement",
    ready: false,
    importance: "Core",
  },
  {
    id: "credential-language",
    name: "Language test evidence",
    description: "IELTS, TOEFL, OET, German, French, or other language proof where required.",
    category: "Academic",
    ready: false,
    importance: "Recommended",
  },
  {
    id: "credential-references",
    name: "Reference contacts",
    description: "Academic, employer, or community referees with confirmed contact details.",
    category: "Career",
    ready: false,
    importance: "Recommended",
  },
  {
    id: "credential-portfolio",
    name: "Portfolio or evidence pack",
    description: "Projects, publications, awards, volunteer evidence, or professional license proof.",
    category: "Career",
    ready: false,
    importance: "Recommended",
  },
  {
    id: "credential-funds",
    name: "Proof of funds",
    description: "Bank statement, sponsor letter, scholarship proof, or income evidence.",
    category: "Financial",
    ready: false,
    importance: "Optional",
  },
];

const readApplicantCredentials = (): ApplicantCredential[] => {
  const raw = localStorage.getItem(APPLICANT_CREDENTIALS_KEY);
  if (!raw) return DEFAULT_APPLICANT_CREDENTIALS;

  try {
    const saved = JSON.parse(raw) as ApplicantCredential[];
    const merged = DEFAULT_APPLICANT_CREDENTIALS.map((credential) => {
      const existing = saved.find((item) => item.id === credential.id);
      return existing ? { ...credential, ready: existing.ready } : credential;
    });

    return merged;
  } catch {
    return DEFAULT_APPLICANT_CREDENTIALS;
  }
};

const writeApplicantCredentials = (credentials: ApplicantCredential[]) => {
  localStorage.setItem(APPLICANT_CREDENTIALS_KEY, JSON.stringify(credentials));
};

const readCurationLeads = (): OpportunityCurationLead[] => {
  const raw = localStorage.getItem(CURATION_LEADS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as OpportunityCurationLead[];
  } catch {
    return [];
  }
};

const writeCurationLeads = (leads: OpportunityCurationLead[]) => {
  localStorage.setItem(CURATION_LEADS_KEY, JSON.stringify(leads));
};

const readCustomOpportunities = (): Opportunity[] => {
  const raw = localStorage.getItem(CUSTOM_OPPORTUNITIES_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as Opportunity[];
  } catch {
    return [];
  }
};

const writeCustomOpportunities = (opportunities: Opportunity[]) => {
  localStorage.setItem(CUSTOM_OPPORTUNITIES_KEY, JSON.stringify(opportunities));
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 64);

const inferOpportunityBadge = (type: Opportunity["type"]): Opportunity["badge"] => {
  if (type === "Job") return "International Hiring";
  if (type === "Volunteer") return "Volunteer Placement";
  if (type === "School" || type === "Scholarship" || type === "Fellowship") return "Verified";
  return "Travel Grant Available";
};

const inferInternationalPolicy = (
  type: Opportunity["type"],
): Opportunity["internationalApplicantPolicy"] => {
  if (type === "Job") return "Work Permit Required";
  if (type === "Volunteer") return "International Applicants Eligible";
  return "International Applicants Eligible";
};

const buildPublishedOpportunity = (lead: OpportunityCurationLead): Opportunity => ({
  id: `published-${slugify(lead.title)}-${Date.now()}`,
  title: lead.title,
  type: lead.type,
  description: `${lead.notes} This record was promoted from the AfriPath Research Verification Desk and should be reviewed against the official source before final submission.`,
  eligibility: [
    "Open the official source and confirm current eligibility before applying.",
    "Prepare passport, academic or professional evidence, and proof of fit for the pathway.",
    lead.type === "Job"
      ? "Confirm sponsorship, work permit, or overseas applicant requirements before submitting."
      : "Confirm international applicant rules, funding scope, and document deadlines.",
  ],
  benefits: [
    { label: "Source Verified", value: "Promoted from verified research lead", iconName: "Shield" },
    { label: "Guidance", value: "Application checklist generated by AfriPath", iconName: "BookOpen" },
    { label: "Deadline Review", value: "Confirm exact date on official source", iconName: "Calendar" },
  ],
  location: lead.region,
  deadline: "Confirm on official source",
  rawDeadlineDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString(),
  badge: inferOpportunityBadge(lead.type),
  stipend: lead.type === "Job" ? "Salary by employer" : lead.type === "Volunteer" ? "Volunteer support varies" : "Funding details on source",
  imageUrl: getFallbackImageUrl(lead.type),
  fieldOfStudy: ["Engineering", "Medicine", "Social Sciences", "Information Technology"],
  region: lead.region,
  internationalApplicantPolicy: inferInternationalPolicy(lead.type),
  sourceUrl: lead.sourceUrl,
  lastVerifiedAt: new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
  volunteerCommitment: lead.type === "Volunteer" ? "Confirm duration on official source" : undefined,
  curationEvidence: [
    "Published from a verified AfriPath research lead.",
    `Research priority: ${lead.priority}.`,
    "Official source URL retained for final applicant verification.",
  ],
});

const addDays = (dateValue: Date, days: number) => {
  const nextDate = new Date(dateValue);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate.toISOString();
};

const buildTaskTemplates = (record: ApplicationRecord) => {
  if (record.category === "Sponsored Job" || record.category === "Corporate Role") {
    return [
      ["Confirm international eligibility", "Verify sponsorship, work permit, or overseas applicant requirements before applying.", 2, "High"],
      ["Prepare CV and portfolio", "Tailor CV, project evidence, licenses, references, and relocation documents.", 5, "High"],
      ["Submit application packet", "Send formal application and save confirmation evidence.", 10, "Medium"],
      ["Interview and visa readiness", "Prepare sponsor interview notes, salary expectations, and immigration checklist.", 18, "Medium"],
    ] as const;
  }

  if (record.category === "Visa Program") {
    return [
      ["Check official eligibility", "Review government criteria, points, passport validity, and proof of funds.", 2, "High"],
      ["Collect documents", "Prepare passport scan, education proof, employment letters, language evidence, and bank documents.", 7, "High"],
      ["Create portal account", "Open official portal profile and save login/reference information securely.", 12, "Medium"],
      ["Schedule submission milestone", "Set a target date for final upload, payment, or appointment booking.", 21, "Medium"],
    ] as const;
  }

  return [
    ["Verify official source", "Open the program page and confirm deadline, eligibility, funding, and document requirements.", 2, "High"],
    ["Prepare profile documents", "Collect CV, transcripts, references, passport, statement, and proof of achievements.", 6, "High"],
    ["Draft application narrative", "Prepare personal statement, research proposal, cover letter, or volunteer motivation.", 10, "Medium"],
    ["Submit and capture receipt", "Submit before deadline and store confirmation, portal ID, or email receipt.", 16, "Medium"],
  ] as const;
};

const ensureTasksForRecord = (record: ApplicationRecord) => {
  const existingTasks = readApplicationTasks();
  if (existingTasks.some((task) => task.applicationId === record.id)) return existingTasks;

  const createdAt = new Date(record.createdAt);
  const generatedTasks: ApplicationTask[] = buildTaskTemplates(record).map(
    ([title, description, dueOffset, priority], index) => ({
      id: `task-${record.id}-${index + 1}`,
      applicationId: record.id,
      title,
      description,
      dueDate: addDays(createdAt, dueOffset),
      completed: false,
      priority,
    }),
  );

  const nextTasks = [...existingTasks, ...generatedTasks];
  writeApplicationTasks(nextTasks);
  return nextTasks;
};

const buildDocumentTemplates = (record: ApplicationRecord) => {
  const base = [
    ["Passport bio page", "Clear scan of valid passport identity page.", true, "Identity"],
    ["Current CV or resume", "Updated career profile tailored to this pathway.", true, "Career"],
    ["Personal statement", "Motivation letter, cover letter, or statement of intent.", true, "Statement"],
  ] as const;

  if (record.category === "Sponsored Job" || record.category === "Corporate Role") {
    return [
      ...base,
      ["Work authorization evidence", "Visa, sponsorship, work-permit eligibility, or relocation readiness evidence.", true, "Visa"],
      ["Credential or license proof", "Professional certification, portfolio, license, or technical project evidence.", true, "Career"],
      ["References", "Employer, academic, or professional referee contacts.", false, "Career"],
    ] as const;
  }

  if (record.category === "Visa Program") {
    return [
      ...base,
      ["Proof of funds", "Bank statement, sponsor letter, scholarship proof, or income evidence.", true, "Financial"],
      ["Education or employment proof", "Degree, transcript, work letter, or contract supporting eligibility.", true, "Academic"],
      ["Visa checklist evidence", "Language result, points calculator, police certificate, or medical evidence if required.", false, "Visa"],
    ] as const;
  }

  return [
    ...base,
    ["Academic transcript", "Most recent transcript, diploma, or degree certificate.", true, "Academic"],
    ["Recommendation letters", "Academic, professional, or community recommendation letters.", true, "Academic"],
    ["Funding or achievement evidence", "Awards, publications, portfolio, volunteer evidence, or financial statement.", false, "Financial"],
  ] as const;
};

const ensureDocumentsForRecord = (record: ApplicationRecord) => {
  const existingDocuments = readApplicationDocuments();
  if (existingDocuments.some((document) => document.applicationId === record.id)) {
    return existingDocuments;
  }

  const generatedDocuments: ApplicationDocument[] = buildDocumentTemplates(record).map(
    ([name, description, required, category], index) => ({
      id: `document-${record.id}-${index + 1}`,
      applicationId: record.id,
      name,
      description,
      required,
      ready: false,
      category,
    }),
  );

  const nextDocuments = [...existingDocuments, ...generatedDocuments];
  writeApplicationDocuments(nextDocuments);
  return nextDocuments;
};

export const afripathApi = {
  async getDataset(): Promise<AfriPathDataset> {
    await delay();
    return loadCatalogDataset();
  },

  async listApplicationRecords(): Promise<ApplicationRecord[]> {
    await delay(80);
    return readApplicationRecords();
  },

  async createApplicationRecord(
    record: Omit<ApplicationRecord, "id" | "createdAt">,
  ): Promise<ApplicationRecord> {
    await delay(80);

    const created: ApplicationRecord = {
      ...record,
      id: `application-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const nextRecords = [
      created,
      ...readApplicationRecords().filter(
        (existing) => `${existing.category}:${existing.sourceId}` !== `${created.category}:${created.sourceId}`,
      ),
    ];

    writeApplicationRecords(nextRecords);
    ensureTasksForRecord(created);
    ensureDocumentsForRecord(created);
    return created;
  },

  async updateApplicationRecordStatus(
    id: string,
    status: ApplicationRecord["status"],
  ): Promise<ApplicationRecord | undefined> {
    await delay(80);

    const nextRecords = readApplicationRecords().map((record) =>
      record.id === id ? { ...record, status } : record,
    );

    writeApplicationRecords(nextRecords);
    return nextRecords.find((record) => record.id === id);
  },

  async listApplicationTasks(): Promise<ApplicationTask[]> {
    await delay(80);

    let tasks = readApplicationTasks();
    readApplicationRecords().forEach((record) => {
      tasks = ensureTasksForRecord(record);
    });

    return tasks;
  },

  async listApplicationDocuments(): Promise<ApplicationDocument[]> {
    await delay(80);

    let documents = readApplicationDocuments();
    readApplicationRecords().forEach((record) => {
      documents = ensureDocumentsForRecord(record);
    });

    return documents;
  },

  async listApplicantCredentials(): Promise<ApplicantCredential[]> {
    await delay(80);
    const credentials = readApplicantCredentials();
    writeApplicantCredentials(credentials);
    return credentials;
  },

  async setApplicationTaskCompleted(
    id: string,
    completed: boolean,
  ): Promise<ApplicationTask | undefined> {
    await delay(80);

    const nextTasks = readApplicationTasks().map((task) =>
      task.id === id ? { ...task, completed } : task,
    );

    writeApplicationTasks(nextTasks);
    return nextTasks.find((task) => task.id === id);
  },

  async setApplicationDocumentReady(
    id: string,
    ready: boolean,
  ): Promise<ApplicationDocument | undefined> {
    await delay(80);

    const nextDocuments = readApplicationDocuments().map((document) =>
      document.id === id ? { ...document, ready } : document,
    );

    writeApplicationDocuments(nextDocuments);
    return nextDocuments.find((document) => document.id === id);
  },

  async setApplicantCredentialReady(
    id: string,
    ready: boolean,
  ): Promise<ApplicantCredential | undefined> {
    await delay(80);

    const nextCredentials = readApplicantCredentials().map((credential) =>
      credential.id === id ? { ...credential, ready } : credential,
    );

    writeApplicantCredentials(nextCredentials);
    return nextCredentials.find((credential) => credential.id === id);
  },

  async listCurationLeads(): Promise<OpportunityCurationLead[]> {
    await delay(80);
    return readCurationLeads();
  },

  async createCurationLead(
    lead: Omit<OpportunityCurationLead, "id" | "createdAt" | "updatedAt">,
  ): Promise<OpportunityCurationLead> {
    await delay(80);

    const created: OpportunityCurationLead = {
      ...lead,
      id: `curation-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextLeads = [
      created,
      ...readCurationLeads().filter((existing) => existing.sourceUrl !== created.sourceUrl),
    ];

    writeCurationLeads(nextLeads);
    return created;
  },

  async updateCurationLeadStatus(
    id: string,
    status: OpportunityCurationLead["status"],
  ): Promise<OpportunityCurationLead | undefined> {
    await delay(80);

    const nextLeads = readCurationLeads().map((lead) =>
      lead.id === id ? { ...lead, status, updatedAt: new Date().toISOString() } : lead,
    );

    writeCurationLeads(nextLeads);
    return nextLeads.find((lead) => lead.id === id);
  },

  async publishCurationLead(id: string): Promise<{
    lead?: OpportunityCurationLead;
    opportunity?: Opportunity;
  }> {
    await delay(80);

    const leads = readCurationLeads();
    const lead = leads.find((item) => item.id === id);
    if (!lead) return {};

    const existingOpportunities = readCustomOpportunities();
    const existingOpportunity = existingOpportunities.find(
      (opportunity) => opportunity.sourceUrl === lead.sourceUrl,
    );
    const opportunity = existingOpportunity ?? buildPublishedOpportunity(lead);
    const nextOpportunities = existingOpportunity
      ? existingOpportunities
      : [opportunity, ...existingOpportunities];

    const nextLeads = leads.map((item) =>
      item.id === id
        ? { ...item, status: "Published" as const, updatedAt: new Date().toISOString() }
        : item,
    );

    writeCustomOpportunities(nextOpportunities);
    writeCurationLeads(nextLeads);

    return {
      lead: nextLeads.find((item) => item.id === id),
      opportunity,
    };
  },
};
