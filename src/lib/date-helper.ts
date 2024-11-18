import { DateTime, } from 'luxon'
import type { Duration } from 'luxon';

export class DateHelper {
  // Format dates to strings
  static format(date: DateTime | Date | string, format: string = 'yyyy-MM-dd'): string {
    const luxonDate = DateHelper.toLuxon(date);
    return luxonDate.toFormat(format);
  }

  // Convert various date inputs to Luxon DateTime
  static toLuxon(date: DateTime | Date | string): DateTime {
    if (date instanceof DateTime) return date;
    if (date instanceof Date) return DateTime.fromJSDate(date);
    return DateTime.fromISO(date);
  }

  // Get current date/time
  static now(): DateTime {
    return DateTime.now();
  }

  // Add duration to date
  static add(date: DateTime | Date | string, duration: Duration | Object): DateTime {
    const luxonDate = DateHelper.toLuxon(date);
    return luxonDate.plus(duration);
  }

  // Subtract duration from date
  static subtract(date: DateTime | Date | string, duration: Duration | Object): DateTime {
    const luxonDate = DateHelper.toLuxon(date);
    return luxonDate.minus(duration);
  }

  // Compare two dates
  static isBefore(date1: DateTime | Date | string, date2: DateTime | Date | string): boolean {
    const luxonDate1 = DateHelper.toLuxon(date1);
    const luxonDate2 = DateHelper.toLuxon(date2);
    return luxonDate1 < luxonDate2;
  }

  // Get start of period
  static startOf(date: DateTime | Date | string, unit: 'day' | 'week' | 'month' | 'year'): DateTime {
    const luxonDate = DateHelper.toLuxon(date);
    return luxonDate.startOf(unit);
  }

  // Parse string to DateTime
  static parse(dateString: string, format: string): DateTime {
    return DateTime.fromFormat(dateString, format);
  }

  // Check if date is valid
  static isValid(date: DateTime | Date | string): boolean {
    const luxonDate = DateHelper.toLuxon(date);
    return luxonDate.isValid;
  }

  // Get difference between dates
  static diff(date1: DateTime | Date | string, date2: DateTime | Date | string): Duration {
    const luxonDate1 = DateHelper.toLuxon(date1);
    const luxonDate2 = DateHelper.toLuxon(date2);
    return luxonDate2.diff(luxonDate1);
  }
}

export class DateWrapper {
  private readonly dateTime: DateTime;

  constructor(date: DateTime | Date | string) {
    this.dateTime = DateWrapper.toLuxon(date);
  }

  // Instance methods for chaining
  format(format: string = 'yyyy-MM-dd'): string {
    return this.dateTime.toFormat(format);
  }

  add(duration: Duration | Object): DateWrapper {
    return new DateWrapper(this.dateTime.plus(duration));
  }

  subtract(duration: Duration | Object): DateWrapper {
    return new DateWrapper(this.dateTime.minus(duration));
  }

  startOf(unit: 'day' | 'week' | 'month' | 'year'): DateWrapper {
    return new DateWrapper(this.dateTime.startOf(unit));
  }

  endOf(unit: 'day' | 'week' | 'month' | 'year'): DateWrapper {
    return new DateWrapper(this.dateTime.endOf(unit));
  }

  toISO(): string | null {
    return this.dateTime.toISO();
  }

  toTimestamp(): number {
    return this.dateTime.toMillis();
  }

  // Static creators
  static now(): DateWrapper {
    return new DateWrapper(DateTime.now());
  }

  static fromISO(dateString: string): DateWrapper {
    return new DateWrapper(DateTime.fromISO(dateString));
  }

  static fromFormat(dateString: string, format: string): DateWrapper {
    return new DateWrapper(DateTime.fromFormat(dateString, format));
  }

  // Utility methods
  private static toLuxon(date: DateTime | Date | string): DateTime {
    if (date instanceof DateTime) return date;
    if (date instanceof Date) return DateTime.fromJSDate(date);
    return DateTime.fromISO(date);
  }
}