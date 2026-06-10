import { ActiveTrack, UserProfile } from "./types";

export const USER_PROFILES: UserProfile[] = [
  {
    name: "Amara",
    email: "loveline082022@gmail.com",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWaYY3_IX4OlPDThIHTapwGKIfS03q47Cwzu-3GNms1c0a3OtxJpHPY_vGoD0pPs8eQst2WeMlcBP72GsvNSsNRP00MgRe14HRBZKoVeAdZAbD7gNCIxSSj3dOTv0PH2QxwYG8Gyy9J0wt2dradPWW0VHhy7wfCKBJuGWvkiQLP8EOlZLl0rN9oL6XbN9dCNauhKj_yvLymxqibSQABhPS48qzHo08zBl9JdQ85RDawv5SyMXLTKWZ1j41pEDI-oOHB1h2vciTV1oL",
  },
  {
    name: "Kwame",
    email: "kwame.dev@gmail.com",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQoJcB5DId0Vn21Y5NhxdSIXjYWmBULNdYBN1v8iq3KqggVTMB9hPFL6pvrArOyFkc7S2h-u1UrRnh-nydt_OtKJcK8JD8t1qIAQ19QpjMGMPJhovuP5rPm2cXK3xwWh6eBm2WXRC7-k8mFcTTWk9RZMYD45IUSMrjGqBT7E0mBH5yTuxgWHn8wpkhj6IznlgNMIC1YC4wW2SKdk7A5kNQEyT57z-lJS1XaL1RP5RzdvagNKJ9IEtZ9nyh3vo5jreBV8N81J93Rln5",
  },
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
      "Visa Approved",
    ],
    lastUpdated: "Recently updated",
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
      "Arrived Abroad",
    ],
    lastUpdated: "3 hours ago",
  },
];
