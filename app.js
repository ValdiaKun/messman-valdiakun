/* Messman Ready — no frameworks, accounts or servers required. */
'use strict';

const STORAGE_KEY = 'messman-ready:checklist:v1';
const MARINA = 'https://marina.gov.ph/approved-maritime-training-institutions/';
const MISMO = 'https://online-appointment.marina.gov.ph/';
const TESDA = 'https://www.tesda.gov.ph/';
const DMW = 'https://onlineservices.dmw.gov.ph/';
const DMW_HOME = 'https://dmw.gov.ph/';
const EGOV = 'https://e.gov.ph/';

// Core = commonly needed in the journey. Conditional = check with employer/agency.
// A "core" label is guidance, not a legal certification of universal requirements.
const STAGES = [
  {
    id: 'personal', title: 'Personal documents', subtitle: 'Start here — build your basic application folder.', color: 'green',
    tasks: [
      { id: 'age', title: 'Confirm you are at least 18 years old', description: 'Seafarers must meet the minimum age requirement.' },
      { id: 'birth', title: 'Prepare your PSA birth certificate', description: 'Keep the original safe and have a clear copy available.' },
      { id: 'passport', title: 'Get a valid Philippine passport', description: 'Make sure it has sufficient validity for your future assignment.' },
      { id: 'nbi', title: 'Secure a valid NBI clearance', description: 'Often requested during recruitment and documentation.' },
      { id: 'resume', title: 'Create a simple, updated resume', description: 'Include any kitchen, hotel, restaurant or housekeeping experience.' },
      { id: 'school', title: 'Prepare your school diploma or records', description: 'Educational documents can be requested by particular agencies.', conditional: true },
      { id: 'photos', title: 'Prepare recent ID photos', description: 'Some training centers and agencies request passport-size or 2×2 photos.', conditional: true }
    ]
  },
  {
    id: 'training', title: 'Training & certificates', subtitle: 'Learn safety at sea and the basics of shipboard service.', color: 'orange',
    tasks: [
      { id: 'bt', title: 'Complete MARINA-approved Basic Training (BT)', description: 'Enroll only in an approved center offering the current STCW curriculum.', url: MARINA, urlLabel: 'Approved training centers' },
      { id: 'bt-cop', title: 'Obtain your Basic Training COP', description: 'The training completion document and MARINA Certificate of Proficiency are not the same.', url: MISMO, urlLabel: 'MARINA MISMO' },
      { id: 'security', title: 'Complete your required security training', description: 'Ask whether Security Awareness or SDSD (designated security duties) applies to your position.', url: MISMO, urlLabel: 'MARINA portal' },
      { id: 'nc1', title: "Get TESDA Ship's Catering Services NC I", description: 'Useful for mess hall and housekeeping skills; some manning agencies require it. Confirm before paying.', conditional: true, url: TESDA, urlLabel: 'Explore TESDA' },
      { id: 'food', title: 'Take extra food hygiene / company training', description: 'Only if requested by the company or required for your particular vessel.', conditional: true }
    ]
  },
  {
    id: 'seafarer', title: 'Seafarer documents', subtitle: 'Set up the accounts and IDs used by Filipino seafarers.', color: 'blue',
    tasks: [
      { id: 'mismo', title: 'Create or update your MARINA MISMO account', description: 'Used for MARINA seafarer certificates and related applications.', url: MISMO, urlLabel: 'Go to MISMO' },
      { id: 'srb', title: "Apply for your Seafarer's Record Book (SRB)", description: 'Also called a seaman’s book. New appointments are booked in the eGovPH app (MARINA service).', url: EGOV, urlLabel: 'eGovPH portal' },
      { id: 'dmw', title: 'Register with DMW e-Registration', description: 'Prepare your online profile for overseas employment applications.', url: DMW, urlLabel: 'DMW e-Registration' },
      { id: 'sid', title: "Obtain a Seafarer's Identity Document (SID)", description: 'If required, book your new appointment using the eGovPH app (MARINA service).', conditional: true, url: EGOV, urlLabel: 'eGovPH portal' }
    ]
  },
  {
    id: 'apply', title: 'Find your first job', subtitle: 'Apply safely, even if you do not have sea experience yet.', color: 'purple',
    tasks: [
      { id: 'agency', title: 'Check that your manning agency is DMW-licensed', description: 'Verify the agency and job offer through the official DMW website. Avoid unauthorized recruitment fees.', url: DMW_HOME, urlLabel: 'Official DMW website' },
      { id: 'copies', title: 'Organize scanned copies of your documents', description: 'Use a clear file name for each PDF or image before uploading.' },
      { id: 'applications', title: 'Apply for beginner-friendly messman roles', description: 'Look for trainee, utility or catering-department roles that accept first-timers.' },
      { id: 'interview', title: 'Practice your interview and basic English', description: 'Be ready to explain food hygiene, cleanliness, teamwork and shipboard life.' }
    ]
  },
  {
    id: 'boarding', title: 'After you get hired', subtitle: 'Finish these with guidance from your licensed agency.', color: 'gray',
    tasks: [
      { id: 'peme', title: 'Pass your pre-employment medical exam (PEME)', description: 'Use the employer’s approved facility and follow their timing instructions.', later: true },
      { id: 'contract', title: 'Review and sign your approved employment contract', description: 'Read your job role, wage, contract length and onboard conditions carefully.', later: true },
      { id: 'oec', title: 'Complete DMW deployment and OEC requirements', description: 'Your agency will advise which official clearance steps apply.', later: true, url: DMW, urlLabel: 'DMW Online Services' },
      { id: 'visa', title: 'Get visas and vaccinations, if applicable', description: 'Requirements differ by vessel itinerary and destination.', conditional: true, later: true },
      { id: 'orientation', title: 'Attend required pre-departure briefings', description: 'Complete company- or DMW-required orientations when instructed.', conditional: true, later: true },
      { id: 'additional', title: 'Complete any vessel-specific training', description: 'Do this only if the hiring company identifies a need.', conditional: true, later: true }
    ]
  }
];

