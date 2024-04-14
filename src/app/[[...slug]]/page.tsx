import Link from 'next/link';

export function generateStaticParams() {
  return [
    {
      slug: [], // ie. /
    },
    {
      slug: ['foo'], // ie. foo/bar
    },
  ]
}

export default function Page({params}: {
  params: {
    slug: string[] | undefined;
  };
}) {
  return <ul><li><Link href="/">Home</Link></li><li><Link href="/foo">Foo</Link></li></ul>;
}
