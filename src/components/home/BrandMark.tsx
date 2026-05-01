import type { SVGProps } from "react"

import { cn } from "@/lib/utils"

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  title?: string
}

export function BrandMark({ className, title, ...props }: BrandMarkProps) {
  const titleId = title ? "admate-brand-mark-title" : undefined

  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-labelledby={titleId}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <linearGradient id="admate-brand-mark-bg" x1="18" y1="12" x2="112" y2="116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#07101D" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="108" height="108" rx="26" fill="url(#admate-brand-mark-bg)" />
      <path d="M64 31L91 46.5V78L64 93.5L37 78V46.5L64 31Z" stroke="#FFFFFF" strokeWidth="8" strokeLinejoin="round" />
      <path d="M37 46.5L64 62L91 46.5" stroke="#C8D2FF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M64 62V93.5" stroke="#C8D2FF" strokeWidth="6" strokeLinecap="round" />
      <circle cx="37" cy="46.5" r="5" fill="#8EA2FF" />
      <circle cx="91" cy="46.5" r="5" fill="#8EA2FF" />
      <circle cx="64" cy="93.5" r="5" fill="#34D399" />
      <path d="M32 87C22.5 76.5 22.5 51.5 32 40" stroke="#34D399" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <path d="M96 40C105.5 51.5 105.5 76.5 96 87" stroke="#34D399" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
    </svg>
  )
}
