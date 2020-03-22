export default function getUniqueFieldNames<T>(objects: T[]) {
  const fields = new Set<keyof T>();
  objects.forEach(o => {
    Object.keys(o).forEach(field => {
      fields.add(field as keyof T);
    });
  });

  return fields;
}
