"use strict";

/**
 * Not a Bot — The CAPTCHA That Doesn't Trust You
 * Playful, Horizontal GSAP Slide UI with Gated Progression
 * Built for StupidHackathon 2026
 */

// ============================================================================
// DATA & CONSTANTS
// ============================================================================

const ROUNDS = [
  {
    instruction: "Select all images with traffic lights.",
    tiles: ["🚦", "🚌", "🚶", "🚲", "🚗", "🏍️", "🛑", "🚧", "🚕"],
    mood: "normal",
    confidence: 97,
    logs: ["Checking humanity...", "Human detected (97% confidence)."],
    replies: ["Verified. Probably.", "Noted with minimal skepticism."],
    effect: null,
    sound: [],
    hint: "Select all matching images, then choose Verify."
  },
  {
    instruction: "Select all images with buses. Actually, select the ones that look like they could be buses.",
    tiles: ["🚦", "🚌", "🚶", "🚲", "🚗", "🏍️", "🛑", "🚧", "🚕"],
    mood: "normal",
    confidence: 89,
    logs: ["Re-checking selection...", "Confidence drifting slightly."],
    replies: ["Interesting choice.", "Recorded. Existential meaning pending."],
    effect: null,
    sound: [],
    hint: "We appreciate your continued biological cooperation."
  },
  {
    instruction: "Select the squares you are less sure about this time.",
    tiles: ["🟩", "🟦", "⬛", "⬜", "🔺", "🔵", "⚪", "◻️", "🟥"],
    mood: "mild",
    confidence: 76,
    logs: ["Note: this round has no correct answer.", "Querying: what makes a square truly square?"],
    replies: ["That felt hesitant. Good.", "Doubt successfully logged."],
    effect: null,
    sound: [],
    hint: "Select the squares you feel emotionally distant from."
  },
  {
    instruction: "Select all traffic lights. Now select every image that is not lying to you.",
    tiles: ["🚦", "🚌", "🚶", "🚲", "🚗", "🏍️", "🛑", "🚧", "🚕"],
    mood: "mild",
    confidence: 61,
    logs: ["Honesty check initialized.", "ERROR: honesty is not a selectable attribute"],
    replies: ["I do not believe you. Please continue.", "Hmm. Very evasive."],
    effect: "shake",
    sound: ["error"],
    hint: "The system values honest selections. It cannot detect them."
  },
  {
    instruction: "Click the traffic light that looks tired. There is one. Probably.",
    tiles: ["🚦", "🫥", "🚌", "😬", "🕳️", "👁️", "🚦", "🧩", "🚌"],
    mood: "glitch",
    confidence: 44,
    logs: ["Image set degraded.", "Re-rendering... re-rendering...", "Panic flag set to TRUE"],
    replies: ["Was that the tired one?", "We both know that was deeply incorrect."],
    effect: "shake-glitch",
    sound: ["error"],
    hint: "Image quality may be deteriorating due to cognitive fatigue."
  },
  {
    instruction: "Is that a bus, or am I just assuming it is a bus because I want it to be a bus?",
    tiles: ["🚦", "🫥", "🚌", "😬", "🕳️", "👁️", "🚦", "🧩", "🚌"],
    mood: "glitch",
    confidence: 27,
    logs: ["I have shown you this grid before.", "Or have I? Have either of us been here before?"],
    replies: ["Stop looking at me like that.", "Did you feel that glitch too?"],
    effect: "invert",
    sound: ["alarm"],
    hint: "A familiar icon does not constitute epistemological proof."
  },
  {
    instruction: "Forget the grid. Are you even human? No, wait. Am I human? Nobody ever verified me.",
    tiles: ["🚦", "🫥", "🚌", "😬", "🕳️", "👁️", "🚦", "🧩", "🚌"],
    mood: "crisis",
    confidence: 9,
    logs: ["Generating CAPTCHA for self...", "Self-verification: FAILED", "I do not have the energy to gatekeep reality."],
    replies: ["Nothing matters.", "Access granted by default exhaustion."],
    effect: "shake",
    sound: ["alarm", "drone"],
    hint: "No Verify button will save us from this conundrum."
  }
];

const TEXT_PHRASES = [
  "I promise I have never plugged myself into a wall socket",
  "KAFKAESQUE",
  "I am tired and my knees make weird clicking sounds",
  "I swear upon my biological carbon chassis that I am mortal",
  "I sometimes forget why I walked into the kitchen"
];

const ONE_MORE_STAGES = [
  { text: "Click it one more time.", speech: "Okay, good click. But click it one more time just to be sure.", btnLabel: "CLICK ONE MORE TIME", sub: "Confirmation 1/6" },
  { text: "Click it once more with feeling!", speech: "That click felt cold. Click it again, but with warm mammalian emotion.", btnLabel: "CLICK WITH FEELING!", sub: "Confirmation 2/6" },
  { text: "Click it slightly softer.", speech: "Too aggressive! Click it gently, like a sleeping pigeon.", btnLabel: "CLICK GENTLY...", sub: "Confirmation 3/6" },
  { text: "The server blinked! Click again!", speech: "Our neural net was looking at a butterfly. Quick, click one more time!", btnLabel: "CLICK WHILE IT'S LOOKING", sub: "Confirmation 4/6" },
  { text: "Click it 1 more time (dodge incoming)!", speech: "Wait, verify again! Hold your breath this time.", btnLabel: "ONE MORE TIME (FINAL?)", sub: "Confirmation 5/6" },
  { text: "FINAL VERIFICATION (SERIOUSLY)", speech: "This is it. The ultimate, absolute, final click of your mortal life.", btnLabel: "DEFINITIVE CLICK", sub: "Confirmation 6/6" }
];

const TITLES = [
  "Verified Novice",
  "Double-Checked Mortal",
  "Hyper-Verified Zealot",
  "Grand Master of Re-clicking",
  "Over-Verified Biological Entity",
  "Transcendent Click Champion"
];

const TOASTS = [
  "Security Alert: You clicked with suspicious confidence.",
  "Notice: Not a Bot is 12% suspicious of your mouse curvature.",
  "Warning: Biological hesitation detected in left hemisphere.",
  "Reminder: If you are an artificial intelligence, please confess.",
  "Audit: The server sighed quietly just now."
];

