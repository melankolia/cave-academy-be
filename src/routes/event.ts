import { Router } from "express";
import EventController from "../controllers/event.controller";
import EventService from "../services/event.service";
import EventRepository from "../repositories/event";
import Verification from "../middleware/verification";

const router = Router();

// Initialize dependencies
const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

// Public routes
router.get("/", (req, res) => eventController.getAllEvents(req, res));
router.get("/:id", (req, res) => eventController.getEventById(req, res));

// Protected routes (require authentication)
router.post("/", Verification.verifyToken, eventController.createEvent.bind(eventController));
router.put("/:id", Verification.verifyToken, eventController.updateEvent.bind(eventController));
router.delete("/:id", Verification.verifyToken, eventController.deleteEvent.bind(eventController));

export default router; 