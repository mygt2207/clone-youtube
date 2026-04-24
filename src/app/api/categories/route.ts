const categoriesData = new Set<string>();

export async function GET(request: Request) {
  categoriesData.add('music');
  categoriesData.add('motorcycling');
  categoriesData.add('engines');
  categoriesData.add('psychology');
  categoriesData.add('history');

  return Response.json({ ok: true, data: Array.from(categoriesData) });
}
