/**
 * Subset of user fields loaded by the notification service from the user microservice.
 */
export interface NotificationUserView {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
