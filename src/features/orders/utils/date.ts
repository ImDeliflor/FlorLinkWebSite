export function getCustomWeek(dateString: string): number {
  const d = new Date(dateString);
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

  // Día de la semana: 0=Dom,1=Lun,2=Mar,3=Mié,...
  const dayOfWeek = date.getUTCDay();

  // Cuántos días retrocedemos hasta el miércoles más reciente
  const diffToWednesday = (dayOfWeek + 4) % 7;
  const mostRecentWednesday = new Date(date);
  mostRecentWednesday.setUTCDate(date.getUTCDate() - diffToWednesday);

  // Encontrar el primer miércoles del año
  const firstJan = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const firstJanDay = firstJan.getUTCDay();
  const diffToFirstWednesday = (3 - firstJanDay + 7) % 7;
  const firstWednesday = new Date(firstJan);
  firstWednesday.setUTCDate(firstJan.getUTCDate() + diffToFirstWednesday);

  // Semanas desde ese primer miércoles
  const diffMs = mostRecentWednesday.getTime() - firstWednesday.getTime();
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));

  return diffWeeks + 1;
}