const ALL_TASKS = STAGES.flatMap(stage => stage.tasks.map(task => ({ ...task, stageId: stage.id })));
const VALID_IDS = new Set(ALL_TASKS.map(task => task.id));
const CORE_TASKS = ALL_TASKS.filter(task => !task.conditional);
const completed = loadSaved();
const opened = new Set(['personal', 'training']);
let activeFilter = 'all';
let toastTimer;

const stageList = document.getElementById('stage-list');
const searchInput = document.getElementById('task-search');
const guideDialog = document.getElementById('guide-dialog');
let activeGuideId = null;
let lastGuideTrigger = null;

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.completedIds)) return new Set();
    return new Set(parsed.completedIds.filter(id => typeof id === 'string' && VALID_IDS.has(id)));
  } catch (_) { return new Set(); }
}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, completedIds: [...completed] })); }
  catch (_) { toast('Progress cannot be saved in this browser. Try enabling site storage.'); }
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
}
function icon(name) { return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`; }
function coreCounts(tasks) {
  const core = tasks.filter(task => !task.conditional);
  return { done: core.filter(task => completed.has(task.id)).length, total: core.length };
}
function matching(task) {
  const search = searchInput.value.trim().toLocaleLowerCase();
  const guide = GUIDES[task.id] || {};
  const matchesText = !search || [task.title, task.description, guide.why, ...(guide.steps || []), guide.bring].join(' ').toLocaleLowerCase().includes(search);
  const matchesState = activeFilter === 'all' || (activeFilter === 'done' ? completed.has(task.id) : !completed.has(task.id));
  return matchesText && matchesState;
}
function renderTask(task) {
  const done = completed.has(task.id);
  const flags = [task.conditional ? '<span class="task-tag task-tag-conditional">If required</span>' : '', task.later ? '<span class="task-tag task-tag-later">After hiring</span>' : ''].join('');
  return `<div class="task" id="task-${task.id}" data-done="${done}">
    <input type="checkbox" class="task-check" id="check-${task.id}" data-task-id="${task.id}" ${done?'checked':''} aria-label="${escapeHtml(task.title)}">
    <div class="task-content"><div class="task-title-line"><label for="check-${task.id}" class="task-title">${escapeHtml(task.title)}</label>${flags}</div>
    <p>${escapeHtml(task.description)}</p>
    <button type="button" class="task-guide" data-guide="${task.id}" aria-label="View guide: ${escapeHtml(task.title)}">${icon('book')} View guide ${icon('arrow')}</button>
    </div></div>`;
}
function renderJourney() {
  const grid = document.getElementById('journey-grid');
  grid.innerHTML = STAGES.map((stage, index) => {
    const {done, total} = coreCounts(stage.tasks);
    return `<button class="journey-card" type="button" data-jump-stage="${stage.id}">
      <span class="journey-number">${String(index+1).padStart(2,'0')}</span>
      <strong>${escapeHtml(stage.title)}</strong>
      <span>${escapeHtml(stage.subtitle)}</span>
      <span class="journey-count">${done}/${total} essential steps ${icon('arrow')}</span>
    </button>`;
  }).join('');
}

function render() {
  let displayed = 0;
  const html = STAGES.map((stage, index) => {
    const matched = stage.tasks.filter(matching);
    if (!matched.length) return '';
    displayed += matched.length;
    const { done, total } = coreCounts(stage.tasks);
    const progress = total ? Math.round(done / total * 100) : 100;
    return `<details class="stage-card" data-stage-id="${stage.id}" data-theme="${stage.color}" ${opened.has(stage.id)?'open':''}>
      <summary><span class="stage-number">${String(index + 1).padStart(2,'0')}</span>
      <span class="stage-copy"><strong>${escapeHtml(stage.title)}</strong><small>${escapeHtml(stage.subtitle)}</small></span>
      <span class="stage-meta"><span class="stage-count">${done}/${total}</span><span class="stage-progress"><span style="width:${progress}%"></span></span>${icon('chevron')}</span></summary>
      <div class="stage-tasks">${matched.map(renderTask).join('')}</div></details>`;
  }).join('');
  stageList.innerHTML = html;
  document.getElementById('empty-message').hidden = displayed > 0;
  stageList.querySelectorAll('details').forEach(el => el.addEventListener('toggle', () => {
    if (el.open) opened.add(el.dataset.stageId);
    else opened.delete(el.dataset.stageId);
  }));
  stageList.querySelectorAll('.task-check').forEach(el => el.addEventListener('change', () => {
    toggleTask(el.dataset.taskId);
  }));
  updateSummary();
  renderJourney();
}
function updateSummary() {
  const counts = coreCounts(CORE_TASKS);
  const remaining = counts.total - counts.done;
  const pct = counts.total ? Math.round(counts.done / counts.total * 100) : 100;
  document.getElementById('progress-ring').style.setProperty('--progress', `${pct}%`);
  document.getElementById('progress-percent').textContent = `${pct}%`;
  document.getElementById('progress-label').textContent = `${counts.done} of ${counts.total}`;
  document.getElementById('completed-count').textContent = counts.done;
  document.getElementById('remaining-count').textContent = remaining;
  const next = CORE_TASKS.find(task => !completed.has(task.id));
  document.getElementById('next-title').textContent = next ? next.title : 'All core steps complete!';
  document.getElementById('next-description').textContent = next ? next.description : 'Excellent progress. Review conditional items with your agency before boarding.';
  const button = document.getElementById('next-button');
  button.innerHTML = next ? `Go to step ${icon('arrow')}` : `Review checklist ${icon('arrow')}`;
  button.dataset.nextId = next?.id || '';
}
function focusTask(id) {
  const task = ALL_TASKS.find(item => item.id === id);
  if (!task) { document.getElementById('checklist').scrollIntoView(); return; }
  opened.add(task.stageId);
  activeFilter = 'all';
  searchInput.value = '';
  updateFilterButtons();
  render();
  requestAnimationFrame(() => {
    const row = document.getElementById(`task-${id}`);
    row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    row?.querySelector('input')?.focus({ preventScroll: true });
  });
}
function guideLink(link) {
  // All links come from the trusted, static GUIDES data (no user-provided URLs).
  return `<a class="guide-resource-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} ${icon('external')}</a>`;
}
function showGuide(id, preserveOpen = false) {
  const task = ALL_TASKS.find(item => item.id === id);
  const guide = GUIDES[id];
  if (!task || !guide) return;
  if (!preserveOpen) lastGuideTrigger = document.activeElement;
  activeGuideId = id;
  const stageIndex = STAGES.findIndex(stage => stage.id === task.stageId);
  document.getElementById('guide-stage').textContent = `STAGE ${stageIndex + 1} · ${STAGES[stageIndex].title.toUpperCase()}`;
  document.getElementById('guide-title').textContent = task.title;
  const steps = guide.steps.map((step, i) => `<li><span class="guide-step-number">${i+1}</span><span>${escapeHtml(step)}</span></li>`).join('');
  const resources = guide.links?.length ? `<section class="guide-panel"><h3>Official links & references</h3><div class="guide-links">${guide.links.map(guideLink).join('')}</div><p class="guide-online-hint">Government websites require an internet connection.</p></section>` : '';
  document.getElementById('guide-content').innerHTML = `
    <div class="guide-flags">${task.conditional ? '<span class="guide-flag">Only if your employer requires it</span>' : '<span class="guide-flag guide-flag-core">Common preparation step</span>'}${task.later ? '<span class="guide-flag">Do this after a job offer</span>' : ''}</div>
    <section class="guide-panel guide-intro"><h3>Why this matters</h3><p>${escapeHtml(guide.why)}</p></section>
    <section class="guide-panel"><h3>How to do it</h3><ol class="guide-steps">${steps}</ol></section>
    ${guide.bring ? `<section class="guide-panel guide-prepare"><h3>What to prepare</h3><p>${escapeHtml(guide.bring)}</p></section>` : ''}
    ${resources}
    ${guide.note ? `<aside class="guide-tip"><strong>Important to know</strong><p>${escapeHtml(guide.note)}</p></aside>` : ''}
  `;
  const done = completed.has(id);
  const doneButton = document.getElementById('guide-done');
  doneButton.textContent = done ? '✓ Completed · Undo' : '✓ Mark complete';
  doneButton.setAttribute('aria-pressed', String(done));
  const next = ALL_TASKS[ALL_TASKS.findIndex(t => t.id === id) + 1];
  const nextButton = document.getElementById('guide-next');
  nextButton.disabled = !next;
  nextButton.innerHTML = next ? `Next guide ${icon('arrow')}` : 'Last guide';
  if (!guideDialog.open) guideDialog.showModal();
  document.getElementById('guide-content').scrollTop = 0;
  guideDialog.querySelector('.guide-dialog-shell').scrollTop = 0;
  if (!preserveOpen) document.getElementById('guide-close').focus();
}
function toggleTask(id) {
  if (completed.has(id)) completed.delete(id); else completed.add(id);
  save();
  render();
  if (activeGuideId === id && guideDialog.open) showGuide(id, true);
}
function closeGuide() { if (guideDialog.open) guideDialog.close(); }

