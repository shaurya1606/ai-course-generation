/**
 * Converts the first page of a PDF file to an image (PNG File)
 * @param file The PDF File object
 * @returns Promise<{ file: File, base64: string }>
 */
export async function pdfToImage(file: File): Promise<{ file: File; base64: string }> {
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Invalid file type. Please provide a PDF.')
  }

  // Dynamically import pdfjs-dist only on client side
  const pdfjsLib = await import('pdfjs-dist')
  
  // worker setup - use local worker file
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

  const fileReader = new FileReader()

  return new Promise((resolve, reject) => {
    fileReader.onload = async () => {
      try {
        const typedArray = new Uint8Array(fileReader.result as ArrayBuffer)
        const pdf = await pdfjsLib.getDocument(typedArray).promise
        const page = await pdf.getPage(1)

        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')!
        canvas.height = viewport.height
        canvas.width = viewport.width

        // pdfjs RenderParameters requires the canvas element itself in addition to the context
        await page.render({ canvas, canvasContext: context, viewport }).promise

        // Get Base64 image
        const base64 = canvas.toDataURL('image/png')

        // Convert Base64 -> Blob -> File
        const res = await fetch(base64)
        const blob = await res.blob()
        const imageFile = new File([blob], `${file.name.replace(/\.pdf$/, '')}.png`, { type: 'image/png' })

        resolve({ file: imageFile, base64 })
      } catch (err) {
        reject(err)
      }
    }

    fileReader.onerror = () => reject(new Error('Failed to read file.'))
    fileReader.readAsArrayBuffer(file)
  })
}
