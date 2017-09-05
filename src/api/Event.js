const dueDate = new Date("2017-09-30T24:00:00");

export function getDDay() {
    const currDate = new Date();
    const timeDiff = Math.abs(dueDate.getTime() - currDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
}