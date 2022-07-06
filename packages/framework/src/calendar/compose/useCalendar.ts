import enUS from 'date-fns/locale/en-US';
import enGB from 'date-fns/locale/en-GB';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import isToday from 'date-fns/isToday';
import isWeekend from 'date-fns/isWeekend';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import type { Locale } from 'date-fns';

// Describes the base unit of time.
interface BaseEntity {
  date: Date;
  label: string;
}

// Describes the Day unit of time.
export interface DayEntity extends BaseEntity {
  isToday: boolean;
  isWeekend: boolean;
  isDisabled?: boolean;
  isOutOfRange?: boolean;
}

// Describes the Month unit of time.
export interface MonthEntity extends BaseEntity {
  days: DayEntity[];
  weeks: DayEntity[][];
  weekdays: string[];
}

// Describes the options to create month.
export interface MonthOptions {
  date: Date;
  locale?: Locale;
  monthFormat: string;
  weekdayFormat: string;
  firstDayOfWeek: number;
}

/**
 * Composable to create the calendar by type.
 * @returns Helpers to create diff type.
 */
export function useCalendar() {
  return { createMonth, createMonthId };
}

/**
 * Create the month based on the defined options.
 * @param options Month options.
 * @returns Created month entity.
 */
function createMonth(options: MonthOptions): MonthEntity {
  // Create default month based on the options.
  const month: MonthEntity = createMonthDefault(options);

  // Use locale from options or default it.
  const locale: Locale = options.locale ?? (options.firstDayOfWeek ? enGB : enUS);

  // Create the Date instance of the first day.
  const firstDay: Date = new Date(options.date.getMonth(), options.date.getFullYear(), 1);

  // Create the Date instance of the last day.
  const lastDay: Date = lastDayOfMonth(firstDay);

  // Determine the amount of day from previous month to complete week.
  const amountBeforeMonth: number = (firstDay.getDay() - (locale.options?.weekStartsOn ?? 0) + 7) % 7;

  if (amountBeforeMonth > 0)
    // Create days by subtraction from first day certain amount of days.
    month.days = month.days.concat(
      createDays(subDays(firstDay, amountBeforeMonth), subDays(firstDay, 1), locale).map(
        (day: DayEntity): DayEntity => ({ ...day, isOutOfRange: true })
      )
    );

  // Create the days for defined month.
  month.days = month.days.concat(createDays(firstDay, lastDay, locale));

  // Determine the amount of day from next month to complete week.
  const amountAfterMonth: number = (6 - lastDay.getDay() + (locale.options?.weekStartsOn ?? 0)) % 7;

  if (amountAfterMonth > 0)
    // Create days by addition to last day certain amount of days.
    month.days = month.days.concat(
      createDays(addDays(lastDay, 1), addDays(lastDay, amountAfterMonth), locale).map(
        (day: DayEntity): DayEntity => ({ ...day, isOutOfRange: true })
      )
    );

  // Create the weeks by chunking days.
  month.weeks = chunkDaysToWeeks(month.days);

  // Create the weeks by chunking days.
  month.label = format(month.date, options.monthFormat, { locale });

  // Create the weekdays names based on first week.
  month.weekdays = month.weeks[0]?.map((day: DayEntity): string => {
    return format(day.date, options.weekdayFormat);
  });

  return month;
}

/**
 * Create the default month based on the defined options.
 * @param options Month options.
 * @returns Created base month entity.
 */
function createMonthDefault(options: MonthOptions): MonthEntity {
  // Create the month with based defined props.
  return { date: options.date, label: '[empty]', days: [], weeks: [], weekdays: [] };
}

function createMonthId(date: Date): string {
  return `${date.getMonth()}-${date.getFullYear()}`;
}

// Create the calendar days in interval from start to end.
function createDays(start: Date, end: Date, locale: Locale): DayEntity[] {
  return eachDayOfInterval({ start, end }).map(
    (date: Date): DayEntity => ({
      date,
      label: format(date, 'PPP', { locale }),
      isToday: isToday(date),
      isWeekend: isWeekend(date)
    })
  );
}

/**
 * Create the weeks based on the specified days.
 * @param days Days used to create weeks.
 * @returns Created weeks based on the days.
 */
function chunkDaysToWeeks(days: DayEntity[]): DayEntity[][] {
  return days.reduce((weeks: DayEntity[][], day: DayEntity, index: number): DayEntity[][] => {
    const number: number = Math.floor(index / 7);
    if (!weeks[number])
      // Create and add default week.
      weeks[number] = [];
    // Add day to proper week.
    weeks[number].push(day);
    // Returns created weeks based on days.
    return weeks;
  }, []);
}
