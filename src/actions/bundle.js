await each(Object.keys(functions), async fn => {
  const handler = functions[fn].handler
  const end = handler.split('/').pop()

  const name = end.split('.').pop()

  const newName = handler.replace(end, `${name}.js`)
  const filename = end.replace(end, `${name}.js`)

  await delay(10)
  console.info('cwd', process.cwd())
  console.info('buildDir', buildDir)
  await bundle(
    path.join(process.cwd(), newName),
    path.join(process.cwd(), buildDir, filename),
    fn
  )
})
console.info('zip it', path.join(process.cwd(), buildDir))
await zipFile(path.join(process.cwd(), buildDir), `${app}`)