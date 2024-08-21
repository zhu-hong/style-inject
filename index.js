export const styleInject = (css, { target, tag }) => {
  if(!css || !document) return

  const style = document.createElement('style')
  style.textContent = css

  if(tag) {
    style.setAttribute('data-tag', tag)
  }

  if(target) {
    target.append(style)
    return
  }

  // 保证样式容易被覆盖
  let styleIndex = -1
  const firstStyleEl = document.head.querySelector('style')
  if(firstStyleEl !== null) {
    styleIndex = Array.from(document.head.children).findIndex((c) => c === firstStyleEl)
  }

  let styleSheetIndex = -1
  const firstStyleSheetEl = document.head.querySelector('link[rel=stylesheet]')
  if(firstStyleSheetEl !== null) {
    styleSheetIndex = Array.from(document.head.children).findIndex((c) => c === firstStyleSheetEl)
  }

  if(styleIndex === -1 && styleSheetIndex === -1) {
    document.head.append(style)
    return
  }

  if(styleIndex !== -1 && styleSheetIndex !== -1) {
    const referenceNode = styleIndex < styleSheetIndex ? firstStyleEl : firstStyleSheetEl
    document.head.insertBefore(style, referenceNode)
    return
  }

  const referenceNode = styleIndex > styleSheetIndex ? firstStyleEl : firstStyleSheetEl
  document.head.insertBefore(style, referenceNode)
}
