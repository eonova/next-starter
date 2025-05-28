import eonova from '@eonova/eslint-config'

export default eonova({
  typescript: {
    tsconfigPath: 'tsconfig.json'
  },
  react: true,
  jsonc: false
})
