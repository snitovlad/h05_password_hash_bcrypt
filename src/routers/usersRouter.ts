import { Router } from "express";
import { usersController } from "../controllers/users/usersController";
import { authMiddleware } from "../middlewares/auth-middleware";
import { inputPageNumberQueryValidator, inputPageSizeQueryValidator, inputSearchEmailTermQueryValidator, inputSearchLoginTermQueryValidator, inputSortByQueryValidator, inputSortDirectionQueryValidator } from "../middlewares/inputQueryValidation";
import { inputCheckErrorsMiddleware } from "../middlewares/input-check-errors-middleware";

export const usersRouter = Router()

usersRouter.get('/',
    authMiddleware,
    inputSortByQueryValidator(),
    inputSortDirectionQueryValidator(),
    inputPageNumberQueryValidator(),
    inputPageSizeQueryValidator(),
    inputSearchLoginTermQueryValidator(),
    inputSearchEmailTermQueryValidator(),
    inputCheckErrorsMiddleware,
    usersController.findAllUsers)