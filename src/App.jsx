import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// 🎨 Modern Floating Background
const FloatingBackground = () => {
  const shapes = ['💫', '✨', '🌟', '💝', '🦋', '🌸', '💕'];

  return (
    <div className="floating-bg">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="floating-shape"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -100, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {shapes[Math.floor(Math.random() * shapes.length)]}
        </motion.div>
      ))}
    </div>
  );
};

// 🔐 Password Modal
const PasswordModal = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [hint, setHint] = useState('');

  const SECRET_KEY = 'ashabi';
  const [attempts, setAttempts] = useState(0);

  const levelHints = [
    "First miss… warm-up round!",
    "Second attempt? Now we’re getting competitive 😎",
    "You’re still wrong, but your determination is elite 💼",
    "At this point, I’m rooting for you heavily 👀",
    "Legend says the right password is still out there...",
    "Nope! But I admire your confidence 😄",
    "Close… like Lagos traffic close. Try again!",
    "Password rejected. Don't worry, you're still awesome 😂",
    "Almost! Okay not really, but I believe in you 💪",
    "Plot twist: That wasn’t it. Try another one!",
    "Nice try! But the door remains locked 🚪😌",

    "The suspense is killing me… try again!",
    "That ain’t it champ!",
    "Password says: 'Try again, my friend.'",
    "We move! Try another one 😄",
    "That guess went straight to the recycle bin.",
    "The app blinked twice — it’s confused too.",
    "Nice attempt! Still wrong though 😂",
    "Imagine the right answer… now type that.",
    "So close! (In a parallel universe.)",
    "Rejected. But with respect 🙏",
    "I’ve seen worse guesses. But still wrong.",
    "Error 404: Correct password not found 😉",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === SECRET_KEY) {
      onUnlock();
    } else {
      setShake(true);
      setAttempts(attempts + 1);
      setHint(levelHints[Math.min(attempts, levelHints.length - 1)]);
      setTimeout(() => setShake(false), 500);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="password-modal"
    >
      <FloatingBackground />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="password-card glass"
      >
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="emoji-large">🔐</div>
          <h2 className="title-large">
            For Your Eyes Only
          </h2>
          <p className="subtitle">
            Enter a keyword, beautiful 💕
          </p>

          <form onSubmit={handleSubmit} className="password-form">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type the magic words..."
              className="password-input glass"
              autoFocus
            />

            {hint && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hint-text text-red-500"
              >
                {hint}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary"
            >
              Unlock 💖
            </motion.button>
          </form>

          <p className="hintt">
            Hint: It's what i call you most of the time... 😉
          </p>

        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// 🌟 Welcome Page
const WelcomePage = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="page-container"
  >
    <div className="content-center">
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        className="emoji-huge"
      >
        👑
      </motion.div>
      <h1 className="title-hero">
        Hello, My Queen
      </h1>
      <p className="text-large">
        Welcome to your personal space of love, laughs, and everything in between ✨
      </p>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="btn-secondary"
      >
        Let's Go! 💕
      </motion.button>
    </div>
  </motion.div>
);

// 😂 Humor Page
const HumorPage = ({ onNext }) => {
  const jokes = [
    {
      setup: "Why did I fall for you?",
      punchline: "Because you're literally impossible to ignore! Like a notification I actually want to check 😂",
      emoji: "🤣"
    },
    {
      setup: "What do you and coffee have in common?",
      punchline: "You both keep me awake at night... but you're way cuter and less caffeinated! ☕",
      emoji: "😴"
    },
    {
      setup: "Know what's crazy?",
      punchline: "I love you even when you piss the hell out of me. That's TRUE love right there! 🛏️",
      emoji: "😤"
    }
  ];

  const [currentJoke, setCurrentJoke] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);

  const nextJoke = () => {
    if (currentJoke < jokes.length - 1) {
      setShowPunchline(false);
      setTimeout(() => setCurrentJoke(prev => prev + 1), 300);
    } else {
      onNext();
    }
  };

  const joke = jokes[currentJoke];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="page-container"
    >
      <div className="card glass">
        <motion.div
          key={currentJoke}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-content"
        >
          <div className="emoji-large">{joke.emoji}</div>
          <h2 className="title-medium">
            {joke.setup}
          </h2>

          <AnimatePresence>
            {showPunchline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-medium punchline"
              >
                {joke.punchline}
              </motion.p>
            )}
          </AnimatePresence>

          {!showPunchline ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPunchline(true)}
              className="btn-accent"
            >
              Tell Me! 😆
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextJoke}
              className="btn-secondary"
            >
              {currentJoke < jokes.length - 1 ? "Next One! 😂" : "Continue →"}
            </motion.button>
          )}

          <div className="progress-dots">
            {jokes.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === currentJoke ? 'dot-active' : ''}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 💝 Affirmation Page
