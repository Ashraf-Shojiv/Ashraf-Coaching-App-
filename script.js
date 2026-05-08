let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').style.display = 'block';
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(r => {
      deferredPrompt = null;
      document.getElementById('installBanner').style.display = 'none';
    });
  } else {
    // iOS fallback
    alert('iOS-এ: Share বাটন ⬆️ → "Add to Home Screen" চাপুন');
  }
}

window.addEventListener('appinstalled', () => {
  document.getElementById('installBanner').style.display = 'none';
});

// ===== DATA =====
let students = [
  { id: 'AC-001', name: 'Mohammad Rahim', class: 9, batch: 'Science', fee: 2500, phone: '01712345678', address: 'Bayazid, Ctg', paid: true, paidDate: 'May 1', referredBy: null, referrals: ['AC-004'], avatar: 'av-blue', password: '1234' },
  { id: 'AC-002', name: 'Fatema Khatun', class: 7, batch: 'General', fee: 2000, phone: '01823456789', address: 'Oxygen, Ctg', paid: true, paidDate: 'May 2', referredBy: 'AC-001', referrals: [], avatar: 'av-green', password: '1234' },
  { id: 'AC-003', name: 'Hasan Ali', class: 10, batch: 'Science', fee: 3000, phone: '01934567890', address: 'Bayazid, Ctg', paid: false, paidDate: null, referredBy: null, referrals: ['AC-005'], avatar: 'av-gold', password: '1234' },
  { id: 'AC-004', name: 'Sumaiya Islam', class: 5, batch: 'General', fee: 1500, phone: '01745678901', address: 'Pahartali, Ctg', paid: true, paidDate: 'May 3', referredBy: 'AC-001', referrals: [], avatar: 'av-purple', password: '1234' },
  { id: 'AC-005', name: 'Rakib Hossain', class: 10, batch: 'Commerce', fee: 2800, phone: '01856789012', address: 'Bayazid, Ctg', paid: false, paidDate: null, referredBy: 'AC-003', referrals: [], avatar: 'av-red', password: '1234' },
  { id: 'AC-006', name: 'Nadia Begum', class: 3, batch: 'General', fee: 1200, phone: '01967890123', address: 'Oxygen, Ctg', paid: true, paidDate: 'May 1', referredBy: null, referrals: [], avatar: 'av-blue', password: '1234' },
];

let currentUser = null;
let currentUserType = null;

const weeklyRoutine = [
  { day: 'শনিবার', isToday: false, slots: [
    { time: '৩:০০ PM', subject: 'গণিত', topic: 'বীজগণিত - সমীকরণ', batch: 'class1' },
    { time: '৪:৩০ PM', subject: 'ইংরেজি', topic: 'Grammar - Tense', batch: 'class1' },
    { time: '৬:০০ PM', subject: 'বিজ্ঞান', topic: 'Physics - Motion', batch: 'ssc' },
  ]},
  { day: 'রবিবার', isToday: false, slots: [
    { time: '৩:০০ PM', subject: 'গণিত', topic: 'SSC - Trigonometry', batch: 'ssc' },
    { time: '৫:০০ PM', subject: 'হিসাববিজ্ঞান', topic: 'Journal Entry', batch: 'commerce' },
    { time: '৬:৩০ PM', subject: 'বাংলা', topic: 'রচনা ও ব্যাকরণ', batch: 'class1' },
  ]},
  { day: 'সোমবার', isToday: false, slots: [
    { time: '৩:০০ PM', subject: 'বিজ্ঞান', topic: 'Chemistry - Periodic Table', batch: 'ssc' },
    { time: '৫:০০ PM', subject: 'গণিত', topic: 'Class 5-7 পাটীগণিত', batch: 'class1' },
    { time: '৭:০০ PM', subject: 'ব্যবসায় শিক্ষা', topic: 'Management', batch: 'commerce' },
  ]},
  { day: 'মঙ্গলবার', isToday: true, slots: [
    { time: '৩:০০ PM', subject: 'ইংরেজি', topic: 'SSC Reading & Writing', batch: 'ssc' },
    { time: '৫:০০ PM', subject: 'গণিত', topic: 'Geometry - Triangle', batch: 'class1' },
    { time: '৬:৩০ PM', subject: 'হিসাববিজ্ঞান', topic: 'Ledger & Trial Balance', batch: 'commerce' },
  ]},
  { day: 'বুধবার', isToday: false, slots: [
    { time: '৩:০০ PM', subject: 'Physics', topic: 'Electricity - Current', batch: 'ssc' },
    { time: '৫:০০ PM', subject: 'গণিত', topic: 'Statistics', batch: 'ssc' },
    { time: '৭:০০ PM', subject: 'English', topic: 'Commerce English', batch: 'commerce' },
  ]},
  { day: 'বৃহস্পতিবার', isToday: false, slots: [
    { time: '৩:০০ PM', subject: 'বিজ্ঞান', topic: 'Biology - Cell', batch: 'ssc' },
    { time: '৫:০০ PM', subject: 'সাধারণ বিজ্ঞান', topic: 'Class 4-7 বিজ্ঞান', batch: 'class1' },
    { time: '৬:৩০ PM', subject: 'গণিত', topic: 'Business Math', batch: 'commerce' },
  ]},
];

