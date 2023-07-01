module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': (filenames) => [
    ...filenames.map((filename) => `eslint --fix '${filename}'`),
    ...filenames.map(
      (filename) => `bash -c tsc --noEmit --pretty '${filename}'`
    ),
  ],
  '*.{json,yaml}': ['prettier --write'],
};
