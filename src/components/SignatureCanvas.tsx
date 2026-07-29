import { useRef, useEffect, useState } from 'react'

interface Props {
  color: string
  lineWidth: number
  onDataUrl: (url: string) => void,
   clearLabel: string
}

export default function SignatureCanvas({ color, lineWidth, onDataUrl,clearLabel  }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)

  const getCtx = () => canvasRef.current?.getContext('2d')

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const scaleX = canvasRef.current!.width / rect.width
    const scaleY = canvasRef.current!.height / rect.height
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    drawing.current = true
    const ctx = getCtx()!
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return
    const ctx = getCtx()!
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stop = () => {
    drawing.current = false
    onDataUrl(canvasRef.current!.toDataURL('image/png'))
  }

  const clear = () => {
    const canvas = canvasRef.current!
    getCtx()!.clearRect(0, 0, canvas.width, canvas.height)
    onDataUrl('')
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={160}
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={start}
        onTouchMove={draw}
        onTouchEnd={stop}
      />
      <div className="controls">
        <button className="btn btn-danger" onClick={clear}>{clearLabel }</button>
      </div>
    </div>
  )
}
