export const tagColors = [
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-red-100',
  'bg-purple-100',
  'bg-indigo-100',
  'bg-pink-100'
];

export const getTagColor = (index: number): string => {
  return tagColors[index % tagColors.length];
};