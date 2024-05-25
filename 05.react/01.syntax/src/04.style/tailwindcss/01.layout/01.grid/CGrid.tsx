// < 640px:
// | Card 1 |
// | Card 2 |
// | Card 3 |
// | Card 4 |
// | Card 5 |
// | Card 6 |

// ≥ 640px:
// | Card 1 | Card 2 |
// | Card 3 | Card 4 |
// | Card 5 | Card 6 |

// ≥ 768px:
// | Card 1 | Card 2 | Card 3 |
// | Card 4 | Card 5 | Card 6 |

// ≥ 1024px:
// | Card 1 | Card 2 | Card 3 | Card 4 |
// | Card 5 | Card 6 |


const CGrid: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Grid Card Example</h1>
      <div className="grid sm:grid-cols-2 sm:grid-cols2"></div>
      {/* on minimal size screen, keep column 1 -  grid-template-columns: repeat(1, minmax(0, 1fr)); */}
      {/* on small size screen(640px or larger), keep column 2 -  @media query + grid-template-columns: repeat(2, minmax(0, 1fr)); */}
      {/* on medium size screen(768px or larger), keep column 3 -  @media query + grid-template-columns: repeat(3, minmax(0, 1fr)); */}
      {/* on large size screen(1024px or larger), keep column 4 -  @media query + grid-template-columns: repeat(4, minmax(0, 1fr)); */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Card 1</h2>
          <p>this is simple card description</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Card 2</h2>
          <p>this is simple card description</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Card 3</h2>
          <p>this is simple card description</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Card 4</h2>
          <p>this is simple card description</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Card 5</h2>
          <p>this is simple card description</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Card 6</h2>
          <p>this is simple card description</p>
        </div>
      </div>
    </div>
  );
};

export default CGrid;
