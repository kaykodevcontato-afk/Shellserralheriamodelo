/* CONFIGURAÇÃO: coloque apenas números, incluindo 55 + DDD + número.
   Exemplo fictício: '5587999999999'. Não utilize o número fictício.
   Sem número configurado, o formulário avisa o que falta. */
const WHATSAPP_NUMERO = '';

const menuButton = document.getElementById('menu-toggle');
const menu = document.getElementById('nav');
menuButton.addEventListener('click', () => {
  const aberto = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(aberto));
  menuButton.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('budget-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const numero = WHATSAPP_NUMERO.replace(/\D/g, '');
  if (!/^55\d{10,11}$/.test(numero)) {
    status.textContent = 'Contato ainda não configurado. Defina WHATSAPP_NUMERO no arquivo script.js (55 + DDD + telefone).';
    status.style.color = '#b54318';
    return;
  }
  const dados = new FormData(form);
  const mensagem = [
    'Olá! Gostaria de solicitar um orçamento na Shell Serralheria.',
    '',
    `Nome: ${dados.get('nome')}`,
    `Cidade / bairro: ${dados.get('cidade')}`,
    `Serviço: ${dados.get('servico')}`,
    `Descrição: ${dados.get('descricao')}`,
    '',
    'Podemos conversar sobre as medidas e detalhes?'
  ].join('\n');
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  status.textContent = 'Abrindo WhatsApp com a mensagem preenchida...';
  status.style.color = '#276e3e';
  window.open(url, '_blank', 'noopener,noreferrer');
});
