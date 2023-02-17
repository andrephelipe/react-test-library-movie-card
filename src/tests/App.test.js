import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Tela de loading', () => {
  it('Testa se o carregando aparece na tela', () => {
    // Acessar
    render(<App />);
    const loadinsElement = screen.getByText(/carregando/i);
    // screen.logTestingPlaygroundURL();

    // Interagir

    // Testar
    expect(loadinsElement).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
});

describe('Testar a aplicação Movie Card', () => {
  beforeEach(async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
  });

  it('Aparece o card com o nome Gladiador na tela', async () => {
    // Acessar
    // render(<App />);

    // Esperar pelo elemento de loading desaparecer
    // await waitForElementToBeRemoved(() => screen.getByText(/carregando.../i), { timeout: 4500 }); // timeout vai fazer a a função waitFor.. esperar para ver se removeu, caso nao removeu ele da um erro e o valor padrao é de 4 segundo e meio, entao, o timeout tem que ser maior que 4500 que o padrao ou se quiser fazer um teste se ele remove mais rapido;
    // screen.logTestingPlaygroundURL();

    const titleFilme = screen.getByText('Gladiador');

    // Testar
    expect(titleFilme).toBeInTheDocument();
  });

  it('Verifica se existe 5 botoes na tela', async () => {
    const NUM_BUTTONS = 5;
    // render(<App />);

    // Esperar pelo elemento loading desaparecer
    // await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

    // Acessar
    const allButtons = screen.queryAllByRole('link', { name: /ver detalhes/i });

    // console.log(allButtons);
    // screen.logTestingPlaygroundURL();

    // Testar
    expect(allButtons.length).toBe(NUM_BUTTONS);
  });

  it(
    'clicar no botao o carregando aparece e depois renderiza o detalhe do filme',
    async () => {
      // render(<App />);

      // Esperar o loading desaparecer
      // await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));

      // Acessar  o botao ver detalhes
      const allButtons = screen.queryAllByRole('link', { name: /ver detalhes/i });

      // Interagir
      userEvent.click(allButtons[0]);
      // screen.logTestingPlaygroundURL();

      // Testar se o carregando aparece na tela
      const loadingElement = screen.getByText(/carregando/i);
      expect(loadingElement).toBeInTheDocument();

      // Espero o carregando sair da tela
      await waitForElementToBeRemoved(loadingElement);

      // Verifico se na tela de detalhes tem um titulo com o tema Gladiador
      const title = screen.getByRole('heading', { level: 1, name: /gladiador/i });
      expect(title).toBeInTheDocument();

      // Voltar para a home para os proximos testes
      const back = screen.getByRole('link', { name: /voltar/i });
      userEvent.click(back);
      // screen.logTestingPlaygroundURL();
    },
  );

  it(
    'Verifica se Existe um filme que se chama titanic e ao clicar nele existe o titulo',
    async () => {
      // render(<App />);

      // Esperar o carregando sair da tela
      // await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
      // screen.logTestingPlaygroundURL();

      // Procurar um h2 com o titulo Titanic
      const titleTitanic = screen.getByRole('heading', { level: 2, name: /titanic/i });
      // Verifica se existe o filme do titanic na tela
      expect(titleTitanic).toBeInTheDocument();

      // procura os botoes de ver detalhe
      const buttonDetails = screen.queryAllByRole('link', { name: /ver detalhes/i });
      // console.log(buttonDetails.length);

      // Fazer o evento de click para entrar no segundo filme e assim verificar se esta tudo certo la dentro
      userEvent.click(buttonDetails[1]);
      // screen.logTestingPlaygroundURL();

      // Esperar o carregando sair da tela
      await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
      // screen.logTestingPlaygroundURL();

      // Verificar se o titulo é titanic
      const titleElement2 = screen.getByRole('heading', { level: 1, name: /titanic/i });
      expect(titleElement2).toBeInTheDocument();

      // Voltar para a pagina para testar novas funcionalidades
      const back = screen.getByRole('link', { name: /voltar/i });
      userEvent.click(back);

      // Tirar o carregando da tela
      await waitForElementToBeRemoved(() => screen.getByText(/carregando/i));
      screen.logTestingPlaygroundURL();
    },
  );
});
