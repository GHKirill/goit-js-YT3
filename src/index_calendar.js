import CalendarDates from 'calendar-dates';
const calendarDates = new CalendarDates();

// const main = async () => {
//   for (const meta of await calendarDates.getDates(new Date('2023/11/12'))) {
//     console.log(meta);
//   }

//   for (const meta of await calendarDates.getMatrix(new Date())) {
//     console.log(meta);
//   }
// };

// main();

const refCalendar = document.querySelector('.calendar');
const refCurrentDateInfo = document.querySelector('.calendar-info');
const refCalendarContainer = document.querySelector('.calendar-container');
const refCalendarMonth = document.querySelector('.calendar-month');
const refButtonMonthAfter = document.querySelector(`[data-button='right']`);
const refButtonMonthBefore = document.querySelector(`[data-button='left']`);
let calendarArrayHTML = [];
let calendarArray = [];
//let currentDateForFuture = new Date().getDay();
let currentDateForFuture = '';
let currentMonthForFuture = '';
let currentYearForFuture = '';
let chosenDateForFuture = '';
const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
const futureDate = async (date = new Date()) => {
  for (const meta of await calendarDates.getDates(date)) {
    //console.log(meta);
  }
  getYearMonth();
  for (const meta of await calendarDates.getMatrix(date)) {
    //console.log(meta);

    if (meta.some(({ type }) => type === 'current')) {
      calendarArrayHTML.push(
        ...meta.map(item => {
          calendarArray.push(item);
          if (chosenDateForFuture && chosenDateForFuture == item.date) {
            return `<li class='date ${item.type}-month current-date' data-date='${item.type}'>${item.date}</li>`;
          }
          return `<li class='date ${item.type}-month' data-date='${item.type}'>${item.date}</li>`;
        })
      );
      //console.log(meta);
    }
    //getYearMonth();
    showCurrentDateInfo();
  }
  console.log(calendarArray);
  const element = calendarArrayHTML.join('');
  refCalendar.innerHTML = '';
  refCalendar.innerHTML = element;
};
futureDate();

function getYearMonth() {
  if (!currentDateForFuture) {
    const currentDate = new Date();
    currentDateForFuture = currentDate.getDate();
    currentMonthForFuture = currentDate.getMonth() + 1;
    currentYearForFuture = currentDate.getFullYear();
    chosenDateForFuture = currentDate.getDate();
  }
  refCalendarMonth.textContent = `${months[currentMonthForFuture]} ${currentYearForFuture}`;
}

function getCurrentDate(dateInfo) {
  const nowDate = new Date();
  const getCurrentDate = new Date(dateInfo);

  if (!currentDateForFuture) {
    return nowDate.getDate() === getCurrentDate.getDate();
  }
  return currentDateForFuture === getCurrentDate.getDate();
}
function pointChosenDate() {
  if (!chosenDateForFuture) return;
}
console.log(calendarArray);

refCalendarContainer.addEventListener('click', calendarContainerOnClick);
function calendarContainerOnClick(event) {
  if (event.target.dataset.date !== 'current') return;
  const currentDate = event.target.textContent;
  //console.log(currentDate);

  //save current date for future
  const fullFormatCurrentDate = calendarArray.filter(
    item => item.type === 'current' && item.date == currentDate
  );
  const fullDateArray = fullFormatCurrentDate[0].iso.split('-');
  chosenDateForFuture = fullDateArray[2];
  currentDateForFuture = fullDateArray[2];
  currentMonthForFuture = fullDateArray[1];
  currentYearForFuture = fullDateArray[0];

  console.log(fullFormatCurrentDate[0]);

  deleteAndAddCurrentClass(event.target);
  console.log(currentDateForFuture);

  showCurrentDateInfo();
}

function deleteAndAddCurrentClass(element) {
  const refPreviousDate = document.querySelector('.current-date');
  if (refPreviousDate) {
    refPreviousDate.classList.toggle('current-date');
  }
  element.classList.toggle('current-date');
}

function showCurrentDateInfo() {
  if (!chosenDateForFuture) {
    const date = new Date();
    currentDateForFuture = date.getFullYear();
    currentMonthForFuture = date.getMonth() + 1;
    currentDateForFuture = date.getDate();
  }

  refCurrentDateInfo.textContent = `${currentYearForFuture}/${currentMonthForFuture}/${currentDateForFuture}`;
}

//======================

refButtonMonthAfter.addEventListener('click', buttonMonthAfterOnClick);
function buttonMonthAfterOnClick(event) {
  let choosenDate = '';
  if (currentMonthForFuture == 12) {
    choosenDate = `${
      Number(currentYearForFuture) + 1
    }/${1}/${currentDateForFuture}`;
    currentMonthForFuture = 1;
    currentYearForFuture = Number(currentYearForFuture) + 1;
  } else {
    choosenDate = `${currentYearForFuture}/${
      Number(currentMonthForFuture) + 1
    }/${currentDateForFuture}`;
    currentMonthForFuture = Number(currentMonthForFuture) + 1;
  }
  calendarArray = [];
  calendarArrayHTML = [];

  console.log(choosenDate);
  console.log(currentMonthForFuture);
  futureDate(new Date(choosenDate));
}
refButtonMonthBefore.addEventListener('click', buttonMonthBeforeOnClick);
function buttonMonthBeforeOnClick(event) {
  let choosenDate = '';
  if (currentMonthForFuture == 1) {
    choosenDate = `${
      Number(currentYearForFuture) - 1
    }/${12}/${currentDateForFuture}`;
    currentMonthForFuture = 12;
    currentYearForFuture = Number(currentYearForFuture) - 1;
  } else {
    choosenDate = `${currentYearForFuture}/${
      Number(currentMonthForFuture) - 1
    }/${currentDateForFuture}`;
    currentMonthForFuture = Number(currentMonthForFuture) - 1;
  }
  calendarArray = [];
  calendarArrayHTML = [];

  console.log(choosenDate);
  console.log(currentMonthForFuture);
  futureDate(new Date(choosenDate));
}
refCalendarMonth.addEventListener('click', calendarMonthOnClick);
function calendarMonthOnClick(event) {
  choosenDate = `${
    Number(currentYearForFuture) + 1
  }/${currentMonthForFuture}/${currentDateForFuture}`;
  currentYearForFuture = Number(currentYearForFuture) + 1;
  calendarArray = [];
  calendarArrayHTML = [];
  futureDate(new Date(choosenDate));
}
