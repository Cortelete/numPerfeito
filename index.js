const { isnumeroPerfeito } = require('./numeroPerfeito');

let state = 'start';
let number;

process.stdin.setEncoding('utf-8');

function prompt(message) {
  process.stdout.write(message);
}

function handleInput(input) {
  input = input.trim();

  switch (state) {
    case 'start':
      prompt('Digite um número para verificar se é perfeito: ');
      state = 'number';
      break;
    case 'number':
      number = parseInt(input);
      if (isNaN(number)) {
        prompt('Entrada inválida. Por favor, digite um número: ');
      } else {
        const result = isnumeroPerfeito(number);
        const message = result
          ? `O número ${number} é um número perfeito.\n`
          : `O número ${number} não é um número perfeito.\n`;
        prompt(message);
        prompt('Deseja verificar outro número? (s/n): ');
        state = 'repeat';
      }
      break;
    case 'repeat':
      if (input.toLowerCase() === 's') {
        state = 'start';
        handleInput('');
      } else if (input.toLowerCase() === 'n') {
        prompt('Obrigado por usar o verificador de números perfeitos. Até logo!\n');
        process.exit();
      } else {
        prompt('Opção inválida. Deseja verificar outro número? (s/n): ');
      }
      break;
  }
}

process.stdin.on('data', handleInput);

handleInput('');
