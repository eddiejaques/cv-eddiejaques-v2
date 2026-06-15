const modules = import.meta.glob('../data/case-studies/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function loadCaseStudyContent(contentPath: string): string {
  const filename = contentPath.split('/').pop();
  const entry = Object.entries(modules).find(([key]) => key.endsWith(`/${filename}`));
  return entry ? entry[1] : '';
}
