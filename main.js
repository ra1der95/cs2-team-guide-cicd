(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const opened = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opened));
    nav.classList.toggle('is-open', opened);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
  });
  const mobile = window.matchMedia('(max-width: 700px)');
  mobile.addEventListener('change', closeMenu);
  document.documentElement.classList.add('js-menu');

  const form = document.querySelector('#budget-form');
  const inputs = [...form.querySelectorAll('input')];
  const error = document.querySelector('#budget-error');
  const result = document.querySelector('#budget-result');
  const format = number => new Intl.NumberFormat('ru-RU').format(number);
  form.addEventListener('submit', event => {
    event.preventDefault();
    inputs.forEach(input => input.removeAttribute('aria-invalid'));
    const invalid = inputs.find(input => input.value.trim() === '' || !Number.isSafeInteger(input.valueAsNumber) || !input.validity.valid);
    if (invalid) {
      invalid.setAttribute('aria-invalid', 'true');
      error.textContent = 'Проверьте поле «' + invalid.labels[0].textContent.trim() + '»: нужно целое число в указанном диапазоне.';
      result.replaceChildren();
      invalid.focus();
      return;
    }
    error.textContent = '';
    const amounts = inputs.slice(0,5).map(input => input.valueAsNumber);
    const threshold = inputs[5].valueAsNumber;
    const sum = amounts.reduce((total,value) => total + value,0);
    const deficit = amounts.reduce((total,value) => total + Math.max(0,threshold-value),0);
    const surplus = amounts.reduce((total,value) => total + Math.max(0,value-threshold),0);
    const below = amounts.filter(value => value < threshold).length;
    result.replaceChildren();
    const metrics = document.createElement('div'); metrics.className = 'result-grid';
    [['Всего у команды',format(sum)],['Минимум у игрока',format(Math.min(...amounts))],['Ниже порога',below + ' из 5']].forEach(([label,value]) => {
      const cell = document.createElement('div'); cell.className = 'metric';
      const title = document.createElement('span'); title.textContent = label;
      const number = document.createElement('strong'); number.textContent = value;
      cell.append(title,number); metrics.append(cell);
    });
    const message = document.createElement('p');
    message.textContent = below === 0 ? 'Все пять игроков достигли выбранного порога. Проверьте состав снаряжения и согласуйте план.' : 'Порог достигнут не у всех. Обсудите эко, более дешёвый план или возможность дропа оружия.';
    const balance = document.createElement('p');
    balance.textContent = 'Индивидуальный дефицит: ' + format(deficit) + '. Превышение порога у остальных: ' + format(surplus) + '.';
    const list = document.createElement('ol'); list.className = 'player-results';
    amounts.forEach((value,index) => { const li = document.createElement('li'); const delta = value-threshold; li.textContent = 'Игрок ' + (index+1) + ': ' + (delta < 0 ? 'не хватает ' + format(-delta) : delta > 0 ? 'выше порога на ' + format(delta) : 'ровно порог'); list.append(li); });
    const note = document.createElement('p'); note.className = 'budget-note';
    note.textContent = 'Превышение — не переводимые деньги. Дроп оружия зависит от его стоимости, стороны и уже имеющегося снаряжения. Калькулятор не выбирает закупку за команду.';
    result.append(metrics,message,balance,list,note);
  });
  form.addEventListener('reset', () => {
    error.textContent = ''; inputs.forEach(input => input.removeAttribute('aria-invalid'));
    result.replaceChildren(); const hint = document.createElement('p'); hint.textContent = 'Пример восстановлен. Нажмите «Рассчитать бюджет», чтобы увидеть результат.'; result.append(hint);
  });
})();
