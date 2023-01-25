
namespace ShapesProject
{
    using System.Xml.Serialization;
    public class XmlDeserializer : IDeserializer
    {

        public string FilePath { get; set; }
        public XmlDeserializer(string filePath)
        {
            this.FilePath = filePath;
        }
        public ShapesContainer Deserialize()
        {

            XmlSerializer serializer = new XmlSerializer(typeof(root));

            root container;

            using (Stream reader = new FileStream(this.FilePath, FileMode.Open))
            {
                var deserializer = serializer.Deserialize(reader);
                if (deserializer == null)
                    throw new Exception("Could not open file {fileName}");

                container = (root)deserializer;
            }


            var shapes = this.Translate(container);

            shapes.Filter();

            return shapes;
        }

        public ShapesContainer Translate(root xmlShapesContainer)
        {
            List<NonCircle> nonCircles = new List<NonCircle>();
            List<Circle> circlesForCont = new List<Circle>();

            List<Scalene> scaleneForCont = new List<Scalene>();
            List<Isosceles> isoscelesForCont = new List<Isosceles>();
            List<Equilateral> equilateralForCont = new List<Equilateral>();

            List<Square> squaresForCont = new List<Square>();
            List<NonSquare> rectanglesForCont = new List<NonSquare>();

            foreach (var item in xmlShapesContainer.Items)
            {
                var type = item.GetType();
                if (type == typeof(rootEllipses))
                {
                    foreach (var non in ((rootEllipses)item).NonCircles)
                    {
                        nonCircles.Add(new NonCircle(toDouble(non.Radius1), toDouble(non.Radius2)));
                    }
                    foreach (var circle in ((rootEllipses)item).Circles)
                    {
                        circlesForCont.Add(new Circle(toDouble(circle.Radius)));
                    }
                }
                if (type == typeof(rootRectangles))
                {
                    foreach (var square in ((rootRectangles)item).Squares)
                    {
                        squaresForCont.Add(new Square(toDouble(square.Side)));
                    }
                    foreach (var rectangle in ((rootRectangles)item).NonSquares)
                    {
                        rectanglesForCont.Add(new NonSquare(toDouble(rectangle.Length1), toDouble(rectangle.Length2)));
                    }
                }
                if (type == typeof(rootTriangles))
                {
                    foreach (var scalene in ((rootTriangles)item).Scalenes)
                    {
                        var triangle1 = new Scalene(toDouble(scalene.Side1), toDouble(scalene.Side2), toDouble(scalene.Side3));
                        scaleneForCont.Add(triangle1);
                    }
                    foreach (var isosceles in ((rootTriangles)item).Isosceles)
                    {
                        var tempTri = new Isosceles(toDouble(isosceles.Side1), toDouble(isosceles.OtherSides));
                        isoscelesForCont.Add(tempTri);
                    }
                    foreach (var equilateral in ((rootTriangles)item).Equilaterals)
                    {
                        var tempTri = new Equilateral(toDouble(equilateral.Side));
                        equilateralForCont.Add(tempTri);
                    }
                }
            }

            return new ShapesContainer(
                new EllipseContainer(nonCircles.ToArray(), circlesForCont.ToArray()),
                new TriangleContainer(scaleneForCont.ToArray(), equilateralForCont.ToArray(), isoscelesForCont.ToArray()),
                new RectangleContainer(squaresForCont.ToArray(), rectanglesForCont.ToArray())
            ); ;
        }
        public double toDouble(string value)
        {
            return Convert.ToDouble(value);
        }
    }
}