function updateFilterButtons() {
  document.querySelectorAll('.filter-button').forEach(button => {
    const active = button.dataset.filter === activeFilter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3500);
}
function exportProgress() {
  const data = JSON.stringify({ app: 'Messman Ready', version: 1, exportedAt: new Date().toISOString(), completedIds: [...completed] }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'messman-ready-progress.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Backup downloaded. Keep it somewhere safe.');
}
async function importProgress(file) {
  if (!file) return;
  try {
    if (file.size > 100_000) throw new Error('File is too large.');
    const data = JSON.parse(await file.text());
    if (!data || data.app !== 'Messman Ready' || data.version !== 1 || !Array.isArray(data.completedIds) || data.completedIds.some(id => typeof id !== 'string' || !VALID_IDS.has(id))) throw new Error('This is not a valid Messman Ready backup.');
    if (!confirm('Restore this backup? Your current checklist will be replaced.')) return;
    completed.clear();
    data.completedIds.forEach(id => completed.add(id));
    save(); render(); toast('Your checklist has been restored.');
  } catch (error) { toast(error.message || 'Could not read that backup file.'); }
}

stageList.addEventListener('click', event => {
  const button = event.target.closest('button[data-guide]');
  if (button) showGuide(button.dataset.guide);
});
document.getElementById('journey-grid').addEventListener('click', event => {
  const button = event.target.closest('[data-jump-stage]');
  if (!button) return;
  opened.add(button.dataset.jumpStage);
  activeFilter = 'all'; searchInput.value = '';
  updateFilterButtons(); render();
  document.querySelector(`[data-stage-id="${button.dataset.jumpStage}"]`)?.scrollIntoView({behavior:'smooth',block:'start'});
});
document.getElementById('guide-close').addEventListener('click', closeGuide);
guideDialog.addEventListener('click', event => { if (event.target === guideDialog) closeGuide(); });
guideDialog.addEventListener('close', () => {
  activeGuideId = null;
  if (lastGuideTrigger?.isConnected) lastGuideTrigger.focus({preventScroll:true});
});
document.getElementById('guide-done').addEventListener('click', () => {
  if (activeGuideId) toggleTask(activeGuideId);
});
document.getElementById('guide-next').addEventListener('click', () => {
  const index = ALL_TASKS.findIndex(t => t.id === activeGuideId);
  if (ALL_TASKS[index+1]) showGuide(ALL_TASKS[index+1].id, true);
});
document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  updateFilterButtons();
  render();
}));
searchInput.addEventListener('input', render);
document.getElementById('next-button').addEventListener('click', event => {
  const id = event.currentTarget.dataset.nextId;
  if (id) showGuide(id);
  else document.getElementById('checklist').scrollIntoView({ behavior:'smooth' });
});
document.getElementById('export-button').addEventListener('click', exportProgress);
document.getElementById('import-button').addEventListener('click', () => document.getElementById('import-file').click());
document.getElementById('import-file').addEventListener('change', event => {
  importProgress(event.target.files?.[0]);
  event.target.value = '';
});
document.getElementById('print-button').addEventListener('click', () => {
  // Print the entire checklist, regardless of the current search or filter.
  activeFilter = 'all';
  searchInput.value = '';
  STAGES.forEach(stage => opened.add(stage.id));
  updateFilterButtons();
  render();
  window.print();
});
document.getElementById('reset-button').addEventListener('click', () => {
  if (!completed.size) { toast('Your checklist is already clear.'); return; }
  if (!confirm('Start over? This clears all checked items on this device. Download a backup first if you want to save your progress.')) return;
  completed.clear(); save(); render(); toast('Checklist reset. A fresh start!');
});

render();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}