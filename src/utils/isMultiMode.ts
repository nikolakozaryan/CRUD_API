export const isMultiMode = () => {
  const MODE = process.env.NODE_ENV;
  return MODE === 'multi';
};
