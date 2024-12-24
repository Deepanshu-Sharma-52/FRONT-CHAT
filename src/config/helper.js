export function timeAgo(time) {
    const now = new Date();
    const timeDifference = Math.floor((now - new Date(time)) / 1000);
    
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];
    
    for (const interval of intervals) {
        const count = Math.floor(timeDifference / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
        }
    }
    
    return 'just now';
}

// Example usage:
const timeStamp = '2023-12-20T10:20:00Z';
console.log(timeAgo(timeStamp)); // Outputs something like "1 day ago"
