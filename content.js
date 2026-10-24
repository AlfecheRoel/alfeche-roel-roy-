(function () {
  // Prevent duplicate injection (e.g. if script runs twice)
  if (document.getElementById("fc-floating-btn")) return;

  // ----- Floating button -----
  const btn = document.createElement("button");
  btn.id = "fc-floating-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Open chat");
  btn.innerHTML = '<span class="fc-orbit-logo" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M24 3 29 18 45 24 29 30 24 45 19 30 3 24 19 18Z"/><circle cx="24" cy="24" r="5"/></svg></span>';
  document.body.appendChild(btn);

  // ----- Chatbox -----
  const chatbox = document.createElement("div");
  chatbox.id = "fc-chatbox";
  chatbox.style.display = "none";
  chatbox.innerHTML = `
    <div id="fc-inner">
    <div id="fc-chatbox-header">
      <div class="fc-brand"><span class="fc-brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M24 3 29 18 45 24 29 30 24 45 19 30 3 24 19 18Z"/><circle cx="24" cy="24" r="5"/></svg></span><span><strong>ORBIT <em>CHAT</em></strong><small>YOUR SPACE. YOUR WORKFLOW.</small></span></div>
      <div class="fc-header-actions"><button id="fc-chat-clear" title="Clear local chat" aria-label="Clear chat">⌫</button><button id="fc-chatbox-close" aria-label="Close chat" title="Close">×</button></div>
    </div>
    <div id="fc-chatbox-tabs" role="tablist">
      <button class="fc-tab active" data-tab="chats" role="tab" aria-selected="true"><span>◉</span> Chat</button>
      <button class="fc-tab" data-tab="groups" role="tab" aria-selected="false"><span>▦</span> Groups</button>
      <button class="fc-tab" data-tab="shares" role="tab" aria-selected="false"><span>↗</span> Saved</button>
      <button class="fc-tab" data-tab="media" role="tab" aria-selected="false"><span>▣</span> Media</button>
      <button class="fc-tab" data-tab="tools" role="tab" aria-selected="false"><span>⌘</span> Tools</button>
    </div>
    <div id="fc-chatbox-body">
      <div class="fc-panel" data-panel="chats">
        <div id="fc-chatbox-messages" aria-live="polite"></div>
        <div class="fc-chat-hint">Your messages are saved on this device</div>
        <div id="fc-chatbox-input-row">
          <input id="fc-chatbox-input" type="text" maxlength="4000" placeholder="Write a message…" aria-label="Message" />
          <button id="fc-chatbox-send" aria-label="Send message" title="Send">➤</button>
        </div>
      </div>
      <div class="fc-panel fc-collection-panel" data-panel="groups" hidden>
        <div class="fc-category-heading"><span class="fc-kicker">ORGANIZE</span><h3>Your groups</h3><p>Create collections for projects, topics, or anything you want to keep together.</p></div>
        <form id="fc-group-form" class="fc-add-form">
          <label class="fc-label" for="fc-group-name">Group name</label>
          <input id="fc-group-name" class="fc-field" maxlength="60" required placeholder="e.g. School project" />
          <label class="fc-label" for="fc-group-description">Description <span class="fc-muted">(optional)</span></label>
          <textarea id="fc-group-description" class="fc-field fc-textarea" maxlength="240" rows="2" placeholder="What is this group for?"></textarea>
          <button class="fc-btn fc-btn-primary fc-btn-wide" type="submit">＋ Create group</button>
        </form>
        <div class="fc-list-heading"><strong>MY GROUPS</strong><span id="fc-group-count">0</span></div>
        <div id="fc-group-list" class="fc-collection-list"></div>
      </div>
      <div class="fc-panel fc-collection-panel" data-panel="shares" hidden>
        <div class="fc-category-heading"><span class="fc-kicker">KEEP IT CLOSE</span><h3>Saved items</h3><p>Save links, references, and ideas here. Nothing is uploaded to a server.</p></div>
        <form id="fc-saved-form" class="fc-add-form">
          <label class="fc-label" for="fc-saved-title">Item title</label>
          <input id="fc-saved-title" class="fc-field" maxlength="80" required placeholder="Give it a useful name" />
          <label class="fc-label" for="fc-saved-url">Link or note</label>
          <input id="fc-saved-url" class="fc-field" maxlength="1500" placeholder="https://… or type a note" />
          <div class="fc-row"><div class="fc-col"><label class="fc-label" for="fc-saved-category">Category</label><select id="fc-saved-category" class="fc-field"><option>Resource</option><option>Work</option><option>Study</option><option>Idea</option><option>Personal</option><option>Media</option><option>Other</option></select></div></div>
          <label class="fc-label" for="fc-media-file">Photo or video (optional)</label>
          <input id="fc-media-file" class="fc-field" type="file" accept="image/*,video/*" />
          <p class="fc-muted">Media files are kept locally. Use small files (up to 8 MB).</p>
          <button class="fc-btn fc-btn-primary fc-btn-wide" type="submit">＋ Save item</button>
        </form>
        <div class="fc-list-heading"><strong>YOUR LIBRARY</strong><span id="fc-saved-count">0</span></div>
        <div id="fc-saved-list" class="fc-collection-list"></div>
      </div>
      <div class="fc-panel fc-collection-panel" data-panel="media" hidden>
        <div class="fc-category-heading"><span class="fc-kicker">PHOTO + VIDEO</span><h3>Media library</h3><p>Add photos or videos from your device and preview them here. Files stay on this device.</p></div>
        <form id="fc-media-library-form" class="fc-add-form">
          <label class="fc-label" for="fc-media-library-title">Media title</label>
          <input id="fc-media-library-title" class="fc-field" maxlength="80" required placeholder="e.g. Project video" />
          <label class="fc-label" for="fc-media-library-file">Choose photo or video</label>
          <input id="fc-media-library-file" class="fc-field" type="file" accept="image/*,video/*" required />
          <p class="fc-muted">Supported: photos and browser-playable videos. Maximum file size: 8 MB.</p>
          <button class="fc-btn fc-btn-primary fc-btn-wide" type="submit">＋ Add to Media</button>
        </form>
        <div class="fc-list-heading"><strong>YOUR MEDIA</strong><span id="fc-media-library-count">0</span></div>
        <div id="fc-media-library-list" class="fc-collection-list"></div>
      </div>
      <div class="fc-panel" data-panel="tools" hidden>
        <div id="fc-tools">
          <div id="fc-tools-menu">
            <button class="fc-tool-card" data-tool="calc"><span>🧮</span>Calculator</button>
            <button class="fc-tool-card" data-tool="convert"><span>📏</span>Converter</button>
            <button class="fc-tool-card" data-tool="timer"><span>⏱️</span>Timer</button>
            <button class="fc-tool-card" data-tool="notes"><span>📝</span>Notes</button>
            <button class="fc-tool-card" data-tool="color"><span>🎨</span>RGB Color</button>
            <button class="fc-tool-card" data-tool="password"><span>🔐</span>Password</button>
          </div>
          <div id="fc-tool-view" hidden>
            <div id="fc-tool-bar">
              <button id="fc-tool-back">← Tools</button>
              <span id="fc-tool-title"></span>
            </div>
            <div id="fc-tool-body">

              <div class="fc-tool" data-tool-panel="calc" hidden>
                <div id="fc-calculator">
                  <div id="fc-calc-display">
                    <div id="fc-calc-expression"></div>
                    <div id="fc-calc-value">0</div>
                  </div>
                  <div id="fc-calc-pad">
            <button class="fc-calc-btn fc-calc-op" data-action="clear">C</button>
            <button class="fc-calc-btn fc-calc-op" data-action="sign">±</button>
            <button class="fc-calc-btn fc-calc-op" data-action="percent">%</button>
            <button class="fc-calc-btn fc-calc-op" data-value="/">÷</button>

            <button class="fc-calc-btn" data-value="7">7</button>
            <button class="fc-calc-btn" data-value="8">8</button>
            <button class="fc-calc-btn" data-value="9">9</button>
            <button class="fc-calc-btn fc-calc-op" data-value="*">×</button>

            <button class="fc-calc-btn" data-value="4">4</button>
            <button class="fc-calc-btn" data-value="5">5</button>
            <button class="fc-calc-btn" data-value="6">6</button>
            <button class="fc-calc-btn fc-calc-op" data-value="-">−</button>

            <button class="fc-calc-btn" data-value="1">1</button>
            <button class="fc-calc-btn" data-value="2">2</button>
            <button class="fc-calc-btn" data-value="3">3</button>
            <button class="fc-calc-btn fc-calc-op" data-value="+">+</button>

            <button class="fc-calc-btn fc-calc-zero" data-value="0">0</button>
            <button class="fc-calc-btn" data-action="decimal">.</button>
            <button class="fc-calc-btn fc-calc-equals" data-action="equals">=</button>
          </div>
                </div>
              </div>

              <div class="fc-tool" data-tool-panel="convert" hidden>
                <label class="fc-label">Category</label>
                <select id="fc-cv-cat" class="fc-field">
                  <option value="length">Length</option>
                  <option value="weight">Weight</option>
                  <option value="temp">Temperature</option>
                </select>
                <label class="fc-label">Value</label>
                <input id="fc-cv-value" class="fc-field" type="number" value="1" step="any" />
                <div class="fc-row">
                  <div class="fc-col">
                    <label class="fc-label">From</label>
                    <select id="fc-cv-from" class="fc-field"></select>
                  </div>
                  <button id="fc-cv-swap" class="fc-btn fc-btn-icon" title="Swap">⇄</button>
                  <div class="fc-col">
                    <label class="fc-label">To</label>
                    <select id="fc-cv-to" class="fc-field"></select>
                  </div>
                </div>
                <div class="fc-result" id="fc-cv-result">—</div>
              </div>

              <div class="fc-tool" data-tool-panel="timer" hidden>
                <div class="fc-section-title">Stopwatch</div>
                <div class="fc-bigtime" id="fc-sw-display">00:00.00</div>
                <div class="fc-row">
                  <button id="fc-sw-start" class="fc-btn fc-btn-primary">Start</button>
                  <button id="fc-sw-lap" class="fc-btn">Lap</button>
                  <button id="fc-sw-reset" class="fc-btn">Reset</button>
                </div>
                <div id="fc-sw-laps"></div>
                <div class="fc-section-title">Countdown</div>
                <div class="fc-bigtime" id="fc-cd-display">05:00</div>
                <div class="fc-row">
                  <input id="fc-cd-min" class="fc-field" type="number" min="0" max="999" value="5" />
                  <span class="fc-sep">min</span>
                  <input id="fc-cd-sec" class="fc-field" type="number" min="0" max="59" value="0" />
                  <span class="fc-sep">sec</span>
                </div>
                <div class="fc-row">
                  <button id="fc-cd-start" class="fc-btn fc-btn-primary">Start</button>
                  <button id="fc-cd-reset" class="fc-btn">Reset</button>
                </div>
              </div>

              <div class="fc-tool" data-tool-panel="notes" hidden>
                <textarea id="fc-notes-area" class="fc-field fc-textarea" placeholder="Write your notes here... (auto-saved)"></textarea>
                <div class="fc-row fc-row-between">
                  <span id="fc-notes-count" class="fc-muted">0 words · 0 chars</span>
                  <span>
                    <button id="fc-notes-copy" class="fc-btn">Copy</button>
                    <button id="fc-notes-clear" class="fc-btn">Clear</button>
                  </span>
                </div>
              </div>

              <div class="fc-tool" data-tool-panel="color" hidden>
                <div id="fc-color-swatch"></div>
                <div class="fc-slider-row"><span class="fc-rgb-r">R</span><input id="fc-col-r" type="range" min="0" max="255" value="0" /><output id="fc-col-r-out">0</output></div>
                <div class="fc-slider-row"><span class="fc-rgb-g">G</span><input id="fc-col-g" type="range" min="0" max="255" value="255" /><output id="fc-col-g-out">255</output></div>
                <div class="fc-slider-row"><span class="fc-rgb-b">B</span><input id="fc-col-b" type="range" min="0" max="255" value="102" /><output id="fc-col-b-out">102</output></div>
                <label class="fc-label">HEX</label>
                <div class="fc-row">
                  <input id="fc-col-hex" class="fc-field" type="text" maxlength="7" value="#00FF66" />
                  <button id="fc-col-copy-hex" class="fc-btn">Copy</button>
                </div>
                <label class="fc-label">RGB</label>
                <div class="fc-row">
                  <input id="fc-col-rgb" class="fc-field" type="text" readonly value="rgb(0, 255, 102)" />
                  <button id="fc-col-copy-rgb" class="fc-btn">Copy</button>
                </div>
                <button id="fc-col-random" class="fc-btn fc-btn-primary fc-btn-wide">🎲 Random color</button>
              </div>

              <div class="fc-tool" data-tool-panel="password" hidden>
                <div class="fc-result fc-mono" id="fc-pw-output">—</div>
                <div id="fc-pw-strength" class="fc-muted"></div>
                <div class="fc-slider-row">
                  <span>Len</span>
                  <input id="fc-pw-len" type="range" min="6" max="40" value="16" />
                  <output id="fc-pw-len-out">16</output>
                </div>
                <label class="fc-check"><input type="checkbox" id="fc-pw-upper" checked /> Uppercase (A-Z)</label>
                <label class="fc-check"><input type="checkbox" id="fc-pw-lower" checked /> Lowercase (a-z)</label>
                <label class="fc-check"><input type="checkbox" id="fc-pw-num" checked /> Numbers (0-9)</label>
                <label class="fc-check"><input type="checkbox" id="fc-pw-sym" checked /> Symbols (!@#$)</label>
                <div class="fc-row">
                  <button id="fc-pw-gen" class="fc-btn fc-btn-primary">Generate</button>
                  <button id="fc-pw-copy" class="fc-btn">Copy</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  `;
  document.body.appendChild(chatbox);

  const messages = chatbox.querySelector("#fc-chatbox-messages");
  const input = chatbox.querySelector("#fc-chatbox-input");
  const sendBtn = chatbox.querySelector("#fc-chatbox-send");
  const closeBtn = chatbox.querySelector("#fc-chatbox-close");
  const clearChatBtn = chatbox.querySelector("#fc-chat-clear");
  const tabs = chatbox.querySelectorAll(".fc-tab");
  const panels = chatbox.querySelectorAll(".fc-panel");

  // ----- Tools: basic calculator -----
  const calcExpressionEl = chatbox.querySelector("#fc-calc-expression");
  const calcValueEl = chatbox.querySelector("#fc-calc-value");
  const calcButtons = chatbox.querySelectorAll(".fc-calc-btn");

  const calcState = {
    current: "0", // value currently being typed/shown
    previous: null, // stored left-hand operand
    operator: null, // pending operator
    justEvaluated: false, // true right after "="
  };

  const OP_SYMBOL = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  function calcFormat(numStr) {
    const num = Number(numStr);
    if (!isFinite(num)) return "Error";
    // Trim floating point noise, keep up to 10 significant digits.
    const rounded = parseFloat(num.toPrecision(10));
    return String(rounded);
  }

  function calcRender() {
    calcValueEl.textContent = calcState.current;
    calcExpressionEl.textContent =
      calcState.previous !== null && calcState.operator
        ? `${calcState.previous} ${OP_SYMBOL[calcState.operator]}`
        : "";
  }

  function calcInputDigit(digit) {
    if (calcState.justEvaluated) {
      calcState.current = digit;
      calcState.justEvaluated = false;
      return;
    }
    calcState.current = calcState.current === "0" ? digit : calcState.current + digit;
  }

  function calcInputDecimal() {
    if (calcState.justEvaluated) {
      calcState.current = "0.";
      calcState.justEvaluated = false;
      return;
    }
    if (!calcState.current.includes(".")) {
      calcState.current += ".";
    }
  }

  function calcCompute(a, op, b) {
    const x = parseFloat(a);
    const y = parseFloat(b);
    switch (op) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      case "/":
        return y === 0 ? NaN : x / y;
      default:
        return y;
    }
  }

  function calcChooseOperator(op) {
    if (calcState.operator && !calcState.justEvaluated) {
      // Chain operations: resolve the pending one first.
      const result = calcCompute(calcState.previous, calcState.operator, calcState.current);
      calcState.previous = calcFormat(String(result));
    } else {
      calcState.previous = calcState.current;
    }
    calcState.operator = op;
    calcState.current = "0";
    calcState.justEvaluated = false;
  }

  function calcEquals() {
    if (!calcState.operator || calcState.previous === null) return;
    const result = calcCompute(calcState.previous, calcState.operator, calcState.current);
    calcState.current = calcFormat(String(result));
    calcState.previous = null;
    calcState.operator = null;
    calcState.justEvaluated = true;
  }

  function calcClear() {
    calcState.current = "0";
    calcState.previous = null;
    calcState.operator = null;
    calcState.justEvaluated = false;
  }

  function calcToggleSign() {
    if (calcState.current === "0") return;
    calcState.current = calcState.current.startsWith("-")
      ? calcState.current.slice(1)
      : `-${calcState.current}`;
  }

  function calcPercent() {
    calcState.current = calcFormat(String(parseFloat(calcState.current) / 100));
  }

  calcButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { value, action } = button.dataset;
      if (value !== undefined) {
        if (["+", "-", "*", "/"].includes(value)) {
          calcChooseOperator(value);
        } else {
          calcInputDigit(value);
        }
      } else if (action === "decimal") {
        calcInputDecimal();
      } else if (action === "equals") {
        calcEquals();
      } else if (action === "clear") {
        calcClear();
      } else if (action === "sign") {
        calcToggleSign();
      } else if (action === "percent") {
        calcPercent();
      }
      calcRender();
    });
  });

  calcRender();


  // ----- Tools: menu / navigation -----
  const toolsMenu = chatbox.querySelector("#fc-tools-menu");
  const toolView = chatbox.querySelector("#fc-tool-view");
  const toolTitle = chatbox.querySelector("#fc-tool-title");
  const toolPanels = chatbox.querySelectorAll(".fc-tool");
  const TOOL_NAMES = {
    calc: "Calculator",
    convert: "Converter",
    timer: "Timer",
    notes: "Notes",
    color: "RGB Color",
    password: "Password",
  };

  function openTool(name) {
    toolsMenu.hidden = true;
    toolView.hidden = false;
    toolTitle.textContent = TOOL_NAMES[name];
    toolPanels.forEach((p) => (p.hidden = p.dataset.toolPanel !== name));
  }

  function closeTool() {
    toolView.hidden = true;
    toolsMenu.hidden = false;
  }

  chatbox.querySelectorAll(".fc-tool-card").forEach((card) => {
    card.addEventListener("click", () => openTool(card.dataset.tool));
  });
  chatbox.querySelector("#fc-tool-back").addEventListener("click", closeTool);

  // ----- Shared helpers -----
  const $ = (sel) => chatbox.querySelector(sel);

  function copyText(text, button) {
    const done = () => {
      if (!button) return;
      const old = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = old), 1000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      done();
    } catch (e) {}
    ta.remove();
  }

  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.value = 0.1;
      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
      }, 500);
    } catch (e) {}
  }

  const store = {
    get(key, cb) {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(key, (r) => cb(r ? r[key] : undefined));
      } else {
        try {
          cb(localStorage.getItem(key));
        } catch (e) {
          cb(undefined);
        }
      }
    },
    set(key, value) {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ [key]: value });
      } else {
        try {
          localStorage.setItem(key, value);
        } catch (e) {}
      }
    },
  };

  // ----- Personal categories: groups + saved items (local CRUD) -----
  const GROUPS_KEY = "fc_orbit_groups_v1";
  const SAVED_KEY = "fc_orbit_saved_v1";
  let groups = [];
  let savedItems = [];
  const groupForm = $("#fc-group-form");
  const savedForm = $("#fc-saved-form");

  function safeParseArray(value) {
    try { const data = typeof value === "string" ? JSON.parse(value) : value; return Array.isArray(data) ? data : []; }
    catch (_) { return []; }
  }
  function escapeText(value) {
    return String(value ?? "").replace(/[&<>\"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;", "'":"&#39;"}[ch]));
  }
  function persistGroups() { store.set(GROUPS_KEY, JSON.stringify(groups)); }
  function persistSaved() { store.set(SAVED_KEY, JSON.stringify(savedItems)); }
  function renderGroups() {
    const list = $("#fc-group-list");
    $("#fc-group-count").textContent = String(groups.length);
    list.replaceChildren();
    if (!groups.length) { list.innerHTML = '<div class="fc-empty-state"><span>▦</span><strong>No groups yet</strong><p>Create your first group above to organize your space.</p></div>'; return; }
    groups.forEach(group => {
      const item = document.createElement("article"); item.className = "fc-collection-item";
      const title = document.createElement("strong"); title.className = "fc-item-title"; title.textContent = group.name;
      const desc = document.createElement("p"); desc.className = "fc-item-description"; desc.textContent = group.description || "Personal collection";
      const meta = document.createElement("span"); meta.className = "fc-item-meta"; meta.textContent = new Date(group.createdAt).toLocaleDateString();
      const del = document.createElement("button"); del.type = "button"; del.className = "fc-icon-btn fc-delete-item"; del.title = "Delete group"; del.setAttribute("aria-label", `Delete ${group.name}`); del.textContent = "×";
      del.addEventListener("click", () => { if (confirm(`Delete group “${group.name}”?`)) { groups = groups.filter(g => g.id !== group.id); persistGroups(); renderGroups(); } });
      const top = document.createElement("div"); top.className = "fc-item-top"; top.append(title, del);
      item.append(top, desc, meta); list.append(item);
    });
  }
  function renderSaved() {
    const list = $("#fc-saved-list");
    $("#fc-saved-count").textContent = String(savedItems.length);
    list.replaceChildren();
    if (!savedItems.length) { list.innerHTML = '<div class="fc-empty-state"><span>↗</span><strong>Your library is empty</strong><p>Add a link, note, or idea using the form above.</p></div>'; return; }
    savedItems.slice().reverse().forEach(entry => {
      const item = document.createElement("article"); item.className = "fc-collection-item";
      const title = document.createElement("strong"); title.className = "fc-item-title"; title.textContent = entry.title;
      const category = document.createElement("span"); category.className = "fc-chip"; category.textContent = entry.category || "Other";
      const content = document.createElement("p"); content.className = "fc-item-description"; content.textContent = entry.content && !String(entry.content).startsWith("data:") ? entry.content : (entry.mediaData ? "" : "No link or note added.");
      let mediaNode = null;
      const mediaSrc = entry.mediaData || (/^https?:\/\//i.test(entry.content || "") ? entry.content : "");
      if (mediaSrc) {
        if (/^data:video\//i.test(mediaSrc) || (/\.(mp4|webm|ogg)(\?|#|$)/i.test(mediaSrc))) {
          mediaNode = document.createElement("video"); mediaNode.controls = true; mediaNode.preload = "metadata"; mediaNode.playsInline = true;
        } else if (/^data:image\//i.test(mediaSrc) || (/\.(png|jpe?g|gif|webp|avif|svg)(\?|#|$)/i.test(mediaSrc))) {
          mediaNode = document.createElement("img"); mediaNode.alt = entry.title || "Saved photo"; mediaNode.loading = "lazy";
        } else if (/youtube\.com|youtu\.be/i.test(mediaSrc)) {
          const yt = mediaSrc.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/i);
          if (yt) { mediaNode = document.createElement("iframe"); mediaNode.src = "https://www.youtube-nocookie.com/embed/" + yt[1]; mediaNode.title = entry.title || "YouTube video"; mediaNode.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"; mediaNode.allowFullscreen = true; }
        }
        if (mediaNode) { mediaNode.className = "fc-media-preview"; mediaNode.src = mediaNode.tagName === "IFRAME" ? mediaNode.src : mediaSrc; }
      }
      const del = document.createElement("button"); del.type = "button"; del.className = "fc-icon-btn fc-delete-item"; del.title = "Delete saved item"; del.setAttribute("aria-label", `Delete ${entry.title}`); del.textContent = "×";
      del.addEventListener("click", () => { savedItems = savedItems.filter(x => x.id !== entry.id); persistSaved(); renderSaved(); });
      const top = document.createElement("div"); top.className = "fc-item-top"; top.append(title, del);
      const footer = document.createElement("div"); footer.className = "fc-item-footer"; footer.append(category);
      if (/^https?:\/\//i.test(entry.content || "")) { const open = document.createElement("a"); open.className = "fc-open-link"; open.href = entry.content; open.target = "_blank"; open.rel = "noopener noreferrer"; open.textContent = "Open link ↗"; footer.append(open); }
      item.append(top);
      if (mediaNode) item.append(mediaNode);
      if (content.textContent) item.append(content);
      item.append(footer); list.append(item);
    });
  }
  groupForm.addEventListener("submit", event => {
    event.preventDefault(); const name = $("#fc-group-name").value.trim(); if (!name) return;
    groups.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`, name, description: $("#fc-group-description").value.trim(), createdAt: Date.now() });
    persistGroups(); renderGroups(); groupForm.reset(); $("#fc-group-name").focus();
  });
  savedForm.addEventListener("submit", event => {
    event.preventDefault();
    const title = $("#fc-saved-title").value.trim();
    const content = $("#fc-saved-url").value.trim();
    const category = $("#fc-saved-category").value;
    const file = $("#fc-media-file").files && $("#fc-media-file").files[0];
    if (!title) return;
    if (file && file.size > 8 * 1024 * 1024) { alert("Please choose a photo or video smaller than 8 MB."); return; }
    const saveEntry = mediaData => {
      savedItems.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`, title, content, category, mediaData: mediaData || "", mediaType: file ? file.type : "", createdAt: Date.now() });
      persistSaved(); renderSaved(); savedForm.reset(); $("#fc-saved-title").focus();
    };
    if (file) {
      const reader = new FileReader();
      reader.onload = () => saveEntry(String(reader.result || ""));
      reader.onerror = () => alert("Could not read that file. Please try another one.");
      reader.readAsDataURL(file);
    } else saveEntry("");
  });
  // Dedicated Media tab: shares the same local library as Saved, filtered to media items.
  const mediaLibraryForm = $("#fc-media-library-form");
  function renderMediaLibrary() {
    const list = $("#fc-media-library-list");
    const media = savedItems.filter(entry => entry && (entry.mediaData || entry.category === "Media") && (entry.mediaData || /youtube\.com|youtu\.be|\.(mp4|webm|ogg|png|jpe?g|gif|webp|avif)(\?|#|$)/i.test(entry.content || "")));
    $("#fc-media-library-count").textContent = String(media.length);
    list.replaceChildren();
    if (!media.length) { list.innerHTML = '<div class="fc-empty-state"><span>▣</span><strong>No media yet</strong><p>Choose a photo or video above to build your media library.</p></div>'; return; }
    media.slice().reverse().forEach(entry => {
      const item = document.createElement("article"); item.className = "fc-collection-item";
      const top = document.createElement("div"); top.className = "fc-item-top";
      const title = document.createElement("strong"); title.className = "fc-item-title"; title.textContent = entry.title;
      const del = document.createElement("button"); del.type = "button"; del.className = "fc-icon-btn fc-delete-item"; del.title = "Delete media"; del.setAttribute("aria-label", `Delete ${entry.title}`); del.textContent = "×";
      del.addEventListener("click", () => { savedItems = savedItems.filter(x => x.id !== entry.id); persistSaved(); renderSaved(); renderMediaLibrary(); });
      top.append(title, del); item.append(top);
      const src = entry.mediaData || entry.content || "";
      let preview;
      if (/^data:video\//i.test(src) || /\.(mp4|webm|ogg)(\?|#|$)/i.test(src)) { preview = document.createElement("video"); preview.controls = true; preview.preload = "metadata"; preview.playsInline = true; }
      else if (/^data:image\//i.test(src) || /\.(png|jpe?g|gif|webp|avif|svg)(\?|#|$)/i.test(src)) { preview = document.createElement("img"); preview.alt = entry.title; }
      else { const match = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/i); if (match) { preview = document.createElement("iframe"); preview.src = "https://www.youtube-nocookie.com/embed/" + match[1]; preview.title = entry.title; preview.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"; preview.allowFullscreen = true; } }
      if (preview) { preview.className = "fc-media-preview"; if (preview.tagName !== "IFRAME") preview.src = src; item.append(preview); }
      const meta = document.createElement("span"); meta.className = "fc-item-meta"; meta.textContent = entry.mediaType || (entry.content ? "Linked media" : "Media file"); item.append(meta); list.append(item);
    });
  }
  mediaLibraryForm.addEventListener("submit", event => {
    event.preventDefault();
    const title = $("#fc-media-library-title").value.trim();
    const file = $("#fc-media-library-file").files && $("#fc-media-library-file").files[0];
    if (!title || !file) return;
    if (file.size > 8 * 1024 * 1024) { alert("Please choose a file smaller than 8 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      savedItems.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`, title, content: "", category: "Media", mediaData: String(reader.result || ""), mediaType: file.type, createdAt: Date.now() });
      persistSaved(); renderSaved(); renderMediaLibrary(); mediaLibraryForm.reset();
    };
    reader.onerror = () => alert("Could not read that file. Please try another one.");
    reader.readAsDataURL(file);
  });
  const originalRenderSaved = renderSaved;
  renderSaved = function() { originalRenderSaved(); renderMediaLibrary(); };
  store.get(GROUPS_KEY, raw => { groups = safeParseArray(raw).filter(x => x && typeof x.name === "string"); renderGroups(); });
  store.get(SAVED_KEY, raw => { savedItems = safeParseArray(raw).filter(x => x && typeof x.title === "string"); renderSaved(); });

  // ----- Tool 2: unit converter -----
  const UNITS = {
    length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
    weight: { mg: 0.000001, g: 0.001, kg: 1, oz: 0.028349523125, lb: 0.45359237 },
    temp: { "°C": 1, "°F": 1, K: 1 },
  };
  const cvCat = $("#fc-cv-cat");
  const cvValue = $("#fc-cv-value");
  const cvFrom = $("#fc-cv-from");
  const cvTo = $("#fc-cv-to");
  const cvResult = $("#fc-cv-result");

  function fillUnits() {
    const names = Object.keys(UNITS[cvCat.value]);
    const opts = names.map((n) => `<option value="${n}">${n}</option>`).join("");
    cvFrom.innerHTML = opts;
    cvTo.innerHTML = opts;
    cvFrom.value = names[0];
    cvTo.value = names[1] || names[0];
  }

  function toCelsius(v, u) {
    if (u === "°F") return ((v - 32) * 5) / 9;
    if (u === "K") return v - 273.15;
    return v;
  }
  function fromCelsius(c, u) {
    if (u === "°F") return (c * 9) / 5 + 32;
    if (u === "K") return c + 273.15;
    return c;
  }

  function convert() {
    const v = parseFloat(cvValue.value);
    if (isNaN(v)) {
      cvResult.textContent = "—";
      return;
    }
    let out;
    if (cvCat.value === "temp") {
      out = fromCelsius(toCelsius(v, cvFrom.value), cvTo.value);
    } else {
      const table = UNITS[cvCat.value];
      out = (v * table[cvFrom.value]) / table[cvTo.value];
    }
    const shown = parseFloat(out.toPrecision(10));
    cvResult.textContent = `${v} ${cvFrom.value} = ${shown} ${cvTo.value}`;
  }

  cvCat.addEventListener("change", () => {
    fillUnits();
    convert();
  });
  [cvValue, cvFrom, cvTo].forEach((el) => {
    el.addEventListener("input", convert);
    el.addEventListener("change", convert);
  });
  $("#fc-cv-swap").addEventListener("click", () => {
    const a = cvFrom.value;
    cvFrom.value = cvTo.value;
    cvTo.value = a;
    convert();
  });
  fillUnits();
  convert();

  // ----- Tool 3: stopwatch + countdown -----
  const swDisplay = $("#fc-sw-display");
  const swStart = $("#fc-sw-start");
  const swLaps = $("#fc-sw-laps");
  let swElapsed = 0;
  let swStartedAt = 0;
  let swTimer = null;
  let swLapCount = 0;

  function fmtStopwatch(ms) {
    const total = Math.floor(ms / 10);
    const cs = String(total % 100).padStart(2, "0");
    const s = String(Math.floor(total / 100) % 60).padStart(2, "0");
    const m = String(Math.floor(total / 6000)).padStart(2, "0");
    return `${m}:${s}.${cs}`;
  }

  function swTick() {
    swDisplay.textContent = fmtStopwatch(swElapsed + (performance.now() - swStartedAt));
  }

  swStart.addEventListener("click", () => {
    if (swTimer) {
      swElapsed += performance.now() - swStartedAt;
      clearInterval(swTimer);
      swTimer = null;
      swStart.textContent = "Resume";
    } else {
      swStartedAt = performance.now();
      swTimer = setInterval(swTick, 30);
      swStart.textContent = "Pause";
    }
  });
  $("#fc-sw-lap").addEventListener("click", () => {
    if (!swTimer && swElapsed === 0) return;
    swLapCount++;
    const row = document.createElement("div");
    row.className = "fc-lap";
    row.innerHTML = `<span>Lap ${swLapCount}</span><span>${swDisplay.textContent}</span>`;
    swLaps.prepend(row);
  });
  $("#fc-sw-reset").addEventListener("click", () => {
    clearInterval(swTimer);
    swTimer = null;
    swElapsed = 0;
    swLapCount = 0;
    swDisplay.textContent = "00:00.00";
    swLaps.innerHTML = "";
    swStart.textContent = "Start";
  });

  const cdDisplay = $("#fc-cd-display");
  const cdMin = $("#fc-cd-min");
  const cdSec = $("#fc-cd-sec");
  const cdStart = $("#fc-cd-start");
  let cdRemaining = 300;
  let cdTimer = null;
  let cdEndsAt = 0;

  function fmtCountdown(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function cdReadInputs() {
    const m = Math.max(0, parseInt(cdMin.value, 10) || 0);
    const s = Math.min(59, Math.max(0, parseInt(cdSec.value, 10) || 0));
    return m * 60 + s;
  }

  function cdTick() {
    const left = Math.max(0, Math.ceil((cdEndsAt - performance.now()) / 1000));
    cdDisplay.textContent = fmtCountdown(left);
    if (left <= 0) {
      clearInterval(cdTimer);
      cdTimer = null;
      cdRemaining = 0;
      cdStart.textContent = "Start";
      cdDisplay.classList.add("fc-flash");
      beep();
      setTimeout(() => cdDisplay.classList.remove("fc-flash"), 3000);
    }
  }

  function cdSyncFromInputs() {
    if (cdTimer) return;
    cdRemaining = cdReadInputs();
    cdDisplay.textContent = fmtCountdown(cdRemaining);
  }
  cdMin.addEventListener("input", cdSyncFromInputs);
  cdSec.addEventListener("input", cdSyncFromInputs);

  cdStart.addEventListener("click", () => {
    if (cdTimer) {
      cdRemaining = Math.max(0, Math.ceil((cdEndsAt - performance.now()) / 1000));
      clearInterval(cdTimer);
      cdTimer = null;
      cdStart.textContent = "Resume";
      return;
    }
    if (cdRemaining <= 0) cdRemaining = cdReadInputs();
    if (cdRemaining <= 0) return;
    cdEndsAt = performance.now() + cdRemaining * 1000;
    cdTimer = setInterval(cdTick, 200);
    cdStart.textContent = "Pause";
    cdTick();
  });
  $("#fc-cd-reset").addEventListener("click", () => {
    clearInterval(cdTimer);
    cdTimer = null;
    cdStart.textContent = "Start";
    cdDisplay.classList.remove("fc-flash");
    cdRemaining = cdReadInputs();
    cdDisplay.textContent = fmtCountdown(cdRemaining);
  });

  // ----- Tool 4: notes (auto-saved) -----
  const notesArea = $("#fc-notes-area");
  const notesCount = $("#fc-notes-count");

  function updateNotesCount() {
    const text = notesArea.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    notesCount.textContent = `${words} words · ${text.length} chars`;
  }
  store.get("fc_notes", (val) => {
    if (typeof val === "string") {
      notesArea.value = val;
      updateNotesCount();
    }
  });
  let notesSaveTimer = null;
  notesArea.addEventListener("input", () => {
    updateNotesCount();
    clearTimeout(notesSaveTimer);
    notesSaveTimer = setTimeout(() => store.set("fc_notes", notesArea.value), 300);
  });
  $("#fc-notes-copy").addEventListener("click", (e) => copyText(notesArea.value, e.currentTarget));
  $("#fc-notes-clear").addEventListener("click", () => {
    notesArea.value = "";
    store.set("fc_notes", "");
    updateNotesCount();
  });

  // ----- Tool 5: RGB color picker -----
  const colR = $("#fc-col-r");
  const colG = $("#fc-col-g");
  const colB = $("#fc-col-b");
  const colHex = $("#fc-col-hex");
  const colRgb = $("#fc-col-rgb");
  const colSwatch = $("#fc-color-swatch");

  const hex2 = (n) => n.toString(16).padStart(2, "0").toUpperCase();

  function colRender(fromHexInput) {
    const r = +colR.value;
    const g = +colG.value;
    const b = +colB.value;
    $("#fc-col-r-out").textContent = r;
    $("#fc-col-g-out").textContent = g;
    $("#fc-col-b-out").textContent = b;
    colSwatch.style.background = `rgb(${r}, ${g}, ${b})`;
    colRgb.value = `rgb(${r}, ${g}, ${b})`;
    if (!fromHexInput) colHex.value = `#${hex2(r)}${hex2(g)}${hex2(b)}`;
  }

  [colR, colG, colB].forEach((el) => el.addEventListener("input", () => colRender(false)));
  colHex.addEventListener("input", () => {
    let v = colHex.value.trim();
    if (!v.startsWith("#")) v = "#" + v;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) {
      colR.value = parseInt(v.slice(1, 3), 16);
      colG.value = parseInt(v.slice(3, 5), 16);
      colB.value = parseInt(v.slice(5, 7), 16);
      colRender(true);
    }
  });
  $("#fc-col-random").addEventListener("click", () => {
    colR.value = Math.floor(Math.random() * 256);
    colG.value = Math.floor(Math.random() * 256);
    colB.value = Math.floor(Math.random() * 256);
    colRender(false);
  });
  $("#fc-col-copy-hex").addEventListener("click", (e) => copyText(colHex.value, e.currentTarget));
  $("#fc-col-copy-rgb").addEventListener("click", (e) => copyText(colRgb.value, e.currentTarget));
  colRender(false);

  // ----- Tool 6: password generator -----
  const pwOut = $("#fc-pw-output");
  const pwLen = $("#fc-pw-len");
  const pwStrength = $("#fc-pw-strength");
  const SETS = {
    "#fc-pw-upper": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "#fc-pw-lower": "abcdefghijklmnopqrstuvwxyz",
    "#fc-pw-num": "0123456789",
    "#fc-pw-sym": "!@#$%^&*()-_=+[]{};:,.?",
  };

  function randInt(max) {
    const limit = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    do {
      crypto.getRandomValues(buf);
    } while (buf[0] >= limit);
    return buf[0] % max;
  }

  function generatePassword() {
    const active = Object.keys(SETS)
      .filter((sel) => $(sel).checked)
      .map((sel) => SETS[sel]);
    if (!active.length) {
      pwOut.textContent = "Pick at least one set";
      pwStrength.textContent = "";
      return;
    }
    const len = +pwLen.value;
    const all = active.join("");
    const chars = active.map((set) => set[randInt(set.length)]);
    while (chars.length < len) chars.push(all[randInt(all.length)]);
    for (let i = chars.length - 1; i > 0; i--) {
      const j = randInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    pwOut.textContent = chars.join("");
    const bits = Math.round(len * Math.log2(all.length));
    const label = bits < 50 ? "Weak" : bits < 80 ? "Good" : "Strong";
    pwStrength.textContent = `${label} · ~${bits} bits`;
  }

  pwLen.addEventListener("input", () => {
    $("#fc-pw-len-out").textContent = pwLen.value;
    generatePassword();
  });
  Object.keys(SETS).forEach((sel) => $(sel).addEventListener("change", generatePassword));
  $("#fc-pw-gen").addEventListener("click", generatePassword);
  $("#fc-pw-copy").addEventListener("click", (e) => {
    const t = pwOut.textContent;
    if (t && t !== "—" && !t.startsWith("Pick")) copyText(t, e.currentTarget);
  });
  generatePassword();

  let isOpen = false;

  function toggleChat() {
    isOpen = !isOpen;
    chatbox.style.display = isOpen ? "flex" : "none";
    if (isOpen) {
      input.focus();
    }
  }

  function closeChat() {
    isOpen = false;
    chatbox.style.display = "none";
  }

  function switchTab(tabName) {
    tabs.forEach((tab) => {
      const active = tab.dataset.tab === tabName;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== tabName;
    });
    if (tabName === "chats") {
      input.focus();
    }
  }

  const CHAT_KEY = "fc_chat_messages_v2";
  let chatHistory = [];

  function saveChat() {
    store.set(CHAT_KEY, JSON.stringify(chatHistory.slice(-300)));
  }

  function renderWelcome() {
    if (chatHistory.length) return;
    const welcome = document.createElement("div");
    welcome.className = "fc-welcome";
    welcome.innerHTML = '<div class="fc-welcome-icon"><svg viewBox="0 0 48 48"><path d="M24 3 29 18 45 24 29 30 24 45 19 30 3 24 19 18Z"/><circle cx="24" cy="24" r="5"/></svg></div><h3>Welcome to your orbit.</h3><p>A focused space for messages, collections, saved links, and everyday tools.</p><span>PRIVATE BY DESIGN · SAVED ON THIS DEVICE</span>';
    messages.appendChild(welcome);
  }

  function youtubeVideoId(value) {
    try {
      const url = new URL(value);
      const host = url.hostname.toLowerCase().replace(/^www\./, "").replace(/^m\./, "");
      let id = "";
      if (host === "youtu.be") id = url.pathname.split("/").filter(Boolean)[0] || "";
      else if (["youtube.com", "youtube-nocookie.com"].includes(host)) {
        const parts = url.pathname.split("/").filter(Boolean);
        if (url.pathname === "/watch") id = url.searchParams.get("v") || "";
        else if (["embed", "shorts", "live", "v"].includes(parts[0])) id = parts[1] || "";
      }
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
    } catch (_) { return null; }
  }

  function addMessage(text, sender, persist = true) {
    const msg = document.createElement("div");
    msg.className = `fc-message ${sender}`;
    const videoId = youtubeVideoId(text.trim());
    if (videoId) {
      const link = document.createElement("a");
      link.className = "fc-video-link";
      link.href = `https://www.youtube.com/watch?v=${videoId}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "YouTube video · Open original";
      msg.appendChild(link);
      const player = document.createElement("div");
      player.className = "fc-video-player";
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
      frame.title = "YouTube video player";
      frame.loading = "lazy";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      player.appendChild(frame);
      msg.appendChild(player);
    } else {
      // Text is inserted as text, never interpreted as HTML.
      msg.appendChild(document.createTextNode(text));
    }
    const stamp = document.createElement("span");
    stamp.className = "fc-message-time";
    stamp.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    msg.appendChild(stamp);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    if (persist) {
      chatHistory.push({ text: text.trim(), sender, time: Date.now() });
      chatHistory = chatHistory.slice(-300);
      saveChat();
    }
  }

  function localAssistantReply(text) {
    const value = text.trim();
    const lower = value.toLowerCase();
    if (/^(hi|hello|hey|yo|kumusta|maayong\s+(buntag|udto|hapon|gabi-i))[!. ]*$/i.test(value)) {
      return "Hey! 👋 I'm Orbit, your on-page helper. Ask me for a quick calculation, the current date/time, or type “help” to see what I can do.";
    }
    if (/^(help|what can you do|commands)\??$/i.test(value)) {
      return "I can help with quick calculations (example: 125 * 8), show the current date/time, and guide you to the built-in Tools. Open Tools for Calculator, Converter, Stopwatch/Countdown, Notes, RGB Color, and Password Generator. This version works locally and is not connected to an online AI service.";
    }
    if (/\b(time|what time is it)\b/i.test(lower)) {
      return `Your device time is ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}.`;
    }
    if (/\b(date|what day is it|today)\b/i.test(lower)) {
      return `Today on your device is ${new Date().toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.`;
    }
    const match = value.match(/^\s*(-?\d+(?:\.\d+)?)\s*([+*/%-])\s*(-?\d+(?:\.\d+)?)\s*\??\s*$/);
    if (match) {
      const a = Number(match[1]), op = match[2], b = Number(match[3]);
      let result;
      if (op === "+") result = a + b;
      else if (op === "-") result = a - b;
      else if (op === "*") result = a * b;
      else if (op === "/") result = b === 0 ? null : a / b;
      else result = a % b;
      if (result === null) return "Division by zero is undefined. Try another calculation.";
      return `${a} ${op} ${b} = ${Number.isFinite(result) ? Number(result.toPrecision(12)) : "not a finite result"}`;
    }
    if (/^https?:\/\//i.test(value)) {
      return "Link received. For safety, I won't automatically play media inside the chat. You can open the link in a new browser tab if you trust its source.";
    }
    return "I received your message and saved it in this device's chat history. I'm currently running in local mode, so open-ended AI replies require connecting an AI service/API. Type “help” for the built-in features.";
  }

  function loadChat() {
    store.get(CHAT_KEY, (raw) => {
      try {
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        chatHistory = Array.isArray(parsed) ? parsed.filter(x => x && typeof x.text === "string" && ["user", "bot"].includes(x.sender)).slice(-300) : [];
      } catch (_) { chatHistory = []; }
      messages.replaceChildren();
      if (!chatHistory.length) renderWelcome();
      else chatHistory.forEach(item => addMessage(item.text, item.sender, false));
    });
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    if (!chatHistory.length) messages.replaceChildren();
    addMessage(text, "user");
    input.value = "";
    input.focus();
    // A small local response makes the chat usable without pretending an AI API is connected.
    window.setTimeout(() => {
      addMessage(localAssistantReply(text), "bot");
    }, 180);
  }

  clearChatBtn.addEventListener("click", () => {
    if (!chatHistory.length) return;
    if (!window.confirm("Clear saved chat history on this device?")) return;
    chatHistory = [];
    saveChat();
    messages.replaceChildren();
    renderWelcome();
  });
  loadChat();

  // ----- Drag & drop: drop a link (e.g. a YouTube video) into the chatbox -----
  function extractLink(dataTransfer) {
    // Dragging a thumbnail/link almost always populates text/uri-list.
    const uriList = dataTransfer.getData("text/uri-list");
    if (uriList) {
      const line = uriList
        .split("\n")
        .map((s) => s.trim())
        .find((s) => s && !s.startsWith("#"));
      if (line) return line;
    }
    // Plain text is set when dragging the address bar or a selected URL.
    const plain = dataTransfer.getData("text/plain");
    if (plain && /^https?:\/\//i.test(plain.trim())) {
      return plain.trim();
    }
    // Fallback: pull the first href/src out of the dragged HTML fragment
    // (covers dragging a linked thumbnail like a YouTube video card).
    const html = dataTransfer.getData("text/html");
    if (html) {
      const match = html.match(/(?:href|src)="([^"]+)"/i);
      if (match) return match[1];
    }
    return plain ? plain.trim() : null;
  }

  function dropLinkIntoChat(dataTransfer) {
    const link = extractLink(dataTransfer);
    if (!link) return false;
    if (!isOpen) toggleChat();
    switchTab("chats");
    const videoId = youtubeVideoId(link);
    if (videoId) {
      if (!chatHistory.length) messages.replaceChildren();
      addMessage(`https://www.youtube.com/watch?v=${videoId}`, "user");
      input.value = "";
      return true;
    }
    input.value = input.value ? `${input.value} ${link}` : link;
    input.focus();
    return true;
  }

  let dragDepth = 0;

  function handleDragEnter(e) {
    e.preventDefault();
    dragDepth++;
    chatbox.classList.add("fc-dragover");
  }

  function handleDragOver(e) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
  }

  function handleDragLeave() {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) chatbox.classList.remove("fc-dragover");
  }

  function handleDrop(e) {
    e.preventDefault();
    dragDepth = 0;
    chatbox.classList.remove("fc-dragover");
    dropLinkIntoChat(e.dataTransfer);
  }

  // Dropping straight onto the closed floating button also works.
  function handleBtnDragOver(e) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
    btn.classList.add("fc-dragover");
  }

  function handleBtnDragLeave() {
    btn.classList.remove("fc-dragover");
  }

  function handleBtnDrop(e) {
    e.preventDefault();
    btn.classList.remove("fc-dragover");
    dropLinkIntoChat(e.dataTransfer);
  }

  // Events
  btn.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", closeChat);
  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  chatbox.addEventListener("dragenter", handleDragEnter);
  chatbox.addEventListener("dragover", handleDragOver);
  chatbox.addEventListener("dragleave", handleDragLeave);
  chatbox.addEventListener("drop", handleDrop);

  btn.addEventListener("dragover", handleBtnDragOver);
  btn.addEventListener("dragleave", handleBtnDragLeave);
  btn.addEventListener("drop", handleBtnDrop);
})();
