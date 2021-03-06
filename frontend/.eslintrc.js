module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
		'indent': [
            'error',
            2
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
    	'object-curly-spacing': [
        	'error', 'always'
    	],
    	'arrow-spacing': [
        	'error', { 'before': true, 'after': true }
    	],
		"no-console": 0,
		"no-unused-vars": 0,
		"no-undef": 0,
    }
};
