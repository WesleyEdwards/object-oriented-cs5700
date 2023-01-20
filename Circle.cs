namespace ShapesProject
{
    public class Circle : IShape
    {
        public Circle(double radius)
        {
            Radius = radius;
        }

        public double Radius { get; set; }

        public double Area => System.Math.PI * Radius * Radius;

    }
}