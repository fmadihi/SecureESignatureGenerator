interface Props {
  name: string
  font: string
  color: string
}

const fonts = [
  { label: 'Dancing Script', value: "'Dancing Script', cursive" },
  { label: 'Pacifico', value: "'Pacifico', cursive" },
]

export function fontOptions() { return fonts }

export default function SignatureTyped({ name, font, color }: Props) {
  return (
    <div className="typed-sig" style={{ fontFamily: font, color }}>
      {name || 'امضای شما'}
    </div>
  )
}
