# TICOs Ultra (PWA)
Recursos:
- PWA offline-first com SW (cache + fallback).
- Ícones maskable, monochrome e Apple Touch.
- Atalhos: Dashboard, Checklist, Reportar.
- Dashboard offline com métricas e mini-gráfico.
- Lembrete diário via Notifications (em 1 horário escolhido).
- Gravação de áudio para anexar aos relatos de risco.
- Botão "Instalar PWA".

Como usar localmente:
1) Sirva a pasta em um servidor estático (ex.: `python -m http.server 8000`).
2) Acesse `http://localhost:8000`.
3) Configure o Lembrete no Dash (HH:MM 24h) e aceite as notificações.
4) Instale como PWA (botão ou A2HS).

Observações:
- Notificações exigem permissão do usuário e podem variar por navegador.
- Áudio salvo como `audio/webm` (compatibilidade moderna).
