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

  document.head.append(style)
}
