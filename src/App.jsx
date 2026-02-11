import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// 🎮 TRIVIA QUESTIONS DATABASE
const triviaQuestions = [

  {
    id: 1,
    question: "What's my favorite thing about you?",
    correctAnswer: "Everything! (But especially being with you)",
    wrongAnswers: [
      "Your smile",
      "How you pretend to listen to my tech rants",
      "Your excellent taste in choosing me"
    ],
    emoji: "😍"
  },
  {
    id: 2,
    question: "When did we first meet?",
    correctAnswer: "7 September 2025",
    wrongAnswers: [
      "14 September 2025",
      "31 August 2025",
      "I forgot... oops! 😅"
    ],
    emoji: "📅"
  },
  {
    id: 3,
    question: "What do I think about when I see you?",
    correctAnswer: "How lucky I am",
    wrongAnswers: [
      "Should I just kiss her?",
      "I wonder what she's plotting now...",
      "How did she get even prettier?"
    ],
    emoji: "💭"
  },

  {
    id: 4,
    question: "What's our biggest achievement?",
    correctAnswer: "Not killing each other yet 😂",
    wrongAnswers: [
      "Successfully surviving each other",
      "Having a short distance relationship",
      "Actually being this perfect"
    ],
    emoji: "🏆"
  },
  {
    id: 5,
    question: "How do I feel when you return calls?",
    correctAnswer: "Like my face auto-updated to 😆 mode’ ",
    wrongAnswers: [
      "Here we go again 😅",
      "Time to be charming!"
    ],
    emoji: "📱"
  },
  {
    id: 6,
    question: "What would I do without you?",
    correctAnswer: "Be completely lost and lonely",
    wrongAnswers: [
      "Probably eat bread for every meal",
      "Finally win arguments with myself",
      "Have way more snacks to myself"
    ],
    emoji: "🤔"
  },
  {
    id: 7,
    question: "What's my favorite memory with you?",
    correctAnswer: "All of them, even the embarrassing ones",
    wrongAnswers: [
      "When we got lost and blamed each other",
      "Our first kiss"
    ],
    emoji: "✨"
  },
  {
    id: 8,
    question: "How would I describe you in one word?",
    correctAnswer: "Irreplaceable",
    wrongAnswers: [
      "Troublemaker",
      "Weirdo",
      "Foodie"
    ],
    emoji: "📝"
  },
  {
    id: 9,
    question: "When was our first kiss?",
    correctAnswer: "December 29, 2025",
    wrongAnswers: [
      "February 30th (The day that doesn't exist)",
      "December 26, 2025",
      "Every day feels like the first! 😘"
    ],
    emoji: "💋"
  },
  {
    id: 10,
    question: "What do I love most about us?",
    correctAnswer: "Our matching weirdness levels",
    wrongAnswers: [
      "That you laugh at my terrible jokes",
      "That you love me for who I am",
      "How we can be silly and serious together "
    ],
    emoji: "💕"
  },

  {
    id: 11,
    question: "What was the very first thing I said to you?",
    correctAnswer: "Hey, Have been trying to talk to you",
    wrongAnswers: [
      "Something incredibly smooth (in my head)",
      "I probably just stuttered a lot",
      "I was just being nice"
    ],
    emoji: "💬"
  },
  {
    id: 12,
    question: "What is the most romantic thing I've ever said to you?",
    correctAnswer: "I think about you every moment",
    wrongAnswers: [
      "You're okay",
      "I love you",
      "Make sure you dream about me"
    ],
    emoji: "🌹"
  },
  {
    id: 13,
    question: "What's my secret 'tell' when I'm extra happy to see you?",
    correctAnswer: "I can't stop staring at you",
    wrongAnswers: [
      "I start talking way too fast",
      "I start smiling like an idiot",
      "I suddenly become 10x more clumsy"
    ],
    emoji: "😊"
  },
  {
    id: 14,
    question: "How many kids have we joked about having?",
    correctAnswer: "Three",
    wrongAnswers: [
      "Two",
      "Four",
      "Five"
    ],
    emoji: "👶"
  },
  {
    id: 15,
    question: "How do I plan to propose to you (according to our jokes)?",
    correctAnswer: "While we are dining",
    wrongAnswers: [
      "In front of a thousand people (yikes)",
      "While we are sleeping",
      "When we are having romantic moments"
    ],
    emoji: "💍"
  },
  {
    id: 16,
    question: "If we could spend a whole day in bed, what would we be doing?",
    correctAnswer: "All of the above",
    wrongAnswers: [
      "Watching movies and eating crumbs",
      "Sleeping for 14 hours straight",
      "Talking, kissing, and ignoring the world"
    ],
    emoji: "🛌"
  },
  {
    id: 17,
    question: "What is the one thing about my physical touch? ",
    correctAnswer: "All of the above",
    wrongAnswers: [
      "How much I crave hold you",
      "That I never get tired of being close to you",
      "How perfectly we just... fit together"
    ],
    emoji: "🧩"
  },
  {
    id: 18,
    question: "What is my absolute favorite place to kiss you?",
    correctAnswer: "I'm a fan of all of them, honestly",
    wrongAnswers: [
      "Your cheek",
      "The back of your neck",
      "Your lips"
    ],
    emoji: "💋"
  },
  {
    id: 19,
    question: "How much do I love you on a scale of 1 to 10?",
    correctAnswer: "The scale broke, it's too high",
    wrongAnswers: [
      "11 (classic answer)",
      "9.5 (just to be annoying)",
      "How many stars are in the sky?"
    ],
    emoji: "📈"
  },
  {
    id: 20,
    question: "How many times a day do I think about our future?",
    correctAnswer: "Every time",
    wrongAnswers: [
      "When I have thoughts about you",
      "Exactly 42 times",
      "When I'm with you or talking about you"
    ],
    emoji: "🔮"
  },
  // {
  //   id: 21,
  //   question: "How would I describe our 'vibe' to a stranger?",
  //   correctAnswer: "Chaos, but make it romantic",
  //   wrongAnswers: [
  //     "Two toddlers in adult bodies",
  //     "A very long comedy routine",
  //     "Surprisingly organized"
  //   ],
  //   emoji: "🎭"
  // },
];

