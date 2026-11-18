/**
 * LegalConnect - Citizen Legal Assistance Portal Script
 * Provides simulated AI legal inquiries, lawyer directory search, and legal guides.
 * Notice: For academic demonstration only.
 */

// Demo Lawyer Directory Data
const LAWYER_DIRECTORY = [
  {
    id: 'law-001',
    name: 'Adv. Rajesh Sharma',
    title: 'Senior Litigation Advocate',
    court: 'High Court of Delhi & Saket Courts',
    location: 'New Delhi',
    practiceAreas: ['Civil Litigation', 'Criminal Law (BNS)', 'Commercial Arbitration'],
    experience: '12+ Years Experience',
    enrollment: 'Bar Council of Delhi (Demo)',
    phone: '+91 (011) 4892-0190',
    email: 'adv.rajesh.sharma@chambers.in',
    office: 'Chamber 418, Lawyers Chambers Block, Delhi High Court',
    bio: 'Specializing in commercial disputes, contract enforcement, and criminal bail procedures before the High Court of Delhi.'
  },
  {
    id: 'law-002',
    name: 'Adv. Priya Venkataraman',
    title: 'Advocate & RERA Specialist',
    court: 'Haryana RERA, Gurugram & Delhi Courts',
    location: 'Gurugram / Delhi NCR',
    practiceAreas: ['Real Estate & RERA', 'Consumer Protection', 'Civil Litigation'],
    experience: '9+ Years Experience',
    enrollment: 'Bar Council of Punjab & Haryana (Demo)',
    phone: '+91 98112 39012',
    email: 'priya.venkat@rera-advocates.in',
    office: 'Sector 29, Gurugram / Connaught Place, New Delhi',
    bio: 'Dedicated practice in homebuyer relief, builder delays under RERA, and consumer dispute redressal across state forums.'
  },
  {
    id: 'law-003',
    name: 'Adv. Aman Deshmukh',
    title: 'Corporate & Contract Counsel',
    court: 'Bombay High Court & NCLT Mumbai',
    location: 'Mumbai',
    practiceAreas: ['Corporate & Contract', 'Commercial Arbitration', 'Intellectual Property'],
    experience: '14+ Years Experience',
    enrollment: 'Bar Council of Maharashtra & Goa (Demo)',
    phone: '+91 98201 55432',
    email: 'aman.deshmukh@mumbaibar.org',
    office: 'Fort Chambers, Kala Ghoda, Mumbai 400001',
    bio: 'Advising startups, MSMEs, and enterprises on commercial contracting, shareholder pacts, and NCLT corporate disputes.'
  },
  {
    id: 'law-004',
    name: 'Adv. Sunita Mukherjee',
    title: 'Criminal Defense & Human Rights Advocate',
    court: 'Calcutta High Court & City Sessions Court',
    location: 'Kolkata',
    practiceAreas: ['Criminal Law (BNS)', 'Family Law', 'Constitutional Writs'],
    experience: '11+ Years Experience',
    enrollment: 'Bar Council of West Bengal (Demo)',
    phone: '+91 98310 99821',
    email: 'sunita.mukherjee@kolkatabar.in',
    office: 'Old Post Office Street, High Court Precinct, Kolkata',
    bio: 'Counsel handling criminal revision petitions, bail applications under BNSS, and matrimonial mediation.'
  },
  {
    id: 'law-005',
    name: 'Adv. Vikram Malhotra',
    title: 'Consumer & Banking Litigation Counsel',
    court: 'Punjab & Haryana High Court, Chandigarh',
    location: 'Chandigarh',
    practiceAreas: ['Consumer Protection', 'Banking & Cheque Bounce (NI Act)', 'Civil Litigation'],
    experience: '8+ Years Experience',
    enrollment: 'Bar Council of Punjab & Haryana (Demo)',
    phone: '+91 98765 22104',
    email: 'vikram.malhotra@advocate.in',
    office: 'Sector 17-C, Chandigarh',
    bio: 'Representing consumers in medical negligence, insurance repudiation, and Section 138 Negotiable Instruments Act matters.'
  },
  {
    id: 'law-006',
    name: 'Adv. Meera K. Nair',
    title: 'Technology Law & Family Law Counsel',
    court: 'High Court of Karnataka & City Civil Court',
    location: 'Bengaluru',
    practiceAreas: ['Family Law', 'Corporate & Contract', 'Cyber Law'],
    experience: '10+ Years Experience',
    enrollment: 'Bar Council of Karnataka (Demo)',
    phone: '+91 98450 71209',
    email: 'meera.nair@bengalurulaw.in',
    office: 'Infantry Road, Shivajinagar, Bengaluru 560001',
    bio: 'Focusing on family asset settlements, mutual divorce proceedings, data protection policies, and employment legal contracts.'
  }
];

