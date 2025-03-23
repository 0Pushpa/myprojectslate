import express from 'express';

const router = express.Router()
import {
getAllNotificationOfUser,
addNotification,
rejectNotification,
acceptNotification,
changeNotificationStatus,
} from '../controllers/notification.js'

router.route('/').get(getAllNotificationOfUser).post(addNotification)

router.route('/reject_notification').post(rejectNotification)
router.route('/accept_notification').post(acceptNotification)
router.route('/change_notification_status').post(changeNotificationStatus)


export default router;
