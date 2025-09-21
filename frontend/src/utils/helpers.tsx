import html2canvas from "html2canvas"

export const delay = async (delayInMs: number) => {
  await new Promise((resolve) => setTimeout(resolve, delayInMs))
}

export const takeScreenshot = async () => {
  const element = document.documentElement
  const canvas = await html2canvas(element, {
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight
  })
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = 'pilkkiturnaus.png'
  link.click()
  link.remove()
}