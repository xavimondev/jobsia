async function getJobs(q: string) {
  console.log(q)
  // const res = await fetch('https://api.example.com/...')
  // // The return value is *not* serialized
  // // You can return Date, Map, Set, etc.
  // // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
  // return res.json()
}

export default async function JobsResults({
  searchParams: { q }
}: {
  searchParams: { q: string }
}) {
  const data = await getJobs(q)
  return (
    <section>
      <h1>Esta es una muestra que debemos mejorar ciertos resultados de la aplicacion</h1>
    </section>
  )
}
