const fs = require('fs');
const parseDate = (dateStr) => {
  const [day, monthStr, yearStr] = dateStr.split(' ');
  const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  return {
    day: parseInt(day),
    month: monthMap[monthStr] !== undefined ? monthMap[monthStr] : -1,
    year: parseInt(yearStr)
  };
};

const getUrgentDateInfo = () => {
  const d = new Date();
  d.setHours(d.getHours() + 28);
  return {
    dateStr: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
};

const dates = [
  getUrgentDateInfo().dateStr,
  '15 Feb 2026', '24 Jan 2026', '21 Jan 2026', '26 Jan 2026',
  '29 Jan 2026', '02 Feb 2026', '30 Jan 2026', '14 Feb 2026',
  '08 Feb 2026', '25 Jan 2026', '10 Feb 2026', '03 Feb 2026',
  '27 Jan 2026', '18 Feb 2026', '12 Feb 2026'
];

dates.forEach(d => console.log(d, parseDate(d)));