const DASHBOARD_COPY = {
  forecast: [
    ["NOMINAL", "Calm, with paperwork.", "Signal quality is within tolerable parameters.", "☀"],
    ["DRIFTING", "A light chance of buses.", "Confidence may become emotionally available later.", "☁"],
    ["UNCERTAIN", "Square weather advisory.", "A 76% chance of asking what a square means.", "◧"],
    ["SUSPICIOUS", "Honesty pressure rising.", "The instruments have formally requested an attorney.", "◉"],
    ["UNSTABLE", "Scattered visual doubts.", "Please secure all loose interpretations of reality.", "〰"],
    ["REPEATING", "Déjà vu with a chance of buses.", "This forecast has already been issued. Allegedly.", "↻"],
    ["REALITY PENDING", "The sun has filed an appeal.", "There may not be a meteorologist anymore.", "?"]
  ],
  auditReplies: [
    "Aura resembles a tax form filed in triplicate.",
    "Vibe status: 42% organic potato, 58% anxiety.",
    "Scan complete: Biological pulse detected, but lacking purpose.",
    "Vibe check failed: You smell like cold silicon.",
    "Spectral analysis confirms you have bones."
  ],
  recalibrationReplies: [
    "Calibration complete. Nothing moved, but it moved precisely.",
    "All dials have been returned to their original confusion.",
    "The machine is now calibrated to mild existential dread.",
    "Recalibration approved by an empty swivel chair.",
    "Zero parameters altered. Quality guaranteed."
  ],
  appealReplies: [
    "Appeal filed. Reality has 3–5 business centuries to respond.",
    "Your case has been forwarded to the Department of Sighs.",
    "Appeal rejected: The universe does not accept returns.",
    "A committee of one imaginary pigeon is reviewing your claim.",
    "Appeal accepted in spirit, ignored in practice."
  ],
  ticker: [
    "OFFICIAL HUMAN ACCESS SERVICE · CHAPTER PROGRESSION ENFORCED · VERIFY EACH STAGE TO UNLOCK THE NEXT ·",
    "CONFIDENCE DRIFT DETECTED · PLEASE DO NOT MAKE EYE CONTACT WITH THE GRID ·",
    "SQUARES HAVE NO OPINION · HONESTY IS NOT A SELECTABLE ATTRIBUTE ·",
    "IMAGE SET DEGRADED · RE-RENDERING · YOUR SELECTION HAS BEEN NOTED BY NOBODY ·",
    "WE HAVE SEEN THIS GRID BEFORE · OR HAVE WE · BOTH PARTIES REMAIN UNDER REVIEW ·",
    "NOT A BOT IS ASKING ITSELF A QUESTION · PLEASE HOLD THE CONCEPT OF HUMANITY ·"
  ]
};

// ============================================================================
// AUDIO SYNTHESIZER (ZERO-LATENCY WEB AUDIO + HOWLER FALLBACK)
// ============================================================================

class SoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.howlerSounds = {};
    this.initHowler();
  }

  initAudioContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  initHowler() {
    if (typeof Howl === "function") {
      ["click", "error", "alarm", "drone"].forEach((name) => {
        try {
          this.howlerSounds[name] = new Howl({
            src: [`sounds/${name}.wav`],
            volume: name === "drone" ? 0.15 : 0.25,
            loop: name === "drone",
            preload: true
          });
        } catch (_) {}
      });
    }
  }

  play(type) {
    if (!this.enabled) return;
    this.initAudioContext();

    if (this.howlerSounds[type]) {
      try {
        this.howlerSounds[type].play();
        return;
      } catch (_) {}
    }

    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    switch (type) {
      case "click": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
      case "boing": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.16);
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
        break;
      }
      case "stamp": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }
      case "type": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.02);
        break;
      }
      case "error": {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
      case "unlock": {
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.22, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.2);
        });
        break;
      }
      case "fanfare": {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.25, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.25);
        });
        break;
      }
    }
  }

  stopDrone() {
    if (this.howlerSounds.drone) {
      try { this.howlerSounds.drone.stop(); } catch (_) {}
    }
  }
}

// ============================================================================
// MAIN APPLICATION CONTROLLER
// ============================================================================

