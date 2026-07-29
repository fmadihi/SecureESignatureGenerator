interface Props {
  name: string; role: string; publicKey: string
  onChange: (field: string, val: string) => void
  labels: { name: string; role: string; publicKey: string; namePlaceholder: string; rolePlaceholder: string; keyPlaceholder: string }
}

export default function SignatureForm({ name, role, publicKey, onChange, labels }: Props) {
  return (
    <>
      <div className="form-group">
        <label>{labels.name}</label>
        <input value={name} onChange={e => onChange('name', e.target.value)} placeholder={labels.namePlaceholder} />
      </div>
      <div className="form-group">
        <label>{labels.role}</label>
        <input value={role} onChange={e => onChange('role', e.target.value)} placeholder={labels.rolePlaceholder} />
      </div>
      <div className="form-group">
        <label>{labels.publicKey}</label>
        <input value={publicKey} onChange={e => onChange('publicKey', e.target.value)} placeholder={labels.keyPlaceholder} />
      </div>
    </>
  )
}
