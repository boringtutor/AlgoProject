import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="container bg-secondary min-h-16 w-full  text-background ">
        testing header
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col w-full h-full items-center">
          logo
          <br />
          <div className="flex flex-col items-center">
            ALGORITHM
            <strong>
              <br />
              VISUALIZER
            </strong>
            <br />
            <div className="flex flex-col items-center">
              <p className="flex  text-accent-foreground items-center">
                Algorithms are a fascinating use case for visualization. To
                visualize an algorithm, we don’t merely fit data to a chart;
                there is no primary dataset. Instead there are logical rules
                that describe behavior. This may be why algorithm visualizations
                are so unusual, as designers experiment with novel forms to
                better communicate. This is reason enough to study them.
              </p>
              <br />
              <strong>
                Algorithm Visualizer is an interactive online platform that
                visualizes algorithms from code. Currently these include
                Sorting, Pathfind and ConvexHull Algorithms. More Algorithms
                will be coming soon!!
              </strong>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-6">
          <Link href="/sorting">sortingPage</Link>
          <Link href="/pathfinding">pathfinding</Link>
          <Link href="/convexhall">convexhall</Link>
        </div>
      </main>
    </div>
  );
}