const quizData = [
  { q: 'পানির রাসায়নিক সূত্র কোনটি?', options: ['CO₂', 'H₂O', 'NaCl', 'O₂'], ans: 1 },
  { q: 'বাংলাদেশের রাজধানী কোনটি?', options: ['চট্টগ্রাম', 'খুলনা', 'ঢাকা', 'সিলেট'], ans: 2 },
  { q: '২ × ৩ + ৪ = ?', options: ['১৪', '১০', '১২', '৮'], ans: 1 },
  { q: 'সূর্য কোন দিকে ওঠে?', options: ['পশ্চিম', 'উত্তর', 'দক্ষিণ', 'পূর্ব'], ans: 3 },
  { q: 'Photosynthesis-এ কোন গ্যাস ব্যবহৃত হয়?', options: ['O₂', 'CO₂', 'N₂', 'H₂'], ans: 1 },
];

let currentQ = 0;
let answered = false;

// ===== FUNCTIONS =====
function switchLoginTab(type) {
  ['admin','student','parent'].forEach(t => {
    document.getElementById(t+'Login').style.display = 'none';
    document.querySelectorAll('.login-tab').forEach((el,i) => {
      if(['admin','student','parent'][i] === type) el.classList.add('active');
      else el.classList.remove('active');
    });
  });
  document.getElementById(type+'Login').style.display = 'block';
}

function login(type) {
  if(type === 'admin') {
    const u = document.getElementById('adminUser').value;
    const p = document.getElementById('adminPass').value;
    if(u === 'admin' && p === '1234') {
      currentUserType = 'admin';
      renderStudentsList(students);
      renderPayments();
      renderRoutine('all');
      renderReferrals();
      showScreen('adminDash');
      showToast('Welcome, Ashraf Sir! 👋');
    } else {
      showToast('Wrong credentials! ❌');
    }
  } else if(type === 'student') {
    const id = document.getElementById('stuId').value.toUpperCase();
    const pass = document.getElementById('stuPass').value;
    const stu = students.find(s => s.id === id && s.password === pass);
    if(stu) {
      currentUser = stu;
      currentUserType = 'student';
      document.getElementById('stuDashName').textContent = stu.name.split(' ')[0] + ' 📚';
      document.getElementById('stuIdPill').textContent = '🆔 ' + stu.id;
      document.getElementById('stuClassPill').textContent = '📚 Class ' + stu.class;
      document.getElementById('stuFeePill').textContent = stu.paid ? '✅ Paid' : '⚠️ Due';
      document.getElementById('stuFeePill').style.color = stu.paid ? 'var(--accent-green)' : 'var(--accent-red)';
      document.getElementById('myRefCode').textContent = stu.id;
      renderMyRoutine(stu);
      renderMyPayments(stu);
      showScreen('studentDash');
      showToast('Welcome, ' + stu.name.split(' ')[0] + '! 🎓');
    } else {
      showToast('Wrong ID or password! ❌');
    }
  } else {
    showToast('Parent login coming soon! 🔜');
  }
}

function logout() {
  currentUser = null;
  currentUserType = null;
  showScreen('loginScreen');
  showToast('Logged out successfully');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function renderStudentsList(list) {
  const container = document.getElementById('studentsList');
  const total = document.getElementById('totalStudents');
  const due = document.getElementById('dueCnt');
  total.textContent = students.length;
  due.textContent = students.filter(s => !s.paid).length;
  
  container.innerHTML = list.map(s => `
    <div class="student-card grade-${s.class}" onclick="showStudentDetail('${s.id}')">
      <div class="student-avatar ${s.avatar}">${s.name.charAt(0)}</div>
      <div class="student-info">
        <div class="student-name">${s.name}</div>
        <div class="student-meta">Class ${s.class} · ${s.batch}</div>
        <span class="payment-status ${s.paid ? 'paid' : 'due'}">${s.paid ? '✅ Paid - '+s.paidDate : '⚠️ DUE'}</span>
      </div>
      <div>
        <div class="student-id-badge">${s.id}</div>
        <div style="font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:700; color:var(--accent-gold); text-align:right; margin-top:6px">৳${s.fee}</div>
      </div>
    </div>
  `).join('');
}

function filterStudents(q) {
  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(q.toLowerCase()) || 
    s.id.toLowerCase().includes(q.toLowerCase())
  );
  renderStudentsList(filtered);
}

