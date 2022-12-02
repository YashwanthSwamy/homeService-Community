import express from "express";
import { communityController } from "../features/serviceProvider/controllers/communityController";
import { getServiceProvidersInfoMiddleware } from "../features/serviceProvider/middleware/getServiceProvidersInfoMiddleware";

const communityRoutes = express.Router();


communityRoutes.get(
    "/api/v1/community/serviceProviders",
    getServiceProvidersInfoMiddleware.validateRequest,
    communityController.getServiceProviderInfo
);


export { communityRoutes };