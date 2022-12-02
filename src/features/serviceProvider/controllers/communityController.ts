import { Request, Response } from "express";
import HttpStatus from "http-status-codes";

class CommunityController{

    getServiceProviderInfo(req: Request, res: Response){
        console.log("[Controller] Get Service Provider", {input: req.body})
        try {
            const result = { status : 200,  data : ""}
            res.status(HttpStatus.OK);
            res.send(result.data);
        } catch (status) {
            res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            res.send(undefined);
        }
    }
}

const communityController = new CommunityController()
export { communityController }