//A Method to import some type of typescript within a javascript code
/** @typedef { import('prettier').Config} PrettierConfig*/

//Same here, in this case the definition of 'config' is from 'PrettierConfig' type
/** @type { PrettierConfig } */
const config = {
    plugins: ['prettier-plugin-tailwindcss'],
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: true,
    quoteProps: 'as-needed',
    jsxSingleQuote: false,
    trailingComma: 'es5',
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'auto',
    bracketSameLine: false,
} 

export default config