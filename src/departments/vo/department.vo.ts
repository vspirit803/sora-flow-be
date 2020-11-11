export interface DepartmentVo {
  id: string;
  parentId: string;
  name: string;
  supervisor: string;
  children: Array<DepartmentVo>;
}
