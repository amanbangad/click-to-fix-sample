declare const dataSrcBabelPlugin: (babel: { types: any }) => {
  name: string
  visitor: Record<string, unknown>
}
export default dataSrcBabelPlugin
