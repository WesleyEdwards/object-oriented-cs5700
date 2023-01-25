namespace ShapesProject
{
    public class TestDeserialize : ITest
    {
        private ShapesContainer expected = new ShapesContainer(
            new EllipseContainer(
                new NonCircle[] { new NonCircle(2, 4), new NonCircle(1, 8), new NonCircle(4, 5) },
                new Circle[] { new Circle(5), new Circle(6), new Circle(9) }
            ),
            new TriangleContainer(
                new Scalene[] { new Scalene(2, 3, 4), new Scalene(4, 5, 6), new Scalene(9, 2, 10) },
                new Equilateral[] { new Equilateral(2), new Equilateral(7), new Equilateral(8) },
                new Isosceles[] { new Isosceles(2, 3), new Isosceles(11, 12) }
            ),
            new RectangleContainer(
                new Square[] { new Square(2), new Square(3), new Square(4) },
                new NonSquare[] { new NonSquare(2, 3), new NonSquare(3, 4), new NonSquare(5, 6) }
            )
        );

        private IDeserializer deserializer;

        public TestDeserialize(IDeserializer deserializer)
        {
            this.deserializer = deserializer;
        }
        public void RunTests()
        {
            Console.WriteLine("\n\nTesting deserialization of JSON file");

            

            var shapes = this.deserializer.Deserialize();
            if (shapes == null) throw new Exception("Could not deserialize file");

            this.TestNumberOfShapes(shapes);
            this.TestShapeProperties(shapes);
        }

        private void TestNumberOfShapes(ShapesContainer shapes)
        {
            Console.WriteLine("\tTesting number of shapes in deserialized data");
            if (shapes.Ellipses?.Circles?.Length != this.expected?.Ellipses?.Circles?.Length) throw new Exception("Incorrect number of Circles");
            if (shapes.Ellipses?.NonCircles?.Length != this.expected?.Ellipses?.NonCircles?.Length) throw new Exception("Incorrect number of NonCircles");
            if (shapes.Triangles?.Scalenes?.Length != this.expected?.Triangles?.Scalenes?.Length) throw new Exception("Incorrect number of Scalenes");
            if (shapes.Triangles?.Equilaterals?.Length != this.expected?.Triangles?.Equilaterals?.Length) throw new Exception("Incorrect number of Equilaterals");
            if (shapes.Triangles?.Isosceles?.Length != this.expected?.Triangles?.Isosceles?.Length) throw new Exception("Incorrect number of Isosceles");
            if (shapes.Rectangles?.Squares?.Length != this.expected?.Rectangles?.Squares?.Length) throw new Exception("Incorrect number of Squares");
            if (shapes.Rectangles?.NonSquares?.Length != this.expected?.Rectangles?.NonSquares?.Length) throw new Exception("Incorrect number of NonSquares");
        }

        private void TestShapeProperties(ShapesContainer shapes)
        {
            Console.WriteLine("\tTesting shape properties in deserialized data");
            this.TestShapeArea(shapes.Ellipses?.Circles, this.expected.Ellipses?.Circles, "Circles");
            this.TestShapeArea(shapes.Ellipses?.NonCircles, this.expected.Ellipses?.NonCircles, "NonCircles");
            this.TestShapeArea(shapes.Triangles?.Scalenes, this.expected.Triangles?.Scalenes, "Scalenes");
            this.TestShapeArea(shapes.Triangles?.Equilaterals, this.expected.Triangles?.Equilaterals, "Equilaterals");
            this.TestShapeArea(shapes.Triangles?.Isosceles, this.expected.Triangles?.Isosceles, "Isosceles");
            this.TestShapeArea(shapes.Rectangles?.Squares, this.expected.Rectangles?.Squares, "Squares");
            this.TestShapeArea(shapes.Rectangles?.NonSquares, this.expected.Rectangles?.NonSquares, "NonSquares");
        }
        private void TestShapeArea(IShape[]? shape, IShape[]? expectedShape, string name)
        {
            if (shape == null || expectedShape == null) return;
            for (int i = 0; i < shape.Length; i++)
            {
                if (shape[i].Area != expectedShape[i].Area) throw new Exception($"Incorrect area for shape {name}");
            }
        }
    }
}