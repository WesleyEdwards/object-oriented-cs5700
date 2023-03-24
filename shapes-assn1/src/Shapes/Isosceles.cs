namespace ShapesProject
{
    public interface IIsosceles : ITriangle
    {
        double OtherSides { get; set; }
    }
    public class Isosceles : IIsosceles
    {
        public Isosceles(double Side1, double otherSides)
        {
            this.Side1 = Side1;
            this.OtherSides = otherSides;
        }
        public Isosceles() { Side1 = 0; OtherSides = 0; }

        public double Side1 { get; set; }
        public double Side2 { get => this.OtherSides; }
        public double Side3 { get => this.OtherSides; }
        public double OtherSides { get; set; }

        public double Area
        {
            get
            {
                double s = (Side1 + OtherSides + OtherSides) / 2;
                double equation = (s * (s - Side1) * (s - OtherSides) * (s - OtherSides));
                return Math.Sqrt(equation);
            }
        }
        public bool isValid()
        {
            if (OtherSides + OtherSides < Side1) { return false; }
            return OtherSides > 0 && Side1 > 0;
        }
    }
}