function filterByClass(el, val) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  if(val === 'all') renderStudentsList(students);
  else {
    const ranges = {'1':[1,3],'4':[4,5],'6':[6,7],'8':[8,10]};
    const r = ranges[val];
    renderStudentsList(students.filter(s => s.class >= r[0] && s.class <= r[1]));
  }
}

function showStudentDetail(id) {
  const s = students.find(st => st.id === id);
  const content = document.getElementById('studentDetailContent');
  content.innerHTML = `
    <div class="detail-header">
      <div class="detail-avatar ${s.avatar}" style="font-size:28px; font-weight:700; width:70px; height:70px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; border:2px solid">${s.name.charAt(0)}</div>
      <div class="detail-name">${s.name}</div>
      <div class="detail-id">${s.id} · ${s.batch}</div>
      <div style="margin-top:8px">
        <span class="payment-status ${s.paid ? 'paid' : 'due'}" style="font-size:13px">${s.paid ? '✅ PAID' : '⚠️ PAYMENT DUE'}</span>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-item"><div class="info-label">CLASS</div><div class="info-value">Class ${s.class}</div></div>
      <div class="info-item"><div class="info-label">BATCH</div><div class="info-value">${s.batch}</div></div>
      <div class="info-item"><div class="info-label">MONTHLY FEE</div><div class="info-value" style="color:var(--accent-gold)">৳${s.fee}</div></div>
      <div class="info-item"><div class="info-label">REFERRALS</div><div class="info-value" style="color:var(--accent-purple)">${s.referrals.length} জন</div></div>
      <div class="info-item full"><div class="info-label">PHONE</div><div class="info-value">${s.phone}</div></div>
      <div class="info-item full"><div class="info-label">ADDRESS</div><div class="info-value">${s.address}</div></div>
      ${s.referredBy ? `<div class="info-item full"><div class="info-label">REFERRED BY</div><div class="info-value" style="color:var(--accent-purple)">${s.referredBy}</div></div>` : ''}
    </div>

    <div class="section-header"><span class="section-title">💳 PAYMENT HISTORY</span></div>
    ${['May 2026','April 2026','March 2026'].map((m,i) => `
    <div class="payment-row">
      <div><div class="payment-month">${m}</div><div class="payment-date">${i===0 ? (s.paid ? 'Paid on '+s.paidDate : 'Not paid') : 'Paid'}</div></div>
      <div>
        <div class="payment-amount">৳${s.fee}</div>
        <span class="payment-status ${i===0 ? (s.paid?'paid':'due') : 'paid'}" style="float:right">${i===0 ? (s.paid?'✅':'⚠️') : '✅'}</span>
      </div>
    </div>`).join('')}

    <div style="padding:16px; display:flex; gap:10px">
      <button class="btn-primary btn-green btn-sm" onclick="markPaid('${s.id}')">✅ Mark Paid</button>
      <button class="btn-primary btn-sm" style="background:linear-gradient(135deg,#b44fff,#6600cc)" onclick="showToast('Routine updated!')">📅 Edit Routine</button>
    </div>
  `;
  showScreen('studentDetail');
}

function markPaid(id) {
  const s = students.find(st => st.id === id);
  s.paid = true;
  s.paidDate = 'May 8';
  renderStudentsList(students);
  showStudentDetail(id);
  showToast('Payment marked as paid! ✅');
}

