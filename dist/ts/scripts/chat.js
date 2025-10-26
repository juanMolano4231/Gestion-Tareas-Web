/*
  Simple floating chat widget that talks to a local Gemini proxy via POST http://localhost:3005/chat
  Usage: Just ensure this module is loaded on any page. It will auto-initialize a widget.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ChatWidget {
    constructor(opts = {}) {
        var _a, _b, _c, _d, _e;
        this.isCollapsed = false;
        this.sending = false;
        this.history = [];
        this.options = {
            endpoint: (_a = opts.endpoint) !== null && _a !== void 0 ? _a : 'http://localhost:3005/chat',
            model: (_b = opts.model) !== null && _b !== void 0 ? _b : 'gemini-2.0-flash',
            systemPrompt: (_c = opts.systemPrompt) !== null && _c !== void 0 ? _c : 'Eres un asistente útil',
            temperature: (_d = opts.temperature) !== null && _d !== void 0 ? _d : 0.7,
            maxOutputTokens: (_e = opts.maxOutputTokens) !== null && _e !== void 0 ? _e : 512,
        };
        this.container = document.createElement('div');
        this.container.className = 'gtw-chat-container';
        this.header = document.createElement('div');
        this.header.className = 'gtw-chat-header';
        this.body = document.createElement('div');
        this.body.className = 'gtw-chat-body';
        this.list = document.createElement('div');
        this.list.className = 'gtw-chat-messages';
        this.inputWrap = document.createElement('div');
        this.inputWrap.className = 'gtw-chat-input';
        this.textarea = document.createElement('textarea');
        this.textarea.placeholder = 'Escribe un mensaje... (Enter para enviar, Shift+Enter = salto de línea)';
        this.sendBtn = document.createElement('button');
        this.sendBtn.textContent = 'Enviar';
        this.mount();
        this.attachEvents();
    }
    mount() {
        this.injectStyles();
        this.header.innerHTML = `
      <span>Chat (Gemini)</span>
      <div class="gtw-chat-header-actions">
        <button class="gtw-min-btn" title="Minimizar">—</button>
      </div>
    `;
        this.body.appendChild(this.list);
        this.inputWrap.appendChild(this.textarea);
        this.inputWrap.appendChild(this.sendBtn);
        this.body.appendChild(this.inputWrap);
        this.container.appendChild(this.header);
        this.container.appendChild(this.body);
        document.body.appendChild(this.container);
        // Initial system hint (not sent to server; just UI)
        this.addMessage({ role: 'system', content: 'Estás chateando con Gemini. Haz tu pregunta.' });
    }
    attachEvents() {
        const minBtn = this.header.querySelector('.gtw-min-btn');
        minBtn === null || minBtn === void 0 ? void 0 : minBtn.addEventListener('click', () => this.toggle());
        this.header.addEventListener('dblclick', () => this.toggle());
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });
    }
    toggle() {
        this.isCollapsed = !this.isCollapsed;
        this.body.style.display = this.isCollapsed ? 'none' : 'flex';
    }
    setSending(s) {
        this.sending = s;
        this.textarea.disabled = s;
        this.sendBtn.disabled = s;
    }
    addMessage(msg) {
        this.history.push(msg);
        const bubble = document.createElement('div');
        bubble.className = `gtw-bubble gtw-${msg.role}`;
        bubble.textContent = msg.content;
        this.list.appendChild(bubble);
        this.list.scrollTop = this.list.scrollHeight;
    }
    handleSend() {
        return __awaiter(this, void 0, void 0, function* () {
            const text = this.textarea.value.trim();
            if (!text || this.sending)
                return;
            this.textarea.value = '';
            this.addMessage({ role: 'user', content: text });
            // Loading stub
            const loading = { role: 'assistant', content: 'Pensando…' };
            const loadingEl = document.createElement('div');
            loadingEl.className = 'gtw-bubble gtw-assistant gtw-loading';
            loadingEl.textContent = loading.content;
            this.list.appendChild(loadingEl);
            this.list.scrollTop = this.list.scrollHeight;
            try {
                this.setSending(true);
                const response = yield fetch(this.options.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: text,
                        model: this.options.model,
                        system: this.options.systemPrompt,
                        temperature: this.options.temperature,
                        maxOutputTokens: this.options.maxOutputTokens,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} ${response.statusText}`);
                }
                // Try to parse as JSON first; fall back to text
                let assistantText = '';
                const contentType = response.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    const data = yield response.json();
                    assistantText = this.extractText(data);
                    if (!assistantText)
                        assistantText = JSON.stringify(data);
                }
                else {
                    assistantText = yield response.text();
                }
                loadingEl.remove();
                this.addMessage({ role: 'assistant', content: assistantText });
            }
            catch (err) {
                loadingEl.remove();
                const msg = err instanceof Error ? err.message : 'Error desconocido';
                this.addMessage({ role: 'error', content: `Error al consultar el chat: ${msg}` });
            }
            finally {
                this.setSending(false);
                this.textarea.focus();
            }
        });
    }
    extractText(data) {
        // Be tolerant with potential shapes
        if (!data)
            return '';
        if (typeof data === 'string')
            return data;
        const candidatesPath = () => {
            try {
                // Some APIs return candidates[0].content[0].text or similar
                if (Array.isArray(data.candidates) && data.candidates.length) {
                    const c0 = data.candidates[0];
                    if (typeof c0 === 'string')
                        return c0;
                    if (typeof (c0 === null || c0 === void 0 ? void 0 : c0.content) === 'string')
                        return c0.content;
                    if (Array.isArray(c0 === null || c0 === void 0 ? void 0 : c0.content) && c0.content.length) {
                        const seg0 = c0.content[0];
                        if (typeof seg0 === 'string')
                            return seg0;
                        if (typeof (seg0 === null || seg0 === void 0 ? void 0 : seg0.text) === 'string')
                            return seg0.text;
                    }
                    if (typeof (c0 === null || c0 === void 0 ? void 0 : c0.text) === 'string')
                        return c0.text;
                }
            }
            catch (_a) { }
            return '';
        };
        return (data.message ||
            data.text ||
            data.content ||
            data.output ||
            data.reply ||
            candidatesPath() ||
            '');
    }
    injectStyles() {
        if (document.getElementById('gtw-chat-styles'))
            return;
        const style = document.createElement('style');
        style.id = 'gtw-chat-styles';
        style.textContent = `
      .gtw-chat-container { position: fixed; bottom: 16px; right: 16px; width: 320px; max-height: 70vh; display: flex; flex-direction: column; background: #1f2937; color: #e5e7eb; border: 1px solid #374151; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,.4); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'; z-index: 9999; }
      .gtw-chat-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: #111827; border-bottom: 1px solid #374151; border-top-left-radius: 10px; border-top-right-radius: 10px; cursor: default; user-select: none; }
      .gtw-chat-header span { font-weight: 600; font-size: 14px; }
      .gtw-chat-header-actions button { background: transparent; color: #9ca3af; border: none; font-size: 18px; line-height: 1; cursor: pointer; padding: 2px 6px; border-radius: 6px; }
      .gtw-chat-header-actions button:hover { background: #374151; color: #e5e7eb; }
      .gtw-chat-body { display: flex; flex-direction: column; padding: 8px; gap: 8px; overflow: hidden; }
      .gtw-chat-messages { flex: 1; overflow-y: auto; padding-right: 4px; display: flex; flex-direction: column; gap: 8px; }
      .gtw-chat-input { display: flex; gap: 6px; align-items: flex-end; }
      .gtw-chat-input textarea { flex: 1; min-height: 40px; max-height: 120px; resize: vertical; background: #111827; color: #e5e7eb; border: 1px solid #374151; border-radius: 8px; padding: 8px; font-size: 14px; }
      .gtw-chat-input button { background: #2563eb; color: white; border: none; padding: 8px 10px; border-radius: 8px; cursor: pointer; font-weight: 600; }
      .gtw-chat-input button:disabled { opacity: .6; cursor: not-allowed; }
      .gtw-bubble { padding: 8px 10px; border-radius: 10px; white-space: pre-wrap; word-wrap: break-word; }
      .gtw-user { background: #2563eb; color: white; align-self: flex-end; }
      .gtw-assistant { background: #374151; color: #e5e7eb; align-self: flex-start; }
      .gtw-system { background: #0f172a; color: #cbd5e1; align-self: center; font-size: 12px; }
      .gtw-error { background: #7f1d1d; color: #fecaca; align-self: center; }
      .gtw-loading { opacity: .8; font-style: italic; }
    `;
        document.head.appendChild(style);
    }
}
// Auto-init on DOM ready
(() => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        new ChatWidget();
    }
    else {
        document.addEventListener('DOMContentLoaded', () => new ChatWidget());
    }
})();
export {};
