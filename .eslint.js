module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["@typescript-eslint", "react", "tailwindcss"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:tailwindcss/recommended",
		"plugin:prettier/recommended",
		"next",
		"next/core-web-vitals",
	],
	rules: {
		// Customize rules if needed
		"@typescript-eslint/no-unused-vars": ["warn"],
		"react/react-in-jsx-scope": "off",
	},
};


// module.exports = {
//   parser: '@typescript-eslint/parser',
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended', // Add this line for React linting
//     'plugin:@typescript-eslint/recommended', // If using TypeScript
//   ],
//   plugins: [
//     'react', // Ensure the React plugin is listed here
//     '@typescript-eslint',
//   ],
//   settings: {
//     react: {
//       version: 'detect', // Automatically detects the React version
//     },
//   },
//   rules: {
//     // Custom rules
//   },
// };
