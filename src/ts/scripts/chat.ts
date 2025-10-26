/*
  Simple floating chat widget that talks to a local Gemini proxy via POST http://localhost:3005/chat
  Usage: Just ensure this module is loaded on any page. It will auto-initialize a widget.
*/

type ChatOptions = {
  endpoint?: string;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxOutputTokens?: number;
};

type ChatMessage = {
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
};

class ChatWidget {
  private options: Required<ChatOptions>;
  private container: HTMLDivElement;
  private header: HTMLDivElement;
  private body: HTMLDivElement;
  private list: HTMLDivElement;
  private inputWrap: HTMLDivElement;
  private textarea: HTMLTextAreaElement;
  private sendBtn: HTMLButtonElement;
  private isCollapsed = false;
  private sending = false;
  private history: ChatMessage[] = [];

  constructor(opts: ChatOptions = {}) {
    this.options = {
      endpoint: opts.endpoint ?? 'http://localhost:3005/chat',
      model: opts.model ?? 'gemini-2.0-flash',
      systemPrompt: opts.systemPrompt ?? 'Eres un asistente útil',
      temperature: opts.temperature ?? 0.7,
      maxOutputTokens: opts.maxOutputTokens ?? 512,
    } as Required<ChatOptions>;

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

  private mount() {
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

  private attachEvents() {
    const minBtn = this.header.querySelector('.gtw-min-btn') as HTMLButtonElement | null;
    minBtn?.addEventListener('click', () => this.toggle());
    this.header.addEventListener('dblclick', () => this.toggle());

    this.sendBtn.addEventListener('click', () => this.handleSend());
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSend();
      }
    });
  }

  private toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.body.style.display = this.isCollapsed ? 'none' : 'flex';
  }

  private setSending(s: boolean) {
    this.sending = s;
    this.textarea.disabled = s;
    this.sendBtn.disabled = s;
  }

  private addMessage(msg: ChatMessage) {
    this.history.push(msg);
    const bubble = document.createElement('div');
    bubble.className = `gtw-bubble gtw-${msg.role}`;
    bubble.textContent = msg.content;
    this.list.appendChild(bubble);
    this.list.scrollTop = this.list.scrollHeight;
  }

  private async handleSend() {
    const text = this.textarea.value.trim();
    if (!text || this.sending) return;
    this.textarea.value = '';

    this.addMessage({ role: 'user', content: text });

    // Loading stub
    const loading: ChatMessage = { role: 'assistant', content: 'Pensando…' };
    const loadingEl = document.createElement('div');
    loadingEl.className = 'gtw-bubble gtw-assistant gtw-loading';
    loadingEl.textContent = loading.content;
    this.list.appendChild(loadingEl);
    this.list.scrollTop = this.list.scrollHeight;

    try {
      this.setSending(true);
      const response = await fetch(this.options.endpoint, {
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
        const data = await response.json();
        assistantText = this.extractText(data);
        if (!assistantText) assistantText = JSON.stringify(data);
      } else {
        assistantText = await response.text();
      }

      loadingEl.remove();
      this.addMessage({ role: 'assistant', content: assistantText });
    } catch (err) {
      loadingEl.remove();
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      this.addMessage({ role: 'error', content: `Error al consultar el chat: ${msg}` });
    } finally {
      this.setSending(false);
      this.textarea.focus();
    }
  }

  private extractText(data: any): string {
    // Be tolerant with potential shapes
    if (!data) return '';
    if (typeof data === 'string') return data;
    const candidatesPath = () => {
      try {
        // Some APIs return candidates[0].content[0].text or similar
        if (Array.isArray(data.candidates) && data.candidates.length) {
          const c0 = data.candidates[0];
          if (typeof c0 === 'string') return c0;
          if (typeof c0?.content === 'string') return c0.content;
          if (Array.isArray(c0?.content) && c0.content.length) {
            const seg0 = c0.content[0];
            if (typeof seg0 === 'string') return seg0;
            if (typeof seg0?.text === 'string') return seg0.text;
          }
          if (typeof c0?.text === 'string') return c0.text;
        }
      } catch {}
      return '';
    };
    return (
      data.message ||
      data.text ||
      data.content ||
      data.output ||
      data.reply ||
      candidatesPath() ||
      ''
    );
  }

  private injectStyles() {
    if (document.getElementById('gtw-chat-styles')) return;
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
  } else {
    document.addEventListener('DOMContentLoaded', () => new ChatWidget());
  }
})();

export {};
