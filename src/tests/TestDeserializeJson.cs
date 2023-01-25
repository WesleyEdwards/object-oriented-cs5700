namespace ShapesProject
{
    public class TestDeserializeJson : ITest
    {
        private ShapesContainer expected = new ShapesContainer()
        {
            // Circles = new Circle[]
            // {
            //     new Circle(2),
            //     new Circle(3),
            //     new Circle(4)
            // },
            // Ellipses = new Ellipse[]
            // {
            //     new Ellipse(1, 2),
            //     new Ellipse(2, 3),
            //     new Ellipse(3, 4)
            // },
            // Squares = new Square[]
            // {
            //     new Square(2),
            //     new Square(3),
            //     new Square(4)
            // },
            // Rectangles = new Rectangle[]
            // {
            //     new Rectangle(2, 3),
            //     new Rectangle(3, 4),
            //     new Rectangle(4, 5)
            // },
            // Triangles = new Triangle[]
            // {
            //     // new Triangle(1, 2, 3), This one should be thrown out because it is not a valid triangle
            //     new Triangle(2, 3, 4),
            // }
        };
        public TestDeserializeJson() { }
        public void RunTests()
        {
            // var deserializer = new JsonDeserializer("./src/tests/testFiles/testFile1.json");
            // var shapes = deserializer.Deserialize();
            // if (shapes == null) throw new Exception("Could not deserialize file");

            // this.TestNumberOfShapes(shapes);
            // this.TestShapeProperties(shapes);
        }

        // private void TestNumberOfShapes(ShapesContainer shapes)
        // {
        //     Console.WriteLine("\tTesting number of shapes");
        //     if (shapes.Circles?.Length != this.expected.Circles?.Length) throw new Exception("Incorrect number of Circles");
        //     if (shapes.Ellipses?.Length != this.expected.Ellipses?.Length) throw new Exception("Incorrect number of Ellipses");
        //     if (shapes.Squares?.Length != this.expected.Squares?.Length) throw new Exception("Incorrect number of Squares");
        //     if (shapes.Rectangles?.Length != this.expected.Rectangles?.Length) throw new Exception("Incorrect number of Rectangles");
        //     if (shapes.Triangles?.Length != this.expected.Triangles?.Length) throw new Exception("Incorrect number of Triangles");
        // }

        // private void TestShapeProperties(ShapesContainer shapes)
        // {
        //     Console.WriteLine("\tTesting shape properties");
        //     this.TestShapeArea(shapes.Circles, this.expected.Circles, "Circles");
        //     this.TestShapeArea(shapes.Ellipses, this.expected.Ellipses, "Ellipses");
        //     this.TestShapeArea(shapes.Squares, this.expected.Squares, "Squares");
        //     this.TestShapeArea(shapes.Rectangles, this.expected.Rectangles, "Rectangles");
        //     this.TestShapeArea(shapes.Triangles, this.expected.Triangles, "Triangles");
        // }
        // private void TestShapeArea(IShape[]? shape, IShape[]? expectedShape, string name)
        // {
        //     // Already checked length of each shape in TestNumberOfShapes
        //     if (shape == null || expectedShape == null) return;
        //     for (int i = 0; i < shape.Length; i++)
        //     {
        //         if (shape[i].Area != expectedShape[i].Area) throw new Exception($"Incorrect area for shape {i}");
        //     }
        // }
    }
}