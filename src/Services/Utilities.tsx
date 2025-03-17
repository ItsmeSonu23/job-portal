/**
 * Utility functions for date formatting and file handling
 */

/**
 * Formats a date string into a short month and year format
 * 
 * @param {string} dateString - ISO date string to format
 * @returns {string} Formatted date string (e.g. "Jan 2024")
 * 
 * @example
 * formatDate("2024-01-15") // Returns "Jan 2024"
 */
export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options = { years: 'numeric' as const, month: 'short' as const }
    return date.toLocaleString('en-US', options)
}

/**
 * Converts a timestamp into a human-readable relative time string
 * 
 * Calculates the time difference between now and the provided timestamp,
 * returning a string like "5 minutes ago" or "2 months ago"
 * 
 * @param {string} time - ISO timestamp to convert
 * @returns {string} Human readable relative time string
 * 
 * Handles these time ranges:
 * - Seconds (< 1 minute)
 * - Minutes (< 1 hour) 
 * - Hours (< 1 day)
 * - Days (< 30 days)
 * - Months (< 1 year)
 * - Years
 * 
 * @example
 * timeAgo("2024-01-15T10:30:00") // Returns "5 minutes ago"
 * timeAgo("2023-01-15T10:30:00") // Returns "1 year ago"
 */
export const timeAgo = (time:string) => {
    const now = new Date();
    const date = new Date(time); // Parse the ISO string into a Date object
    const timeDiff = now.getTime() - date.getTime(); // Difference in milliseconds
    const seconds = timeDiff / 1000;

    // Handle seconds
    if (seconds < 60) {
        return `${Math.floor(seconds)} second${seconds !== 1 ? 's' : ''} ago`;
    }

    // Handle minutes
    const minutes = seconds / 60;
    if (minutes < 60) {
        return `${Math.floor(minutes)} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    // Handle hours
    const hours = minutes / 60;
    if (hours < 24) {
        return `${Math.floor(hours)} hour${hours !== 1 ? 's' : ''} ago`;
    }

    // Handle days
    const days = hours / 24;
    if (days < 30) {
        return `${Math.floor(days)} day${days !== 1 ? 's' : ''} ago`;
    }

    // Handle months (approximate as 30 days per month)
    const months = days / 30;
    if (months < 12) {
        return `${Math.floor(months)} month${months !== 1 ? 's' : ''} ago`;
    }

    // Handle years
    const years = months / 12;
    return `${Math.floor(years)} year${years !== 1 ? 's' : ''} ago`;
}

/**
 * Converts a file to base64 encoded string
 * 
 * Uses FileReader to read file contents and convert to base64 format.
 * Useful for image preview and file upload handling.
 * 
 * @param {File} file - File object to convert
 * @returns {Promise<string>} Promise resolving to base64 encoded string
 * @rejects {Error} Rejects if file reading fails
 * 
 * @example
 * const file = event.target.files[0];
 * try {
 *   const base64 = await getBase64(file);
 *   // Use base64 string
 * } catch (error) {
 *   console.error('Failed to convert file:', error);
 * }
 */
export const getBase64 = (file: any) => {
    return new Promise((res, rej) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => res(reader.result)
        reader.onerror = error => rej(error)
    })
}


export const formatInterviewTime = (date:any) => {
    const dateTime = new Date(date)
    return dateTime.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
}

export const openBase64PDF = (base64String:string) => {
   const byteCharacters = atob(base64String);
   const byteNumbers = new Array(byteCharacters.length);
   for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
   }
   const byteArray = new Uint8Array(byteNumbers);
   const blob = new Blob([byteArray], {type: 'application/pdf'});
   const pdfUrl = URL.createObjectURL(blob);
   window.open(pdfUrl, '_blank');
}
