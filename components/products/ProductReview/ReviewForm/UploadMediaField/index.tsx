'use client'

import { IcoClose, IcoUpload } from '@/components/icons'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

interface UploadMediaFieldProps {
  disabled?: boolean
  name?: string
  label?: string
}

const UploadMediaField: React.FC<UploadMediaFieldProps> = ({
  disabled,
  name = 'media',
  label = 'Add Media (Optional)',
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (files.length > 3) {
      alert('You can choose maximum 3 files')
      e.target.value = ''
      return
    }

    for (const file of files) {
      const maxSize = file.type.startsWith('video')
        ? 100 * 1024 * 1024
        : 5 * 1024 * 1024
      if (file.size > maxSize) {
        alert(`File ${file.name} exceeding the allowable size`)
        e.target.value = ''
        return
      }
    }

    setSelectedFiles(files)

    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const onRemoveFile = (idx: number) => {
    const newFiles = [...selectedFiles]
    const newUrls = [...previewUrls]

    newFiles.splice(idx, 1)
    newUrls.splice(idx, 1)

    setSelectedFiles(newFiles)
    setPreviewUrls(newUrls)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="mt-6">
      <Label htmlFor={name}>{label}</Label>

      <div className="relative inline-block w-full cursor-pointer">
        <div
          className={`flex h-12 items-center justify-center border border-gray-500 bg-white ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {selectedFiles.length > 0 ? (
            `${selectedFiles.length} file(s) selected`
          ) : (
            <>
              <IcoUpload className="mr-2 h-5 w-5" />
              Click to upload files
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          id={name}
          name={name}
          multiple
          accept="image/*,video/*"
          disabled={disabled}
          onChange={onFileChange}
          className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      <p className="mt-2 text-xs text-gray-600 md:text-sm">
        Upload up to 3 images (max. 5MB each) or 1 video (max. 100MB).
      </p>

      {selectedFiles.length > 0 && (
        <div className="mt-2 space-y-1">
          {selectedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs text-gray-700"
            >
              <span>📎</span>
              <span>{file.name}</span>
              <span className="text-gray-500">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          ))}
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className="mt-3 flex gap-3 md:gap-6">
          {previewUrls.map((url, idx) => {
            const file = selectedFiles[idx]
            const isVideo = file?.type.startsWith('video')

            return (
              <div
                key={idx}
                className="group relative aspect-square w-32 border md:w-40 md:overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => onRemoveFile(idx)}
                  className="absolute -top-3 -right-3 z-10 rounded-full bg-black/50 p-1 text-white transition group-hover:opacity-100 md:top-1 md:right-1 md:opacity-0"
                >
                  <IcoClose className="h-5 w-5" color="white" />
                </button>

                {isVideo ? (
                  <video
                    src={url}
                    className="h-full w-full object-cover"
                    controls
                  />
                ) : (
                  <Image
                    src={url}
                    alt={`preview-${idx}`}
                    fill
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default UploadMediaField
