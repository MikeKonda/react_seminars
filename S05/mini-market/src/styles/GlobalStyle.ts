import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    color-scheme: ${({ theme }) => theme.mode};
  }

  body {
    margin: 0;
    min-width: 320px;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, sans-serif;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;