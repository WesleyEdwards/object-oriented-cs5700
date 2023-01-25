
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

            XmlSerializer serializer = new XmlSerializer(typeof(XmlShapesContainer));

            XmlShapesContainer container;

            using (Stream reader = new FileStream(this.FilePath, FileMode.Open))
            {
                var deserializer = serializer.Deserialize(reader);
                if (deserializer == null)
                    throw new Exception("Could not open file {fileName}");

                container = (XmlShapesContainer)deserializer;
            }


            var shapes = this.Translate(container);
            return shapes;
        }

        public void Serialize(string newFileName, ShapesContainer shapes)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(ShapesContainer));

            using (TextWriter writer = new StreamWriter("./xmlFiles/file2.xml"))
            {
                xmlSerializer.Serialize(writer, shapes);
            }
        }

        public ShapesContainer Translate(XmlShapesContainer xmlShapesContainer)
        {
            List<NonCircle> nonCircles = new List<NonCircle>();
            List<Circle> circlesForCont = new List<Circle>();

            List<Scalene> scaleneForCont = new List<Scalene>();
            List<Isosceles> isoscelesForCont = new List<Isosceles>();
            List<Equilateral> equilateralForCont = new List<Equilateral>();

            List<Square> squaresForCont = new List<Square>();
            List<NonSquare> rectanglesForCont = new List<NonSquare>();

            foreach (var non in xmlShapesContainer.NonCircles)
            { nonCircles.Add(new NonCircle(Convert.ToDouble(non.Radius1), Convert.ToDouble(non.Radius2))); }

            foreach (var circle in xmlShapesContainer.Circles)
            { circlesForCont.Add(new Circle(Convert.ToDouble(circle.Radius))); }


            foreach (var tri in xmlShapesContainer.Triangles)
            {
                foreach (var scalene in tri.Scalenes)
                { scaleneForCont.Add(new Scalene(Convert.ToDouble(scalene.Side1), Convert.ToDouble(scalene.Side2), Convert.ToDouble(scalene.Side3))); }
                foreach (var isosceles in tri.Isosceles)
                { isoscelesForCont.Add(new Isosceles(Convert.ToDouble(isosceles.Side1), Convert.ToDouble(isosceles.OtherSides))); }
                foreach (var equilateral in tri.Equilaterals)
                { equilateralForCont.Add(new Equilateral(Convert.ToDouble(equilateral.Side))); }
            }


            var rectangles = xmlShapesContainer.Rectangles;

            foreach (var rect in rectangles)
            {
                foreach (var square in rect.Squares)
                { squaresForCont.Add(new Square(Convert.ToDouble(square.Side))); }
                foreach (var nonSquare in rect.NonSquares)
                { rectanglesForCont.Add(new NonSquare(Convert.ToDouble(nonSquare.Length1), Convert.ToDouble(nonSquare.Length2))); }
            }

            return new ShapesContainer(
                new EllipseContainer(nonCircles.ToArray(), circlesForCont.ToArray()),
                new TriangleContainer(scaleneForCont.ToArray(), equilateralForCont.ToArray(), isoscelesForCont.ToArray()),
                new RectangleContainer(squaresForCont.ToArray(), rectanglesForCont.ToArray())
            ); ;
        }
    }
}