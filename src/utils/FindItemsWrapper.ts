import { Document, Model } from 'mongoose';

async function findItemsWrapper<T extends Document<any>>(
  model: Model<T>,
  filter: any,
  page: number,
  size: number,
  sort: Record<string, 1 | -1>,
): Promise<{ items: Array<T>; total: number; page: number; size: number }> {
  const [items, total] = await Promise.all([
    model
      .find(filter)
      .sort(sort)
      .skip((page - 1) * size)
      .limit(size),
    model.countDocuments(filter),
  ]);

  return { items, total, page, size };
}

export { findItemsWrapper };
