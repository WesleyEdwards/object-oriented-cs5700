namespace ShapesProject
{
    public class Equilateral : ITriangle
    {
        public Equilateral(double Side)
        {
            this.Side = Side;
        }
        public Equilateral() { Side = 0; }

        public double Side { get; set; }
        public double Side1 { get => this.Side; }
        public double Side2 { get => this.Side; }
        public double Side3 { get => this.Side; }

        public double Area
        {
            get
            {
                double factor = Math.Sqrt(3) / 4;
                return factor * Side * Side;
            }
        }

        public bool isValid() { return Side > 0; }
    }
}