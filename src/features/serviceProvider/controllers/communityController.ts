import { Request, Response } from "express";
import { getServiceProviderInfoService } from "../service/getServiceProviderInfoService";

class CommunityController {

    async getServiceProviderInfo(req: Request, res: Response) {
        console.log("[Controller] Get Service Provider", { input: { customerId: req.params.customerId } });
        const result = await getServiceProviderInfoService.get(req.params.customerId);
        res.status(result.status);
        res.send(result.data);
    }
}

const communityController = new CommunityController()
export { communityController }