# CI/CD сайта

Workflow: `.github/workflows/deploy.yml`. События: push в main, pull request в main и workflow_dispatch.

1. Validate and build получает исходники через checkout.
2. Три фотографии из ASSET_CREDITS.md скачиваются по фиксированным адресам Unsplash в assets/images. Это обход сбоя браузерной загрузки бинарных файлов. В готовом сайте фотографии локальные. Сборка зависит от доступности Unsplash.
3. Python HTMLParser проверяет обязательные файлы, повторяющиеся id, якоря, локальные ссылки, alt изображений и закрывающий тег html. Ошибка останавливает сборку. Это базовый аудит, не замена полноценному HTML-валидатору.
4. В _site копируются только index.html, style.css, main.js и assets. Каталог загружается как артефакт github-pages.
5. Deploy GitHub Pages зависит от успешной validate. Для pull request и приватного репозитория публикация пропускается. Разрешения deploy: pages: write и id-token: write.

В Settings → Pages выбран Source: GitHub Actions.

Сайт: https://ra1der95.github.io/cs2-team-guide-cicd/

Первый запуск CI: https://github.com/ra1der95/cs2-team-guide-cicd/actions/runs/42518603877 — Success. Публикация в этом запуске пропущена, так как репозиторий был приватным. После открытия доступа следующий push запускает полный деплой.
