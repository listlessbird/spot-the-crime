import Link from "next/link"
import Image from "next/image"
export function Landing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 grid">
      <div className="container px-4 md:px-6 mx-auto items-center justify-center">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Geo Sentinal Crime
              </h1>
              <p className="max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Analyze and predict safety levels in your neighborhood.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 dark:border-gray-800"
                href="/map"
              >
                Get Started
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="w-full aspect-video overflow-hidden rounded-xl lg:aspect-none">
            <Image
              alt="Hero image"
              className="object-cover aspect-video"
              height="675"
              src="/placeholder.jpg"
              width="1200"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
