---
repo: regulyarniy/dashboard
url: 'https://github.com/regulyarniy/dashboard'
homepage: null
starredAt: '2021-01-01T00:16:51Z'
createdAt: '2020-07-07T07:43:48Z'
updatedAt: '2021-01-01T00:16:51Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:12.529Z'
description: null
tags: []
---

Это пример моего кода из текущих проектов для демонстрации того, в каком стиле я пишу код и как декомпозирую его на модули.
Проект состоит из 2 частей - админка на 2 таблицы и отдельный виджет в виде вебкомпонента для интеграции в другие приожения.

Не пытайтесь запустить проект, он не заработает, не хватает некоторых внутренних зависимостей, этот репозиторий выложен для демонстрации.

## Установка зависимостей

Выполнить `npm ci` или `npm install` в директории `ui/`.

`npm ci` предпочтительней, если не требуется изменение зависимостей, т.к. не вносит изменения в `package-lock.json`

Для установки зависимостей и сборки необходим `node.js` не ниже 10 версии и `npm`,
который обычно поставляется вместе с `node.js`: https://nodejs.org/en/download/

## Скрипты npm для запуска
* `npm run build`   - сборка для разработки
* `npm run build`   - сборка для деплоя
* `npm run hot`     - поднимает сервер с отслеживанием файлов и горячей заменой модулей для разработки.
На лету перезагружаются все модули приложения, кроме html и стора.
При изменениях в этих частях необходимо выполнить перезагрузку страницы вручную.
Для горячей замены в компонентах React используется [React Hot Loader](http://gaearon.github.io/react-hot-loader/).
[Подробнее - документация webpack по горячей замене модулей](https://webpack.js.org/concepts/hot-module-replacement/)
* `npm run watch`   - поднимает сервер с перезагрузкой страницы по любому изменению файлов.
Редко используется, но полезно например при разработке виджета, обернутого в вебкомпонент, или иных случаях,
когда требуется полностью переинициализовать приложение
* `npm run lint`    - запуск проверки линтов и форматирования
* `npm run test`    - запуск тестов


## Основные технологии
* [React+ReactDOM](https://reactjs.org/) - основной фреймворк
* [Redux+Redux Toolkit](https://redux-toolkit.js.org/) - управление состоянием
* [Redux Saga](https://redux-saga.js.org/) - управление асинхронными событиями
* [React Pose](https://popmotion.io/pose/) - анимации
* [Reach Router](https://reach.tech/router) - роутинг
* [prop-types](https://www.npmjs.com/package/prop-types) - проверка и типизация пропсов компонентов
* [Reakit](https://reakit.io/) - обертки над базовыми компонентами для доступности
* classnames, react-sizes - утилиты
* styled-components, react-modal, axios, @eaist/* - пакеты для работоспособности общих компонентов ЕАИСТ

## Инструменты
* [Webpack](https://webpack.js.org/) - сборка
* [React Hot Loader](http://gaearon.github.io/react-hot-loader/) - горячая замена модулей React
* [react-svg-loader](https://github.com/boopathi/react-svg-loader) - импорт инлайн-svg как компоненты
* [PostCSS](https://github.com/postcss/postcss) - процессор для CSS
* [CSS Modules](https://github.com/css-modules/css-modules) - изоляция CSS
* [ESLint](https://eslint.org/) - линтер Javascript
* [Jest](https://jestjs.io/) - тест-раннер
* [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) - тестирование React-компонентов
* [Prettier](https://prettier.io/) - форматирование CSS и JS
* [Babel](https://babeljs.io/) - транспилятор для JSX и не только

## Сборка CSS
* Для процессинга CSS используется `PostCSS` и `*.pcss` расширения для стилевых файлов.
* Для поддержки `Webstorm` синтаксиса `PostCSS` в `*.css` файлах нужно выбрать `PostCSS` в дропдауне `File | Settings | Languages & Frameworks | Style Sheets | Dialects` > `Project CSS Dialect`
для определения корректного синтаксиса CSS редактором
* Для генерации уникальных имен классов используется [CSS Modules](https://github.com/css-modules/css-modules)
* При сборке поддерживаются следующие фичи синтаксиса при помощи плагинов PostCSS:
    * [x] [вложенные селекторы `&`](https://github.com/postcss/postcss-nested)
    * [x] [импорт `@import`](https://github.com/postcss/postcss-import)
    * [x] [переменные `$`](https://github.com/postcss/postcss-simple-vars)
    * [x] [инлайн-комментарии `//`](https://github.com/zoubin/postcss-comment)
    * [x] [миксины `@define-mixin` \ `@mixin`](https://github.com/postcss/postcss-mixins)
    * [x] [функции (обьявления через js)](https://github.com/andyjansson/postcss-functions)
    * [x] [цветовые функции `color( [ <color> | <hue> ] <color-adjuster>* )`](https://github.com/postcss/postcss-color-function)

## Структура папок и файлов
* `./__mocks__/` - глобаные моки для jest
* `./app/js/components/` - компоненты из которых строятся страницы
* `./app/js/pages/` - страницы приложения
* `./app/js/pages/RootPage/` - компонент, который отвечает за роутинг и рендерит остальные страницы
* `./app/js/services/` - утилиты, сервисы, слой транспорта для запросов к апи и т.д.
* `./app/js/store/` - слой управления глобальным состоянием приложения и работой с апи\асинхронными событиями
* `./app/js/index.js` - точка входа в приложение для сборки, импортирует основные стили и рендерит корневой компонент
* `./app/js/App.js` - корневой компонент, оборачивает в стор и горячую замену страницы и вспомогательные компоненты
* `./app/js/constants.js` - файл с константами уровня приложения
