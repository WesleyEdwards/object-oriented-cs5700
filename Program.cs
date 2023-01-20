namespace ShapesProject
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var circle = new Circle(5);
            var oval = new Ellipse(5, 10);
            var square = new Square(5);
            var rectangle = new Rectangle(5, 10);
            var triangle = new Triangle(5, 10, 13);

            System.Console.WriteLine(circle.Area);
            System.Console.WriteLine(oval.Area);
            System.Console.WriteLine(square.Area);
            System.Console.WriteLine(rectangle.Area);
            System.Console.WriteLine(triangle.Area);
        }
    }
}
