import cssnano from 'cssnano'
import postcssImport from 'postcss-import'
import postcssMixins from 'postcss-mixins'
import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'

export default {
    plugins: [
        postcssPresetEnv,
        postcssImport,
        postcssMixins,
        postcssNested,
        cssnano,
    ],
}
