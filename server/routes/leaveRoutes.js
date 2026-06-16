import { Router } from "express";
import { protect, protectAdmin } from "../middleware/auth.js";
import { createLeave, getLeave, updateLeaveStatus } from "../controllers/leaveController.js";

const leaveRouter = Router();

leaveRouter.patch('/:id',protect, protectAdmin, updateLeaveStatus)
leaveRouter.get('/', protect, getLeave)
leaveRouter.post('/', protect, createLeave)

export default leaveRouter;
