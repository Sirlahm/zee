import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// 📿 QURANIC VERSES FOR EACH DAY
const quranVerses = [
  { arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ", translation: "O you who believe! Fasting is prescribed for you", reference: "Al-Baqarah 2:183" },
  { arabic: "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ", translation: "The month of Ramadan in which was revealed the Quran", reference: "Al-Baqarah 2:185" },
  { arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ", translation: "And when My servants ask you concerning Me, indeed I am near", reference: "Al-Baqarah 2:186" },
  { arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", translation: "Indeed, Allah is with the patient", reference: "Al-Baqarah 2:153" },
  { arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ", translation: "So remember Me; I will remember you", reference: "Al-Baqarah 2:152" },
];

// 💕 ROMANTIC ISLAMIC MESSAGES
const loveMessages = [
  "May Allah bless our love and make us companions in Jannah 💚",
  "You make my deen and dunya beautiful, Alhamdulillah 🌙",
  "Praying for us to grow closer to Allah together ✨",
  "May Allah accept our fasts and make us among the righteous 🤲",
  "You're my favorite blessing this Ramadan 💝",
  "May we break our fasts together in this life and the next, insha'Allah 🌟",
  "Allah brought us together, and I'm forever grateful 💚",
  "Loving you for the sake of Allah makes my heart peaceful 🕌",
];

// 🤲 DUA CATEGORIES
const duaCategories = [
  {
    id: 1, title: "For Our Relationship", duas: [
      "May Allah bless our bond and make it a source of peace",
      "May Allah make us best friends and companions in Jannah",
      "May Allah protect our love and keep us together",
    ]
  },
  {
    id: 2, title: "For Our Families", duas: [
      "May Allah guide our parents and grant them Jannah",
      "May Allah bless our families with health and iman",
      "May Allah unite our families in love and harmony",
    ]
  },
  {
    id: 3, title: "For Forgiveness", duas: [
      "May Allah forgive our sins and shortcomings",
      "May Allah accept our repentance and good deeds",
      "May Allah purify our hearts and intentions",
    ]
  },
  {
    id: 4, title: "For the Ummah", duas: [
      "May Allah grant victory to the oppressed",
      "May Allah unite the Muslim ummah",
      "May Allah guide us all to the straight path",
    ]
  },
];

// 🔐 Password Screen
const PasswordScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const SECRET = 'ridzee'; // Change this!

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === SECRET) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="password-screen">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="password-card"
      >
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        >
          <div className="islamic-pattern-top"></div>
          <div className="crescent-icon">🌙</div>
          <h1 className="password-title">Our Blessed Ramadan</h1>
          <p className="password-subtitle">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>

          <form onSubmit={handleSubmit} className="password-form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="password-input"
              autoFocus
            />
            {error && <p className="password-error">Try again, حبيبتي (Habibti) 💚</p>}
            <motion.button
              type="submit"
              className="password-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Journey
            </motion.button>
          </form>
          <div className="islamic-pattern-bottom"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// 🏠 Main Dashboard
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [ramadanDay, setRamadanDay] = useState(1);

  // Load saved data
  const [fastingDays, setFastingDays] = useState(() => {
    const saved = localStorage.getItem('ramadan_fasting');
    return saved ? JSON.parse(saved) : Array(30).fill(false);
  });

  const [prayers, setPrayers] = useState(() => {
    const saved = localStorage.getItem('ramadan_prayers');
    return saved ? JSON.parse(saved) : {
      fajr: Array(30).fill(false),
      dhuhr: Array(30).fill(false),
      asr: Array(30).fill(false),
      maghrib: Array(30).fill(false),
      isha: Array(30).fill(false),
    };
  });

  const [quranProgress, setQuranProgress] = useState(() => {
    const saved = localStorage.getItem('ramadan_quran');
    return saved ? parseInt(saved) : 0;
  });

  const [goodDeeds, setGoodDeeds] = useState(() => {
    const saved = localStorage.getItem('ramadan_deeds');
    return saved ? JSON.parse(saved) : [];
  });

  const [checkedDuas, setCheckedDuas] = useState(() => {
    const saved = localStorage.getItem('ramadan_duas');
    return saved ? JSON.parse(saved) : [];
  });

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('ramadan_fasting', JSON.stringify(fastingDays));
  }, [fastingDays]);

  useEffect(() => {
    localStorage.setItem('ramadan_prayers', JSON.stringify(prayers));
  }, [prayers]);

  useEffect(() => {
    localStorage.setItem('ramadan_quran', quranProgress.toString());
  }, [quranProgress]);

  useEffect(() => {
    localStorage.setItem('ramadan_deeds', JSON.stringify(goodDeeds));
  }, [goodDeeds]);

  useEffect(() => {
    localStorage.setItem('ramadan_duas', JSON.stringify(checkedDuas));
  }, [checkedDuas]);

  const toggleFasting = (day) => {
    const newDays = [...fastingDays];
    newDays[day] = !newDays[day];
    setFastingDays(newDays);
  };

  const togglePrayer = (prayer, day) => {
    const newPrayers = { ...prayers };
    newPrayers[prayer][day] = !newPrayers[prayer][day];
    setPrayers(newPrayers);
  };

  const addGoodDeed = (deed) => {
    const newDeeds = [...goodDeeds, { text: deed, date: new Date().toISOString(), day: ramadanDay }];
    setGoodDeeds(newDeeds);
  };

  const toggleDua = (duaText) => {
    if (checkedDuas.includes(duaText)) {
      setCheckedDuas(checkedDuas.filter(d => d !== duaText));
    } else {
      setCheckedDuas([...checkedDuas, duaText]);
    }
  };

  const todaysPrayers = {
    fajr: prayers.fajr[ramadanDay - 1],
    dhuhr: prayers.dhuhr[ramadanDay - 1],
    asr: prayers.asr[ramadanDay - 1],
    maghrib: prayers.maghrib[ramadanDay - 1],
    isha: prayers.isha[ramadanDay - 1],
  };

  const completedPrayers = Object.values(todaysPrayers).filter(Boolean).length;
  const fastingCompleted = fastingDays.filter(Boolean).length;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">رَمَضَان مُبَارَك</h1>
          <p className="header-subtitle">Our Blessed Journey Together</p>
        </div>
        <div className="day-selector">
          <button onClick={() => setRamadanDay(Math.max(1, ramadanDay - 1))} className="day-btn">‹</button>
          <div className="current-day">
            <span className="day-label">Day</span>
            <span className="day-number">{ramadanDay}</span>
          </div>
          <button onClick={() => setRamadanDay(Math.min(30, ramadanDay + 1))} className="day-btn">›</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab ${activeTab === 'prayers' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('prayers')}
        >
          🕌 Prayers
        </button>
        <button
          className={`tab ${activeTab === 'quran' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('quran')}
        >
          📖 Quran
        </button>
        <button
          className={`tab ${activeTab === 'duas' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('duas')}
        >
          🤲 Duas
        </button>
        <button
          className={`tab ${activeTab === 'deeds' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('deeds')}
        >
          ✨ Deeds
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <OverviewTab
            key="overview"
            ramadanDay={ramadanDay}
            fastingDays={fastingDays}
            toggleFasting={toggleFasting}
            completedPrayers={completedPrayers}
            quranProgress={quranProgress}
            fastingCompleted={fastingCompleted}
          />
        )}
        {activeTab === 'prayers' && (
          <PrayersTab
            key="prayers"
            ramadanDay={ramadanDay}
            prayers={prayers}
            togglePrayer={togglePrayer}
            todaysPrayers={todaysPrayers}
          />
        )}
        {activeTab === 'quran' && (
          <QuranTab
            key="quran"
            quranProgress={quranProgress}
            setQuranProgress={setQuranProgress}
          />
        )}
        {activeTab === 'duas' && (
          <DuasTab
            key="duas"
            checkedDuas={checkedDuas}
            toggleDua={toggleDua}
          />
        )}
        {activeTab === 'deeds' && (
          <DeedsTab
            key="deeds"
            goodDeeds={goodDeeds}
            addGoodDeed={addGoodDeed}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// 📊 Overview Tab
const OverviewTab = ({ ramadanDay, fastingDays, toggleFasting, completedPrayers, quranProgress, fastingCompleted }) => {
  const verse = quranVerses[ramadanDay % quranVerses.length];
  const message = loveMessages[ramadanDay % loveMessages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="tab-content"
    >
      {/* Daily Verse */}
      <div className="verse-card">
        <p className="verse-arabic">{verse.arabic}</p>
        <p className="verse-translation">{verse.translation}</p>
        <p className="verse-reference">{verse.reference}</p>
      </div>

      {/* Love Message */}
      <div className="love-message-card">
        <div className="heart-icon">💚</div>
        <p className="love-message">{message}</p>
      </div>

      {/* Today's Progress */}
      <div className="progress-grid">
        <div className="progress-card">
          <div className="progress-icon">🌙</div>
          <div className="progress-info">
            <div className="progress-label">Fasting</div>
            <div className="progress-status">
              <input
                type="checkbox"
                checked={fastingDays[ramadanDay - 1]}
                onChange={() => toggleFasting(ramadanDay - 1)}
                className="custom-checkbox"
              />
              <span>{fastingDays[ramadanDay - 1] ? 'Completed ✓' : 'Mark as done'}</span>
            </div>
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-icon">🕌</div>
          <div className="progress-info">
            <div className="progress-label">Prayers</div>
            <div className="progress-value">{completedPrayers}/5</div>
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-icon">📖</div>
          <div className="progress-info">
            <div className="progress-label">Quran</div>
            <div className="progress-value">{quranProgress}/30 Juz</div>
          </div>
        </div>
      </div>

      {/* Month Overview */}
      <div className="month-overview">
        <h3 className="section-title">Ramadan Calendar</h3>
        <div className="calendar-grid">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className={`calendar-day ${fastingDays[i] ? 'completed' : ''} ${i + 1 === ramadanDay ? 'current' : ''}`}
            >
              {i + 1}
              {fastingDays[i] && <span className="check-mark">✓</span>}
            </div>
          ))}
        </div>
        <div className="calendar-stats">
          <span>{fastingCompleted}/30 days completed</span>
        </div>
      </div>
    </motion.div>
  );
};

// 🕌 Prayers Tab
const PrayersTab = ({ ramadanDay, prayers, togglePrayer, todaysPrayers }) => {
  const prayerNames = [
    { key: 'fajr', name: 'Fajr', icon: '🌅', time: 'Dawn' },
    { key: 'dhuhr', name: 'Dhuhr', icon: '☀️', time: 'Noon' },
    { key: 'asr', name: 'Asr', icon: '🌤️', time: 'Afternoon' },
    { key: 'maghrib', name: 'Maghrib', icon: '🌆', time: 'Sunset' },
    { key: 'isha', name: 'Isha', icon: '🌙', time: 'Night' },
  ];

  const totalCompleted = Object.values(prayers).reduce((sum, prayerDays) =>
    sum + prayerDays.filter(Boolean).length, 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="tab-content"
    >
      <div className="prayers-header">
        <h3 className="section-title">Day {ramadanDay} Prayers</h3>
        <div className="prayers-stats">
          {Object.values(todaysPrayers).filter(Boolean).length}/5 completed
        </div>
      </div>

      <div className="prayers-list">
        {prayerNames.map(prayer => (
          <div key={prayer.key} className="prayer-item">
            <div className="prayer-info">
              <span className="prayer-icon">{prayer.icon}</span>
              <div>
                <div className="prayer-name">{prayer.name}</div>
                <div className="prayer-time">{prayer.time}</div>
              </div>
            </div>
            <label className="prayer-checkbox">
              <input
                type="checkbox"
                checked={todaysPrayers[prayer.key]}
                onChange={() => togglePrayer(prayer.key, ramadanDay - 1)}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        ))}
      </div>

      <div className="prayers-total">
        <div className="total-card">
          <div className="total-number">{totalCompleted}</div>
          <div className="total-label">Total prayers this Ramadan</div>
          <div className="total-subtitle">Out of {ramadanDay * 5} possible</div>
        </div>
      </div>

      <div className="hadith-card">
        <p className="hadith-icon">📿</p>
        <p className="hadith-text">"The five daily prayers... are expiation for whatever sins come in between, so long as one does not commit any major sin."</p>
        <p className="hadith-reference">- Sahih Muslim</p>
      </div>
    </motion.div>
  );
};

// 📖 Quran Tab
const QuranTab = ({ quranProgress, setQuranProgress }) => {
  const juzNames = Array.from({ length: 30 }, (_, i) => `Juz ${i + 1}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="tab-content"
    >
      <div className="quran-header">
        <h3 className="section-title">Quran Progress</h3>
        <div className="quran-stats">
          {quranProgress}/30 Juz completed
        </div>
      </div>

      <div className="quran-progress-circle">
        <svg className="progress-ring" width="200" height="200">
          <circle
            className="progress-ring-circle-bg"
            cx="100"
            cy="100"
            r="90"
          />
          <circle
            className="progress-ring-circle"
            cx="100"
            cy="100"
            r="90"
            style={{
              strokeDashoffset: 565 - (565 * quranProgress) / 30
            }}
          />
        </svg>
        <div className="progress-ring-text">
          <div className="progress-percentage">{Math.round((quranProgress / 30) * 100)}%</div>
          <div className="progress-label">Complete</div>
        </div>
      </div>

      <div className="juz-selector">
        <label className="juz-label">Update Progress:</label>
        <input
          type="range"
          min="0"
          max="30"
          value={quranProgress}
          onChange={(e) => setQuranProgress(parseInt(e.target.value))}
          className="juz-slider"
        />
        <div className="juz-display">{quranProgress} Juz</div>
      </div>

      <div className="quran-goal">
        <div className="goal-icon">🎯</div>
        <div className="goal-text">
          <strong>Goal:</strong> Complete the entire Quran this Ramadan!
        </div>
        {quranProgress === 30 && (
          <div className="goal-celebration">
            <div className="celebration-icon">🎉</div>
            <p>Alhamdulillah! You completed the Quran! May Allah accept it! 💚</p>
          </div>
        )}
      </div>

      <div className="hadith-card">
        <p className="hadith-icon">📖</p>
        <p className="hadith-text">"Read the Quran, for it will come as an intercessor for its reciters on the Day of Resurrection."</p>
        <p className="hadith-reference">- Sahih Muslim</p>
      </div>
    </motion.div>
  );
};

// 🤲 Duas Tab
const DuasTab = ({ checkedDuas, toggleDua }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="tab-content"
    >
      <div className="duas-header">
        <h3 className="section-title">Our Dua List</h3>
        <p className="duas-subtitle">Prayers we're making together 🤲</p>
      </div>

      {duaCategories.map(category => (
        <div key={category.id} className="dua-category">
          <h4 className="category-title">{category.title}</h4>
          <div className="duas-list">
            {category.duas.map((dua, index) => (
              <div key={index} className="dua-item">
                <label className="dua-checkbox">
                  <input
                    type="checkbox"
                    checked={checkedDuas.includes(dua)}
                    onChange={() => toggleDua(dua)}
                  />
                  <span className="checkmark"></span>
                </label>
                <span className={`dua-text ${checkedDuas.includes(dua) ? 'checked' : ''}`}>
                  {dua}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="dua-reminder">
        <div className="reminder-icon">✨</div>
        <p className="reminder-text">
          "And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me."
        </p>
        <p className="reminder-reference">- Al-Baqarah 2:186</p>
      </div>
    </motion.div>
  );
};

// ✨ Good Deeds Tab
const DeedsTab = ({ goodDeeds, addGoodDeed }) => {
  const [newDeed, setNewDeed] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDeed.trim()) {
      addGoodDeed(newDeed.trim());
      setNewDeed('');
    }
  };

  const deedsByDay = goodDeeds.reduce((acc, deed) => {
    if (!acc[deed.day]) acc[deed.day] = [];
    acc[deed.day].push(deed);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="tab-content"
    >
      <div className="deeds-header">
        <h3 className="section-title">Good Deeds</h3>
        <div className="deeds-count">{goodDeeds.length} deeds recorded</div>
      </div>

      <form onSubmit={handleSubmit} className="add-deed-form">
        <input
          type="text"
          value={newDeed}
          onChange={(e) => setNewDeed(e.target.value)}
          placeholder="Add a good deed... (e.g., Gave sadaqah, helped someone)"
          className="deed-input"
        />
        <motion.button
          type="submit"
          className="deed-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add ✨
        </motion.button>
      </form>

      {goodDeeds.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🌟</div>
          <p>Start recording your good deeds!</p>
        </div>
      ) : (
        <div className="deeds-timeline">
          {Object.keys(deedsByDay).sort((a, b) => b - a).map(day => (
            <div key={day} className="deeds-day">
              <div className="day-badge">Day {day}</div>
              <div className="deeds-day-list">
                {deedsByDay[day].map((deed, index) => (
                  <div key={index} className="deed-card">
                    <span className="deed-icon">✓</span>
                    <span className="deed-text">{deed.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="hadith-card">
        <p className="hadith-icon">💎</p>
        <p className="hadith-text">"Whoever does a good deed will have ten times as much."</p>
        <p className="hadith-reference">- Al-An'am 6:160</p>
      </div>
    </motion.div>
  );
};

// 🎮 Main App
function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="ramadan-app">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <PasswordScreen key="password" onUnlock={() => setUnlocked(true)} />
        ) : (
          <Dashboard key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
