import leostar from '@ileostar/eslint-config'

export default leostar({
  typescript: {
    tsconfigPath: 'tsconfig.json'
  },
  react: true,
  jsonc: false
})
