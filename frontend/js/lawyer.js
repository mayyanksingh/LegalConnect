/**
 * LegalConnect - Lawyer Workspace Script
 * Handles Sidebar Navigation, Cases CRUD, Clients CRUD, Calendar Rendering,
 * Document Management, Notifications, and Profile Settings.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check auth or redirect
  if (!LegalStore.isLawyerLoggedIn()) {
    // If opening directly in demo mode, auto-login default demo lawyer
    LegalStore.loginLawyer();
  }

  // Load current advocate info
  const currentAdvocate = LegalStore.getLawyer();
  renderAdvocateProfile(currentAdvocate);

  // Initialize Lucide Icons
  if (window.lucide) window.lucide.createIcons();

  // 1. Sidebar Navigation
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
  const moduleViews = document.querySelectorAll('.dashboard-module');
  const currentModuleTitle = document.getElementById('currentModuleTitle');
  const mobileSidebarToggle = document.getElementById('sidebarToggleBtn');
  const lawyerSidebar = document.querySelector('.lawyer-sidebar');
  const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

  sidebarNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModule = item.getAttribute('data-module');

      sidebarNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      moduleViews.forEach(view => {
        if (view.id === targetModule) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      if (currentModuleTitle) {
        currentModuleTitle.textContent = item.querySelector('.nav-label')?.textContent || 'Workspace';
      }

      // Close mobile drawer if open
      lawyerSidebar?.classList.remove('open');
      sidebarBackdrop?.classList.remove('open');

      // Re-render specific views if active
      if (targetModule === 'module-overview') renderOverview();
      if (targetModule === 'module-cases') renderCases();
      if (targetModule === 'module-clients') renderClients();
      if (targetModule === 'module-calendar') renderCalendar();
      if (targetModule === 'module-documents') renderDocuments();
      if (targetModule === 'module-notifications') renderNotifications();

      if (window.lucide) window.lucide.createIcons();
    });
  });

  // Mobile sidebar toggle
  mobileSidebarToggle?.addEventListener('click', () => {
    lawyerSidebar?.classList.toggle('open');
    sidebarBackdrop?.classList.toggle('open');
  });

  sidebarBackdrop?.addEventListener('click', () => {
    lawyerSidebar?.classList.remove('open');
    sidebarBackdrop?.classList.remove('open');
  });

  // Logout Handlers
  const logoutButtons = document.querySelectorAll('[data-action="logout"]');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      LegalStore.logoutLawyer();
      window.location.href = 'index.html';
    });
  });

  // -------------------------------------------------------------------------
  // 2. OVERVIEW MODULE
  // -------------------------------------------------------------------------
  function renderOverview() {
    const cases = LegalStore.getCases();
    const clients = LegalStore.getClients();
    const hearings = LegalStore.getHearings();
    const notifs = LegalStore.getNotifications();

    const activeCases = cases.filter(c => c.caseStatus === 'Active' || c.caseStatus === 'Listed');
    const deadlines = hearings.filter(h => h.type === 'Filing Deadline');

    document.getElementById('statTotalCases').textContent = cases.length;
    document.getElementById('statActiveCases').textContent = activeCases.length;
    document.getElementById('statTotalClients').textContent = clients.length;
    document.getElementById('statUpcomingHearings').textContent = hearings.length;
    document.getElementById('statPendingDeadlines').textContent = deadlines.length;

    // Cause List Table
    const causeListBody = document.getElementById('todayCauseListBody');
    if (causeListBody) {
      causeListBody.innerHTML = '';
      const topHearings = hearings.slice(0, 4);

      if (topHearings.length === 0) {
        causeListBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #64748b;">No court hearings scheduled for today.</td></tr>`;
      } else {
        topHearings.forEach(h => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>
              <strong style="color: var(--navy-950);">${h.caseNumber}</strong><br>
              <span style="font-size: 0.75rem; color: #64748b;">${h.itemNumber || 'Listed'}</span>
            </td>
            <td>${h.courtName}</td>
            <td>${h.stage}</td>
            <td><span class="badge-time">${h.time}</span></td>
            <td>
              <span class="status-badge ${h.type === 'Court Hearing' ? 'status-active' : 'status-pending'}">
                ${h.type}
              </span>
            </td>
          `;
          causeListBody.appendChild(row);
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // 3. CASE MANAGEMENT MODULE (CRUD)
  // -------------------------------------------------------------------------
  function renderCases() {
    const cases = LegalStore.getCases();
    const tableBody = document.getElementById('casesTableBody');
    const filterStatus = document.getElementById('casesFilterStatus')?.value || 'all';
    const searchQuery = document.getElementById('casesSearchInput')?.value.toLowerCase().trim() || '';

    if (!tableBody) return;
    tableBody.innerHTML = '';

    const filtered = cases.filter(c => {
      const matchesStatus = filterStatus === 'all' || c.caseStatus.toLowerCase() === filterStatus.toLowerCase();
      const matchesSearch = !searchQuery ||
        c.caseNumber.toLowerCase().includes(searchQuery) ||
        (c.cnrNumber && c.cnrNumber.toLowerCase().includes(searchQuery)) ||
        c.clientName.toLowerCase().includes(searchQuery) ||
        c.courtName.toLowerCase().includes(searchQuery) ||
        c.caseType.toLowerCase().includes(searchQuery);
      return matchesStatus && matchesSearch;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2.5rem; color: #64748b;">
            <i data-lucide="folder-x" style="width: 32px; height: 32px; margin: 0 auto 0.5rem auto; color: #94a3b8;"></i>
            <div>No matching cases found. Click "Add New Case" to register one.</div>
          </td>
        </tr>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach(c => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div style="font-weight: 700; color: var(--navy-950);">${c.caseNumber}</div>
          <div style="font-size: 0.75rem; color: #64748b;">CNR: ${c.cnrNumber || 'N/A'}</div>
        </td>
        <td>
          <div style="font-weight: 500;">${c.courtName}</div>
          <div style="font-size: 0.75rem; color: #64748b;">${c.courtBench || ''}</div>
        </td>
        <td><span class="badge-tag">${c.caseType}</span></td>
        <td><strong>${c.clientName}</strong></td>
        <td><span class="status-badge status-${c.caseStatus.toLowerCase().replace(/\s+/g, '-')}">${c.caseStatus}</span></td>
        <td>
          <div style="font-weight: 600;">${c.nextHearingDate}</div>
          <div style="font-size: 0.75rem; color: #64748b;">${c.stage || 'Hearing'}</div>
        </td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-sm btn-outline" onclick="openEditCaseModal('${c.id}')" title="Edit Case">
              <i data-lucide="edit-3"></i>
            </button>
            <button class="btn btn-sm btn-outline" style="color: #ef4444; border-color: #fca5a5;" onclick="confirmDeleteCase('${c.id}')" title="Delete Case">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Filter & Search events for Cases
  document.getElementById('casesFilterStatus')?.addEventListener('change', renderCases);
  document.getElementById('casesSearchInput')?.addEventListener('input', renderCases);

  // Add Case Modal Handlers
  const addCaseModal = document.getElementById('caseModal');
  const caseForm = document.getElementById('caseForm');
  const btnOpenAddCase = document.getElementById('btnOpenAddCase');
  const btnCloseCaseModal = document.getElementById('btnCloseCaseModal');

  // Populate client dropdown in case form
  function refreshClientOptions(selectedClientName = '') {
    const select = document.getElementById('caseClientName');
    if (!select) return;
    const clients = LegalStore.getClients();
    select.innerHTML = '<option value="">Select Existing Client or Type Name</option>';
    clients.forEach(cli => {
      const opt = document.createElement('option');
      opt.value = cli.name;
      opt.textContent = `${cli.name} (${cli.type})`;
      if (cli.name === selectedClientName) opt.selected = true;
      select.appendChild(opt);
    });
  }

  btnOpenAddCase?.addEventListener('click', () => {
    caseForm.reset();
    document.getElementById('caseModalId').value = '';
    document.getElementById('caseModalTitle').textContent = 'Add New Court Matter';
    refreshClientOptions();
    addCaseModal?.classList.add('active');
  });

  btnCloseCaseModal?.addEventListener('click', () => {
    addCaseModal?.classList.remove('active');
  });

  // Edit Case Modal Handler
  window.openEditCaseModal = (id) => {
    const c = LegalStore.getCaseById(id);
    if (!c) return;

    document.getElementById('caseModalId').value = c.id;
    document.getElementById('caseModalTitle').textContent = `Edit Case: ${c.caseNumber}`;
    document.getElementById('caseNumber').value = c.caseNumber;
    document.getElementById('caseCnr').value = c.cnrNumber || '';
    document.getElementById('caseCourtName').value = c.courtName;
    document.getElementById('caseCourtBench').value = c.courtBench || '';
    document.getElementById('caseType').value = c.caseType;
    document.getElementById('caseOpposing').value = c.opposingParty || '';
    document.getElementById('caseStatus').value = c.caseStatus;
    document.getElementById('caseNextHearing').value = c.nextHearingDate;
    document.getElementById('caseStage').value = c.stage || '';
    document.getElementById('caseDescription').value = c.description || '';

    refreshClientOptions(c.clientName);

    addCaseModal?.classList.add('active');
  };

  // Case Form Submit (Add or Update)
  caseForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('caseModalId').value;
    const caseNumber = document.getElementById('caseNumber').value.trim();
    const cnrNumber = document.getElementById('caseCnr').value.trim();
    const courtName = document.getElementById('caseCourtName').value.trim();
    const courtBench = document.getElementById('caseCourtBench').value.trim();
    const caseType = document.getElementById('caseType').value;
    const clientSelect = document.getElementById('caseClientName');
    const clientName = clientSelect.value || document.getElementById('caseClientNameCustom')?.value.trim() || 'Undisclosed Client';
    const opposingParty = document.getElementById('caseOpposing').value.trim();
    const caseStatus = document.getElementById('caseStatus').value;
    const nextHearingDate = document.getElementById('caseNextHearing').value;
    const stage = document.getElementById('caseStage').value.trim();
    const description = document.getElementById('caseDescription').value.trim();

    if (!caseNumber || !courtName || !nextHearingDate) {
      alert('Please fill in the Case Number, Court Name, and Next Hearing Date.');
      return;
    }

    const payload = {
      id: id || ('cas-' + Date.now()),
      caseNumber,
      cnrNumber: cnrNumber || ('DLDH01-' + Math.floor(100000 + Math.random() * 900000) + '-2024'),
      courtName,
      courtBench: courtBench || 'Court Room 04',
      caseType,
      clientName,
      opposingParty: opposingParty || 'Opposite Party',
      caseStatus,
      nextHearingDate,
      stage: stage || 'Hearing / Arguments',
      description
    };

    if (id) {
      LegalStore.updateCase(payload);
    } else {
      LegalStore.saveCase(payload);
      // Also add automatic calendar entry
      LegalStore.saveHearing({
        date: nextHearingDate,
        time: '10:30 AM',
        caseNumber,
        courtName,
        location: courtBench || courtName,
        stage: stage || 'Scheduled Hearing',
        itemNumber: 'Daily Board',
        type: 'Court Hearing'
      });
    }

    addCaseModal?.classList.remove('active');
    renderCases();
    renderOverview();
  });

  // Delete Case
  window.confirmDeleteCase = (id) => {
    if (confirm('Are you sure you want to delete this case from your practice management records?')) {
      LegalStore.deleteCase(id);
      renderCases();
      renderOverview();
    }
  };

  // -------------------------------------------------------------------------
  // 4. CLIENT MANAGEMENT MODULE (CRUD)
  // -------------------------------------------------------------------------
  function renderClients() {
    const clients = LegalStore.getClients();
    const container = document.getElementById('clientsListGrid');
    const searchVal = document.getElementById('clientsSearchInput')?.value.toLowerCase().trim() || '';

    if (!container) return;
    container.innerHTML = '';

    const filtered = clients.filter(c => {
      return !searchVal ||
        c.name.toLowerCase().includes(searchVal) ||
        c.email.toLowerCase().includes(searchVal) ||
        c.phone.toLowerCase().includes(searchVal) ||
        (c.address && c.address.toLowerCase().includes(searchVal));
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #ffffff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <i data-lucide="users" style="width: 36px; height: 36px; color: #94a3b8; margin: 0 auto 0.5rem auto;"></i>
          <h4 style="font-weight: 700; color: var(--navy-950);">No Clients Found</h4>
          <p style="color: #64748b; font-size: 0.9rem;">Add a client to connect them with active dockets and briefs.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = 'client-profile-card';
      card.innerHTML = `
        <div class="client-card-header">
          <div class="client-avatar-badge">${c.name.charAt(0)}</div>
          <div style="flex-grow: 1;">
            <h4 class="client-name">${c.name}</h4>
            <span class="client-type-tag">${c.type} Client</span>
          </div>
          <span class="status-badge ${c.status === 'Active' ? 'status-active' : 'status-pending'}">${c.status}</span>
        </div>

        <div class="client-card-body">
          <div class="client-info-row">
            <i data-lucide="phone"></i>
            <span>${c.phone}</span>
          </div>
          <div class="client-info-row">
            <i data-lucide="mail"></i>
            <span>${c.email}</span>
          </div>
          <div class="client-info-row">
            <i data-lucide="map-pin"></i>
            <span>${c.address || 'Address on file'}</span>
          </div>

          <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-light);">
            <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 0.4rem;">
              Associated Matters:
            </div>
            ${c.associatedCases && c.associatedCases.length > 0 ?
              c.associatedCases.map(cs => `<span class="badge-tag" style="margin-right: 0.35rem; margin-bottom: 0.35rem; display: inline-block;">${cs}</span>`).join('') :
              '<span style="font-size: 0.8rem; color: #94a3b8;">No matters currently linked</span>'}
          </div>
        </div>

        <div class="client-card-footer">
          <button class="btn btn-sm btn-outline" onclick="openEditClientModal('${c.id}')">
            <i data-lucide="edit"></i>
            <span>Edit</span>
          </button>
          <button class="btn btn-sm btn-outline" style="color: #ef4444; border-color: #fca5a5;" onclick="confirmDeleteClient('${c.id}')">
            <i data-lucide="trash-2"></i>
            <span>Remove</span>
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  document.getElementById('clientsSearchInput')?.addEventListener('input', renderClients);

  // Add / Edit Client Modal Handlers
  const clientModal = document.getElementById('clientModal');
  const clientForm = document.getElementById('clientForm');
  const btnOpenAddClient = document.getElementById('btnOpenAddClient');
  const btnCloseClientModal = document.getElementById('btnCloseClientModal');

  btnOpenAddClient?.addEventListener('click', () => {
    clientForm.reset();
    document.getElementById('clientModalId').value = '';
    document.getElementById('clientModalTitle').textContent = 'Add New Client';
    clientModal?.classList.add('active');
  });

  btnCloseClientModal?.addEventListener('click', () => {
    clientModal?.classList.remove('active');
  });

  window.openEditClientModal = (id) => {
    const clients = LegalStore.getClients();
    const c = clients.find(item => item.id === id);
    if (!c) return;

    document.getElementById('clientModalId').value = c.id;
    document.getElementById('clientModalTitle').textContent = `Edit Client: ${c.name}`;
    document.getElementById('clientName').value = c.name;
    document.getElementById('clientType').value = c.type;
    document.getElementById('clientEmail').value = c.email;
    document.getElementById('clientPhone').value = c.phone;
    document.getElementById('clientAddress').value = c.address || '';
    document.getElementById('clientStatus').value = c.status || 'Active';

    clientModal?.classList.add('active');
  };

  clientForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('clientModalId').value;
    const name = document.getElementById('clientName').value.trim();
    const type = document.getElementById('clientType').value;
    const email = document.getElementById('clientEmail').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const address = document.getElementById('clientAddress').value.trim();
    const status = document.getElementById('clientStatus').value;

    if (!name || !email || !phone) {
      alert('Please fill in Client Name, Email, and Phone Number.');
      return;
    }

    const payload = {
      id: id || ('cli-' + Date.now()),
      name,
      type,
      email,
      phone,
      address,
      status,
      associatedCases: []
    };

    if (id) {
      const existing = LegalStore.getClients().find(c => c.id === id);
      if (existing) payload.associatedCases = existing.associatedCases || [];
      LegalStore.updateClient(payload);
    } else {
      LegalStore.saveClient(payload);
    }

    clientModal?.classList.remove('active');
    renderClients();
    renderOverview();
  });

  window.confirmDeleteClient = (id) => {
    if (confirm('Are you sure you want to remove this client?')) {
      LegalStore.deleteClient(id);
      renderClients();
      renderOverview();
    }
  };

  // -------------------------------------------------------------------------
  // 5. CALENDAR & COURT SCHEDULE MODULE
  // -------------------------------------------------------------------------
  let currentCalDate = new Date(); // Current viewing month

  function renderCalendar() {
    const monthYearLabel = document.getElementById('calendarMonthYear');
    const calendarGrid = document.getElementById('calendarGridDays');
    const eventsList = document.getElementById('calendarEventsList');
    const hearings = LegalStore.getHearings();

    if (!calendarGrid) return;

    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (monthYearLabel) {
      monthYearLabel.textContent = `${monthNames[month]} ${year}`;
    }

    calendarGrid.innerHTML = '';

    // Calculate start day of month & total days
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Fill blank cells before 1st of month
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day-cell empty';
      calendarGrid.appendChild(emptyCell);
    }

    // Fill days of current month
    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell';

      const padM = String(month + 1).padStart(2, '0');
      const padD = String(day).padStart(2, '0');
      const dateStr = `${year}-${padM}-${padD}`;

      const todayStr = new Date().toISOString().split('T')[0];
      if (dateStr === todayStr) {
        cell.classList.add('today');
      }

      const dayEvents = hearings.filter(h => h.date === dateStr);
      if (dayEvents.length > 0) {
        cell.classList.add('has-events');
      }

      cell.innerHTML = `
        <span class="day-number">${day}</span>
        ${dayEvents.length > 0 ? `
          <div class="day-badge-wrap">
            ${dayEvents.map(ev => `<span class="cal-mini-dot ${ev.type === 'Filing Deadline' ? 'deadline' : 'hearing'}" title="${ev.caseNumber} - ${ev.stage}"></span>`).join('')}
            <span class="day-event-count">${dayEvents.length} listed</span>
          </div>` : ''}
      `;

      cell.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
        renderSelectedDateEvents(dateStr, dayEvents);
      });

      calendarGrid.appendChild(cell);
    }

    // Render list of upcoming schedule
    renderSelectedDateEvents(null, hearings);
  }

  function renderSelectedDateEvents(dateStr, events) {
    const listContainer = document.getElementById('calendarEventsList');
    const headerTitle = document.getElementById('selectedDateHeader');
    if (!listContainer) return;

    if (headerTitle) {
      headerTitle.textContent = dateStr ? `Events for ${dateStr}` : `Upcoming Court Hearings & Deadlines`;
    }

    listContainer.innerHTML = '';

    if (events.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #64748b;">
          <i data-lucide="calendar" style="width: 28px; height: 28px; color: #94a3b8; margin: 0 auto 0.5rem auto;"></i>
          <p>No court appearances or meetings scheduled for this date.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    events.forEach(ev => {
      const item = document.createElement('div');
      item.className = 'schedule-event-card';
      item.innerHTML = `
        <div class="event-time-badge">
          <strong>${ev.time}</strong>
          <span>${ev.date}</span>
        </div>
        <div class="event-details">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
            <h5 class="event-case-title">${ev.caseNumber}</h5>
            <span class="status-badge ${ev.type === 'Filing Deadline' ? 'status-pending' : 'status-active'}">${ev.type}</span>
          </div>
          <div class="event-court-meta">
            <i data-lucide="landmark"></i>
            <span>${ev.courtName} • ${ev.location}</span>
          </div>
          <div class="event-stage-meta">
            <i data-lucide="gavel"></i>
            <span>${ev.stage} (${ev.itemNumber || 'Board Listing'})</span>
          </div>
        </div>
      `;
      listContainer.appendChild(item);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Calendar Month Nav
  document.getElementById('calPrevMonth')?.addEventListener('click', () => {
    currentCalDate.setMonth(currentCalDate.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById('calNextMonth')?.addEventListener('click', () => {
    currentCalDate.setMonth(currentCalDate.getMonth() + 1);
    renderCalendar();
  });

  document.getElementById('calTodayBtn')?.addEventListener('click', () => {
    currentCalDate = new Date();
    renderCalendar();
  });

  // Schedule New Hearing Modal
  const scheduleModal = document.getElementById('scheduleModal');
  const scheduleForm = document.getElementById('scheduleForm');
  const btnOpenScheduleModal = document.getElementById('btnOpenScheduleModal');
  const btnCloseScheduleModal = document.getElementById('btnCloseScheduleModal');

  btnOpenScheduleModal?.addEventListener('click', () => {
    scheduleForm.reset();
    scheduleModal?.classList.add('active');
  });

  btnCloseScheduleModal?.addEventListener('click', () => {
    scheduleModal?.classList.remove('active');
  });

  scheduleForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const caseNumber = document.getElementById('schedCaseNumber').value.trim();
    const courtName = document.getElementById('schedCourtName').value.trim();
    const location = document.getElementById('schedLocation').value.trim();
    const date = document.getElementById('schedDate').value;
    const time = document.getElementById('schedTime').value;
    const stage = document.getElementById('schedStage').value.trim();
    const type = document.getElementById('schedType').value;

    if (!caseNumber || !courtName || !date || !time) {
      alert('Please fill in Case Number, Court, Date, and Time.');
      return;
    }

    LegalStore.saveHearing({
      caseNumber,
      courtName,
      location: location || courtName,
      date,
      time,
      stage: stage || 'Hearing',
      itemNumber: 'Daily Board',
      type
    });

    scheduleModal?.classList.remove('active');
    renderCalendar();
    renderOverview();
  });

  // -------------------------------------------------------------------------
  // 6. DOCUMENT MANAGEMENT MODULE
  // -------------------------------------------------------------------------
  function renderDocuments() {
    const docs = LegalStore.getDocuments();
    const tableBody = document.getElementById('documentsTableBody');
    const filterCase = document.getElementById('docFilterCase')?.value || 'all';

    // Populate filter case options
    const caseFilterSelect = document.getElementById('docFilterCase');
    if (caseFilterSelect && caseFilterSelect.options.length <= 1) {
      const cases = LegalStore.getCases();
      cases.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.caseNumber;
        opt.textContent = c.caseNumber;
        caseFilterSelect.appendChild(opt);
      });
    }

    if (!tableBody) return;
    tableBody.innerHTML = '';

    const filtered = docs.filter(d => filterCase === 'all' || d.caseNumber === filterCase);

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 2.5rem; color: #64748b;">
            <i data-lucide="file-x" style="width: 32px; height: 32px; margin: 0 auto 0.5rem auto; color: #94a3b8;"></i>
            <div>No legal documents uploaded yet for this matter.</div>
          </td>
        </tr>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    filtered.forEach(d => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <div style="width: 32px; height: 32px; border-radius: 6px; background: rgba(212, 175, 81, 0.15); color: var(--gold-600); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="file-text" style="width: 16px; height: 16px;"></i>
            </div>
            <div>
              <strong style="color: var(--navy-950);">${d.title}</strong>
              <div style="font-size: 0.75rem; color: #64748b;">Simulated Cloud Vault • Encrypted</div>
            </div>
          </div>
        </td>
        <td><span class="badge-tag">${d.caseNumber}</span></td>
        <td>${d.category}</td>
        <td>${d.uploadDate}</td>
        <td><span style="font-size: 0.8rem; color: #64748b;">${d.size}</span></td>
        <td>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn btn-sm btn-outline" onclick="previewDemoDocument('${d.title}', '${d.category}')" title="Preview Document">
              <i data-lucide="eye"></i>
            </button>
            <button class="btn btn-sm btn-outline" style="color: #ef4444; border-color: #fca5a5;" onclick="confirmDeleteDocument('${d.id}')" title="Delete">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  document.getElementById('docFilterCase')?.addEventListener('change', renderDocuments);

  // Document Upload Modal Handlers
  const docModal = document.getElementById('uploadDocModal');
  const docForm = document.getElementById('uploadDocForm');
  const btnOpenUploadDoc = document.getElementById('btnOpenUploadDoc');
  const btnCloseDocModal = document.getElementById('btnCloseDocModal');

  btnOpenUploadDoc?.addEventListener('click', () => {
    docForm.reset();
    // Populate case select in modal
    const modalCaseSelect = document.getElementById('uploadDocCase');
    if (modalCaseSelect) {
      modalCaseSelect.innerHTML = '';
      LegalStore.getCases().forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.caseNumber;
        opt.textContent = `${c.caseNumber} (${c.courtName})`;
        modalCaseSelect.appendChild(opt);
      });
    }
    docModal?.classList.add('active');
  });

  btnCloseDocModal?.addEventListener('click', () => {
    docModal?.classList.remove('active');
  });

  docForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('uploadDocTitle').value.trim();
    const caseNumber = document.getElementById('uploadDocCase').value;
    const category = document.getElementById('uploadDocCategory').value;

    if (!title || !caseNumber) {
      alert('Please specify a document title and associated case.');
      return;
    }

    LegalStore.saveDocument({
      title: title.endsWith('.pdf') ? title : title + '.pdf',
      caseNumber,
      category,
      uploadDate: new Date().toISOString().split('T')[0],
      size: (Math.random() * 4 + 1).toFixed(1) + ' MB',
      fileType: 'pdf'
    });

    docModal?.classList.remove('active');
    renderDocuments();
  });

  window.previewDemoDocument = (title, category) => {
    alert(`[Simulated PDF Viewer]\nDocument: ${title}\nCategory: ${category}\n\nIn this academic prototype, document content is securely simulated.`);
  };

  window.confirmDeleteDocument = (id) => {
    if (confirm('Delete this document from the case repository?')) {
      LegalStore.deleteDocument(id);
      renderDocuments();
    }
  };

  // -------------------------------------------------------------------------
  // 7. NOTIFICATIONS & ALERTS MODULE
  // -------------------------------------------------------------------------
  function renderNotifications() {
    const notifs = LegalStore.getNotifications();
    const listContainer = document.getElementById('notificationsFullList');
    const badge = document.getElementById('topNavNotifBadge');

    const unreadCount = notifs.filter(n => !n.read).length;
    if (badge) {
      badge.textContent = unreadCount;
      badge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
    }

    if (!listContainer) return;
    listContainer.innerHTML = '';

    if (notifs.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #64748b;">
          <i data-lucide="bell-off" style="width: 36px; height: 36px; color: #94a3b8; margin: 0 auto 0.5rem auto;"></i>
          <p>No active reminders or notifications.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    notifs.forEach(n => {
      const card = document.createElement('div');
      card.className = `notification-card ${n.read ? 'read' : 'unread'}`;

      let icon = 'bell';
      if (n.type === 'hearing') icon = 'gavel';
      if (n.type === 'deadline') icon = 'clock';
      if (n.type === 'update') icon = 'refresh-cw';

      card.innerHTML = `
        <div class="notif-icon-box ${n.type}">
          <i data-lucide="${icon}"></i>
        </div>
        <div class="notif-content">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.2rem;">
            <h5 class="notif-title">${n.title}</h5>
            <span class="notif-time">${n.timestamp}</span>
          </div>
          <p class="notif-desc">${n.message}</p>
        </div>
      `;
      listContainer.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  document.getElementById('markAllNotifsReadBtn')?.addEventListener('click', () => {
    LegalStore.markAllNotificationsRead();
    renderNotifications();
    renderOverview();
  });

  // -------------------------------------------------------------------------
  // 8. PROFILE & SETTINGS MODULE
  // -------------------------------------------------------------------------
  function renderAdvocateProfile(profile) {
    if (!profile) return;

    // Top Bar & Sidebar Profile Badges
    const navAdvocateName = document.getElementById('topAdvocateName');
    const sideAdvocateName = document.getElementById('sideAdvocateName');
    const sideBarId = document.getElementById('sideBarId');

    if (navAdvocateName) navAdvocateName.textContent = profile.name;
    if (sideAdvocateName) sideAdvocateName.textContent = profile.name;
    if (sideBarId) sideBarId.textContent = `Bar ID: ${profile.barId} [DEMO]`;

    // Profile Settings Form Fields
    const profName = document.getElementById('profName');
    const profEmail = document.getElementById('profEmail');
    const profPhone = document.getElementById('profPhone');
    const profBarId = document.getElementById('profBarId');
    const profCouncil = document.getElementById('profCouncil');
    const profChamber = document.getElementById('profChamber');
    const profPrimaryCourt = document.getElementById('profPrimaryCourt');

    if (profName) profName.value = profile.name;
    if (profEmail) profEmail.value = profile.email;
    if (profPhone) profPhone.value = profile.phone || '+91 98110 45210';
    if (profBarId) profBarId.value = profile.barId;
    if (profCouncil) profCouncil.value = profile.barCouncil || 'Bar Council of Delhi';
    if (profChamber) profChamber.value = profile.chamber || 'Chamber 418, Delhi HC';
    if (profPrimaryCourt) profPrimaryCourt.value = profile.primaryCourt || 'High Court of Delhi';
  }

  // Save Profile Form
  document.getElementById('profileSettingsForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const updated = {
      name: document.getElementById('profName').value.trim(),
      email: document.getElementById('profEmail').value.trim(),
      phone: document.getElementById('profPhone').value.trim(),
      barId: document.getElementById('profBarId').value.trim(),
      barCouncil: document.getElementById('profCouncil').value,
      chamber: document.getElementById('profChamber').value.trim(),
      primaryCourt: document.getElementById('profPrimaryCourt').value.trim(),
      verificationStatus: 'DEMO / NOT OFFICIALLY VERIFIED',
      practiceAreas: ['Civil Litigation', 'Criminal Law (BNS)', 'Commercial Arbitration']
    };

    LegalStore.saveLawyer(updated);
    renderAdvocateProfile(updated);
    alert('Advocate Chamber Profile updated locally.');
  });

  // Reset Demo Data
  document.getElementById('btnResetDemoData')?.addEventListener('click', () => {
    if (confirm('Reset all demo cases, clients, calendar entries, and documents to default synthetic state?')) {
      LegalStore.resetToDemo();
      const prof = LegalStore.getLawyer();
      renderAdvocateProfile(prof);
      renderOverview();
      renderCases();
      renderClients();
      renderCalendar();
      renderDocuments();
      renderNotifications();
      alert('Demo data restored to initial state.');
    }
  });

  // Initial renders
  renderOverview();
  renderNotifications();
});
