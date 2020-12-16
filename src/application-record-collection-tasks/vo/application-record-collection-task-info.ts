import { Document } from 'mongoose';

import { ApplicationRecordCollectionTask } from '../application-record-collection-task.schema';

export type ApplicationRecordCollectionTaskInfo = {
  [P in Exclude<keyof ApplicationRecordCollectionTask, keyof Document | 'tasks'>]: ApplicationRecordCollectionTask[P];
} & {
  task: {
    status: string;
    metadata: Record<string, unknown>;
    id: string;
  };
};
