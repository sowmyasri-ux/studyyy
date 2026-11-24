(() => {
  const schedule = {
    monday: [
      ['09:00 AM – 10:00 AM', 'Web Development', 'Room 204'],
      ['10:30 AM – 11:30 AM', 'Data Structures', 'Lab 02'],
      ['12:00 PM – 01:00 PM', 'Mathematics', 'Room 108'],
      ['02:00 PM – 03:00 PM', 'Communication Skills', 'Room 301']
    ],
    tuesday: [
      ['09:00 AM – 10:00 AM', 'Statistics', 'Room 112'],
      ['10:30 AM – 11:30 AM', 'Mathematics', 'Room 108'],
      ['12:00 PM – 01:00 PM', 'Web Development', 'Lab 01']
    ],
    wednesday: [
      ['09:00 AM – 10:00 AM', 'Data Structures', 'Lab 02'],
      ['10:30 AM – 11:30 AM', 'Communication Skills', 'Room 301'],
      ['12:00 PM – 01:00 PM', 'Statistics', 'Room 112']
    ],
    thursday: [
      ['09:00 AM – 10:00 AM', 'Mathematics', 'Room 108'],
      ['10:30 AM – 11:30 AM', 'Web Development', 'Room 204'],
      ['12:00 PM – 01:00 PM', 'Data Structures', 'Lab 02']
    ],
    friday: [
      ['09:00 AM – 10:00 AM', 'Communication Skills', 'Room 301'],
      ['10:30 AM – 11:30 AM', 'Statistics', 'Room 112'],
      ['12:00 PM – 01:00 PM', 'Mathematics', 'Room 108']
    ]
  };
  const dayNames = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday' };
  const dates = { monday: 23, tuesday: 24, wednesday: 25, thursday: 26, friday: 27 };
  const scheduleList = document.querySelector('#schedule-list');
  const scheduleLabel = document.querySelector('#selected-day-label');
  const scheduleDateLabel = document.querySelector('#selected-date-label');
  const dayTabs = [...document.querySelectorAll('.day-tab')];

  function renderSchedule(day) {
    scheduleList.innerHTML = schedule[day].map(([time, subject, room]) => `
      <div class="schedule-item">
        <span class="schedule-time">${time}</span>
        <span class="schedule-course"><strong>${subject}</strong><small>Semester 01 · Lecture</small></span>
        <span class="schedule-location">${room}</span>
      </div>`).join('');
    const selectedTab = dayTabs.find((tab) => tab.dataset.day === day);
    scheduleList.setAttribute('aria-labelledby', selectedTab.id);
    scheduleLabel.textContent = dayNames[day];
    scheduleDateLabel.textContent = `${dates[day]} November`;
    const bottom = document.querySelector('.schedule-bottom > span:last-child');
    bottom.innerHTML = `${schedule[day].length} sessions <b>·</b> ${schedule[day].length} hours`;
  }

  dayTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      dayTabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      renderSchedule(tab.dataset.day);
    });
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % dayTabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + dayTabs.length) % dayTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = dayTabs.length - 1;
      dayTabs[next].focus();
      dayTabs[next].click();
    });
  });
  renderSchedule('monday');

  const navToggle = document.querySelector('.menu-toggle');
  const scrim = document.querySelector('.sidebar-scrim');
  function setNavOpen(open) {
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    scrim.tabIndex = open ? 0 : -1;
  }
  navToggle.addEventListener('click', () => setNavOpen(!document.body.classList.contains('nav-open')));
  scrim.addEventListener('click', () => setNavOpen(false));
  document.querySelectorAll('.nav-link, .student-mini, .brand').forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  const sectionNames = new Map([...document.querySelectorAll('.side-nav a')].map((link) => [link.hash, link.querySelector('span:nth-child(2)').textContent]));
  const navLinks = [...document.querySelectorAll('.side-nav .nav-link')];
  const currentSection = document.querySelector('#current-section');
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const hash = `#${visible.target.id}`;
    currentSection.textContent = sectionNames.get(hash) || (hash === '#settings' ? 'Settings' : 'Overview');
    navLinks.forEach((link) => {
      const active = link.hash === hash || (hash === '#overview' && link.hash === '#overview');
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-18% 0px -70% 0px', threshold: [0, .1, .25] });
  document.querySelectorAll('.page-section, #settings').forEach((section) => observer.observe(section));

  const announcementList = document.querySelector('.announcement-list');
  const unreadCount = document.querySelector('#unread-count');
  const notificationDot = document.querySelector('.notification-dot');
  function updateUnreadCount() {
    const count = announcementList.querySelectorAll('.announcement.unread').length;
    unreadCount.textContent = count;
    unreadCount.hidden = count === 0;
    notificationDot.hidden = count === 0;
    document.querySelector('.menu-heading span').textContent = `${count} unread`;
    const announcementCards = [...announcementList.querySelectorAll('.announcement')];
    notificationMenu.querySelectorAll('.notification-item').forEach((item, index) => {
      const statusDot = item.querySelector('i');
      statusDot.hidden = !announcementCards[index]?.classList.contains('unread');
    });
  }
  document.querySelectorAll('.read-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.announcement');
      const markRead = button.getAttribute('aria-pressed') !== 'true';
      card.classList.toggle('unread', !markRead);
      card.classList.toggle('read', markRead);
      button.setAttribute('aria-pressed', String(markRead));
      button.textContent = markRead ? 'Mark as unread' : 'Mark as read';
      const status = card.querySelector('.unread-label, .read-label');
      status.className = markRead ? 'read-label' : 'unread-label';
      status.innerHTML = markRead ? 'READ' : '<i></i>UNREAD';
      updateUnreadCount();
    });
  });
  updateUnreadCount();

  const notificationToggle = document.querySelector('#notification-toggle');
  const notificationMenu = document.querySelector('#notification-menu');
  notificationToggle.addEventListener('click', () => {
    const open = notificationToggle.getAttribute('aria-expanded') !== 'true';
    notificationToggle.setAttribute('aria-expanded', String(open));
    notificationMenu.hidden = !open;
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.notification-wrap')) {
      notificationMenu.hidden = true;
      notificationToggle.setAttribute('aria-expanded', 'false');
    }
  });
  notificationMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    notificationMenu.hidden = true;
    notificationToggle.setAttribute('aria-expanded', 'false');
  }));

  const search = document.querySelector('#site-search');
  const searchItems = [...document.querySelectorAll('[data-searchable]')];
  const feedback = document.querySelector('#search-feedback');
  let feedbackTimer;
  function filterSearch() {
    const query = search.value.trim().toLocaleLowerCase();
    let matches = 0;
    searchItems.forEach((item) => {
      const matched = !query || item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !matched;
      if (matched) matches += 1;
    });
    if (query) {
      feedback.textContent = matches ? `${matches} matching item${matches === 1 ? '' : 's'} found` : `No matches for “${search.value.trim()}”`;
      feedback.hidden = false;
      clearTimeout(feedbackTimer);
      feedbackTimer = setTimeout(() => { feedback.hidden = true; }, 2200);
    } else {
      feedback.hidden = true;
    }
  }
  search.addEventListener('input', filterSearch);
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      search.focus();
    }
    if (event.key === 'Escape') {
      notificationMenu.hidden = true;
      notificationToggle.setAttribute('aria-expanded', 'false');
      setNavOpen(false);
      if (document.activeElement === search) {
        search.value = '';
        filterSearch();
        search.blur();
      }
    }
  });
})();