// Curated Knowledge Responses for AI Assistant
const AI_KNOWLEDGE_BASE = {
  edaakhil: `
**Filing a Consumer Complaint via e-Daakhil in India:**

1. **Jurisdiction & Limits (Consumer Protection Act, 2019):**
   - **District Commission:** Claims up to ₹50 Lakhs.
   - **State Commission:** Claims between ₹50 Lakhs and ₹2 Crores.
   - **National Commission (NCDRC):** Claims exceeding ₹2 Crores.

2. **Step-by-Step Procedure:**
   - **Step 1:** Visit the official e-Daakhil portal (*edaakhil.nic.in*).
   - **Step 2:** Register with your Aadhaar / Mobile OTP.
   - **Step 3:** Draft your complaint memo stating:
     - Details of the complainant and opposite party (seller/service provider).
     - Chronology of transaction, invoices, and deficiency in service.
     - Relief sought (refund, replacement, compensation, litigation costs).
   - **Step 4:** Upload supporting documents (Bills, legal notice, replies, photos).
   - **Step 5:** Pay nominal online filing fees via Bharatkosh / payment gateway.

*Note: You may represent yourself without an advocate or engage a verified consumer advocate.*
`,

  bns: `
**Overview: Bharatiya Nyaya Sanhita (BNS) 2023 vs IPC:**

- **Commencement Date:** In force from **1 July 2024**, replacing the Indian Penal Code (IPC), 1860.
- **Key Modern Changes:**
  - **Re-organization of Offences:** Offences against women, children, and human body are prioritized in opening chapters.
  - **Community Service:** Introduced as an alternate punishment for minor first-time offences (Section 4, BNS).
  - **Organized Crime & Terrorism:** Explicit definitions codified with stringent bail restrictions.
  - **Electronic & Digital Records:** Fully recognized under Bharatiya Sakshya Adhiniyam (BSA), 2023.
- **Pending Cases:** Criminal trials registered under the IPC prior to 1 July 2024 continue under IPC provisions as per the savings clause.

*Notice: For matters involving specific FIRs or charge sheets, please consult an enrolled criminal advocate.*
`,

  arrest: `
**Citizen Rights on Police Detention & Arrest in India:**

Under the **Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023** and Article 22 of the Constitution:

1. **Right to Know Grounds:** Police must inform you immediately of the grounds of arrest and whether the offence is bailable.
2. **Right to Inform Family / Lawyer:** You have the statutory right to have one relative, friend, or advocate notified immediately.
3. **Memo of Arrest:** The arresting officer must prepare an arrest memo countersigned by an independent witness and the arrestee.
4. **Production within 24 Hours:** Police must produce the arrested individual before the nearest Judicial Magistrate within 24 hours (excluding transit time).
5. **Medical Examination:** Mandatory medical check-up by a government medical officer at the time of arrest and custody.
6. **Free Legal Aid:** If unable to afford counsel, the Magistrate has a duty to provide legal aid through the District Legal Services Authority (DLSA).
`,

  rera: `
**Remedies for Delayed Builder Possession under RERA (Real Estate Regulation Act, 2016):**

1. **Right to Interest / Refund (Section 18, RERA):**
   - If a promoter fails to give possession by the agreed date in the Builder-Buyer Agreement, the homebuyer can either:
     - **Option A (Withdraw from Project):** Demand full refund of paid amounts along with statutory interest (State SBI MCLR + 2%).
     - **Option B (Stay in Project):** Claim monthly delayed interest for every month of delay until actual handover of possession.
2. **Filing Process:**
   - File Form 'M' (Complaint before RERA Authority) or Form 'N' (Compensation before Adjudicating Officer) on your State RERA website (e.g. Haryana RERA, MahaRERA, Delhi RERA).
   - Attach Builder-Buyer Agreement, payment receipts, and communication logs.
`,

  cnr: `
**Understanding Court CNR Numbers & e-Courts Tracking:**

- **What is CNR?**
  CNR stands for **Case Natural Number**. It is a unique 16-character alphanumeric code assigned to every judicial case across Indian courts.
- **Format Breakdown (e.g., DLDH01-004521-2024):**
  - **DL:** State Code (Delhi)
  - **DH:** Court Complex / Establishment Code (High Court / District)
  - **01:** Bench Code
  - **004521:** Serial Filing Number
  - **2024:** Year of Registration
- **How to Use:**
  - Search on the national **eCourts Services App** or *services.ecourts.gov.in* using the CNR code to view interim orders, cause list listing, and next hearing date.
`
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Citizen Portal Section Tab Navigation
  const tabBtns = document.querySelectorAll('.citizen-nav-tab');
  const viewSections = document.querySelectorAll('.citizen-view-section');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      viewSections.forEach(sec => {
        if (sec.id === targetView) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });

      if (window.lucide) window.lucide.createIcons();
    });
  });

  // 2. AI Legal Assistant Logic
  const chatMessagesContainer = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const promptPills = document.querySelectorAll('.prompt-pill');

  const appendChatMessage = (sender, text) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-bubble ${sender}`;

    const icon = sender === 'user' ? 'user' : 'bot';
    const senderName = sender === 'user' ? 'You' : 'LegalConnect AI Assistant (General Information)';

    msgDiv.innerHTML = `
      <div class="chat-bubble-header">
        <i data-lucide="${icon}"></i>
        <span>${senderName}</span>
      </div>
      <div class="chat-bubble-text">${markedLite(text)}</div>
      ${sender === 'ai' ? `
        <div class="chat-disclaimer-note">
          <i data-lucide="info"></i>
          <span>Educational informational response only. Not formal legal advice.</span>
        </div>` : ''}
    `;

    chatMessagesContainer.appendChild(msgDiv);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    if (window.lucide) window.lucide.createIcons();
  };

  // Ultra-simple markdown parser for clean lists and bold text
  function markedLite(text) {
    let out = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n- /g, '<br>&bull; ')
      .replace(/\n\d+\. /g, (m) => `<br><strong>${m.trim()}</strong> `);
    return out;
  }

  const handleUserInquiry = (questionText) => {
    const q = questionText.trim();
    if (!q) return;

    appendChatMessage('user', q);
    chatInput.value = '';

    // Show typing state
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble ai typing';
    typingIndicator.id = 'aiTyping';
    typingIndicator.innerHTML = `
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
      <span style="font-size: 0.8rem; color: #64748b;">Consulting Indian statutes & statutory guides...</span>
    `;
    chatMessagesContainer.appendChild(typingIndicator);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    // Simulate smart knowledge lookup
    setTimeout(() => {
      const typingEl = document.getElementById('aiTyping');
      if (typingEl) typingEl.remove();

      let answer = '';
      const lowerQ = q.toLowerCase();

      if (lowerQ.includes('consumer') || lowerQ.includes('daakhil') || lowerQ.includes('e-daakhil') || lowerQ.includes('defective')) {
        answer = AI_KNOWLEDGE_BASE.edaakhil;
      } else if (lowerQ.includes('bns') || lowerQ.includes('ipc') || lowerQ.includes('criminal law') || lowerQ.includes('sanhita')) {
        answer = AI_KNOWLEDGE_BASE.bns;
      } else if (lowerQ.includes('arrest') || lowerQ.includes('police') || lowerQ.includes('detained') || lowerQ.includes('rights')) {
        answer = AI_KNOWLEDGE_BASE.arrest;
      } else if (lowerQ.includes('rera') || lowerQ.includes('builder') || lowerQ.includes('flat') || lowerQ.includes('possession') || lowerQ.includes('property')) {
        answer = AI_KNOWLEDGE_BASE.rera;
      } else if (lowerQ.includes('cnr') || lowerQ.includes('court status') || lowerQ.includes('case status') || lowerQ.includes('ecourts')) {
        answer = AI_KNOWLEDGE_BASE.cnr;
      } else {
        answer = `
