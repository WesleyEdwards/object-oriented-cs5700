namespace ShapesProject
{
    public class AreaCalculator
    {
        private double DistanceBetweenTwoPoints(ICoordinates point1, ICoordinates point2)
        {
            return Math.Sqrt(Math.Pow(point1.X - point2.X, 2) + Math.Pow(point1.Y - point2.Y, 2));
        }
        public double AreaOfTriangle(ICoordinates first, ICoordinates second, ICoordinates third)
        {
            // Using Heron's formula https://en.wikipedia.org/wiki/Heron%27s_formula
            double Side1 = DistanceBetweenTwoPoints(first, second);
            double Side2 = DistanceBetweenTwoPoints(second, third);
            double Side3 = DistanceBetweenTwoPoints(third, first);
            double s = (Side1 + Side2 + Side3) / 2;
            return Math.Sqrt(s * (s - Side1) * (s - Side2) * (s - Side3));
        }

        public double AreaOfEllipse(double radius1, double radius2)
        {
            return Math.PI * radius1 * radius2;
        }

        public double AreaOfQuad(ICoordinates first, ICoordinates second, ICoordinates third, ICoordinates fourth)
        {
            return AreaOfTriangle(first, second, third) + AreaOfTriangle(first, third, fourth);
        }
    }
}