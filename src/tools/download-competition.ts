import { z } from "zod";
import { downloadCompetition } from "../utils/kaggle-api.js";

type DownloadCompetitionParams = {
  competition: string;
  path?: string;
  force?: boolean;
};

export const downloadCompetitionTool = {
  parameters: {
    competition: z.string().describe("Competition ID to download files from"),
    path: z.string().optional().describe("Path to download files to"),
    force: z.boolean().optional().describe("Force download even if files exist")
  },
  
  handler: async (params: DownloadCompetitionParams) => {
    try {
      const { competition, path, force } = params;
      const result = await downloadCompetition(competition, { path, force });
      
      return {
        content: [{
          type: "text" as const,
          text: `Successfully downloaded files for competition "${competition}".\n\n${result}`
        }]
      };
      
    } catch (error) {
      console.error("Error downloading competition files:", error);
      return {
        content: [{
          type: "text" as const,
          text: `Error downloading competition files: ${(error as Error).message}`
        }],
        isError: true
      };
    }
  }
};