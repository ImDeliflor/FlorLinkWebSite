export const getNombreADN = (idAdn: number): string => {
  switch (idAdn) {
    case 1:
      return "SOMOS PARA NUESTROS CLIENTES";
    case 2:
      return "EL QUE SABE, SABE";
    case 3:
      return "UNIDOS SOMOS MÁS PODEROSOS";
    case 4:
      return "TODO Y MÁS POR LOS CRISANTEMOS";
    case 5:
      return "LÍDERES";
    case 6:
      return "SEGURIDAD";
    default:
      return "ADN NO DEFINIDO";
  }
};
