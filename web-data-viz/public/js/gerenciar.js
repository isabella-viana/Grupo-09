
function ativarOuDesativar() {
  const classesParaAtivar = [
    'expandir-img',
    'user-img',
    'user-name',
    'icons-sino',
    'icons-dashboard',
    'icons-grupos',
    'icons-suporte',
    'icons-exit',
    'left-header'
  ];

  classesParaAtivar.forEach(nomeClasse => {
    const elementos = document.querySelectorAll(`.${nomeClasse}`);
    elementos.forEach(elemento => {
      elemento.classList.toggle('ativo');
    });
  });
}