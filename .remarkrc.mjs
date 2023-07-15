export default {
// https://github.com/remarkjs/remark/tree/master/packages/remark-stringify#options
  settings: {
    listItemIndent: 1,
    emphasis: '_',
    strong: '_',
    bullet: '*',
    incrementListMarker: false
  },
  plugins: [
    '@form8ion/remark-lint-preset',
    ['remark-toc', {tight: true}],
    ['remark-usage', {heading: 'example'}]
  ]
}
