import express from 'express';

const router = express.Router()
import {
  getAllUsersInGroup,
  addUserToGroup,
  deleteUserFromGroup,
} from '../controllers/groupUser.js'

router.route('/').post(addUserToGroup)

router.route('/:id').get(getAllUsersInGroup).delete(deleteUserFromGroup)

export default router;
