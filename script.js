const toggler = document.querySelector('.navbar-toggler'); // pega pelo class
const menu = document.getElementById('navbarConteudo'); // ID correto do HTML

if (toggler && menu) {
  toggler.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}


document.addEventListener('DOMContentLoaded', function () {

  // Máscara de telefone
  const inputTelefone = document.querySelector('.telefone-input');

  inputTelefone.addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, ''); // remove tudo que não é número
    if (v.length > 11) v = v.slice(0, 11);   // limita a 11 dígitos

    // Adiciona parênteses no DDD
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');  
    // Adiciona hífen no final
    v = v.replace(/(\d{5})(\d{4})$/, '$1-$2');  
    e.target.value = v;
  });

  // Envio do formulário
  const botoesEnviar = document.querySelectorAll('.enviar-btn');

  botoesEnviar.forEach(function (botao) {
    botao.addEventListener('click', function () {
      const container = botao.closest('.form-container');
      if (!container) return;

      const textarea = container.querySelector('.mensagem-textarea');
      const inputNome = container.querySelector('.nome-input');
      const inputTelefone = container.querySelector('.telefone-input');

      if (!textarea || !inputNome || !inputTelefone) return;

      const mensagem = textarea.value.trim();
      const nome = inputNome.value.trim();
      const telefone = inputTelefone.value.trim();

      if (!mensagem || !nome || !telefone) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
      }

      // Validação do telefone
      const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
      if (!telefoneRegex.test(telefone)) {
        alert('Telefone inválido! Use o formato (99) 99999-9999');
        return;
      }

    fetch('https://script.google.com/macros/s/AKfycbw6DhneP2MbQgtxC0ZGC_xE2KflL_b_5uzxWxKtYp6gphJYr6QNPL4haQJeCoXNs6RF6Q/exec', {        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nome=${encodeURIComponent(nome)}&telefone=${encodeURIComponent(telefone)}&mensagem=${encodeURIComponent(mensagem)}`
      }).then(() => {
        alert('Mensagem enviada com sucesso!');
        textarea.value = '';
        inputNome.value = '';
        inputTelefone.value = '';
      }).catch(() => {
        alert('Erro ao enviar a mensagem.');
      });
    });
  });

});