**Legal Information Regarding: "${q}"**

Under Indian Law, questions regarding this procedure generally involve the following preliminary considerations:

1. **Relevant Jurisdiction:** You should verify whether the dispute falls within Civil Courts (District Judge / Sub-Judge), Criminal Jurisdiction under BNSS, or a dedicated tribunal (e.g. Consumer Forum, NCLT, Debt Recovery Tribunal).
2. **Statutory Limitation Period:** Most civil and consumer claims are subject to strict limitation periods under the **Limitation Act, 1963** (typically 2 to 3 years from the date the cause of action arose).
3. **Documentation Required:** Ensure all signed agreements, notice exchanges, postal receipts, and payment proofs are maintained chronologically.
4. **Next Practical Step:** You may send a formal Legal Notice through an advocate or approach your nearest District Legal Services Authority (DLSA) for free aid if eligible.

*Note: For matter-specific analysis, consider exploring the Lawyer Directory above to connect with practicing legal counsel in your area.*
`;
      }

      appendChatMessage('ai', answer);
    }, 700);
  };

  chatSendBtn?.addEventListener('click', () => {
    handleUserInquiry(chatInput.value);
  });

  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleUserInquiry(chatInput.value);
    }
  });

  promptPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const prompt = pill.getAttribute('data-prompt');
      if (prompt) handleUserInquiry(prompt);
    });
  });

  // 3. Lawyer Directory Search & Filter Logic
  const lawyerGrid = document.getElementById('lawyerDirectoryGrid');
  const searchInput = document.getElementById('directorySearch');
  const locationFilter = document.getElementById('filterLocation');
  const practiceFilter = document.getElementById('filterPractice');
  const countBadge = document.getElementById('lawyerCountBadge');

  const renderLawyers = (list) => {
    if (!lawyerGrid) return;
    lawyerGrid.innerHTML = '';

    if (countBadge) {
      countBadge.textContent = `${list.length} Verified Advocates (Demo)`;
    }

    if (list.length === 0) {
      lawyerGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #ffffff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <i data-lucide="search-x" style="width: 42px; height: 42px; margin: 0 auto 1rem auto; color: #94a3b8;"></i>
          <h4 style="font-weight: 700; color: #0b1528;">No Advocates Found</h4>
          <p style="color: #64748b; font-size: 0.9rem;">Try broadening your search criteria or resetting filters.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    list.forEach(lawyer => {
      const card = document.createElement('div');
      card.className = 'directory-card';
      card.innerHTML = `
        <div class="dir-card-header">
          <div class="dir-avatar">
            <i data-lucide="scale"></i>
          </div>
          <div>
            <h4 class="dir-name">${lawyer.name}</h4>
            <span class="dir-title">${lawyer.title}</span>
            <div class="dir-badge-demo">
              <i data-lucide="shield"></i> DEMO PROFILE
            </div>
          </div>
        </div>

        <div class="dir-card-body">
          <div class="dir-meta-row">
            <i data-lucide="landmark"></i>
            <span>${lawyer.court}</span>
          </div>
          <div class="dir-meta-row">
            <i data-lucide="map-pin"></i>
            <span>${lawyer.location}</span>
          </div>
          <div class="dir-meta-row">
            <i data-lucide="award"></i>
            <span>${lawyer.experience} • ${lawyer.enrollment}</span>
          </div>

          <div class="dir-practice-tags">
            ${lawyer.practiceAreas.map(a => `<span class="dir-tag">${a}</span>`).join('')}
          </div>

          <p class="dir-bio">${lawyer.bio}</p>
        </div>

        <div class="dir-card-footer">
          <button class="btn btn-navy btn-sm" onclick="openConsultationModal('${lawyer.name}', '${lawyer.office}', '${lawyer.phone}')">
            <i data-lucide="message-square"></i>
            <span>Request Consultation</span>
          </button>
        </div>
      `;
      lawyerGrid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  };

  const applyFilters = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const loc = locationFilter ? locationFilter.value : 'all';
    const prac = practiceFilter ? practiceFilter.value : 'all';

    const filtered = LAWYER_DIRECTORY.filter(lawyer => {
      const matchesQuery = !query ||
        lawyer.name.toLowerCase().includes(query) ||
        lawyer.bio.toLowerCase().includes(query) ||
        lawyer.court.toLowerCase().includes(query) ||
        lawyer.practiceAreas.some(p => p.toLowerCase().includes(query));

      const matchesLocation = loc === 'all' || lawyer.location.toLowerCase().includes(loc.toLowerCase());
      const matchesPractice = prac === 'all' || lawyer.practiceAreas.includes(prac);

      return matchesQuery && matchesLocation && matchesPractice;
    });

    renderLawyers(filtered);
  };

  searchInput?.addEventListener('input', applyFilters);
  locationFilter?.addEventListener('change', applyFilters);
  practiceFilter?.addEventListener('change', applyFilters);

  // Initial Directory Render
  renderLawyers(LAWYER_DIRECTORY);

  // 4. Consultation Modal Logic
  window.openConsultationModal = (name, office, phone) => {
    const modal = document.getElementById('consultationModal');
    const targetName = document.getElementById('consultLawyerName');
    const targetContact = document.getElementById('consultLawyerContact');

    if (targetName) targetName.textContent = name;
    if (targetContact) targetContact.textContent = `${office} • ${phone}`;

    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const consultCloseBtn = document.getElementById('closeConsultModal');
  const consultModal = document.getElementById('consultationModal');
  const consultForm = document.getElementById('consultForm');
  const consultSuccessMsg = document.getElementById('consultSuccessMsg');

  consultCloseBtn?.addEventListener('click', () => {
    consultModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  consultModal?.addEventListener('click', (e) => {
    if (e.target === consultModal) {
      consultModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  consultForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (consultSuccessMsg) {
      consultSuccessMsg.style.display = 'block';
      consultSuccessMsg.textContent = 'Simulated consultation request sent! In this prototype, the inquiry is recorded locally.';
      setTimeout(() => {
        consultSuccessMsg.style.display = 'none';
        consultForm.reset();
        consultModal?.classList.remove('active');
        document.body.style.overflow = '';
      }, 2500);
    }
  });
});
