import React from 'react'

const PersonalizationOptions = () => {
  return (
    <div className="space-y-6 w-full">
      <div>
        <p className="text-sm ">
          COLOR:
          <span className="font-medium capitalize ml-2">{color}</span>
        </p>
        <div className="flex gap-2 mt-2">
          {personalization.options?.colors?.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`h-7 w-7 border bg-${c} ${
                color === c ? 'ring-1 ring-black' : ''
              }`}
            ></button>
          ))}
        </div>
      </div>

      {textBlock.lines.map((line) => (
        <div key={line.id} className="flex items-center">
          <label className="block text-sm uppercase">{line.label}:</label>
          <input
            type="text"
            value={values[line.id]}
            placeholder="Your text here"
            onChange={(e) =>
              updateLineValue(line.id, e.target.value, line.maxLength)
            }
            className="border px-2 py-1 text-sm mx-2 w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            {values[line.id].length}/{line.maxLength}
          </p>
        </div>
      ))}

      <div className="flex items-center gap-10">
        <div className="uppercase text-sm">Position: </div>
        <label className="flex items-center gap-2 text-sm">
          X
          <input
            type="number"
            step={personalization.options?.positionX?.step ?? 0.01}
            min={personalization.options?.positionX?.min ?? 0}
            max={personalization.options?.positionX?.max ?? 1}
            value={posX ?? textBlock.position.x}
            onChange={(e) => setPosX(+e.target.value)}
            className="w-20 border px-2 py-1"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Y
          <input
            type="number"
            step={personalization.options?.positionY?.step ?? 0.01}
            min={personalization.options?.positionY?.min ?? 0}
            max={personalization.options?.positionY?.max ?? 1}
            value={posY ?? textBlock.position.y}
            onChange={(e) => setPosY(+e.target.value)}
            className="w-20 border px-2 py-1"
          />
        </label>
      </div>

      {/* FONT */}
      <div className="flex items-center gap-2">
        <div className="text-sm uppercase">Fonts: </div>
        <div className="flex gap-2">
          {personalization.options?.fonts?.map((f) => (
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

      <div className="flex items-center gap-2">
        <div className="text-sm uppercase">Font size: </div>
        <div className="flex gap-2">
          {personalization.options?.fontSizes?.map((size) => (
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

      <div className="flex items-center gap-2">
        <div className="text-sm uppercase">Font Weight: </div>
        <div className="flex gap-2">
          {personalization.options?.fontWeights?.map((w) => (
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
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          className="peer w-4 h-4 accent-primary cursor-pointer"
        />
        <span
          className="
                text-gray-600
                peer-checked:font-semibold
                peer-checked:text-gray-900
                transition
              "
        >
          I understand that personalized products are non-refundable after buy.
        </span>
      </label>

      <div className="bg-gray-100 p-6 rounded-md">
        <h5 className="text-3xl">Your order</h5>
        <div className="mt-4 pb-4 border-b border-gray-300">
          <div className="flex justify-between">
            <div className="font-medium">
              Personalization of {product.title}
            </div>
            <div>
              {product.variant?.currency} {product.variant?.basePrice}
            </div>
          </div>
          <div className="flex justify-between font-light ">
            <div>Personalization:</div>
            <div>{product.variant?.currency} 20</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mt-4">
            <div className="font-semibold uppercase">Total</div>
            <div>
              {product.variant?.currency} {totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalizationOptions
