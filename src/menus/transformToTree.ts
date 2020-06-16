import { Document } from 'mongoose';

import { Menu } from './menu.schema';

export type MenuTreeItem = {
  children: Array<MenuTreeItem>;
} & {
  [P in Exclude<keyof Menu, keyof Document>]: Menu[P];
};

export function transformToTree(list: Array<Menu>): Array<MenuTreeItem> {
  const itemMap: { [id: string]: MenuTreeItem } = {};
  for (const each of list) {
    itemMap[each.id] = { ...each.toJSON(), children: [] };
  }

  for (const [id, item] of Object.entries(itemMap)) {
    if (item.parentId && itemMap[item.parentId]) {
      itemMap[item.parentId].children.push(itemMap[id]);
    }
  }

  return Object.values(itemMap).filter(
    (each) => !each.parentId || !itemMap[each.parentId],
  );
}
