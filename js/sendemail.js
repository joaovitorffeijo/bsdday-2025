document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const submitBtn = document.getElementById('submit-btn');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const nascimento = document.getElementById('data-nascimento').value.trim();
    const sexo = form.querySelector('select').value;

    if (!nome || !email || !cidade || !nascimento || sexo === 'Selecione') {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const response = await fetch('sendemail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, cidade, nascimento, sexo })
      });

      const result = await response.text();
      if (response.ok) {
        alert('Inscrição enviada com sucesso!');
        form.reset();
      } else {
        alert('Erro ao enviar inscrição: ' + result);
      }
    } catch (error) {
      alert('Erro inesperado: ' + error.message);
    }
  });
});