// 🎊 Confetti Component
const Confetti = () => {
  const colors = ['#FF6B9D', '#C44569', '#FFA502', '#FFD93D', '#6BCF7F', '#4ECDC4'];

  return (
    <div className="confetti-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="confetti-piece"
          initial={{
            x: window.innerWidth / 2,
            y: -20,
            rotate: 0,
            opacity: 1,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "easeOut",
            delay: Math.random() * 0.3
          }}
          style={{
            background: colors[Math.floor(Math.random() * colors.length)]
          }}
        />
      ))}
    </div>
  );
};

// 🔐 Password Screen
const PasswordScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const [hint, setHint] = useState('');

  const SECRET_PASSWORD = 'ashabi'; // Change this!

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === SECRET_PASSWORD) {
      onUnlock();
    } else {
      setShake(true);
      setHint("Nope! Try again, babe 😜");
      setTimeout(() => setShake(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="password-screen">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="password-box"
      >
        <motion.div
          animate={shake ? { x: [-20, 20, -20, 20, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="game-show-emoji">🎮</div>
          <h1 className="password-title">The Zee Trivia Show!</h1>
          <p className="password-subtitle">Enter the secret password to play</p>

          <form onSubmit={handleSubmit} className="password-form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Secret password..."
              className="password-input"
              autoFocus
            />
            {hint && <p className="password-hint">{hint}</p>}
            <motion.button
              type="submit"
              className="password-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Play! 🎯
            </motion.button>
          </form>

          <p className="password-footer">Hint: It's what we're about to do! 😉</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// 🎬 Welcome Screen
const WelcomeScreen = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="welcome-screen"
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="welcome-content"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="welcome-emoji"
        >
          🎪
        </motion.div>

        <h1 className="welcome-title">
          Welcome to<br />
          <span className="gradient-text">The Trivia Show!</span>
        </h1>

        <p className="welcome-description">
          Think you know us well? Let's test that! 😏<br />
          Answer questions about us and rack up points!
        </p>

        <div className="welcome-rules">
          <div className="rule-item">
            <span className="rule-emoji">✅</span>
            <span>Correct answers = 10 points + confetti!</span>
          </div>
          <div className="rule-item">
            <span className="rule-emoji">❌</span>
            <span>Wrong answers = 0 points (but still fun!)</span>
          </div>
          <div className="rule-item">
            <span className="rule-emoji">🎉</span>
            <span>Every answer unlocks something sweet!</span>
          </div>
        </div>

        <motion.button
          onClick={onStart}
          className="start-btn"
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          Start the Show! 🚀
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// 🎯 Question Screen
const QuestionScreen = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [allAnswers] = useState(() =>
    [question.correctAnswer, ...question.wrongAnswers].sort(() => Math.random() - 0.5)
  );

  const handleAnswerClick = (answer) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === question.correctAnswer) {
      setShowConfetti(true);
      setTimeout(() => {
        onAnswer(true);
        setShowConfetti(false);
      }, 2000);
    } else {
      setTimeout(() => {
        onAnswer(false);
      }, 2000);
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="question-screen"
    >
      {showConfetti && <Confetti />}

      <div className="question-header">
        <div className="question-number">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="question-emoji">{question.emoji}</div>
      </div>

      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="question-text"
      >
        {question.question}
      </motion.h2>

      <div className="answers-grid">
        {allAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrectAnswer = answer === question.correctAnswer;

          let answerClass = 'answer-card';
          if (showResult && isCorrectAnswer) {
            answerClass += ' answer-correct';
          } else if (showResult && isSelected && !isCorrectAnswer) {
            answerClass += ' answer-wrong';
          } else if (isSelected) {
            answerClass += ' answer-selected';
          }

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => handleAnswerClick(answer)}
              className={answerClass}
              disabled={showResult}
              whileHover={!showResult ? { scale: 1.03, y: -5 } : {}}
              whileTap={!showResult ? { scale: 0.97 } : {}}
            >
              <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
              <span className="answer-text">{answer}</span>
              {showResult && isCorrectAnswer && <span className="answer-icon">✓</span>}
              {showResult && isSelected && !isCorrectAnswer && <span className="answer-icon">✗</span>}
            </motion.button>
          );
        })}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`result-message ${isCorrect ? 'result-correct' : 'result-wrong'}`}
        >
          {isCorrect ? (
            <>
              <span className="result-emoji">🎉</span>
              <span>YES! You know me so well! +10 points!</span>
            </>
          ) : (
            <>
              <span className="result-emoji">😅</span>
              <span>Oops! But I still love you!</span>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

// 🏆 Results Screen
const ResultsScreen = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / (totalQuestions * 10)) * 100);

  let message, emoji, grade;
  if (percentage >= 90) {
    message = "WOW! You're basically a certified expert on me! 🏆";
    emoji = "👑";
    grade = "A+";
  } else if (percentage >= 70) {
    message = "You're on fire! You know us so well! 💗";
    emoji = "🌟";
    grade = "A";
  } else if (percentage >= 50) {
    message = "Not bad! But we need more quality time 😉";
    emoji = "💕";
    grade = "B";
  } else {
    message = "Aww, we need to talk more! Still love you though! 😂";
    emoji = "💝";
    grade = "C";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="results-screen"
    >
      <Confetti />

      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", delay: 0.3 }}
        className="results-emoji"
      >
        {emoji}
      </motion.div>

      <h1 className="results-title">Game Over!</h1>

      <div className="results-grade">{grade}</div>

      <div className="results-score">
        <div className="score-label">Final Score</div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="score-value"
        >
          {score}
        </motion.div>
        <div className="score-total">out of {totalQuestions * 10} points</div>
      </div>

      <div className="results-percentage">{percentage}% Correct!</div>

      <p className="results-message">{message}</p>

      <div className="results-breakdown">
        <div className="breakdown-item">
          <span className="breakdown-label">Questions</span>
          <span className="breakdown-value">{totalQuestions}</span>
        </div>
        <div className="breakdown-item">
          <span className="breakdown-label">Correct</span>
          <span className="breakdown-value">{score / 10}</span>
        </div>
        <div className="breakdown-item">
          <span className="breakdown-label">Wrong</span>
          <span className="breakdown-value">{totalQuestions - (score / 10)}</span>
        </div>
      </div>

      <motion.button
        onClick={onRestart}
        className="restart-btn"
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        Play Again! 🔄
      </motion.button>
    </motion.div>
  );
};

// 🎮 Main App
function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  const startGame = () => {
    const shuffled = [...triviaQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState('playing');
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setGameState('results');
      }, 100);
    }
  };

  const restartGame = () => {
    setGameState('welcome');
  };

  return (
    <div className="trivia-app">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <PasswordScreen key="password" onUnlock={() => setUnlocked(true)} />
        ) : gameState === 'welcome' ? (
          <WelcomeScreen key="welcome" onStart={startGame} />
        ) : gameState === 'playing' ? (
          <QuestionScreen
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        ) : (
          <ResultsScreen
            key="results"
            score={score}
            totalQuestions={questions.length}
            onRestart={restartGame}
          />
        )}
      </AnimatePresence>

      {/* Floating Score Display (only during game) */}
      {unlocked && gameState === 'playing' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="floating-score"
        >
          <span className="score-icon">🏆</span>
          <span className="score-text">{score} pts</span>
        </motion.div>
      )}
    </div>
  );
}

export default App;
