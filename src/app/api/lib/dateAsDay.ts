import { format, differenceInCalendarDays } from 'date-fns';

export function FormatRelativeDate(date: Date): string {
    const today = new Date();
    const daysDifference = differenceInCalendarDays(date, today);
    console.log(today, date, daysDifference)
    if (daysDifference === 0) {
        return 'Today';
    } else if (daysDifference === 1) {
        return 'Tomorrow';
    } else if (daysDifference === -1) {
        return 'Yesterday';
    } else {
        return date.toDateString();
    }
}
