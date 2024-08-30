import { format, differenceInCalendarDays } from 'date-fns';

export interface relativeDate {
    textColor: string,
    dateText: string
}

export function FormatRelativeDate(date: Date): relativeDate {
    const today = new Date();
    const daysDifference = differenceInCalendarDays(date, today);
    let textColor = "text-sm"
    if (daysDifference < 0){
        textColor = textColor.concat(" text-red-500");
    } else {
        textColor = textColor.concat(" text-green-500");
    }

    if (daysDifference === 0) {
        return ({
            textColor: textColor,
            dateText: "Today"
        })
    } else if (daysDifference === 1) {
        return ({
            textColor: textColor,
            dateText: "Tomorrow"
        })
    } else if (daysDifference === -1) {
        return ({
            textColor: textColor,
            dateText: "Yesterday"
        })
    } else {
        return ({
            textColor: textColor,
            dateText: date.toDateString(),
        })
    }
}
