namespace ShapesProject
{
    public class Rectangle : IShape
    {
        public Rectangle(double Length1, double Length2)
        {
            this.Length1 = Length1;
            this.Length2 = Length2;
        }
        public Rectangle() { Length1 = 0; Length2 = 0; }

        public double Length1 { get; set; }
        public double Length2 { get; set; }

        public double Area => Length1 * Length2;
    }
}