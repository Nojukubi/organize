import enUS from 'date-fns/locale/en-US';
import enGB from 'date-fns/locale/en-GB';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import isToday from 'date-fns/isToday';
import isWeekend from 'date-fns/isWeekend';
import eachDay from 'date-fns/eachDayOfInterval';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import type { Locale } from 'date-fns';

// Describes the day.
export interface DayEntity {
  date: Date;
  number: number;
  isToday: boolean;
  isWeekend: boolean;
}

// Describes the week.
export interface WeekEntity {
  days: DayEntity[];
  number: number;
}

// Describes the month.
export interface MonthEntity {
  number: number;
  year: number;
  days: DayEntity[];
  weeks: WeekEntity[];
  afterDays: DayEntity[];
  beforeDays: DayEntity[];
  currentDays: DayEntity[];
}

// Describes the options to create week.
export interface WeekOptions {
  number: number;
}

// Describes the options to create month.
export interface MonthOptions {
  month: number;
  year: number;
  locale?: Locale;
  firstDayOfWeek?: number;
}

// Composable to create the calendar.
export function useCalendar() {
  return { createMonth, createWeek };
}

// Create the month calendar based on options.
function createMonth(options: MonthOptions): MonthEntity {
  const monthOutput: MonthEntity = {
    year: options.year,
    number: options.month,
    weeks: [],
    days: [],
    afterDays: [],
    beforeDays: [],
    currentDays: []
  };

  // Use locale from options or default it based on first day of week.
  const locale: Locale = options.locale ?? (options.firstDayOfWeek ? enGB : enUS);

  // Create the Date instance of the first day.
  const firstDay: Date = new Date(options.year, options.month, 1);

  // Create the Date instance of the last day.
  const lastDay: Date = lastDayOfMonth(firstDay);

  // Determine the amount of day from previous month to complete week.
  const amountBeforeMonth: number = (firstDay.getDay() - (locale.options?.weekStartsOn ?? 0) + 7) % 7;

  if (amountBeforeMonth > 0)
    // Create days by subtraction from first day certain amount of days.
    monthOutput.beforeDays = createDays(subDays(firstDay, amountBeforeMonth), subDays(firstDay, 1));

  // Create the days for defined month.
  monthOutput.currentDays = createDays(firstDay, lastDay);

  // Determine the amount of day from next month to complete week.
  const amountAfterMonth: number = (6 - lastDay.getDay() + (locale.options?.weekStartsOn ?? 0)) % 7;

  if (amountAfterMonth > 0)
    // Create days by addition to last day certain amount of days.
    monthOutput.afterDays = createDays(addDays(lastDay, 1), addDays(lastDay, amountAfterMonth));

  monthOutput.days = [...monthOutput.beforeDays, ...monthOutput.currentDays, ...monthOutput.afterDays];
  monthOutput.weeks = monthOutput.days.reduce((weeks: WeekEntity[], day: DayEntity, index: number) => {
    const weekNumber: number = Math.floor(index / 7);
    if (!weeks[weekNumber])
      weeks[weekNumber] = {
        days: [],
        number: weekNumber
      };
    weeks[weekNumber].days.push(day);
    return weeks;
  }, []);

  return monthOutput;
}

// Create the week calendar based on options.
function createWeek(options: WeekOptions) {
  // Nothing here yet
}

// Create the calendar days in interval from start to end.
function createDays(start: Date, end: Date): DayEntity[] {
  return eachDay({ start, end }).map(
    (date: Date): DayEntity => ({
      date,
      number: date.getDate(),
      isToday: isToday(date),
      isWeekend: isWeekend(date)
    })
  );
}