const AffirmationPage = ({ onNext }) => {
  const affirmations = [
    "You light up my world like nobody else 🌟",
    "Your voice is my favorite notification 😊",
    "You're the plot twist I never saw coming... and the best part of my story 📖",
    "Decent, gorgeous, and hilariously weird = Perfect combo! 🎯",

  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % affirmations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <div className="content-center-wide">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="emoji-huge"
        >
          💖
        </motion.div>

        <h2 className="title-large">
          Just So You Know...
        </h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="affirmation-text"
          >
            "{affirmations[current]}"
          </motion.p>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="btn-primary"
        >
          You're Making Me Blush! 😊
        </motion.button>
      </div>
    </motion.div>
  );
};

// 💌 Love Letter Page
const LoveLetterPage = ({ onNext }) => {
  const [revealed, setRevealed] = useState(false);

  const letter = `My Dearest Zee,

I know I can be silly, annoying, and sometimes disturb you with calls throughout the day... but somehow you still choose to keep me around. That's either true love or temporary insanity, and I'm hoping it's the first one! 😂

You make the boring stuff fun.  You laugh at my terrible jokes (or at least pretend to). You're my best friend, my partner in crime, and the person I want to annoy for the rest of my life.

Thanks for being YOU - perfectly imperfect, wonderfully weird, and absolutely mine.

Forever and always,
Your Favorite Weirdo 💕`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <div className="letter-container">
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="letter-flip"
        >
          {/* Front of envelope */}
          <div className={`letter-front ${revealed ? 'hidden absolute-layout' : ''}`}>
            <div className="envelope" onClick={() => setRevealed(true)}>
              <div className="emoji-huge">💌</div>
              <h2 className="title-medium">
                A Letter For You
              </h2>
              <p className="subtitle">Tap to open</p>
            </div>
          </div>

          {/* Back - Letter content */}
          <div className={`letter-back ${revealed ? 'relative-layout' : 'hidden'}`}>
            <div className="letter-content">
              <div className="emoji-large">💖</div>
              <div className="letter-text">
                {letter}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="btn-primary"
              >
                I Love You Too! 💕
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// 🎯 Final Interactive Page
const FinalPage = () => {
  const [hearts, setHearts] = useState([]);
  const [clicks, setClicks] = useState(0);

  const addHeart = (e) => {
    const heart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setHearts(prev => [...prev, heart]);
    setClicks(prev => prev + 1);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== heart.id));
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container interactive-page"
      onClick={addHeart}
    >
      <div className="content-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="emoji-huge"
        >
          {clicks > 50 ? '👫' : clicks > 30 ? '💑' : clicks > 10 ? '🥰' : '💝'}
        </motion.div>

        <h1 className="title-hero">
          You + Me = Forever
        </h1>

        <p className="text-large">
          {clicks > 50 ? "Okay okay, I get it! You love me too! 😂💕" :
            clicks > 30 ? "Aww, someone's feeling lovey-dovey! 🥰" :
              clicks > 10 ? "Keep clicking if you love me! 💖" :
                "Click anywhere to spread the love! ✨"}
        </p>

        <div className="love-counter glass">
          <p className="counter-text">
            Love Clicks: <span className="counter-number">{clicks}</span> 💕
          </p>
        </div>
      </div>

      {/* Floating hearts on click */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{
            x: heart.x - 16,
            y: heart.y - 16,
            scale: 0,
            opacity: 1
          }}
          animate={{
            y: heart.y - 150,
            scale: [0, 1.5, 1],
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 2 }}
          className="floating-heart"
          style={{ left: 0, top: 0 }}
        >
          💖
        </motion.div>
      ))}
    </motion.div>
  );
};

// 🎨 Main App
function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [step, setStep] = useState(0);

  const pages = [
    <WelcomePage onNext={() => setStep(1)} />,
    <HumorPage onNext={() => setStep(2)} />,
    <AffirmationPage onNext={() => setStep(3)} />,
    <LoveLetterPage onNext={() => setStep(4)} />,
    <FinalPage />
  ];

  return (
    <div className="app-container">
      <FloatingBackground />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <PasswordModal onUnlock={() => setUnlocked(true)} />
        ) : (
          <motion.div
            key={step}
            className="page-wrapper"
          >
            {pages[step]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation dots */}
      {unlocked && (
        <div className="nav-dots">
          {pages.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              onClick={() => setStep(i)}
              className={`nav-dot ${i === step ? 'nav-dot-active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;