import axiosInstance from "../Interceptor/AxiosInterceptor";

/**
 * Retrieves notifications for a specific user
 * 
 * Makes a GET request to fetch notifications for the given user ID
 * 
 * @param {string} userId - The ID of the user whose notifications to retrieve
 * @returns {Promise<Object[]>} Array of notification objects
 * @throws {Error} If notification retrieval fails
 */
export const getNotifications = async (userId: any) => {
    const res = await axiosInstance.get(`/notification/get/${userId}`);
    if (res.status !== 200) {
        throw new Error(`Failed to retrieve notifications: ${res.statusText}`);
    }
    return res.data;
};

/**
 * Marks a notification as read
 * 
 * Makes a PUT request to update the notification status to read
 * 
 * @param {any} id - The ID of the notification to mark as read
 * @returns {Promise<Object>} Response data confirming the update
 * @throws {Error} If marking the notification as read fails
 */
export const readNotification = async (id: string | number) => {
    try {
        const res = await axiosInstance.put(`/notification/read/${id}`);
        if (res.status !== 200) {
            throw new Error(`Failed to mark notification as read: ${res.statusText}`);
        }
        return res.data;    
    } catch (error) {
        throw new Error(`Error while marking notification as read: ${error}`);
    }
};
