export class BaseQueryDto {
  /**排序 */
  sort: {
    /**
     * 排序关键字
     */
    key: string;

    /**
     * 顺序
     * ASC 升序
     * DESC 降序
     */
    order: 'ASC' | 'DESC';
  };

  /**分页 */
  pagination: {
    /**
     * 页码 从1开始
     */
    page: number;
    /**
     * 分页大小
     */
    size: number;
  };
}
