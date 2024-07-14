export const onRequest: PagesFunction = (context) => {
  console.log(context)
  return new Response('Hello, world!')
}
