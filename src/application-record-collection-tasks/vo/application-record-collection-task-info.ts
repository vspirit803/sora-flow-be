import { ApplicationRecordCollectionTask } from '../application-record-collection-task.schema';

export interface ApplicationRecordCollectionTaskInfo extends ApplicationRecordCollectionTask {
  tasks: never;
  task: {
    status: string;
    metadata: Record<string, unknown>;
    id: string;
  };
}