function renderPayments() {
  const paid = document.getElementById('paymentList');
  const due = document.getElementById('dueList');
  
  const paidStudents = students.filter(s => s.paid);
  const dueStudents = students.filter(s => !s.paid);
  
  paid.innerHTML = paidStudents.map(s => `
    <div class="payment-row">
      <div style="display:flex; align-items:center; gap:10px">
        <div class="student-avatar ${s.avatar}" style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px">${s.name.charAt(0)}</div>
        <div><div class="payment-month">${s.name}</div><div class="payment-date">${s.id} · ${s.paidDate}</div></div>
      </div>
      <div><div class="payment-amount">৳${s.fee}</div><span class="payment-status paid">✅</span></div>
    </div>
  `).join('');

  due.innerHTML = dueStudents.map(s => `
    <div class="payment-row">
      <div style="display:flex; align-items:center; gap:10px">
        <div class="student-avatar ${s.avatar}" style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px">${s.name.charAt(0)}</div>
        <div><div class="payment-month">${s.name}</div><div class="payment-date">${s.id} · Class ${s.class}</div></div>
      </div>
      <div>
        <div class="payment-amount">৳${s.fee}</div>
        <span class="payment-status due">⚠️ DUE</span>
      </div>
    </div>
  `).join('');
}

function renderRoutine(filter) {
  const container = document.getElementById('routineList');
  container.innerHTML = weeklyRoutine.map(day => {
    const slots = filter === 'all' ? day.slots : day.slots.filter(s => s.batch === filter);
    if(slots.length === 0) return '';
    return `
    <div class="routine-day">
      <div class="routine-day-header">
        <div class="day-name">${day.day}</div>
        ${day.isToday ? '<span class="today-badge">আজ</span>' : ''}
      </div>
      ${slots.map(slot => `
        <div class="subject-slot">
          <div class="slot-time">${slot.time}</div>
          <div>
            <div class="slot-subject">${slot.subject}</div>
            <div class="slot-topic">${slot.topic}</div>
          </div>
        </div>
      `).join('')}
    </div>`;
  }).join('');
}

