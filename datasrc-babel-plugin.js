import path from 'node:path'

const isComponentName = (name) => typeof name === 'string' && /^[A-Z]/.test(name)

// Babel plugin: stamp `data-src="file:line:col"` (and `data-comp`) onto every
// host (lowercase) JSX element. Host elements always become real DOM nodes, so
// the picker can read the source location straight off the clicked element.
export default function dataSrcBabelPlugin({ types: t }) {
  return {
    name: 'stamp-data-src',
    visitor: {
      Program: {
        enter(_p, state) {
          state.__compStack = []
        },
      },
      FunctionDeclaration: {
        enter(p, state) {
          const name = p.node.id && p.node.id.name
          state.__compStack.push(isComponentName(name) ? name : null)
        },
        exit(_p, state) {
          state.__compStack.pop()
        },
      },
      ClassDeclaration: {
        enter(p, state) {
          const name = p.node.id && p.node.id.name
          state.__compStack.push(isComponentName(name) ? name : null)
        },
        exit(_p, state) {
          state.__compStack.pop()
        },
      },
      VariableDeclarator: {
        enter(p, state) {
          const id = p.node.id
          const init = p.node.init
          const isFn =
            init &&
            (init.type === 'ArrowFunctionExpression' ||
              init.type === 'FunctionExpression')
          const name = id && id.type === 'Identifier' ? id.name : null
          if (isFn && isComponentName(name)) {
            state.__compStack.push(name)
            p.node.__pushedComp = true
          }
        },
        exit(p, state) {
          if (p.node.__pushedComp) state.__compStack.pop()
        },
      },
      JSXOpeningElement(p, state) {
        const nameNode = p.node.name
        if (!t.isJSXIdentifier(nameNode)) return
        const tag = nameNode.name
        if (!/^[a-z]/.test(tag)) return

        const attrs = p.node.attributes
        const already = attrs.some(
          (a) =>
            t.isJSXAttribute(a) &&
            t.isJSXIdentifier(a.name) &&
            a.name.name === 'data-src'
        )
        if (already) return

        const loc = p.node.loc
        if (!loc) return

        const filename = (state.file && state.file.opts && state.file.opts.filename) || 'unknown'
        let rel = filename
        try {
          rel = path.relative(process.cwd(), filename)
        } catch {
          // keep absolute path on failure
        }
        rel = rel.split(path.sep).join('/')

        const value = `${rel}:${loc.start.line}:${loc.start.column + 1}`
        attrs.push(t.jsxAttribute(t.jsxIdentifier('data-src'), t.stringLiteral(value)))

        const comp = [...(state.__compStack || [])].reverse().find(Boolean)
        if (comp) {
          attrs.push(t.jsxAttribute(t.jsxIdentifier('data-comp'), t.stringLiteral(comp)))
        }
      },
    },
  }
}
