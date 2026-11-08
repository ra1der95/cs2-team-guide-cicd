# CS2 Команда — учебный сайт

Учебный одностраничный сайт о командной экономике Counter-Strike 2. Проект продолжает сайт лабораторной работы № 4.

## Состав

- `index.html` — разметка страницы;
- `style.css` — оформление и адаптивная фотогалерея;
- `main.js` — калькулятор учебного бюджета и поведение меню;
- `assets/images/` — три локальные фотографии;
- `scripts/validate_site.py` — проверка структуры и локальных ссылок;
- `.github/workflows/deploy.yml` — проверка и автодеплой на GitHub Pages;
- `ASSET_CREDITS.md` — авторы и лицензии изображений;
- `prompts/lr5_prompt.md` — запрос, использованный при доработке сайта.

## Локальный запуск

Из папки проекта выполните `python3 -m http.server 5500`, затем откройте `http://localhost:5500`. Проверку сайта можно запустить командой `python3 scripts/validate_site.py`.

## CI/CD

Workflow запускает проверку при pull request и при каждом push в `main`. После успешной проверки публикация выполняется через GitHub Pages. Перед первой публикацией укажите **Settings → Pages → Build and deployment → Source → GitHub Actions**. Подробности — в [`docs/cicd.md`](docs/cicd.md) и [`DEPLOYMENT.md`](DEPLOYMENT.md).
