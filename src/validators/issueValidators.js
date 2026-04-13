import { error } from "console";
import { z } from "zod";

export const createIssueSchema = z.object({
//   projectId: z.string().uuid(),
  // for an enum FOR Project
  //     status: z.enum(["MEMBER", "CREATOR"], {
  //     error: () =>{
  //         {
  //             message: "Status Must B One of "
  //         }
  //     }
  // }).optional(),
description: z.string().optional(),
title: z.string()
});
