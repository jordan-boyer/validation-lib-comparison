import { Glob, type BuildConfig } from "bun"
import { green, kebabToPascalCase, red, yellow } from 'shuutils'

const glob = new Glob("*.ts")
const ignore = ['utils.ts']
const outdir = './dist'
const nameRegex = /dist[\/\\](?<name>[\w-]+)/

function showFileSize(path: string) {
  const name = nameRegex.exec(path)?.groups?.name
  if (!name) throw new Error(`Failed to extract name from ${path}`)
  const stats = Bun.file(path)
  const kb = Math.round(stats.size / 1024)
  const color = kb < 30 ? green : kb < 100 ? yellow : red
  console.log(color(kebabToPascalCase(name).padEnd(8)), 'minified build size :', color(`${kb}`), 'KB')
}

function build(file: string) {
  const entrypoints = [`./src/${file}`]
  const options = {
    entrypoints,
    external: ['shuutils'],
    outdir,
    minify: true
  } satisfies BuildConfig
  Bun.build(options).then((data) => {
    if (data.outputs[0]?.path) showFileSize(data.outputs[0].path)
  }).catch((err) => { console.error('Build failed:', err) })
}

for await (const file of glob.scan("./src")) {
  if (ignore.includes(file)) continue
  build(file)
}
