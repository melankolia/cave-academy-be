import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import { getLinkPreview } from "link-preview-js";

class LinkPreviewController {

  formatLinkToolData(preview: any) {
    return {
        title: preview.title || "",
        description: preview.description || "",
        image: {
          url: preview.images?.[0] || ""
        }
    }
  }
  async getLinkPreview(req: Request, res: Response) {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'link' in request body" });
    }
  
    try {
      const preview = await getLinkPreview(url, { timeout: 5000 });
      const meta = this.formatLinkToolData(preview);
      res.status(200).json({
        success: 1,
        meta
      });
    } catch (error) {
      handleError(error as Error, res);
    }
  }
}

export default LinkPreviewController;