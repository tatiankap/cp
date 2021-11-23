export const Converter = (time) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const minutes = Math.floor((Date.now() - time) / 1000 / 60);
    const hours = new Date(time).getHours();
    const day = new Date(time).getDate();
    const month = new Date(time).getMonth();
    const year = new Date(time).getFullYear();

    if (minutes > 0 && minutes <= 30) {
        return minutes === 1
            ? `${minutes} минуту назад`
            : minutes >= 2 && minutes <= 4
                ? `${minutes} минуты назад`
                : `${minutes} минут назад`;
    } else if (minutes === 0) {
        return "сейчас";
    } else if (minutes > 30 && minutes < 1440) {
        return `${hours}:${minutes}`;
    } else if (minutes > 1440 && minutes < 525600) {
        return `${day} ${monthNames[month]}`;
    } else {
        return `${day}/${month}/${year}`;
    }
};
