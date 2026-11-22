# Not a Bot: The CAPTCHA That Doesn't Trust You
*A playful, sideways-thinker CAPTCHA built for StupidHackathon 2026*

Inspired by the tactile storybook design of [The Whoopsies](https://thewhoopsies.co.uk/), **Not a Bot** turns the internet's most trusted, boring security widget into an escalating, absurd comedic journey. Built with **GSAP**, smooth horizontal scroll-and-slide storytelling, tactile neo-brutalist paper aesthetic, sound synthesis, and mildly annoying human-testing glitches.

---

## 🎪 What's Included

### 1. 📖 GSAP Horizontal Scroll & Slide UI (6 Storybook Chapters)
Navigate using mouse wheel horizontal scrolling, keyboard arrow keys (`←` / `→`), or the top chapter navigation pills:
* **01 / Lobby & Biometric Warmup:** Move your cursor inside the drawing sandbox to measure organic wrist muscle tremor before entry.
* **02 / The Image Matrix of Despair:** The iconic 7-round CAPTCHA that starts with normal traffic lights and buses, then descends into tired traffic lights, void emojis, existential buses, and self-doubt.
* **03 / The Text Verification Trial:** A typewriter test where you must type absurd phrases (e.g. *"I promise I have never plugged myself into a wall socket"*, reverse CAPTCHAs, or confessions) while an AI analyzes your keystroke hesitation and organic cadence. Features an innocent-looking *"Type it for me"* button that catches bots instantly!
* **04 / The "Click One More Time" Gauntlet:** The notorious recursive confirmation machine. When you click Verify, it demands:
  1. *"Click it one more time."*
  2. *"Click it once more with feeling!"*
  3. *"Click it slightly softer, like a gentle human."*
  4. *"The server blinked! Quick, click again!"*
  5. *"Almost verified... (button flinches away)!"*
  6. *"FINAL VERIFICATION (SERIOUSLY)!"*
  7. **OVER-VERIFIED MORTAL!** (Plus an *"I Want To Verify Even More!"* button with streak counters and titles).
* **05 / Bureau of Vibes & Unscientific Lab:** Features the Vibe Radar Scanner, the Recalibrate Nothing lever, the Bureaucratic Appeal Ticket Printer, and the guarded "DO NOT FLIP PANIC LEVER".
* **06 / Final Judgment (Certificate or Rejection!):** No guaranteed certificates! If your confidence was too low or robotic, you receive an official **REJECTION NOTICE** (with options to appeal or bribe the server with cookies). If earned, customize your *Certificate of Proven Humanity* with biological rubber stamps (`HUMAN OF EARTH 🌍`, `BREATHES OXYGEN 🫁`, `FLESH & BONE 🦴`, `100% MAMMAL 🐒`, `VERIFIED-ISH 🔏`, `NOT A TOASTER 🍞`) and download a crisp PNG souvenir via html2canvas.

---

## ⚡ Annoying Glitches & Playful Micro-Interactions
* **Flinching / Dodging Buttons:** Buttons like *"I might be a robot"* or late-stage verify buttons dodge cursor hovering.
* **Custom Accusatory Cursor:** Pointer with a reactive label that watches your cursor curvature.
* **Annoying Security Toasts:** Random bureaucratic warning popups (*"Security Alert: You clicked with suspicious confidence."*).
* **Screen Inversion & Glitch Shakes:** Triggered on panic rounds and via the `⚡ CHAOS` mode toggle.
* **Zero-Latency Web Audio Synthesizer:** Built-in procedural sound engine providing mechanical pops, cartoon boings, rubber stamp thuds, typewriter clacks, alarms, and victory fanfares (with fallback to local `.wav` files).

---

## 🚀 How to Run Locally

This is a pure static web app (HTML5, CSS3, Vanilla JS + GSAP). No build steps, bundlers, or node modules required!

Serve this directory using any static web server:
```sh
python -m http.server 8088
```
Then open `http://localhost:8088` in your browser.
