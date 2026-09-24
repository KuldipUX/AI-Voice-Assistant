(function () {
  // Current script & userId
  const script = document.currentScript;
  const userId = script?.dataset?.userId;
  const customServerUrl = script?.dataset?.serverUrl;

  // Determine base URLs dynamically from script source
  let clientBaseUrl = "https://ai-voice-assistant-weld.vercel.app";
  try {
    if (script?.src) {
      const parsedUrl = new URL(script.src);
      clientBaseUrl = parsedUrl.origin;
    }
  } catch (e) {
    console.warn("ShifraAI: Unable to parse script origin, defaulting to production URL");
  }

  let serverBaseUrl = customServerUrl || (clientBaseUrl.includes("localhost") ? "http://localhost:8000" : "https://ai-voice-assistant-pu5k.onrender.com");

  // Inject Google Fonts for Space Grotesk & Plus Jakarta Sans
  if (!document.getElementById("shifra-google-fonts")) {
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.crossOrigin = "anonymous";
    preconnect2.href = "https://fonts.gstatic.com";
    document.head.appendChild(preconnect2);

    const fontStyle = document.createElement("link");
    fontStyle.id = "shifra-google-fonts";
    fontStyle.rel = "stylesheet";
    fontStyle.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Grotesk:wght@600;700;800;900&display=swap";
    document.head.appendChild(fontStyle);
  }

  // Inject assistant.css
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${clientBaseUrl}/assistant.css`;
  document.head.appendChild(link);

  let theme = "light";
  let assistantConfig = null;

  // Create Neo-Brutalist Popup Container
  const popup = document.createElement("div");
  popup.className = `shifra-popup theme-${theme}`;

  popup.innerHTML = `
    <!-- Retro Window Top Bar -->
    <div class="shifra-window-bar">
      <div class="shifra-header-badge">
        <span class="shifra-dot"></span>
        <span class="shifra-badge-label">AI Voice Agent</span>
      </div>
      <button class="shifra-close-btn" aria-label="Close" title="Close assistant">✕</button>
    </div>

    <div class="shifra-content">
      <div class="shifra-top">
        <!-- Mascot / Visualizer Orb -->
        <div class="shifra-orb-wrap">
          <div class="shifra-orb">
            <div class="shifra-orb-inner"></div>
            <span class="shifra-orb-sparkle">✦</span>
          </div>
        </div>

        <h2 class="shifra-title">
          Hello! I'm Zyra AI
        </h2>

        <p class="shifra-sub">
          Your smart voice assistant.
          <br />
          Ask anything about this website.
        </p>

        <div class="shifra-status-pill">
          <span class="shifra-status-dot">●</span>
          <span class="shifra-status-label">Tap button to Speak</span>
        </div>

        <div class="shifra-wave">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!-- Dialogue Transcript Box -->
        <div class="shifra-dialogue-area">
          <div class="shifra-user-text" style="display: none;"></div>
          <div class="shifra-ai-text" style="display: none;"></div>
        </div>
      </div>

      <div class="shifra-bottom">
        <button class="shifra-mic" title="Tap to Speak">
          <img 
            src="${clientBaseUrl}/mic.svg"
            alt="mic"
            class="shifra-mic-icon"
          />
        </button>
        <span class="shifra-mic-hint">Tap to Speak</span>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  // Floating Neo-Brutalist Launcher Button
  const button = document.createElement("button");
  button.className = `shifra-btn theme-${theme}`;
  button.title = "Open AI Voice Assistant";

  button.innerHTML = `
    <div class="shifra-btn-badge">AI ✦</div>
    <img 
      src="${clientBaseUrl}/logo.png"
      alt="Zyra AI logo"
    />
  `;

  document.body.appendChild(button);

  // Toggle Popup
  let open = false;

  const togglePopup = (forceState) => {
    open = typeof forceState === "boolean" ? forceState : !open;
    popup.style.display = open ? "flex" : "none";
  };

  button.onclick = () => togglePopup();

  // Close Button Handler
  const closeBtn = popup.querySelector(".shifra-close-btn");
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      togglePopup(false);
    };
  }

  // Load Assistant Config from Backend
  const loadAssistant = async () => {
    try {
      if (!userId) {
        console.warn("ZyraAI: data-user-id attribute is missing on script tag");
        return;
      }
      console.log("ZyraAI Widget UserId:", userId);
      const res = await fetch(`${serverBaseUrl}/api/assistant/config/${userId}`);
      const data = await res.json();

      if (data && data.user) {
        assistantConfig = data.user;
        applyConfig();
      }
    } catch (error) {
      console.log("ZyraAI Load Error:", error);
    }
  };

  const applyConfig = () => {
    if (!assistantConfig) return;

    theme = assistantConfig.theme || "light";
    popup.className = `shifra-popup theme-${theme}`;
    button.className = `shifra-btn theme-${theme}`;

    const title = popup.querySelector(".shifra-title");
    if (title) {
      title.innerHTML = `Hello! I'm ${assistantConfig.assistantName || "Zyra AI"}`;
    }

    const subTitle = popup.querySelector(".shifra-sub");
    if (subTitle) {
      subTitle.innerHTML = `
        Welcome to ${assistantConfig.businessName || "our website"}.
        <br />
        Ask anything about your website.
      `;
    }
  };

  loadAssistant();

  // Widget Elements
  const statusLabel = popup.querySelector(".shifra-status-label");
  const wave = popup.querySelector(".shifra-wave");
  const userText = popup.querySelector(".shifra-user-text");
  const aiText = popup.querySelector(".shifra-ai-text");
  const mic = popup.querySelector(".shifra-mic");
  const micHint = popup.querySelector(".shifra-mic-hint");

  const updateStatus = (text, isListening = false) => {
    if (statusLabel) statusLabel.innerText = text;
    if (micHint) micHint.innerText = text;
    if (wave) {
      if (isListening) {
        wave.classList.add("active");
      } else {
        wave.classList.remove("active");
      }
    }
  };

  // Text-To-Speech Synthesis
  const speak = (text) => {
    window.speechSynthesis.cancel();

    // Show AI Response Bubble
    if (aiText) {
      aiText.style.display = "block";
      aiText.innerText = "AI: " + text;
      aiText.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    updateStatus("AI Speaking...", true);

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    // Female voice selection (restores original female voice functionality)
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find((v) =>
      v.name.includes("Heera") ||
      v.name.includes("Zira") ||
      v.name.includes("Female") ||
      v.name.includes("Google हिन्दी") ||
      (v.lang && (v.lang.startsWith("hi") || v.lang === "en-IN"))
    );
    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.onend = () => {
      updateStatus("Tap button to Speak", false);
    };

    speech.onerror = () => {
      updateStatus("Tap button to Speak", false);
    };

    window.speechSynthesis.speak(speech);
  };

  // Speech Recognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    mic.onclick = async () => {
      console.log("ZyraAI: Mic clicked");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        console.log("ZyraAI: Microphone permission granted");
        stream.getTracks().forEach((track) => track.stop());

        updateStatus("Listening...", true);

        if (userText) {
          userText.innerText = "";
          userText.style.display = "none";
        }
        if (aiText) {
          aiText.innerText = "";
          aiText.style.display = "none";
        }

        recognition.start();
      } catch (error) {
        console.error("ZyraAI: Microphone permission error:", error);
        updateStatus("Mic access denied", false);
      }
    };

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      console.log("ZyraAI Recognized:", text);

      if (userText) {
        userText.style.display = "block";
        userText.innerText = "You: " + text;
        userText.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      recognition.stop();

      setTimeout(async () => {
        try {
          updateStatus("Thinking...", false);

          const res = await fetch(`${serverBaseUrl}/api/assistant/ask`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: text,
              userId,
              currentPath: window.location.pathname,
            }),
          });

          const data = await res.json();
          console.log("ZyraAI Response:", data);

          if (data.success) {
            if (data.action === "navigate") {
              speak(data.response);
              setTimeout(() => {
                window.location.href = data.path;
              }, 1500);
            } else {
              speak(data.aiResponse);
            }
          } else {
            speak(data.message || "Response Error, please check your plan");
          }
        } catch (error) {
          console.log("ZyraAI Query Error:", error);
          speak("AI Server Error");
        }
      }, 600);
    };

    recognition.onstart = () => {
      console.log("ZyraAI: Recognition started");
    };

    recognition.onend = () => {
      console.log("ZyraAI: Recognition ended");
    };

    recognition.onerror = (e) => {
      console.log("ZyraAI Recognition error:", e.error, e);
      updateStatus("Tap button to Speak", false);
    };
  } else {
    updateStatus("Speech not supported", false);
  }
})();
