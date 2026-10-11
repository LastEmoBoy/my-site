/* Editable metalworking site template.
 * Edit js/content.js for page texts and this file for content blocks and behaviour.
 * No tracking, analytics, backend, or external JavaScript dependencies.
 */
(() => {
  'use strict';
  const D = window.SITE_CONTENT;
  const S = window.SITE_SETTINGS;
  const page = document.body.dataset.page || 'index';
  const p = D[page] || D.index;
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = slug => slug === 'index' ? 'index.html' : slug + '.html';
  const services = [
    ['lazernaya-rezka','Лазерная резка листового металла','laser','Раскрой листа до 18 мм'],
    ['lazernaya-rezka-trub','Лазерная резка труб и профилей','laser','Точные контуры по чертежу'],
    ['gibka-metalla','Гибка листового металла и труб','bend','Гибка на прессе с ЧПУ'],
    ['lazernaya-svarka','Лазерная сварка металла','weld','Ровные и аккуратные швы'],
    ['svarochnye-raboty','Сварочные и монтажные работы','weld','Сборка металлоконструкций'],
    ['slesarnye-raboty','Слесарные работы','turn','Финишная механическая обработка'],
    ['tokarno-frezernye-raboty','Токарные и фрезерные работы','turn','Изготовление деталей'],
    ['poroshkovaya-pokraska','Порошковая покраска','paint','Защита и декоративная отделка'],
    ['proektirovanie',S.designTitle,'design','От эскиза до готового изделия'],
  ];
  const goods = [
    ['izgotovlenie-plastin','Металлические пластины','parts'],
    ['izgotovlenie-zakladnyh','Закладные детали','parts'],
    ['izgotovlenie-korpusov','Металлические корпуса','parts'],
    ['izgotovlenie-kronshtejnov','Кронштейны','brackets'],
  ];
  const equipment = [
    ['SENFENG 3 кВт','Установка лазерной резки металла','laser','lazernaya-rezka'],
    ['Assistmach Maxima 26100','Гибочный гидравлический пресс с ЧПУ','bend','gibka-metalla'],
    ['KDM 2 кВт','Аппарат лазерной сварки','weld','lazernaya-svarka'],
    ['AN LAZER 1.5 кВт','Аппарат лазерной сварки','weld','lazernaya-svarka'],
    ['ПТК Rilon MIG 300 GN','Сварочный полуавтомат MIG/MAG','weld','svarochnye-raboty'],
    ['H300M','Лентопильный станок','turn','tokarno-frezernye-raboty'],
    ['RS1270/90','Вальцы','bend','gibka-metalla'],
    ['2М112','Сверлильный станок','turn','tokarno-frezernye-raboty'],
    ['1М63','Токарно-винторезный станок','turn','tokarno-frezernye-raboty'],
    ['ФУ2-250','Фрезерный станок','turn','tokarno-frezernye-raboty'],
    ['4 × 2 × 2 м','Камера порошковой покраски','paint','poroshkovaya-pokraska'],
    ['Tesla Optima V','Установка порошковой покраски','paint','poroshkovaya-pokraska'],
  ];
  const a = (slug,label,cl='') => `<a class="${cl}" href="${url(slug)}">${esc(label)}</a>`;
  const img = (name, cl='',label='')=>`<img class="${cl}" src="assets/${esc(name)}.svg" alt="${esc(label||name)}" loading="lazy">`;
  const arrow='<span aria-hidden="true" class="arrow">↗</span>';
  function header(){return `<div class="topbar"><div class="container topbar-inner"><span class="location">⌁ &nbsp;Производство изделий из металла</span><div class="topcontacts"><span>${esc(S.email)}</span><span class="top-divider"></span><span>${esc(S.phone)}</span></div></div></div>
    <header class="header" id="site-header"><div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Главная страница"><span class="brand-mark"><span></span><span></span><span></span></span><span class="brand-text"><strong>${esc(S.companyName)}</strong><small>МЕТАЛЛООБРАБОТКА</small></span></a>
      <nav class="desktop-nav" aria-label="Навигация"><div class="nav-group"><a class="nav-main ${goods.some(g=>g[0]===page)?'active':''}" href="izgotovlenie-plastin.html">Изделия <span class="chev">⌄</span></a><div class="dropdown">${goods.map(x=>a(x[0],x[1])).join('')}</div></div>
      <div class="nav-group"><a class="nav-main ${services.some(s=>s[0]===page)?'active':''}" href="lazernaya-rezka.html">Услуги <span class="chev">⌄</span></a><div class="dropdown wide">${services.map(x=>a(x[0],x[1])).join('')}</div></div>
      ${a('o-kompanii','О компании','nav-main '+(page==='o-kompanii'?'active':''))}${a('kontakty','Контакты','nav-main '+(page==='kontakty'?'active':''))}</nav>
      <button class="button button-primary header-cta js-quote">Рассчитать заказ ${arrow}</button>
      <button class="mobile-toggle" aria-expanded="false" aria-label="Открыть меню"><span></span><span></span><span></span></button>
    </div><div class="mobile-menu" id="mobile-menu"><div class="container">${a('index','Главная')}<strong>Услуги</strong>${services.map(x=>a(x[0],x[1])).join('')}<strong>Изделия</strong>${goods.map(x=>a(x[0],x[1])).join('')}${a('o-kompanii','О компании')}${a('kontakty','Контакты')}<button class="button button-primary js-quote">Рассчитать заказ ↗</button></div></div></header>`;}
  function breadcrumbs(slug){return `<nav class="breadcrumbs container" aria-label="Хлебные крошки">${a('index','Главная')}<span>/</span><span>${esc(D[slug]?.title||'')}</span></nav>`;}
  function hero(home=false){return `<section class="hero ${home?'hero-home':'hero-inner'}"><div class="hero-backdrop">${img(p.image,'hero-image',p.title)}</div><div class="hero-scrim"></div><div class="hero-top-line"></div><div class="container hero-layout"><div class="hero-content"><div class="eyebrow"><span class="orange-line"></span>${esc(p.eyebrow||'МЕТАЛЛООБРАБОТКА И ПРОИЗВОДСТВО')}</div><h1>${esc(p.title)}</h1><p class="hero-lead">${esc(p.subtitle)}</p><div class="hero-actions"><button class="button button-primary button-large js-quote">Получить расчёт стоимости <span>↗</span></button><a class="text-button" href="${home?'#services':'#details'}">${home?'Наши услуги':'Подробнее об услуге'} <span>↓</span></a></div><p class="hero-note"><span class="check-icon">✓</span> Изготовление изделий по вашим чертежам</p></div></div></section>`;}
  function metrics(data, home=false){let items=data||[['До 18 мм','Лазерная резка'],['До 8 мм','Гибка листового металла'],['0,5–20 мм','Сварочные работы'],['4 × 2 × 2 м','Порошковая покраска']];return `<div class="container metrics-wrap"><div class="metrics">${items.map((s,i)=>`<div class="metric"><div class="metric-num">${esc(s[0])}</div><div class="metric-label">${esc(s[1])}</div><span class="metric-order">0${i+1}</span></div>`).join('')}</div></div>`;}
  function secTitle(kicker,title,sub=''){return `<div class="section-heading"><div class="section-kicker"><span></span>${esc(kicker)}</div><h2>${esc(title)}</h2>${sub?`<p>${esc(sub)}</p>`:''}</div>`;}
  function serviceSection(){return `<section class="section service-section" id="services"><div class="container">${secTitle('НАШИ ВОЗМОЖНОСТИ','Услуги производства','Все этапы обработки металла на одной площадке — от раскроя до готового изделия.')}<div class="service-grid">${services.map((s,i)=>`<a class="service-card" href="${url(s[0])}"><div class="service-card-visual">${img(s[2],'',s[1])}<div class="card-image-scrim"></div></div><div class="service-card-body"><span class="service-no">0${i+1} / УСЛУГА</span><h3>${esc(s[1])}</h3><p>${esc(s[3])}</p><span class="link-arrow">${arrow}</span></div></a>`).join('')}</div></div></section>`;}
  function productSection(){return `<section class="section products-section"><div class="container">${secTitle('ИЗГОТОВЛЕНИЕ НА ЗАКАЗ','Металлоизделия по вашим чертежам','Мелкие и серийные партии. Учитываем требования к материалу, геометрии и обработке поверхности.')}<div class="product-grid">${goods.map((s,i)=>`<a class="product-card" href="${url(s[0])}">${img(s[2],'',s[1])}<div><span>0${i+1} / ИЗДЕЛИЯ</span><h3>${esc(s[1])}</h3><span class="product-link">Подробнее ${arrow}</span></div></a>`).join('')}</div></div></section>`;}
  function cta(variant='dark'){return `<section class="cta-section ${variant}"><div class="container cta-layout"><div><div class="section-kicker light"><span></span> ОБСУДИМ ВАШ ПРОЕКТ</div><h2>Получите расчёт стоимости и сроков изготовления</h2><p>Опишите задачу, укажите материал и тираж. Подготовим индивидуальное предложение.</p></div><div class="cta-action"><button class="button button-primary button-large js-quote">Отправить заявку ${arrow}</button><span>Приём заявок: пн–пт, 09:00–18:00</span></div></div></section>`;}
  function projects(){const cards=[['Лазерный раскрой деталей','laser'],['Гибка металлических панелей','bend'],['Сварка конструкций','weld'],['Изготовление корпусов','parts'],['Порошковая окраска','paint'],['Кронштейны и закладные','brackets']]; return `<section class="section project-section" id="projects"><div class="container">${secTitle('НАШИ РАБОТЫ','Выполненные проекты','Примеры направлений, по которым мы изготавливаем изделия. Иллюстрации созданы для демонстрационной версии.')}<div class="projects-grid">${cards.map((q,i)=>`<button class="project-card js-project" data-image="${q[1]}" data-label="${esc(q[0])}" aria-label="Посмотреть: ${esc(q[0])}"><span class="project-media">${img(q[1],'',q[0])}</span><span class="project-meta"><span>0${i+1} / ПРОЕКТ</span><strong>${esc(q[0])}</strong><span class="project-plus">+</span></span></button>`).join('')}</div></div></section>`;}
  function equipmentSection(){return `<section class="section equipment-section" id="equipment"><div class="container">${secTitle('НАШИ МОЩНОСТИ','Оборудование производства','Современные станки для точного раскроя, гибки, сварки и механической обработки.')}<div class="carousel-control"><button class="circle-btn" id="carousel-prev" aria-label="Предыдущие">←</button><button class="circle-btn" id="carousel-next" aria-label="Следующие">→</button></div><div class="equipment-scroll" id="equipment-scroll">${equipment.map((e,i)=>`<article class="equipment-card"><div class="equipment-img">${img(e[2],'',e[1])}</div><div class="equipment-copy"><span class="eyebrow-mini">ОБОРУДОВАНИЕ / ${String(i+1).padStart(2,'0')}</span><h3>${esc(e[0])}</h3><p>${esc(e[1])}</p>${a(e[3],'Подробнее ↗','underlined-link')}</div></article>`).join('')}</div></div></section>`;}
  function aboutTeaser(){return `<section class="section about-teaser"><div class="container about-layout"><div class="about-visual">${img('hero-factory','', 'Металлообработка на производстве')}<div class="about-visual-mark"><b>ЧПУ</b><span>точность<br>обработки</span></div></div><div class="about-copy">${secTitle('О КОМПАНИИ','Изготавливаем металлопродукцию под задачи бизнеса')}<p>Мы объединили основные операции металлообработки на собственном производстве. Это помогает контролировать сроки, качество и экономику проектов.</p><div class="about-checks"><span>✓ &nbsp; Своё производство</span><span>✓ &nbsp; Работа по вашим чертежам</span><span>✓ &nbsp; Контроль качества</span><span>✓ &nbsp; Доставка по России</span></div>${a('o-kompanii','Подробнее о компании ↗','button button-outline')}</div></div></section>`;}
  function featureSection(){const f=p.features||['Изготовление по технической документации','Современное оборудование','Контроль качества готовых изделий'];return `<section class="section" id="details"><div class="container"><div class="detail-grid"><div>${secTitle('ПРОИЗВОДСТВО','Как мы работаем','Берём на себя производство и помогаем подобрать подходящую технологию изготовления.') }<p class="detail-lead">${esc(p.subtitle)}</p><div class="detail-features">${f.map((v,i)=>`<div><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(v)}</strong></div>`).join('')}</div><button class="button button-primary js-quote">Получить расчёт ${arrow}</button></div><div class="detail-image">${img(p.image,'',p.title)}<span class="image-caption">ТЕХНОЛОГИИ МЕТАЛЛООБРАБОТКИ</span></div></div></div></section>`;}
  function pricing(){let names=['Конструкционная сталь','Нержавеющая сталь','Алюминий и сплавы'];let thick=['0,5','1','2','2,5','3','4','5','6','8'];let lengths=['100 мм','200 мм','500 мм','1000 мм','1500 мм','2000 мм','2505 мм'];let costs=[[11,15,21,35,48,60,75],[11,15,22,36,48,60,75],[11,15,22,36,50,61,76],[11,15,23,36,53,61,76],[11,16,23,39,60,61,93],[14,19,25,43,71,78,119],[16,20,29,48,81,101,153],[17,23,30,57,97,120,155],[60,130,140,150,170,190,215]];return `<section class="section pricing-section"><div class="container">${secTitle('РАСЦЕНКИ','Ориентировочные цены на гибку','Значения приведены для примера. Итоговая цена зависит от заказа и уточняется при расчёте.')}<div class="price-tabs" role="tablist" aria-label="Выберите материал">${names.map((n,i)=>`<button role="tab" aria-selected="${i===0}" class="price-tab ${i===0?'active':''}" data-factor="${[1,1.35,1.17][i]}">${n}</button>`).join('')}</div><div class="price-overflow"><table class="price-table"><thead><tr><th>Толщина</th>${lengths.map(n=>`<th>до ${n}</th>`).join('')}</tr></thead><tbody>${costs.map((r,i)=>`<tr><th>${thick[i]} мм</th>${r.map(v=>`<td data-base="${v}">${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="table-note">* Цены в рублях за один гиб, без учёта материала и возможных подготовительных операций. Не является публичной офертой.</p></div></section>`;}
  function productCards(){return `<section class="section products-section"><div class="container">${secTitle('АССОРТИМЕНТ','Популярные позиции','Произведём изделия стандартных типоразмеров либо изготовим детали по вашему чертежу.')}<div class="product-positions">${p.products.map((n,i)=>`<article class="position-card"><div class="position-img">${img(p.image,'',n)}</div><div class="position-info"><span>${String(i+1).padStart(2,'0')} / НА ЗАКАЗ</span><h3>${esc(n)}</h3><button class="text-link js-quote">Рассчитать стоимость ↗</button></div></article>`).join('')}</div></div></section>`;}
  function machineFeature(){if(!p.machine)return '';return `<section class="section machine-section"><div class="container machine-layout"><div class="machine-image">${img(p.image,'',p.machine)}</div><div class="machine-copy">${secTitle('ТЕХНОЛОГИИ','Оборудование для вашей задачи')}<h3>${esc(p.machine)}</h3><p>В производстве применяем оборудование, которое позволяет точно выполнять обработку материалов по конструкторской документации.</p><p>Подробные технические требования, допуски и сроки согласовываем при расчёте заказа.</p><button class="button button-outline js-quote">Обсудить проект ${arrow}</button></div></div></section>`;}
  function aboutPage(){return `${hero()}${metrics([['По ТЗ','Изготовление'],['Полный цикл','Обработка металла'],['Под проект','Заказное производство'],['Вся Россия','Логистика']])}<section class="section"><div class="container about-layout"><div class="about-visual">${img('hero-factory')}</div><div class="about-copy">${secTitle('О ПРОИЗВОДСТВЕ','Производство под ваши задачи')}<p>Проходим с заказчиком путь от задания и чертежей до изготовления изделия и доставки. У нас работают участки лазерной резки, гибки, сварки, слесарной обработки и порошкового окрашивания.</p><p>Закупаем металл у проверенных поставщиков, по запросу предоставляем сопроводительную документацию на материалы.</p><button class="button button-primary js-quote">Запросить расчёт ${arrow}</button></div></div></section>${serviceSection()}${detailsRequisites()}${cta()}`;}
  function detailsRequisites(){return `<section class="section requisites"><div class="container">${secTitle('КОМПАНИЯ','Реквизиты')}<div class="requisites-list">${[['Полное наименование',S.companyName],['ИНН',S.inn],['КПП',S.kpp],['ОГРН',S.ogrn],['Юридический адрес',S.legalAddress],['Адрес производства',S.address],['Email',S.email]].map(r=>`<div><span>${esc(r[0])}</span><strong>${esc(r[1])}</strong></div>`).join('')}</div></div></section>`;}
  function contactsContent(isPage=false){
    const mapAddress = 'Московская область, Нахабино, Парковая улица, 22';
    const mapLink = 'https://yandex.ru/maps/?text=' + encodeURIComponent(mapAddress);
    const mapWidget = 'https://yandex.ru/map-widget/v1/?text=' + encodeURIComponent(mapAddress) + '&z=17';
    return `<section class="section contacts-section" id="contacts"><div class="container">
      ${secTitle('КАК НАС НАЙТИ',isPage?'Контакты «Алмаз-строй сервис»':'Где мы находимся','Адрес нашего производства в Нахабино и карта для удобного проезда.')}
      <div class="contact-grid"><div class="contact-panel">
        <div class="contact-group"><span>01 / ОРГАНИЗАЦИЯ</span><h3 class="contact-company">${esc(S.companyName)}</h3></div>
        <div class="contact-group"><span>02 / АДРЕС</span><h3>${esc(S.address)}</h3>
          <p>Московская область · Нахабино</p><a class="map-address-link" href="${mapLink}" target="_blank" rel="noopener noreferrer">Построить маршрут на карте ↗</a></div>
        <div class="contact-group"><span>03 / ТЕЛЕФОН</span><span class="contact-large">${esc(S.phone)}</span><p>${esc(S.workHours)}</p></div>
        <div class="contact-group"><span>04 / ЭЛЕКТРОННАЯ ПОЧТА</span><span class="contact-large email-text">${esc(S.email)}</span></div>
      </div>
      <div class="contact-map real-contact-map">
        <img class="contact-map-photo" src="assets/nakhabino-parkovaya-22-map.webp" alt="Карта: Нахабино, Парковая улица, дом 22" loading="lazy">
        <div class="map-company-card"><span class="map-company-label">НАШ АДРЕС</span><strong>${esc(S.companyName)}</strong><span>${esc(S.location)}</span></div>
        <iframe class="contact-map-iframe" title="Интерактивная карта: Нахабино, Парковая улица, дом 22" data-map-src="${mapWidget}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" hidden></iframe>
        <div class="map-control-bar"><button type="button" class="map-switch js-map-switch" aria-pressed="false">Показать интерактивную карту</button><a class="map-outside-link" href="${mapLink}" target="_blank" rel="noopener noreferrer">Открыть в Яндекс Картах ↗</a></div>
      </div></div></div></section>`;
  }
  function policy(){return `<section class="section policy"><div class="container narrow">${secTitle('ИНФОРМАЦИЯ','Политика конфиденциальности')}<p class="policy-notice">Это демонстрационный шаблон раздела, а не актуальная юридическая политика действующего сайта. Перед публикацией заполните его с учётом владельца сайта, используемых форм и сервисов.</p><h3>1. Общие положения</h3><p>Раздел описывает принципы обращения с персональной информацией, переданной пользователями через формы обратной связи. Для опубликованного сайта требуется утверждённая владельцем редакция политики.</p><h3>2. Какие данные могут обрабатываться</h3><p>Имя, номер телефона, адрес электронной почты, содержание обращения и прикладываемые к заявке документы.</p><h3>3. Цели использования информации</h3><p>Связь с пользователем, подготовка стоимости заказа, выполнение договорных обязательств и улучшение качества обслуживания.</p><h3>4. Защита персональных данных</h3><p>При подключении сервера для получения заявок должны быть реализованы безопасное хранение, передача и удаление данных в соответствии с применимыми требованиями.</p><h3>5. Контакты для обращений</h3><p><span>${esc(S.email)}</span></p></div></section>`;}
  function footer(){return `<footer class="footer"><div class="container"><div class="footer-grid"><div class="footer-main"><a class="brand brand-footer" href="index.html"><span class="brand-mark"><span></span><span></span><span></span></span><span class="brand-text"><strong>${esc(S.companyName)}</strong><small>МЕТАЛЛООБРАБОТКА</small></span></a><p>Производство металлических изделий по чертежам заказчика.</p><span class="footer-phone">${esc(S.phone)}</span><span class="footer-email">${esc(S.email)}</span></div><div><strong class="footer-title">Услуги</strong>${services.slice(0,6).map(s=>a(s[0],s[1])).join('')}</div><div><strong class="footer-title">Изделия</strong>${goods.map(s=>a(s[0],s[1])).join('')}<strong class="footer-title second-title">Компания</strong>${a('o-kompanii','О компании')}${a('kontakty','Контакты')}</div><div><strong class="footer-title">Адрес производства</strong><p>${esc(S.address)}</p><strong class="footer-title second-title">График работы</strong><p>${esc(S.workHours)}</p></div></div><div class="footer-bottom"><span>© 2026 ${esc(S.companyName)}. Демонстрационная версия.</span>${a('politika-konfidencialnosti','Политика конфиденциальности')}<a href="#top" id="back-to-top">Наверх ↑</a></div></div></footer>`;}
  function overlays(){return `<div class="cookie-banner" id="cookie-banner"><div><strong>На сайте используются cookie</strong><p>В этой локальной версии cookie для аналитики не используются. Сохранение выбора нужно только для скрытия уведомления.</p></div><button class="button button-small button-primary" id="accept-cookies">Понятно</button></div>
  <div class="modal-overlay" id="quote-overlay" hidden><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" data-close aria-label="Закрыть">×</button><div class="section-kicker"><span></span> ЗАПРОС РАСЧЁТА</div><h2 id="modal-title">Расскажите о вашем проекте</h2><p class="modal-sub">Заполните данные — сформируем текст заявки. Отправка на сервер в демоверсии отключена.</p><form id="quote-form"><div class="form-row"><label>Ваше имя<input name="name" autocomplete="name" placeholder="Как к вам обращаться" required></label><label>Телефон<input name="phone" type="tel" autocomplete="tel" placeholder="Ваш телефон" required></label></div><label>Электронная почта<input name="email" type="email" autocomplete="email" placeholder="name@example.com"></label><label>Описание задачи<textarea name="details" placeholder="Изделие, материал, количество, сроки..." rows="4" required></textarea></label><label class="checkbox-line"><input type="checkbox" name="agree" required><span>Я согласен на обработку указанных мной данных для подготовки ответа</span></label><p class="form-hint">Демо-режим: данные не отправляются. Текст заявки можно скопировать и использовать позднее.</p><button class="button button-primary button-block" type="submit">Подготовить текст заявки ↗</button></form><div id="form-notice" role="status" aria-live="polite"></div></div></div>
  <div class="modal-overlay lightbox" id="lightbox" hidden><div class="lightbox-box" role="dialog" aria-modal="true" aria-label="Просмотр проекта"><button class="modal-close" data-close aria-label="Закрыть">×</button><img src="assets/parts.svg" alt="Проект"><h3></h3></div></div><button class="floating-quote js-quote" aria-label="Рассчитать заказ">✉ <span>Рассчитать заказ</span></button>`;}
  function render(){let b='';if(page==='index'){b=hero(true)+metrics()+serviceSection()+cta()+productSection()+projects()+aboutTeaser()+equipmentSection()+cta('mid');}
  else if(page==='o-kompanii'){b=aboutPage();}
  else if(page==='kontakty'){b=breadcrumbs(page)+`<section class="page-heading"><div class="container">${secTitle('СВЯЗАТЬСЯ С НАМИ','Контакты','Поможем разобраться с производством и стоимостью изделий.')}</div></section>`+contactsContent(true);}
  else if(page==='politika-konfidencialnosti'){b=breadcrumbs(page)+policy();}
  else {b=hero()+metrics(p.metrics)+(p.products?productCards():'')+(page==='gibka-metalla'?pricing():'')+featureSection()+cta()+projects()+machineFeature()+serviceSection();}
  $('#app').innerHTML=header()+`<main id="top">${b}</main>`+(page==='kontakty'?'':contactsContent())+footer()+overlays(); init();}
  function init(){const overlay=$('#quote-overlay'),lightbox=$('#lightbox');let lastFocus=null;
    const openQuote=()=>{lastFocus=document.activeElement;overlay.hidden=false;document.body.classList.add('lock-scroll');$('#quote-form input[name="name"]').focus();};
    const closeModal=()=>{overlay.hidden=true;lightbox.hidden=true;document.body.classList.remove('lock-scroll');lastFocus?.focus?.();};
    $$('.js-quote').forEach(x=>x.addEventListener('click',openQuote));
    $$('[data-close]').forEach(x=>x.addEventListener('click',closeModal));
    [overlay,lightbox].forEach(x=>x.addEventListener('click',e=>{if(e.target===x)closeModal();}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
    const mobile=$('.mobile-toggle'),menu=$('#mobile-menu');mobile.addEventListener('click',()=>{let open=menu.classList.toggle('open');mobile.classList.toggle('open',open);mobile.setAttribute('aria-expanded',String(open));});
    $$('.js-project').forEach(x=>x.addEventListener('click',()=>{lastFocus=x;const i=$('img',lightbox);i.src='assets/'+x.dataset.image+'.svg';i.alt=x.dataset.label;$('h3',lightbox).textContent=x.dataset.label;lightbox.hidden=false;document.body.classList.add('lock-scroll');}));
    $$('.js-map-switch').forEach(btn => btn.addEventListener('click', () => {
      const map = btn.closest('.contact-map');
      const frame = $('.contact-map-iframe', map);
      const isActive = !frame.hidden;
      if (isActive) {
        frame.hidden = true;
        btn.textContent = 'Показать интерактивную карту';
        btn.setAttribute('aria-pressed', 'false');
        map.classList.remove('map-is-live');
      } else {
        if (!frame.src) frame.src = frame.dataset.mapSrc;
        frame.hidden = false;
        btn.textContent = 'Вернуться к изображению карты';
        btn.setAttribute('aria-pressed', 'true');
        map.classList.add('map-is-live');
      }
    }));
    const scroll=$('#equipment-scroll');if(scroll){$('#carousel-prev').addEventListener('click',()=>scroll.scrollBy({left:-355,behavior:'smooth'}));$('#carousel-next').addEventListener('click',()=>scroll.scrollBy({left:355,behavior:'smooth'}));}
    $$('.price-tab').forEach(b=>b.addEventListener('click',()=>{$$('.price-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});b.classList.add('active');b.setAttribute('aria-selected','true');$$('[data-base]').forEach(x=>{x.textContent=Math.round(Number(x.dataset.base)*Number(b.dataset.factor));});}));
    let cookieOk=false;try{cookieOk=localStorage.getItem('demo-cookies')==='yes';}catch(e){}if(cookieOk)$('#cookie-banner').remove();$('#accept-cookies')?.addEventListener('click',()=>{try{localStorage.setItem('demo-cookies','yes');}catch(e){}$('#cookie-banner').remove();});
    $('#quote-form').addEventListener('submit',e=>{e.preventDefault();const f=e.target;if(!f.reportValidity())return;const d=new FormData(f);const value=`Заявка на расчёт\nИмя: ${d.get('name')}\nТелефон: ${d.get('phone')}\nEmail: ${d.get('email')||'не указан'}\nОписание: ${d.get('details')}`;const notice=$('#form-notice');notice.textContent='Текст заявки подготовлен. Ничего не отправлено.';let area=$('#result-text');if(!area){area=document.createElement('textarea');area.id='result-text';area.className='result-text';area.readOnly=true;area.rows=7;notice.after(area);}area.value=value;area.focus();area.select();});
    if(window.location.hash){const target=document.getElementById(window.location.hash.slice(1));if(target)setTimeout(()=>target.scrollIntoView(),150);}
  }
  render();
})();
