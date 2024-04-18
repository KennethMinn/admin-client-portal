export const getTodayDate = () => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth() + 1;
  const day: number = today.getDate();

  // Padding single digit months/days with a leading zero if necessary
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
};
