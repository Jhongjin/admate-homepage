import type { SVGProps } from "react"

import { cn } from "@/lib/utils"

type BrandMarkProps = SVGProps<SVGSVGElement> & {
  title?: string
}

export function BrandMark({ className, title, ...props }: BrandMarkProps) {
  const titleId = title ? "admate-brand-mark-title" : undefined

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-labelledby={titleId}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <rect x="6" y="6" width="52" height="52" rx="14" fill="#101820" />
      <path d="M32 15.5L45 23V41L32 48.5L19 41V23L32 15.5Z" stroke="#F8FBF7" strokeWidth="4.2" strokeLinejoin="round" />
      <path d="M19 23L32 30.5L45 23" stroke="#9FE5C1" strokeWidth="3.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 30.5V48.5" stroke="#9FE5C1" strokeWidth="3.3" strokeLinecap="round" />
      <circle cx="32" cy="30.5" r="3.6" fill="#F2C85B" />
      <path d="M15.5 39.5C11.8 34.3 11.8 27.7 15.5 22.5" stroke="#9FE5C1" strokeWidth="3" strokeLinecap="round" opacity="0.86" />
      <path d="M48.5 22.5C52.2 27.7 52.2 34.3 48.5 39.5" stroke="#9FE5C1" strokeWidth="3" strokeLinecap="round" opacity="0.86" />
    </svg>
  )
}
