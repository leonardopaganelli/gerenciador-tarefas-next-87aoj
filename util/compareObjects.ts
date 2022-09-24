const compareObjects = (firstObject: object, secondObject: object) =>
  (Object.keys(firstObject) as (keyof typeof firstObject)[]).every((key) => {
    return (
      Object.prototype.hasOwnProperty.call(secondObject, key) &&
      firstObject[key] === secondObject[key]
    );
  });

export { compareObjects };
