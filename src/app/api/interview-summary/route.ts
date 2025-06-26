import { appRoute } from '@genkit-ai/next';
import { interviewSummaryFlow } from '../../../genkit/interviewSummaryFlow';

export const POST = appRoute(interviewSummaryFlow);