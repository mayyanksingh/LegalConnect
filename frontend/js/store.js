/**
 * LegalConnect - Prototype Data Store & LocalStorage Persistence
 * Contains realistic synthetic demo data for Indian Legal Practice.
 * Note: All data is synthetic and for academic demonstration purposes.
 */

const STORAGE_KEYS = {
  CASES: 'lc_cases_v1',
  CLIENTS: 'lc_clients_v1',
  HEARINGS: 'lc_hearings_v1',
  DOCUMENTS: 'lc_documents_v1',
  NOTIFICATIONS: 'lc_notifications_v1',
  AUTH_LAWYER: 'lc_auth_lawyer_v1'
};

// Initial Seed Data
const INITIAL_DATA = {
  lawyer: {
    name: 'Adv. Rajesh Sharma',
    email: 'rajesh.sharma@delhichambers.in',
    phone: '+91 98110 45210',
    barId: 'D/1428/2015',
    barCouncil: 'Bar Council of Delhi',
    verificationStatus: 'DEMO / NOT OFFICIALLY VERIFIED',
    chamber: 'Chamber No. 418, Lawyers Chambers Block, High Court of Delhi, New Delhi 110003',
    primaryCourt: 'High Court of Delhi & Saket District Courts',
    practiceAreas: ['Civil Litigation', 'Criminal Law (BNS)', 'Commercial Arbitration', 'Consumer Disputes']
  },

  clients: [
    {
      id: 'cli-001',
      name: 'Virender K. Anand',
      type: 'Individual',
      email: 'virender.anand@email.com',
      phone: '+91 98711 23450',
      address: 'B-42, Greater Kailash-I, New Delhi',
      associatedCases: ['CNR: DLDH01-004521-2024', 'CNR: DLST02-012903-2023'],
      status: 'Active',
      createdDate: '2024-02-14'
    },
    {
      id: 'cli-002',
      name: 'Shree Sai Logistics Pvt. Ltd.',
      type: 'Corporate',
      email: 'legal@shreesailogistics.in',
      phone: '+91 11 4152 7800',
      address: 'Plot 18, Okhla Industrial Area Phase-III, New Delhi',
      associatedCases: ['CNR: DLCT02-019842-2023'],
      status: 'Active',
      createdDate: '2023-08-10'
    },
    {
      id: 'cli-003',
      name: 'Sunita Mehra',
      type: 'Individual',
      email: 'sunita.mehra91@email.com',
      phone: '+91 98102 77419',
      address: 'Flat 604, DLF Silver Oaks, DLF Phase-1, Gurugram',
      associatedCases: ['CNR: HRGG01-008912-2024'],
      status: 'Active',
      createdDate: '2024-04-02'
    },
    {
      id: 'cli-004',
      name: 'Arunav Sengupta',
      type: 'Individual',
      email: 'arunav.sengupta@koltech.co',
      phone: '+91 99031 82910',
      address: 'Tower 4, Godrej Woodsman Estate, New Delhi',
      associatedCases: ['CNR: DLDH01-006734-2024'],
      status: 'Active',
      createdDate: '2024-06-18'
    },
    {
      id: 'cli-005',
      name: 'Pooja Narang',
      type: 'Individual',
      email: 'pooja.narang@gmail.com',
      phone: '+91 98118 34912',
      address: 'Pocket C, Vasant Kunj, New Delhi',
      associatedCases: ['CNR: DLCT01-003412-2024'],
      status: 'Pending',
      createdDate: '2024-09-05'
    }
  ],

  cases: [
    {
      id: 'cas-001',
      caseNumber: 'CS(COMM) 412/2024',
      cnrNumber: 'DLDH01-004521-2024',
      courtName: 'High Court of Delhi',
      courtBench: 'Court Room 04, Single Bench (Honble Mr. Justice K.R. Rao)',
      caseType: 'Commercial Suit',
      clientName: 'Virender K. Anand',
      opposingParty: 'Nexus InfraBuild Technologies LLP',
      caseStatus: 'Active',
      nextHearingDate: '2026-11-20',
      hearingTime: '10:30 AM',
      stage: 'Final Arguments',
      description: 'Breach of commercial supply contract and recovery of liquidated damages.'
    },
    {
      id: 'cas-002',
      caseNumber: 'ARB.P. 189/2023',
      cnrNumber: 'DLCT02-019842-2023',
      courtName: 'Saket District Court, New Delhi',
      courtBench: 'Court Room 12, Commercial Court (South District)',
      caseType: 'Arbitration Petition',
      clientName: 'Shree Sai Logistics Pvt. Ltd.',
      opposingParty: 'Delhi Freightways Forwarders Union',
      caseStatus: 'Active',
      nextHearingDate: '2026-11-24',
      hearingTime: '02:15 PM',
      stage: 'Evidence Recording',
      description: 'Section 9 petition for interim relief and preservation of cargo security.'
    },
    {
      id: 'cas-003',
      caseNumber: 'BAIL APPLN. 2109/2024',
      cnrNumber: 'DLDH01-006734-2024',
      courtName: 'High Court of Delhi',
      courtBench: 'Court Room 17, Single Bench',
      caseType: 'Criminal Bail (BNS)',
      clientName: 'Arunav Sengupta',
      opposingParty: 'State (Govt. of NCT of Delhi)',
      caseStatus: 'Listed',
      nextHearingDate: '2026-11-22',
      hearingTime: '11:15 AM',
      stage: 'Arguments on Bail Application',
      description: 'Regular bail application under Bharatiya Nagarik Suraksha Sanhita (BNSS) Section 483.'
    },
    {
      id: 'cas-004',
      caseNumber: 'CC 841/2024',
      cnrNumber: 'HRGG01-008912-2024',
      courtName: 'Haryana RERA Authority, Gurugram',
      courtBench: 'Bench II, Haryana Real Estate Regulatory Authority',
      caseType: 'RERA Complaint',
      clientName: 'Sunita Mehra',
      opposingParty: 'Skyline Greenfield Promoters Ltd.',
      caseStatus: 'Active',
      nextHearingDate: '2026-12-02',
      hearingTime: '11:00 AM',
      stage: 'Reply Filing by Promoter',
      description: 'Complaint for delayed possession, refund of interest and execution of conveyance deed.'
    },
    {
      id: 'cas-005',
      caseNumber: 'CS(OS) 241/2024',
      cnrNumber: 'DLCT01-003412-2024',
      courtName: 'Patiala House District Courts, New Delhi',
      courtBench: 'Court Room 02, Additional District Judge',
      caseType: 'Civil Partition Suit',
      clientName: 'Pooja Narang',
      opposingParty: 'Sanjay Narang & Ors.',
      caseStatus: 'Adjourned',
      nextHearingDate: '2026-12-14',
      hearingTime: '12:00 PM',
      stage: 'Framing of Issues',
      description: 'Suit for partition and separate possession of ancestral residential properties.'
    },
    {
      id: 'cas-006',
      caseNumber: 'W.P.(C) 9140/2023',
      cnrNumber: 'DLDH01-010210-2023',
      courtName: 'High Court of Delhi',
      courtBench: 'Division Bench II',
      caseType: 'Writ Petition (Civil)',
      clientName: 'Virender K. Anand',
      opposingParty: 'Municipal Corporation of Delhi (MCD)',
      caseStatus: 'Reserved for Orders',
      nextHearingDate: '2026-12-18',
      hearingTime: '02:00 PM',
      stage: 'Pronouncement of Judgment',
      description: 'Challenge against arbitrary demolition notice issued without mandatory statutory inspection.'
    }
  ],

  hearings: [
    {
      id: 'hrg-001',
      date: '2026-11-20',
      time: '10:30 AM',
      caseNumber: 'CS(COMM) 412/2024',
      courtName: 'High Court of Delhi',
      location: 'Court Room 04, Main Block, Delhi HC',
      stage: 'Final Arguments',
      itemNumber: 'Item No. 14',
      type: 'Court Hearing'
    },
    {
      id: 'hrg-002',
      date: '2026-11-22',
      time: '11:15 AM',
      caseNumber: 'BAIL APPLN. 2109/2024',
      courtName: 'High Court of Delhi',
      location: 'Court Room 17, Extension Block',
      stage: 'Arguments on Bail Application',
      itemNumber: 'Item No. 08',
      type: 'Court Hearing'
    },
    {
      id: 'hrg-003',
      date: '2026-11-24',
      time: '02:15 PM',
      caseNumber: 'ARB.P. 189/2023',
      courtName: 'Saket District Court',
      location: 'Court Room 12, South District',
      stage: 'Evidence Recording',
      itemNumber: 'Item No. 22',
      type: 'Court Hearing'
    },
    {
      id: 'hrg-004',
      date: '2026-11-25',
      time: '04:30 PM',
      caseNumber: 'CS(COMM) 412/2024',
      courtName: 'Chamber Conference',
      location: 'Chamber 418, Delhi HC Block',
      stage: 'Client Briefing & Pre-trial Preparation',
      itemNumber: 'Chamber Meeting',
      type: 'Client Meeting'
    },
    {
      id: 'hrg-005',
      date: '2026-11-28',
      time: '05:00 PM',
      caseNumber: 'Statutory Limitation',
      courtName: 'Registry Filing',
      location: 'Delhi HC Filing Counter No. 3',
      stage: 'Written Statement Due in CS(OS) 241/2024',
      itemNumber: 'Statutory Deadline',
      type: 'Filing Deadline'
    },
    {
      id: 'hrg-006',
      date: '2026-12-02',
      time: '11:00 AM',
      caseNumber: 'CC 841/2024',
      courtName: 'Haryana RERA, Gurugram',
      location: 'Bench II, Gurugram',
      stage: 'Reply Filing by Builder',
      itemNumber: 'Item No. 05',
      type: 'Court Hearing'
    }
  ],

  documents: [
    {
      id: 'doc-001',
      title: 'Vakalatnama_CS_COMM_412_2024.pdf',
      caseNumber: 'CS(COMM) 412/2024',
      category: 'Pleadings & Vakalatnama',
      uploadDate: '2024-03-11',
      size: '1.4 MB',
      fileType: 'pdf'
    },
    {
      id: 'doc-002',
      title: 'Plaint_And_Statement_Of_Truth.pdf',
      caseNumber: 'CS(COMM) 412/2024',
      category: 'Plaint / Petition',
      uploadDate: '2024-03-12',
      size: '4.8 MB',
      fileType: 'pdf'
    },
    {
      id: 'doc-003',
      title: 'Section_9_Arbitration_Petition.pdf',
      caseNumber: 'ARB.P. 189/2023',
      category: 'Applications',
      uploadDate: '2023-09-01',
      size: '3.2 MB',
      fileType: 'pdf'
    },
    {
      id: 'doc-004',
      title: 'Bail_Application_BNSS_483.pdf',
      caseNumber: 'BAIL APPLN. 2109/2024',
      category: 'Criminal Pleadings',
      uploadDate: '2024-10-15',
      size: '2.1 MB',
      fileType: 'pdf'
    },
    {
      id: 'doc-005',
      title: 'Buyer_Agreement_And_Payment_Receipts.pdf',
      caseNumber: 'CC 841/2024',
      category: 'Evidence Bundle',
      uploadDate: '2024-05-18',
      size: '8.6 MB',
      fileType: 'pdf'
    }
  ],

  notifications: [
    {
      id: 'notif-001',
      title: 'Urgent: Delhi HC Cause List Published',
      message: 'Item No. 14 in CS(COMM) 412/2024 listed tomorrow before Court 04 (Honble Justice Rao) at 10:30 AM.',
      type: 'hearing',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: 'notif-002',
      title: 'Statutory Limitation Deadline Approaching',
      message: 'Written Statement in CS(OS) 241/2024 is due for filing within 48 hours to avoid delay condonation application.',
      type: 'deadline',
      timestamp: '3 hours ago',
      read: false
    },
    {
      id: 'notif-003',
      title: 'e-Court Status Synced: Bail Matter',
      message: 'Notice issued to State Public Prosecutor in Bail Appln 2109/2024. Next listing date: 22nd Nov.',
      type: 'update',
      timestamp: 'Yesterday',
      read: true
    },
    {
      id: 'notif-004',
      title: 'Chamber Consultation Scheduled',
      message: 'Meeting with Virender K. Anand confirmed for 25th Nov at 4:30 PM in Chamber 418.',
      type: 'meeting',
      timestamp: '2 days ago',
      read: true
    }
  ]
};

