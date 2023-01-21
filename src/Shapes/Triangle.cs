namespace ShapesProject
{
    public class Triangle : IShape
    {
        public Triangle(double Side1, double Side2, double Side3)
        {
            this.Side1 = Side1;
            this.Side2 = Side2;
            this.Side3 = Side3;
        }
        public Triangle() { Side1 = 0; Side2 = 0; Side3 = 0; }

        public double Side1 { get; set; }
        public double Side2 { get; set; }
        public double Side3 { get; set; }

        public double Area
        {
            get
            {
                double s = (Side1 + Side2 + Side3) / 2;
                double equation = Math.Abs(s * (s - Side1) * (s - Side2) * (s - Side3));
                return Math.Sqrt(equation);
            }
        }
    }
}