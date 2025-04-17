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
