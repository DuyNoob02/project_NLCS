export function formatTimeAgo(isoDate) {
    const postDate = new Date(isoDate);
    const currentDate = new Date();
    const timeDifferenceInSeconds = Math.floor((currentDate - postDate) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds} giây trước`;
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes} phút trước`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours} giờ trước`;
    } else {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days} ngày trước`;
    }
}

const isoDate = "2023-09-08T03:03:47.652+00:00";
const formattedTimeAgo = formatTimeAgo(isoDate);
console.log(formattedTimeAgo);