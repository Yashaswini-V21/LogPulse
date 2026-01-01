// Utility function to conditionally join classnames
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((item) => typeof item === "string")
    .join(" ");
}
