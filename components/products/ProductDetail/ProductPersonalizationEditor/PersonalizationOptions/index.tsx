'use client'

import UnderlineInput from '@/components/ui/UnderlineInput'
import { PersonalizationOptionsProps } from '../../type'

const PersonalizationOptions = ({
  personalization,
  values,
  updateLineValue,
  color,
  setColor,
  font,
  fontSize,
  fontWeight,
  setFont,
  setFontSize,
  setFontWeight,
  position,
  setPosX,
  setPosY,
}: PersonalizationOptionsProps) => {
  const { textBlock, options } = personalization

  return (
    <div className="space-y-6 w-full">
      {/* COLOR */}
      {options?.colors && (
        <div>
          <p className="text-sm">
            COLOR:
            <span className="font-medium capitalize ml-2">{color}</span>
          </p>
          <div className="flex gap-2 mt-2">
            {options.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`h-7 w-7 border ${
                  color === c ? 'ring-1 ring-black' : ''
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* TEXT LINES */}
      {textBlock.lines.map((line) => (
        <div key={line.id} className="flex items-center gap-2">
          <label className="block text-sm uppercase mb-1 min-w-[100px]">
            {line.label}:
          </label>
          <UnderlineInput
            type="text"
            value={values[line.id]}
            placeholder="Your text here"
            maxLength={line.maxLength}
            onChange={(e) =>
              updateLineValue(line.id, e.target.value, line.maxLength)
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            {values[line.id]?.length ?? 0}/{line.maxLength}
          </p>
        </div>
      ))}

      {/* POSITION */}
      <div className="flex items-center gap-10">
        <div className="uppercase text-sm">Position:</div>

        <label className="flex items-center gap-2 text-sm">
          X
          <input
            type="number"
            step={options?.positionX?.step ?? 0.01}
            min={options?.positionX?.min ?? 0}
            max={options?.positionX?.max ?? 1}
            value={position.x}
            onChange={(e) => setPosX(+e.target.value)}
            className="w-20 border px-2 py-1"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          Y
          <input
            type="number"
            step={options?.positionY?.step ?? 0.01}
            min={options?.positionY?.min ?? 0}
            max={options?.positionY?.max ?? 1}
            value={position.y}
            onChange={(e) => setPosY(+e.target.value)}
            className="w-20 border px-2 py-1"
          />
        </label>
      </div>

      {/* FONT */}
      {options?.fonts && (
        <div className="flex items-center gap-2">
          <div className="text-sm uppercase">Fonts:</div>
          <div className="flex gap-2">
            {options.fonts.map((f) => (
              <button
                key={f}
                onClick={() => setFont(f)}
                className={`border px-3 py-1 text-sm capitalize ${
                  font === f ? 'border-black' : 'border-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FONT SIZE */}
      {options?.fontSizes && (
        <div className="flex items-center gap-2">
          <div className="text-sm uppercase">Font size:</div>
          <div className="flex gap-2">
            {options.fontSizes.map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`border px-3 py-1 text-sm ${
                  fontSize === size ? 'border-black' : 'border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FONT WEIGHT */}
      {options?.fontWeights && (
        <div className="flex items-center gap-2">
          <div className="text-sm uppercase">Font weight:</div>
          <div className="flex gap-2">
            {options.fontWeights.map((w) => (
              <button
                key={w}
                onClick={() => setFontWeight(w)}
                className={`border px-3 py-1 text-sm capitalize ${
                  fontWeight === w ? 'border-black' : 'border-gray-300'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CONFIRM */}
    </div>
  )
}

export default PersonalizationOptions
