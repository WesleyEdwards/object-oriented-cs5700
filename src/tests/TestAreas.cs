namespace ShapesProject
{
    public class TestAreas : ITest
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
        public void RunTests()
        {
            this.RunAreaTests();
        }

        public void RunAreaTests()
        {
            this.TestShapeArea(this.expected.Ellipses?.Circles, "Circles");
            this.TestShapeArea(this.expected.Ellipses?.NonCircles, "NonCircles");
            this.TestShapeArea(this.expected.Triangles?.Scalenes, "Scalenes");
            this.TestShapeArea(this.expected.Triangles?.Equilaterals, "Equilaterals");
            this.TestShapeArea(this.expected.Triangles?.Isosceles, "Isosceles");
            this.TestShapeArea(this.expected.Rectangles?.Squares, "Squares");
            this.TestShapeArea(this.expected.Rectangles?.NonSquares, "NonSquares");

        }

        private bool TestShapeArea(IShape[]? shapes, string title)
        {
            System.Console.WriteLine("\t\tTesting " + title + " area");
            if (shapes == null) { return true; }

            foreach (var shape in shapes)
            {
                if (shape is Circle) { this.TestCircleArea((Circle)shape); }
                if (shape is NonCircle) { this.TestEllipseArea((NonCircle)shape); }
                if (shape is Scalene) { this.TestScaleneArea((Scalene)shape); }
                if (shape is Equilateral) { this.TestEquilateralArea((Equilateral)shape); }
                if (shape is Isosceles) { this.TestIsoscelesArea((Isosceles)shape); }
                if (shape is Square) { this.TestSquareArea((Square)shape); }
                if (shape is NonSquare) { this.TestNonSquareArea((NonSquare)shape); }
            }

            return false;
        }

        private bool TestCircleArea(Circle circle)
        {
            var expected = this.EllipseArea(circle.Radius, circle.Radius);
            var actual = circle.Area;
            return expected == actual;
        }
        private bool TestEllipseArea(NonCircle ellipse)
        {
            var expected = this.EllipseArea(ellipse.Radius1, ellipse.Radius2);
            var actual = ellipse.Area;
            return expected == actual;
        }
        private bool TestScaleneArea(Scalene triangle)
        {
            var expected = this.TriangleArea(triangle.Side1, triangle.Side2, triangle.Side3);
            var actual = triangle.Area;
            return expected == actual;
        }
        private bool TestEquilateralArea(Equilateral triangle)
        {
            var expected = this.TriangleArea(triangle.Side1, triangle.Side1, triangle.Side1);
            var actual = triangle.Area;
            return expected == actual;
        }
        private bool TestIsoscelesArea(Isosceles triangle)
        {
            var expected = this.TriangleArea(triangle.Side1, triangle.Side1, triangle.Side2);
            var actual = triangle.Area;
            return expected == actual;
        }
        private bool TestSquareArea(Square rectangle)
        {
            var expected = this.RectangleArea(rectangle.Length1, rectangle.Length2);
            var actual = rectangle.Area;
            return expected == actual;
        }
        private bool TestNonSquareArea(NonSquare rectangle)
        {
            var expected = this.RectangleArea(rectangle.Length1, rectangle.Length2);
            var actual = rectangle.Area;
            return expected == actual;
        }

        private double EllipseArea(double Radius1, double Radius2) => Math.PI * Radius1 * Radius2;

        private double RectangleArea(double Length1, double Length2) => Length1 * Length2;

        private double TriangleArea(double Side1, double Side2, double Side3)
        {
            var s = (Side1 + Side2 + Side3) / 2;
            return Math.Sqrt(s * (s - Side1) * (s - Side2) * (s - Side3));
        }

    }
}