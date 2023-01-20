namespace ShapesProject
{
    public class Circle : IShape
    {
        public Circle(double Radius) { this.Radius = Radius;}

        public double Radius { get; set; }

        public double Area => System.Math.PI * Radius * Radius;

    }
}