import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Floating background (unchanged)
const FloatingBackground = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const count = 50;
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      type: Math.random() > 0.7 ? 'sparkle' : 'heart',
      emoji: Math.random() > 0.7 ? '✨' : '💖'
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="floating-background">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`floating-element ${el.type}`}
          initial={{
            x: `${el.left}vw`,
            y: '120vh',
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.8, 0],
            scale: [0, el.scale, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const SuccessView = () => (
  <motion.div
    className="success-view-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="big-heart-container"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
    >
      <div className="big-heart">💝</div>
    </motion.div>

    <motion.h1
      className="success-title"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      YAAAY!
    </motion.h1>

    <motion.p
      className="success-message"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      I knew you'd say yes, Zainab! <br />
      Love YOU 🥂✨
    </motion.p>
  </motion.div>
);

const MessagePage = ({ title, content, onNext, emoji }) => (
  <motion.div
    className="glass-card message-card"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="page-emoji">{emoji}</div>
    <h2 className="message-title">{title}</h2>
    <p className="message-content" style={{ textAlign: 'center' }}>{content}</p>
    <button className="next-button" onClick={onNext}>
      Continue <span>&rarr;</span>
    </button>
  </motion.div>
);

const ProposalPage = ({ onAccept, moveNoBtn, noBtnPos, yesScale }) => (
  <motion.div
    className="glass-card proposal-card"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.8 }}
  >
    <motion.div className="card-header">
      <span className="subtitle">One Last Question...</span>
    </motion.div>

    <motion.h1
      className="recipient-name"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      Zainab
    </motion.h1>

    <div className="main-question">
      <motion.div
        className="question-text"
        animate={{
          textShadow: [
            "0 0 20px rgba(255, 107, 157, 0.2)",
            "0 0 40px rgba(255, 107, 157, 0.5)",
            "0 0 20px rgba(255, 107, 157, 0.2)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Be My Valentine?
      </motion.div>
    </div>

    <div className="action-buttons">
      <motion.button
        className="yes-button"
        onClick={onAccept}
        animate={{ scale: yesScale }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        Yes, I Will! 💖
      </motion.button>

      <motion.button
        className="no-button"
        animate={{ x: noBtnPos.x, y: noBtnPos.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={moveNoBtn}
        onClick={moveNoBtn}
      >
        No 😅
      </motion.button>
    </div>
  </motion.div>
);

function App() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;

    setNoButtonPos({ x, y });

    // Make YES button grow slightly each time
    setYesScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleNext = () => setStep(prev => prev + 1);

  const affirmationData = {
    title: "Hi Ashabi...",
    emoji: "🌸",
    content:
      "Just wanted to remind you of something important:\n\n" +
      "You’re adorable, chaotic in the cutest way, and somehow always make me laugh even when I’m trying to stay serious. 🥺💗\n\n" +
      "You make even the ordinary days feel extraordinary and honestly… life is way better with you in it."
  };

  return (
    <div className="app-container">
      <div className="gradient-bg"></div>
      <FloatingBackground />

      <AnimatePresence mode="wait">
        {!accepted ? (
          <>
            {step === 0 && (
              <MessagePage
                key="step-0"
                title={affirmationData.title}
                content={affirmationData.content}
                emoji={affirmationData.emoji}
                onNext={handleNext}
              />
            )}

            {step === 1 && (
              <ProposalPage
                key="proposal"
                onAccept={() => setAccepted(true)}
                moveNoBtn={moveNoButton}
                noBtnPos={noButtonPos}
                yesScale={yesScale}
              />
            )}
          </>
        ) : (
          <SuccessView key="success" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
