const workshopImageOverrides = new Map([
  ['creative writing', '/images/creative-writing.jpg'],
  ['web dev basics', '/images/web-dev-basics.jpg'],
  ['ui/ux design', '/images/ui-ux-design.jpg'],
  ['poetry & spoken word', '/images/poetry-spoken-word.jpg'],
])

export function getWorkshopImage(workshop) {
  const title = workshop.title?.trim().toLowerCase()
  return workshop.image || workshopImageOverrides.get(title) || ''
}