function filterRoutine(el, val) {
  document.querySelectorAll('#routineScreen .filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderRoutine(val);
}

function renderReferrals() {
  const container = document.getElementById('referralList');
  const referrers = students.filter(s => s.referrals.length > 0).sort((a,b) => b.referrals.length - a.referrals.length);
  
  container.innerHTML = referrers.map((s, i) => `
    <div class="payment-row">
      <div style="display:flex; align-items:center; gap:10px">
        <div style="font-family:'Rajdhani',sans-serif; font-size:20px; font-weight:700; color:${i===0?'var(--accent-gold)':i===1?'#aaa':'#cd7f32'}; width:24px">#${i+1}</div>
        <div class="student-avatar ${s.avatar}" style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px">${s.name.charAt(0)}</div>
        <div><div class="payment-month">${s.name}</div><div class="payment-date">${s.id}</div></div>
      </div>
      <div style="text-align:right">
        <div style="font-family:'Rajdhani',sans-serif; font-size:20px; font-weight:700; color:var(--accent-purple)">${s.referrals.length} referral</div>
        <div style="font-size:12px; color:var(--accent-green)">৳${s.referrals.length * 200} saved</div>
      </div>
    </div>
  `).join('');
}

function addReferral() {
  const newId = document.getElementById('newRefStudent').value.toUpperCase();
  const refBy = document.getElementById('refByStudent').value.toUpperCase();
  const referer = students.find(s => s.id === refBy);
  const newStu = students.find(s => s.id === newId);
  
  if(!referer || !newStu) { showToast('Student ID পাওয়া যায়নি! ❌'); return; }
  if(!referer.referrals.includes(newId)) {
    referer.referrals.push(newId);
    newStu.referredBy = refBy;
    renderReferrals();
    showToast('Referral added! ৳200 discount applied ✅');
  } else {
    showToast('Already referred! ❌');
  }
}

function addStudent() {
  const name = document.getElementById('newName').value.trim();
  const cls = parseInt(document.getElementById('newClass').value);
  const batch = document.getElementById('newBatch').value;
  const fee = parseInt(document.getElementById('newFee').value) || 2000;
  const phone = document.getElementById('newPhone').value;
  const address = document.getElementById('newAddress').value;
  const ref = document.getElementById('newReferral').value.toUpperCase();

  if(!name) { showToast('নাম দিন! ❌'); return; }

  const id = 'AC-' + String(students.length + 1).padStart(3, '0');
  const avatars = ['av-blue','av-green','av-gold','av-purple','av-red'];
  const newStu = { id, name, class: cls, batch, fee, phone, address, paid: false, paidDate: null, referredBy: ref || null, referrals: [], avatar: avatars[students.length % 5], password: '1234' };
  
  students.push(newStu);
  
  if(ref) {
    const referer = students.find(s => s.id === ref);
    if(referer) referer.referrals.push(id);
  }

  renderStudentsList(students);
  renderPayments();
  renderReferrals();

  // Clear form
  ['newName','newFee','newPhone','newAddress','newReferral'].forEach(f => document.getElementById(f).value = '');
  
  showToast(`${name} added! ID: ${id} 🎉`);
  showScreen('studentsScreen');
}

function renderMyRoutine(stu) {
  const container = document.getElementById('myRoutineContent');
  const batchMap = { 'Science': 'ssc', 'Commerce': 'commerce', 'General': 'class1', 'Humanities': 'ssc' };
  const myBatch = batchMap[stu.batch] || 'class1';
  
  container.innerHTML = `
    <div style="padding:12px 16px 4px">
      <div style="background:linear-gradient(135deg,rgba(0,200,255,0.1),rgba(0,255,135,0.05)); border:1px solid rgba(0,200,255,0.2); border-radius:12px; padding:12px; text-align:center">
        <div style="font-size:12px; color:var(--text-muted)">তোমার Batch</div>
        <div style="font-family:'Rajdhani',sans-serif; font-size:18px; font-weight:700; color:var(--accent-blue)">${stu.batch} · Class ${stu.class}</div>
      </div>
    </div>
  ` + weeklyRoutine.map(day => {
    const slots = day.slots.filter(s => s.batch === myBatch || s.batch === 'class1');
    if(slots.length === 0) return '';
    return `
    <div class="routine-day" style="margin-top:10px">
      <div class="routine-day-header">
        <div class="day-name">${day.day}</div>
        ${day.isToday ? '<span class="today-badge">আজ</span>' : ''}
      </div>
      ${slots.map(slot => `
        <div class="subject-slot">
          <div class="slot-time">${slot.time}</div>
          <div><div class="slot-subject">${slot.subject}</div><div class="slot-topic">${slot.topic}</div></div>
        </div>
      `).join('')}
    </div>`;
  }).join('');
}

function renderMyPayments(stu) {
  const container = document.getElementById('myPaymentContent');
  container.innerHTML = `
    <div style="padding:16px">
      <div style="background:linear-gradient(135deg,#0d2040,#0d1a30); border:1px solid rgba(255,215,0,0.3); border-radius:14px; padding:16px; margin-bottom:16px">
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:4px">মাসিক ফি</div>
        <div style="font-family:'Rajdhani',sans-serif; font-size:32px; font-weight:700; color:var(--accent-gold)">৳${stu.fee}</div>
        <span class="payment-status ${stu.paid ? 'paid' : 'due'}" style="font-size:13px">${stu.paid ? '✅ এই মাস পরিশোধ হয়েছে' : '⚠️ এই মাস বাকি আছে'}</span>
      </div>
    </div>
    <div class="section-header"><span class="section-title">💳 PAYMENT HISTORY</span></div>
    ${['May 2026','April 2026','March 2026','February 2026'].map((m, i) => `
    <div class="payment-row">
      <div><div class="payment-month">${m}</div><div class="payment-date">${i===0 ? (stu.paid ? 'Paid · '+stu.paidDate : 'Pending') : 'Paid'}</div></div>
      <div>
        <div class="payment-amount">৳${stu.fee}</div>
        <span class="payment-status ${i===0 ? (stu.paid?'paid':'due') : 'paid'}">${i===0 ? (stu.paid?'✅':'⚠️') : '✅'}</span>
      </div>
    </div>`).join('')}
  `;
}

// Quiz
function loadQuiz() {
  const q = quizData[currentQ];
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('quizResult').style.display = 'none';
  answered = false;
  
  const opts = document.getElementById('quizOptions');
  opts.innerHTML = q.options.map((o, i) => `
    <div class="quiz-option" onclick="answerQuiz(${i}, this)">${String.fromCharCode(65+i)}) ${o}</div>
  `).join('');
}

function answerQuiz(idx, el) {
  if(answered) return;
  answered = true;
  const correct = quizData[currentQ].ans;
  
  document.querySelectorAll('.quiz-option').forEach((opt, i) => {
    if(i === correct) opt.classList.add('correct');
    else if(i === idx && idx !== correct) opt.classList.add('wrong');
  });

  if(idx === correct) {
    showToast('সঠিক উত্তর! 🎉');
    document.getElementById('quizResult').style.display = 'block';
  } else {
    showToast('ভুল হয়েছে! সঠিক: ' + quizData[currentQ].options[correct]);
    setTimeout(nextQuestion, 1500);
  }
}

function nextQuestion() {
  currentQ = (currentQ + 1) % quizData.length;
  loadQuiz();
}

// Init
loadQuiz();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(r => console.log('SW registered'))
      .catch(e => console.log('SW failed:', e));
  });
}