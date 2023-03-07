import React from 'react';
import Home from './pages/home'
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function App() {
  return (

      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
  );
}
// criou o componente home que tudo que for feito sera passado para esse arquivo

export default App;

// diferença entre função de JS e react
// o JS tera um resultado
// o REACT ele retorna um HTML