// Store Helper API
const LegalStore = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.CASES)) {
      this.resetToDemo();
    }
  },

  resetToDemo() {
    localStorage.setItem(STORAGE_KEYS.AUTH_LAWYER, JSON.stringify(INITIAL_DATA.lawyer));
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(INITIAL_DATA.cases));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_DATA.clients));
    localStorage.setItem(STORAGE_KEYS.HEARINGS, JSON.stringify(INITIAL_DATA.hearings));
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DATA.documents));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_DATA.notifications));
  },

  // Auth
  getLawyer() {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_LAWYER);
    return raw ? JSON.parse(raw) : INITIAL_DATA.lawyer;
  },

  saveLawyer(profile) {
    localStorage.setItem(STORAGE_KEYS.AUTH_LAWYER, JSON.stringify(profile));
  },

  isLawyerLoggedIn() {
    return localStorage.getItem('lc_is_logged_in') === 'true';
  },

  loginLawyer(profile) {
    localStorage.setItem('lc_is_logged_in', 'true');
    if (profile) this.saveLawyer(profile);
  },

  logoutLawyer() {
    localStorage.removeItem('lc_is_logged_in');
  },

  // Cases
  getCases() {
    const raw = localStorage.getItem(STORAGE_KEYS.CASES);
    return raw ? JSON.parse(raw) : [];
  },

  getCaseById(id) {
    return this.getCases().find(c => c.id === id);
  },

  saveCase(newCase) {
    const cases = this.getCases();
    if (!newCase.id) newCase.id = 'cas-' + Date.now();
    cases.unshift(newCase);
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
    return newCase;
  },

  updateCase(updatedCase) {
    let cases = this.getCases();
    cases = cases.map(c => c.id === updatedCase.id ? updatedCase : c);
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  },

  deleteCase(id) {
    let cases = this.getCases();
    cases = cases.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  },

  // Clients
  getClients() {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    return raw ? JSON.parse(raw) : [];
  },

  saveClient(newClient) {
    const clients = this.getClients();
    if (!newClient.id) newClient.id = 'cli-' + Date.now();
    if (!newClient.createdDate) newClient.createdDate = new Date().toISOString().split('T')[0];
    clients.unshift(newClient);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    return newClient;
  },

  updateClient(updatedClient) {
    let clients = this.getClients();
    clients = clients.map(c => c.id === updatedClient.id ? updatedClient : c);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  },

  deleteClient(id) {
    let clients = this.getClients();
    clients = clients.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  },

  // Hearings
  getHearings() {
    const raw = localStorage.getItem(STORAGE_KEYS.HEARINGS);
    return raw ? JSON.parse(raw) : [];
  },

  saveHearing(newHearing) {
    const hearings = this.getHearings();
    if (!newHearing.id) newHearing.id = 'hrg-' + Date.now();
    hearings.push(newHearing);
    localStorage.setItem(STORAGE_KEYS.HEARINGS, JSON.stringify(hearings));
    return newHearing;
  },

  // Documents
  getDocuments() {
    const raw = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return raw ? JSON.parse(raw) : [];
  },

  saveDocument(newDoc) {
    const docs = this.getDocuments();
    if (!newDoc.id) newDoc.id = 'doc-' + Date.now();
    docs.unshift(newDoc);
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
    return newDoc;
  },

  deleteDocument(id) {
    let docs = this.getDocuments();
    docs = docs.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
  },

  // Notifications
  getNotifications() {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : [];
  },

  markAllNotificationsRead() {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }
};

// Initialize on script evaluation
LegalStore.init();

// Export globally
window.LegalStore = LegalStore;
