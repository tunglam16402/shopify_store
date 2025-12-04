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

      <div className="relative cursor-pointer w-full inline-block">
        <div
          className={`h-12 flex items-center justify-center border border-gray-300 rounded-md bg-white  ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {selectedFiles.length > 0 ? (
            `${selectedFiles.length} file(s) selected`
          ) : (
            <>
              <IcoUpload className="w-5 h-5 mr-2" />
              Click to upload files
            </>
          )}
        </div>

        <Input
          ref={fileInputRef}
          type="file"
          id={name}
          name={name}
          multiple
          accept="image/*,video/*"
          disabled={disabled}
          onChange={onFileChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <p className="text-xs md:text-sm mt-2 text-gray-600">
        Upload up to 3 images (max. 5MB each) or 1 video (max. 100MB).
      </p>

      {selectedFiles.length > 0 && (
        <div className="mt-2 space-y-1">
          {selectedFiles.map((file, idx) => (
            <div
              key={idx}
              className="text-xs text-gray-700 flex items-center gap-2"
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
                className="relative w-32 md:w-40 aspect-square md:overflow-hidden border group"
              >
                <button
                  type="button"
                  onClick={() => onRemoveFile(idx)}
                  className="absolute -top-3 -right-3 md:right-1 md:top-1 z-10 
                  bg-black/50 text-white rounded-full p-1 md:opacity-0 
                  group-hover:opacity-100 transition"
                >
                  <IcoClose className="w-5 h-5" color="white" />
                </button>

                {isVideo ? (
                  <video
                    src={url}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <Image
                    src={url}
                    alt={`preview-${idx}`}
                    fill
                    className="object-cover w-full h-full"
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
