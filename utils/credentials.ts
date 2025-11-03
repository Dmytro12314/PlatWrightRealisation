import * as dotenv from "dotenv";

dotenv.config();

type Credentials = {
  users: {
    standard_user: string;
    error_user: string;
    locked_out_user: string;
    performance_glitch_user: string;
    problem_user: string;
    visual_user: string;
  };
};

export const getCredentials = (): Credentials => {
  return {
    users: {
      standard_user: process.env.STANDARD_USER_PASSWORD || "",
      error_user: process.env.ERROR_USER_PASSWORD || "",
      locked_out_user: process.env.LOCKED_OUT_USER_PASSWORD || "",
      performance_glitch_user: process.env.PERFORMANCE_GLITCH_USER_PASSWORD || "",
      problem_user: process.env.PROBLEM_USER_PASSWORD || "",
      visual_user: process.env.VISUAL_USER_PASSWORD || "",
    },
  };
};

export default getCredentials();