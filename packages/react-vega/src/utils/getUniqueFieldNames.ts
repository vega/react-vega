import { PlainObject } from '../types';

export default function getUniqueFieldNames(objects: PlainObject[]) {
  const fields = new Set();
  objects.forEach(o => {
    Object.keys(o).forEach(field => {
      fields.add(field);
    });
  });

  return fields;
}
