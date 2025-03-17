import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"

/**
 * Notification Service
 * 
 * Provides functions for displaying success and error notifications using Mantine notifications.
 * Uses custom styling and icons to provide consistent notification appearance.
 */

/**
 * Displays a success notification
 * 
 * Shows a green-bordered notification with a checkmark icon for successful operations
 * 
 * @param {string} title - The notification title/header text
 * @param {string} message - The main notification message/body text
 * 
 * Notification Properties:
 * - Green border styling
 * - Checkmark icon
 * - Teal color theme
 * - Close button
 * 
 * @example
 * successNotification(
 *   "Profile Updated",
 *   "Your profile changes were saved successfully"
 * )
 */
export const successNotification = (title:string, message:string)=>{
    notifications.show({
        title: title,
        message: message,
        withCloseButton: true,
        icon: <IconCheck style={{ height: "90%", width: "90%" }} />,
        color: "teal",
        withBorder: true,
        className: "!border-green-500"
    })
}

/**
 * Displays an error notification
 * 
 * Shows a red-bordered notification with an X icon for error scenarios
 * 
 * @param {string} title - The notification title/header text
 * @param {string} message - The main notification message/body text
 * 
 * Notification Properties:
 * - Red border styling
 * - X icon
 * - Red color theme
 * - Close button
 * 
 * @example
 * errorNotification(
 *   "Error",
 *   "Failed to save profile changes. Please try again."
 * )
 */
export const errorNotification=(title:string, message:string)=>{
    notifications.show({
        title: title,
        message: message,
        withCloseButton: true,
        icon: <IconX style={{ height: "90%", width: "90%" }} />,
        color: "red",
        withBorder: true,
        className: "!border-red-500"
    })
}
