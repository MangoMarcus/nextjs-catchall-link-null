export function generateStaticParams() {
  return [
    {
      slug: [], // ie. /
    },
    {
      slug: ['foo'], // ie. /foo
    },
    {
      slug: ['foo/bar'], // ie. /foo/bar
    },
  ]
}

export default async function Page({params}: {
  params: {
    slug: string[] | undefined;
  };
}) {
  const { slug = [] } = params;

  /**
   * Page URI without leading slash. Home page should be `'/'`. On Vercel it's `'index'` but only when navigating with `<Link href="/">`.
   */
  const uri = getUriFromSegments(slug);
  const page = await getPageWithUri(uri);

  return <p>{page ? page.title : 'NOT FOUND'} - {uri}</p>;
}

function getUriFromSegments(slug: string[]) {
  if (slug.length === 0) {
    return '/';
  }
  return slug.join('/');
}

async function getPageWithUri(uri: string) {
  return uri in pages ? pages[uri as keyof typeof pages] : null;
}

/**
 * Imagine these pages are fetched from a database.
 */
const pages = {
  '/': {
    title: 'Home',
  },
  'foo': {
    title: 'Foo',
  },
  'foo/bar': {
    title: 'Bar',
  },
}