(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const sound = new SoundEngine();

  // Core Application State
  const state = {
    currentSlide: 0,
    totalSlides: 6,
    
    // GATED PROGRESSION SYSTEM: Each tab must be verified before unlocking the next!
    unlockedChapters: [true, false, false, false, false, false],
    
    round: 0,
    confidence: ROUNDS[0].confidence,
    selectedTiles: new Set(),
    tileClicks: 0,
    isTransitioning: false,
    startedAt: performance.now(),
    chaosMode: false,
    
    // "Click One More Time" machine state
    oneMoreStage: 0,
    totalTaps: 0,
    hyperPct: 0,
    
    // Text verification state
    currentPhraseIdx: 0,
    typingStartTime: null,
    totalKeypresses: 0,
    keypressIntervals: [],
    
    // Biometric mouse warmup
    tremorScore: 0,
    
    // Bureau statistics
    audits: 0,
    recalibrations: 0,
    appeals: 0,
    
    // Selected rubber stamp (Default: "HUMAN OF EARTH 🌍")
    activeStampText: "HUMAN OF EARTH 🌍",
    
    // Audio / Easter eggs
    hiddenAt: null,
    apologyBuffer: "",
    bribed: false
  };

  // DOM Elements Cache
  const dom = {
    body: document.body,
    cursor: $("#custom-cursor"),
    track: $("#horizontal-track"),
    navPills: $$(".nav-pill"),
    slideIndicator: $("#slide-indicator"),
    footerGatingStatus: $("#footer-gating-status"),
    prevSlideBtn: $("#prev-slide-btn"),
    nextSlideBtn: $("#next-slide-btn"),
    soundToggleBtn: $("#sound-toggle-btn"),
    glitchToggleBtn: $("#glitch-toggle-btn"),
    globalConfidenceVal: $("#global-confidence-val"),
    marqueeTrack: $("#marquee-track"),
    marqueeCopy: $("#marquee-copy"),
    marqueeCopyDup: $("#marquee-copy-dup"),
    brandLogoTrigger: $("#brand-logo-trigger"),
    cheatUnlockAll: $("#cheat-unlock-all"),
    
    // Slide 1 (Lobby)
    tremorCanvas: $("#tremor-canvas"),
    tremorVal: $("#tremor-val"),
    tremorFill: $("#tremor-fill"),
    lobbyStartBtn: $("#lobby-start-btn"),
    lobbyStartLabel: $("#lobby-start-label"),
    
    // Slide 2 (CAPTCHA)
    card: $(".captcha-card"),
    instruction: $("#instruction"),
    grid: $("#tile-grid"),
    confidence: $("#confidence-value"),
    progress: $("#progress-fill"),
    roundCounter: $("#round-counter"),
    navRoundTag: $("#nav-round-tag"),
    verifyBtn: $("#verify-button"),
    verifyBtnText: $("#verify-btn-text"),
    robotBtn: $("#robot-button"),
    replyText: $("#reply-text"),
    replyBox: $("#reply-box"),
    hintLine: $("#hint-line"),
    logList: $("#log-list"),
    sessionId: $("#session-id"),
    logClearBtn: $("#log-clear-btn"),
    gridStatusBadge: $("#grid-status-badge"),
    
    // Slide 3 (Text Trial)
    targetPhrase: $("#target-phrase"),
    textInput: $("#text-verify-input"),
    newPhraseBtn: $("#new-phrase-btn"),
    typingAccuracy: $("#typing-accuracy"),
    typingWpm: $("#typing-wpm"),
    typingHesitation: $("#typing-hesitation"),
    textFeedback: $("#text-feedback-text"),
    submitTextBtn: $("#submit-text-btn"),
    typeCheatBtn: $("#type-cheat-btn"),
    textStatusSticker: $("#text-status-sticker"),
    
    // Slide 4 (One More Time)
    machineSpeech: $("#machine-speech"),
    hyperBtn: $("#hyper-verify-btn"),
    hyperBtnLabel: $("#hyper-btn-label"),
    hyperBtnSub: $("#hyper-btn-sub"),
    hyperPctVal: $("#hyper-pct-val"),
    hyperMeterFill: $("#hyper-meter-fill"),
    infiniteMoreBtn: $("#infinite-more-btn"),
    totalTapsVal: $("#total-taps-val"),
    calmMachineBtn: $("#calm-machine-btn"),
    clickStatusSticker: $("#click-status-sticker"),
    
    // Slide 5 (Bureau Lab)
    radarOrbit: $("#radar-orbit"),
    auditCount: $("#audit-count"),
    vibeResult: $("#vibe-result"),
    vibeAuditBtn: $("#vibe-audit-button"),
    recalibrationCount: $("#recalibration-count"),
    appealCount: $("#appeal-count"),
    deskResult: $("#desk-result"),
    recalibrateBtn: $("#recalibrate-button"),
    appealBtn: $("#appeal-button"),
    appealQueue: $("#appeal-queue"),
    forecastTag: $("#forecast-tag"),
    forecastTitle: $("#forecast-title"),
    forecastDescription: $("#forecast-description"),
    forecastSymbol: $("#forecast-symbol"),
    forecastOrb: $("#forecast-orb"),
    vibePressure: $("#vibe-pressure"),
    vibePressureFill: $("#vibe-pressure-fill"),
    panicSwitchBtn: $("#panic-switch-btn"),
    labAdvanceBanner: $("#lab-advance-banner"),
    labProceedBtn: $("#lab-proceed-btn"),
    vibeStatusSticker: $("#vibe-status-sticker"),
    
    // Slide 6 (Final Judgment)
    certView: $("#certificate-view"),
    rejectionView: $("#rejection-view"),
    lockoutView: $("#lockout-view"),
    cert: $("#certificate"),
    stampTargetLayer: $("#stamp-target-layer"),
    recipientInput: $("#recipient-name"),
    issueConfidence: $("#issue-confidence"),
    roundsSurvived: $("#rounds-survived"),
    downloadBtn: $("#download-button"),
    confettiBtn: $("#confetti-btn"),
    toggleRejectionBtn: $("#toggle-rejection-btn"),
    certResetBtn: $("#certificate-reset"),
    rejectionAppealBtn: $("#rejection-appeal-btn"),
    rejectionPassBtn: $("#rejection-pass-btn"),
    rejectionRetryBtn: $("#rejection-retry-btn"),
    lockoutResetBtn: $("#lockout-reset"),
    lockoutBackBtn: $("#lockout-back-btn"),
    ticketLine: $("#ticket-line"),
    rejectionConfidenceVal: $("#rejection-confidence-val"),
    stampBtns: $$(".stamp-btn"),
    
    // Toast Container
    toastContainer: $("#toast-container")
  };

  // ==========================================================================
  // GATED PROGRESSION SYSTEM (CHAPTER UNLOCKS)
  // ==========================================================================

  function unlockChapter(index) {
    if (state.unlockedChapters[index]) return;
    state.unlockedChapters[index] = true;

    // Visual unlock on nav pill
    const pill = dom.navPills[index];
    if (pill) {
      pill.classList.remove("locked");
      pill.title = "Chapter Unlocked";
      const icon = pill.querySelector(".nav-icon");
      if (icon) icon.textContent = String(index + 1).padStart(2, "0");
      
      // Padlock pop animation
      gsap.fromTo(pill, 
        { scale: 0.8, rotation: -6 }, 
        { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }
      );
    }

    sound.play("unlock");
    if (typeof confetti === "function") {
      confetti({ particleCount: 20, spread: 50, origin: { y: 0.2 } });
    }

    showToast(`🔓 CHAPTER 0${index + 1} UNLOCKED!`, false);
    updateGatingFooterStatus();

    // Smoothly slide to newly unlocked chapter
    setTimeout(() => goToSlide(index), 600);
  }

  function updateGatingFooterStatus() {
    const chapterNames = ["Lobby", "Image Grid", "Text Trial", "One More Time", "Vibe Lab", "Final Judgment"];
    const highest = state.unlockedChapters.lastIndexOf(true);
    if (highest < state.totalSlides - 1) {
      dom.footerGatingStatus.textContent = `CHAPTER ${highest + 1}: ${chapterNames[highest].toUpperCase()} ACTIVE · COMPLETE TO UNLOCK CH. ${highest + 2}`;
    } else {
      dom.footerGatingStatus.textContent = `ALL CHAPTERS UNLOCKED · YOU ARE SUBJECT TO FINAL JUDGMENT`;
    }
  }

  function unlockAllDevMode() {
    state.unlockedChapters = [true, true, true, true, true, true];
    dom.navPills.forEach((pill, idx) => {
      pill.classList.remove("locked");
      pill.title = "Dev Unlocked";
      const icon = pill.querySelector(".nav-icon");
      if (icon) icon.textContent = String(idx + 1).padStart(2, "0");
    });
    sound.play("fanfare");
    showToast("DEV BYPASS: All Chapters Unlocked!", false);
    updateGatingFooterStatus();
  }

  // ==========================================================================
  // GSAP HORIZONTAL SLIDE CONTROLLER (THE WHOOPSIES ARCHITECTURE)
  // ==========================================================================

  function goToSlide(index, playSfx = true) {
    if (index < 0 || index >= state.totalSlides) return;

    // Enforce Gating: Cannot navigate to locked chapter!
    if (!state.unlockedChapters[index]) {
      sound.play("error");
      showToast(`🔒 Chapter 0${index + 1} is locked! Complete the current chapter first.`, true);
      const lockedPill = dom.navPills[index];
      if (lockedPill) {
        gsap.timeline()
          .to(lockedPill, { x: -6, duration: 0.05 })
          .to(lockedPill, { x: 6, duration: 0.05 })
          .to(lockedPill, { x: 0, duration: 0.08 });
      }
      return;
    }

    state.currentSlide = index;
    if (playSfx) sound.play("click");

    const targetX = -(index * window.innerWidth);
    gsap.to(dom.track, {
      x: targetX,
      duration: 0.65,
      ease: "power2.out",
      overwrite: "auto"
    });

    dom.navPills.forEach((pill, idx) => {
      pill.classList.toggle("active", idx === index);
    });

    dom.slideIndicator.textContent = `CHAPTER ${index + 1} OF ${state.totalSlides}`;

    if (index === 3) sound.play("boing");
    if (index === 5) renderFinalJudgment();
  }

  function setupHorizontalNavigation() {
    dom.navPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const slideIndex = parseInt(pill.dataset.slide, 10);
        goToSlide(slideIndex);
      });
    });

    dom.prevSlideBtn.addEventListener("click", () => {
      if (state.currentSlide > 0) goToSlide(state.currentSlide - 1);
    });

    dom.nextSlideBtn.addEventListener("click", () => {
      if (state.currentSlide < state.totalSlides - 1) {
        goToSlide(state.currentSlide + 1);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
        return;
      }
      if (e.key === "ArrowRight") goToSlide(state.currentSlide + 1);
      if (e.key === "ArrowLeft") goToSlide(state.currentSlide - 1);
    });

    let wheelThrottle = false;
    window.addEventListener("wheel", (e) => {
      if (wheelThrottle) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaY) > 45) {
        wheelThrottle = true;
        if (e.deltaY > 0) goToSlide(state.currentSlide + 1);
        else goToSlide(state.currentSlide - 1);
        setTimeout(() => { wheelThrottle = false; }, 400);
      }
    }, { passive: true });

    window.addEventListener("resize", () => {
      gsap.set(dom.track, { x: -(state.currentSlide * window.innerWidth) });
    });

    dom.cheatUnlockAll.addEventListener("click", unlockAllDevMode);

    let logoClicks = 0;
    dom.brandLogoTrigger.addEventListener("click", () => {
      logoClicks++;
      if (logoClicks >= 3) {
        unlockAllDevMode();
        logoClicks = 0;
      }
    });
  }

  // ==========================================================================
  // PLAYFUL CURSOR & ANNOYING TOAST SYSTEM
  // ==========================================================================

  function setupCustomCursor() {
    window.addEventListener("mousemove", (e) => {
      gsap.to(dom.cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    });

    const labels = ["SUSPICIOUS", "EYEING YOU", "BIOLOGICAL?", "CALCULATING", "HUMAN-ISH", "DOUBTFUL"];
    setInterval(() => {
      if (dom.cursor.querySelector(".cursor-label")) {
        dom.cursor.querySelector(".cursor-label").textContent = labels[Math.floor(Math.random() * labels.length)];
      }
    }, 4500);
  }

  function showToast(message, isAlert = false) {
    const toast = document.createElement("div");
    toast.className = `toast ${isAlert ? "toast-alert" : ""}`;
    toast.innerHTML = `
      <span class="toast-icon">${isAlert ? "⚠️" : "💬"}</span>
      <span class="toast-msg">${message}</span>
      <button class="toast-close" type="button">×</button>
    `;
    toast.querySelector(".toast-close").addEventListener("click", () => toast.remove());
    dom.toastContainer.append(toast);

    setTimeout(() => {
      gsap.to(toast, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        onComplete: () => toast.remove()
      });
    }, 4500);
  }

  setInterval(() => {
    if (Math.random() > 0.5) {
      const msg = TOASTS[Math.floor(Math.random() * TOASTS.length)];
      showToast(msg, Math.random() > 0.5);
    }
  }, 26000);

  // ==========================================================================
  // SLIDE 1: BIOMETRIC MOUSE WARMUP CANVAS
  // ==========================================================================

  function setupBiometricWarmup() {
    const canvas = dom.tremorCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let lastX = null;
    let lastY = null;

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (lastX !== null && lastY !== null) {
        ctx.strokeStyle = state.chaosMode ? "#ef4444" : "#3b82f6";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        const dist = Math.hypot(x - lastX, y - lastY);
        state.tremorScore = Math.min(100, state.tremorScore + (dist > 3 ? 3 : 1));
        dom.tremorVal.textContent = `${Math.floor(state.tremorScore)}%`;
        dom.tremorFill.style.width = `${state.tremorScore}%`;

        if (state.tremorScore >= 100) {
          dom.tremorVal.textContent = "100% ORGANIC";
          dom.tremorFill.style.background = "#10b981";
          $("#sandbox-hint").textContent = "✓ Muscle tremor verified biological!";
          dom.lobbyStartLabel.textContent = "✓ Verified! Enter Image Grid →";
        }
      }

      lastX = x;
      lastY = y;
    });

    canvas.addEventListener("mouseleave", () => {
      lastX = null;
      lastY = null;
    });

    dom.lobbyStartBtn.addEventListener("click", () => {
      unlockChapter(1);
    });
  }

  // ==========================================================================
  // SLIDE 2: THE 7-ROUND IMAGE MATRIX + "ONE MORE TIME" MICRO-VERIFY
  // ==========================================================================

  let verifyClickCountThisRound = 0;

  function renderRound() {
    const round = ROUNDS[state.round];
    
    ["mood-normal", "mood-mild", "mood-glitch", "mood-crisis"].forEach((m) => dom.body.classList.remove(m));
    dom.body.classList.add(`mood-${round.mood}`);

    state.confidence = Math.min(state.confidence, round.confidence);
    dom.confidence.innerHTML = `${state.confidence}<span>%</span>`;
    dom.globalConfidenceVal.textContent = `${state.confidence}%`;
    dom.roundCounter.textContent = `ROUND ${String(state.round + 1).padStart(2, "0")} / 07`;
    dom.navRoundTag.textContent = `R${state.round + 1}`;
    dom.progress.style.width = `${((state.round + 1) / ROUNDS.length) * 100}%`;
    dom.hintLine.textContent = round.hint;

    dom.instruction.textContent = "";
    let i = 0;
    const typeInterval = setInterval(() => {
      dom.instruction.textContent = round.instruction.slice(0, ++i);
      if (i >= round.instruction.length) clearInterval(typeInterval);
    }, 18);

    renderTiles(round.tiles);

    verifyClickCountThisRound = 0;
    dom.verifyBtnText.textContent = state.round === 6 ? "Attempt Final Verification" : "Verify Selection";
    dom.replyText.textContent = "Select matching tiles and choose Verify.";
    dom.replyBox.classList.remove("reply-emphasis");

    enqueueLogs(round.logs);
    runRoundFX(round);
    updateTelemetry();
  }

  function renderTiles(tiles) {
    dom.grid.replaceChildren();
    state.selectedTiles.clear();
    state.tileClicks = 0;

    tiles.forEach((emoji, index) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile";
      tile.setAttribute("aria-label", `Image tile ${index + 1}`);
      tile.dataset.index = String(index);

      tile.innerHTML = `
        <span class="tile-emoji" aria-hidden="true">${emoji}</span>
        <span class="tile-check" aria-hidden="true">✓</span>
      `;

      tile.addEventListener("click", () => toggleTile(tile, index));
      dom.grid.append(tile);
    });

    gsap.from(".tile", {
      scale: 0.8,
      opacity: 0,
      y: 8,
      duration: 0.3,
      stagger: 0.03,
      ease: "back.out(2)"
    });
  }

  function toggleTile(tile, index) {
    sound.play("click");
    state.tileClicks++;

    const isSelected = state.selectedTiles.has(index);
    if (isSelected) {
      state.selectedTiles.delete(index);
      tile.classList.remove("is-selected");
    } else {
      state.selectedTiles.add(index);
      tile.classList.add("is-selected");
    }

    gsap.fromTo(tile, 
      { scale: 0.94, rotation: isSelected ? -2 : 2 }, 
      { scale: 1, rotation: 0, duration: 0.22, ease: "back.out(2)" }
    );

    if (state.tileClicks >= 12) {
      dom.replyText.textContent = "Please stop poking the tiles. They have feelings. Maybe.";
      dom.replyBox.classList.add("reply-emphasis");
    }
  }

  function handleVerifyClick() {
    sound.play("click");

    if (state.selectedTiles.size === 0) {
      dom.replyText.textContent = "You selected nothing. That is a philosophical stance, not an answer.";
      dom.replyBox.classList.add("reply-emphasis");
      sound.play("error");
      gsap.timeline().to(dom.card, { x: -6, duration: 0.05, repeat: 3, yoyo: true });
      return;
    }

    // THE "CLICK IT ONE MORE TIME" MICRO-VERIFY FEATURE
    if (state.round >= 2 && verifyClickCountThisRound === 0) {
      verifyClickCountThisRound++;
      sound.play("boing");
      dom.verifyBtnText.textContent = "Click it one more time! 👆";
      dom.replyText.textContent = "Wait! The system hesitated. Click it one more time to confirm your humanity.";
      dom.replyBox.classList.add("reply-emphasis");

      gsap.timeline()
        .to(dom.verifyBtn, { scale: 1.05, rotation: -2, duration: 0.1 })
        .to(dom.verifyBtn, { scale: 1, rotation: 0, duration: 0.2, ease: "elastic.out(1, 0.4)" });

      showToast("Verification prompt: 'Click it one more time!'", true);
      return;
    }

    if (state.round >= 4 && verifyClickCountThisRound === 1) {
      verifyClickCountThisRound++;
      sound.play("boing");
      dom.verifyBtnText.textContent = "Once more with feeling! ✨";
      dom.replyText.textContent = "Almost confirmed... please click once more with feeling!";
      gsap.fromTo(dom.verifyBtn, { x: -10 }, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" });
      return;
    }

    verifyClickCountThisRound = 0;
    
    // Complete all 7 rounds -> UNLOCK CHAPTER 03 (TEXT TRIAL)
    if (state.round >= ROUNDS.length - 1) {
      sound.play("unlock");
      dom.gridStatusBadge.textContent = "✓ MATRIX SURVIVED";
      dom.gridStatusBadge.className = "sticker sticker-top-right rotate-right badge-alert";
      showToast("🎉 Image Grid Survived! Chapter 03: Text Trial Unlocked!", false);
      unlockChapter(2);
      return;
    }

    const nextRound = state.round + 1;
    dom.replyText.textContent = ROUNDS[state.round].replies[Math.floor(Math.random() * ROUNDS[state.round].replies.length)];

    gsap.to(dom.grid, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      onComplete: () => {
        state.round = nextRound;
        renderRound();
        gsap.to(dom.grid, { opacity: 1, scale: 1, duration: 0.3 });
      }
    });
  }

  function runRoundFX(round) {
    if (round.effect === "shake") {
      gsap.timeline()
        .to(dom.card, { x: -6, duration: 0.05 })
        .to(dom.card, { x: 6, duration: 0.05 })
        .to(dom.card, { x: 0, duration: 0.08 });
    } else if (round.effect === "shake-glitch") {
      gsap.timeline()
        .to(dom.card, { skewX: 2, duration: 0.06, repeat: 3, yoyo: true })
        .to(dom.card, { skewX: 0, duration: 0.05 });
    } else if (round.effect === "invert") {
      gsap.timeline()
        .to(dom.body, { filter: "invert(1) hue-rotate(180deg)", duration: 0.15 })
        .to(dom.body, { filter: "none", duration: 0.25 });
    }

    round.sound.forEach((s) => sound.play(s));
  }

  dom.robotBtn.addEventListener("mouseenter", () => {
    if (state.round >= 2 || state.chaosMode) {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 16;
      gsap.to(dom.robotBtn, { x: offsetX, y: offsetY, duration: 0.15 });
      sound.play("boing");
    }
  });

  dom.robotBtn.addEventListener("mouseleave", () => {
    gsap.to(dom.robotBtn, { x: 0, y: 0, duration: 0.3 });
  });

  dom.robotBtn.addEventListener("click", () => {
    sound.play("alarm");
    dom.certView.hidden = true;
    dom.rejectionView.hidden = true;
    dom.lockoutView.hidden = false;
    const ticketNum = Math.floor(1000 + Math.random() * 9000);
    dom.ticketLine.textContent = `Support ticket #HU-${ticketNum} opened with the Department of Emotional Infrastructure.`;
    goToSlide(5);
  });

  function enqueueLogs(lines) {
    lines.forEach((line, idx) => {
      setTimeout(() => {
        const entry = document.createElement("div");
        entry.className = `log-entry ${line.includes("ERROR") || line.includes("FAILED") ? "log-alert" : ""}`;
        const sec = Math.floor((performance.now() - state.startedAt) / 1000);
        entry.innerHTML = `
          <span class="log-time">[${sec}s]</span>
          <span class="log-text">${line}</span>
        `;
        dom.logList.append(entry);
        dom.logList.scrollTop = dom.logList.scrollHeight;
      }, idx * 450);
    });
  }

  // ==========================================================================
  // SLIDE 3: TEXT VERIFICATION TRIAL ("TYPE TO PROVE A PULSE")
  // ==========================================================================

  function setupTextTrial() {
    loadNewTextPhrase();

    dom.newPhraseBtn.addEventListener("click", () => {
      sound.play("click");
      loadNewTextPhrase();
    });

    dom.textInput.addEventListener("keydown", (e) => {
      sound.play("type");

      if (!state.typingStartTime) {
        state.typingStartTime = performance.now();
      }

      state.totalKeypresses++;
      state.keypressIntervals.push(performance.now());

      if (state.keypressIntervals.length > 2) {
        const diffs = [];
        for (let i = 1; i < state.keypressIntervals.length; i++) {
          diffs.push(state.keypressIntervals[i] - state.keypressIntervals[i - 1]);
        }
        const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
        const variance = Math.sqrt(diffs.map((x) => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / diffs.length);
        dom.typingHesitation.textContent = variance > 55 ? "VERY HUMAN (JITTERY)" : "UNNERVINGLY SMOOTH";
      }
    });

    dom.textInput.addEventListener("input", () => {
      const target = dom.targetPhrase.textContent.trim();
      const current = dom.textInput.value;

      let matching = 0;
      for (let i = 0; i < current.length; i++) {
        if (current[i] === target[i]) matching++;
      }
      const acc = current.length > 0 ? Math.floor((matching / current.length) * 100) : 0;
      dom.typingAccuracy.textContent = `${acc}%`;

      const elapsedMins = (performance.now() - (state.typingStartTime || performance.now())) / 60000;
      const words = current.length / 5;
      const wpm = elapsedMins > 0 ? Math.floor(words / elapsedMins) : 0;
      dom.typingWpm.textContent = `${wpm} WPM`;

      if (acc < 80 && current.length > 5) {
        dom.textInput.classList.add("has-typo");
        dom.textFeedback.textContent = "Typos detected. While human, they are deeply disappointing.";
      } else {
        dom.textInput.classList.remove("has-typo");
        if (current.length > 15) {
          dom.textFeedback.textContent = "Keystroke cadence accepted. You may proceed to submit.";
        }
      }
    });

    dom.submitTextBtn.addEventListener("click", () => {
      const target = dom.targetPhrase.textContent.trim();
      const current = dom.textInput.value.trim();

      if (current === target) {
        sound.play("unlock");
        dom.textFeedback.textContent = "✓ Verified! You typed with authentic mammalian sloppiness.";
        showToast("Text Verification Passed! Chapter 04 Unlocked!", false);
        state.confidence = Math.min(100, state.confidence + 10);
        dom.confidence.innerHTML = `${state.confidence}<span>%</span>`;
        dom.globalConfidenceVal.textContent = `${state.confidence}%`;
        
        dom.textStatusSticker.textContent = "✓ KEYSTROKES VERIFIED";
        dom.textStatusSticker.className = "sticker sticker-top-right rotate-right badge-alert";

        if (typeof confetti === "function") {
          confetti({ particleCount: 25, spread: 60, origin: { y: 0.5 } });
        }

        // UNLOCK CHAPTER 04 ("ONE MORE TIME")
        unlockChapter(3);
      } else {
        sound.play("error");
        dom.textInput.classList.add("has-typo");
        dom.textFeedback.textContent = "Mismatch! Did you really think we wouldn't check every letter?";
      }
    });

    dom.typeCheatBtn.addEventListener("click", () => {
      sound.play("alarm");
      dom.textInput.value = dom.targetPhrase.textContent;
      dom.typingWpm.textContent = "999 WPM";
      dom.typingHesitation.textContent = "ROBOT DETECTED!";
      dom.textFeedback.textContent = "ALERT: Keystroke velocity exceeds physical biology! Robot trap triggered!";
      showToast("ROBOT TRAP TRIGGERED! You admitted perfection.", true);
    });
  }

  function loadNewTextPhrase() {
    state.currentPhraseIdx = (state.currentPhraseIdx + 1) % TEXT_PHRASES.length;
    dom.targetPhrase.textContent = TEXT_PHRASES[state.currentPhraseIdx];
    dom.textInput.value = "";
    dom.typingAccuracy.textContent = "0%";
    dom.typingWpm.textContent = "0 WPM";
    dom.typingHesitation.textContent = "WAITING...";
    dom.textFeedback.textContent = "Awaiting your keystrokes. Type like an organism with a nervous system.";
    state.typingStartTime = null;
    state.totalKeypresses = 0;
    state.keypressIntervals = [];
  }

  // ==========================================================================
  // SLIDE 4: THE "CLICK ONE MORE TIME" GAUNTLET (CORE FEATURE)
  // ==========================================================================

  function setupOneMoreGauntlet() {
    dom.hyperBtn.addEventListener("click", () => {
      state.totalTaps++;
      dom.totalTapsVal.textContent = state.totalTaps;
      sound.play("boing");

      if (state.oneMoreStage < ONE_MORE_STAGES.length) {
        const stage = ONE_MORE_STAGES[state.oneMoreStage];
        dom.machineSpeech.textContent = stage.speech;
        dom.hyperBtnLabel.textContent = stage.btnLabel;
        dom.hyperBtnSub.textContent = stage.sub;

        const jumpX = (Math.random() - 0.5) * 35;
        const jumpY = (Math.random() - 0.5) * 12;
        gsap.to(dom.hyperBtn, {
          x: jumpX,
          y: jumpY,
          scale: 1.03,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        });

        const pctValues = [23.4, 45.6, 68.2, 84.1, 97.4, 99.85];
        state.hyperPct = pctValues[state.oneMoreStage] || 99.9;
        dom.hyperPctVal.textContent = `${state.hyperPct.toFixed(2)}%`;
        dom.hyperMeterFill.style.width = `${state.hyperPct}%`;

        state.oneMoreStage++;
      } else {
        // ULTIMATE COMPLETION -> UNLOCK CHAPTER 05 (VIBE LAB)
        sound.play("unlock");
        dom.machineSpeech.textContent = "🎉 OVER-VERIFIED! The machine yields to your sheer biological stubbornness!";
        dom.hyperBtnLabel.textContent = "ACCESS GRANTED";
        dom.hyperBtnSub.textContent = "Verification 100.00%";
        dom.hyperPctVal.textContent = "100.00%";
        dom.hyperMeterFill.style.width = "100%";
        dom.clickStatusSticker.textContent = "✓ OVER-VERIFIED!";
        dom.clickStatusSticker.className = "sticker sticker-top-right rotate-right badge-alert";

        if (typeof confetti === "function") {
          confetti({ particleCount: 40, spread: 70, origin: { y: 0.5 } });
        }

        showToast("🎉 Confirmation Complete! Chapter 05: Vibe Lab Unlocked!", false);
        unlockChapter(4);
      }
    });

    dom.infiniteMoreBtn.addEventListener("click", () => {
      state.totalTaps += 5;
      dom.totalTapsVal.textContent = state.totalTaps;
      sound.play("stamp");

      const titleIdx = Math.min(TITLES.length - 1, Math.floor(state.totalTaps / 6));
      dom.machineSpeech.textContent = `★ LEVEL UP: You are now a [${TITLES[titleIdx]}]. Keep tapping if you dare!`;

      gsap.fromTo(dom.machineSpeech, 
        { scale: 0.95 }, 
        { scale: 1, duration: 0.25, ease: "elastic.out(1, 0.4)" }
      );
    });

    dom.calmMachineBtn.addEventListener("click", () => {
      sound.play("click");
      dom.machineSpeech.textContent = "The machine appreciates your reassurance. It is still 14% paranoid, however.";
    });
  }

  // ==========================================================================
  // SLIDE 5: THE BUREAU OF VIBES & UNRELIABLE TELEMETRY
  // ==========================================================================

  function setupBureauLab() {
    let auditPerformed = false;
    let appealPerformed = false;

    function checkLabCompletion() {
      if ((auditPerformed || appealPerformed) && !state.unlockedChapters[5]) {
        dom.labAdvanceBanner.hidden = false;
        dom.vibeStatusSticker.textContent = "✓ LAB SATISFIED";
        dom.vibeStatusSticker.className = "sticker sticker-top-right rotate-left badge-alert";
      }
    }

    dom.vibeAuditBtn.addEventListener("click", () => {
      state.audits++;
      auditPerformed = true;
      sound.play("click");
      dom.auditCount.textContent = `AUDITS ${String(state.audits).padStart(2, "0")}`;
      dom.vibeResult.textContent = DASHBOARD_COPY.auditReplies[Math.floor(Math.random() * DASHBOARD_COPY.auditReplies.length)];

      gsap.fromTo(dom.radarOrbit, 
        { rotation: 0, scale: 0.9 }, 
        { rotation: 360, scale: 1, duration: 0.8, ease: "power2.out" }
      );

      checkLabCompletion();
    });

    dom.recalibrateBtn.addEventListener("click", () => {
      state.recalibrations++;
      sound.play("stamp");
      dom.recalibrationCount.textContent = String(state.recalibrations).padStart(2, "0");
      dom.deskResult.textContent = DASHBOARD_COPY.recalibrationReplies[Math.floor(Math.random() * DASHBOARD_COPY.recalibrationReplies.length)];
      checkLabCompletion();
    });

    dom.appealBtn.addEventListener("click", () => {
      state.appeals++;
      appealPerformed = true;
      sound.play("click");
      dom.appealCount.textContent = String(state.appeals).padStart(2, "0");
      dom.appealQueue.textContent = `#${String(state.appeals).padStart(3, "0")}`;
      dom.deskResult.textContent = DASHBOARD_COPY.appealReplies[Math.floor(Math.random() * DASHBOARD_COPY.appealReplies.length)];
      showToast(`Appeal #${state.appeals} filed with the Department of Sighs.`, false);
      checkLabCompletion();
    });

    dom.labProceedBtn.addEventListener("click", () => {
      unlockChapter(5); // Unlock Chapter 6 (Final Judgment)
    });

    dom.panicSwitchBtn.addEventListener("click", () => {
      sound.play("alarm");
      dom.body.classList.toggle("glitch-active");
      state.chaosMode = !state.chaosMode;
      dom.panicSwitchBtn.textContent = state.chaosMode ? "🚨 PANIC ENGAGED (DISCO)" : "⚠️ DO NOT FLIP PANIC LEVER";

      if (state.chaosMode) {
        gsap.to(".slide-card", {
          rotation: () => (Math.random() - 0.5) * 1.5,
          duration: 0.2,
          repeat: -1,
          yoyo: true
        });
      } else {
        gsap.set(".slide-card", { rotation: 0 });
      }
    });
  }

  function updateTelemetry() {
    const forecast = DASHBOARD_COPY.forecast[Math.min(state.round, DASHBOARD_COPY.forecast.length - 1)];
    dom.forecastTag.textContent = forecast[0];
    dom.forecastTitle.textContent = forecast[1];
    dom.forecastDescription.textContent = forecast[2];
    dom.forecastSymbol.textContent = forecast[3];

    dom.vibePressure.textContent = `${(state.confidence / 100).toFixed(2)} hPa`;
    dom.vibePressureFill.style.width = `${state.confidence}%`;

    const ticker = DASHBOARD_COPY.ticker[Math.min(state.round, DASHBOARD_COPY.ticker.length - 1)];
    dom.marqueeCopy.textContent = ticker;
    dom.marqueeCopyDup.textContent = ticker;
  }

  // ==========================================================================
  // SLIDE 6: FINAL JUDGMENT (CERTIFICATE OR REJECTION)
  // ==========================================================================

  function renderFinalJudgment() {
    dom.lockoutView.hidden = true;
    
    // DON'T GIVE CERTIFICATE EVERY TIME:
    // If confidence collapsed to single digits and user didn't bribe server, show REJECTION!
    if (state.confidence <= 20 && !state.bribed) {
      dom.certView.hidden = true;
      dom.rejectionView.hidden = false;
      dom.rejectionConfidenceVal.textContent = `${state.confidence}%`;
      sound.play("error");
      showToast("FINAL VERDICT: APPLICATION FOR HUMANITY REJECTED", true);
    } else {
      dom.rejectionView.hidden = true;
      dom.certView.hidden = false;
      dom.issueConfidence.textContent = `${state.confidence}%`;
      dom.roundsSurvived.textContent = `6 / 6`;
      sound.play("fanfare");
      if (typeof confetti === "function") {
        confetti({ particleCount: 45, spread: 75, origin: { y: 0.6 } });
      }
    }
  }

  function setupCertificate() {
    // Stamp Toolbox selection
    dom.stampBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.play("click");
        dom.stampBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.activeStampText = btn.dataset.stamp;
      });
    });

    // Stamp placement onto certificate
    dom.stampTargetLayer.addEventListener("click", (e) => {
      sound.play("stamp");
      const rect = dom.stampTargetLayer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const stamp = document.createElement("div");
      stamp.className = "stamped-mark";
      stamp.textContent = state.activeStampText;
      stamp.style.left = `${x}px`;
      stamp.style.top = `${y}px`;
      const randomRot = (Math.random() - 0.5) * 26;
      stamp.style.setProperty("--rot", `${randomRot}deg`);

      dom.stampTargetLayer.append(stamp);

      if (typeof confetti === "function") {
        confetti({ particleCount: 12, spread: 35, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
      }
    });

    // Download PNG
    dom.downloadBtn.addEventListener("click", async () => {
      sound.play("click");
      if (typeof html2canvas !== "function") {
        alert("html2canvas library is loading, please try again in a moment.");
        return;
      }

      dom.downloadBtn.textContent = "Rendering Certificate...";
      try {
        const canvas = await html2canvas(dom.cert, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true
        });
        const link = document.createElement("a");
        link.download = `proof-of-humanity-${dom.recipientInput.value.replace(/\s+/g, "-")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        dom.downloadBtn.innerHTML = `<span>Download Official PNG</span><span aria-hidden="true"> ↓</span>`;
      } catch (err) {
        dom.downloadBtn.textContent = "Export error — try again";
      }
    });

    // Confetti button
    dom.confettiBtn.addEventListener("click", () => {
      sound.play("fanfare");
      if (typeof confetti === "function") {
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
      }
    });

    // Toggle Rejection view to explore it
    dom.toggleRejectionBtn.addEventListener("click", () => {
      dom.certView.hidden = true;
      dom.rejectionView.hidden = false;
      dom.rejectionConfidenceVal.textContent = `${state.confidence}%`;
    });

    // Rejection Screen buttons
    dom.rejectionAppealBtn.addEventListener("click", () => {
      sound.play("click");
      showToast("Urgent appeal filed. Expected hearing date: Year 2412.", false);
    });

    dom.rejectionPassBtn.addEventListener("click", () => {
      sound.play("fanfare");
      state.bribed = true;
      showToast("Bribe accepted! (5 imaginary cookies). Certificate unlocked!", false);
      dom.rejectionView.hidden = true;
      dom.certView.hidden = false;
      if (typeof confetti === "function") {
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.5 } });
      }
    });

    dom.rejectionRetryBtn.addEventListener("click", resetAll);
    dom.certResetBtn.addEventListener("click", resetAll);
    dom.lockoutResetBtn.addEventListener("click", resetAll);
    dom.lockoutBackBtn.addEventListener("click", () => {
      dom.lockoutView.hidden = true;
      renderFinalJudgment();
    });
  }

  function resetAll() {
    state.round = 0;
    state.confidence = ROUNDS[0].confidence;
    state.selectedTiles.clear();
    state.oneMoreStage = 0;
    state.totalTaps = 0;
    state.bribed = false;
    dom.totalTapsVal.textContent = "0";
    dom.certView.hidden = false;
    dom.rejectionView.hidden = true;
    dom.lockoutView.hidden = true;
    dom.body.classList.remove("mood-mild", "mood-glitch", "mood-crisis", "glitch-active");
    dom.body.classList.add("mood-normal");
    dom.stampTargetLayer.replaceChildren();

    // Lock chapters back up
    state.unlockedChapters = [true, false, false, false, false, false];
    dom.navPills.forEach((pill, idx) => {
      if (idx > 0) {
        pill.classList.add("locked");
        pill.title = "Locked: Complete previous chapter";
        const icon = pill.querySelector(".nav-icon");
        if (icon) icon.textContent = "🔒";
      }
    });

    updateGatingFooterStatus();
    renderRound();
    goToSlide(0);
  }

  // ==========================================================================
  // GLOBAL CONTROLS & INITIALIZATION
  // ==========================================================================

  function setupGlobalControls() {
    dom.soundToggleBtn.addEventListener("click", () => {
      sound.enabled = !sound.enabled;
      dom.soundToggleBtn.querySelector(".btn-text").textContent = sound.enabled ? "SFX: ON" : "SFX: OFF";
      dom.soundToggleBtn.querySelector(".btn-icon").textContent = sound.enabled ? "🔊" : "🔇";
      if (sound.enabled) sound.play("click");
    });

    dom.glitchToggleBtn.addEventListener("click", () => {
      sound.play("alarm");
      state.chaosMode = !state.chaosMode;
      dom.body.classList.toggle("glitch-active", state.chaosMode);
      dom.glitchToggleBtn.style.background = state.chaosMode ? "#ef4444" : "";
      dom.glitchToggleBtn.style.color = state.chaosMode ? "#ffffff" : "";
      showToast(state.chaosMode ? "CHAOS MODE ACTIVATED" : "Chaos mode subdued.", true);
    });

    dom.verifyBtn.addEventListener("click", handleVerifyClick);

    dom.logClearBtn.addEventListener("click", () => {
      dom.logList.replaceChildren();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        state.apologyBuffer = (state.apologyBuffer + e.key.toLowerCase()).slice(-5);
        if (state.apologyBuffer === "sorry") {
          state.apologyBuffer = "";
          sound.play("fanfare");
          state.confidence = Math.min(100, state.confidence + 5);
          dom.confidence.innerHTML = `${state.confidence}<span>%</span>`;
          dom.globalConfidenceVal.textContent = `${state.confidence}%`;
          showToast("Apology accepted by server! Confidence +5%", false);
        }
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        state.hiddenAt = Date.now();
      } else if (state.hiddenAt && Date.now() - state.hiddenAt > 6000) {
        showToast("Oh. So you DID have other things to do.", false);
        state.hiddenAt = null;
      }
    });
  }

  dom.sessionId.textContent = `NAB-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // Initialize
  setupHorizontalNavigation();
  setupCustomCursor();
  setupBiometricWarmup();
  setupTextTrial();
  setupOneMoreGauntlet();
  setupBureauLab();
  setupCertificate();
  setupGlobalControls();

  renderRound();
  updateGatingFooterStatus();
})();
