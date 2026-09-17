/** PokéAPI names are lowercase, hyphenated (`"mr-mime"`) — this renders them for display. */
export function capitalize(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
