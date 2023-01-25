namespace ShapesProject
{
    public class Square : IRectangle
    {
        public Square(double side)
        {
            Side = side;
        }
        public Square() { Side = 0; }

        public double Side { get; set; }
        public double Length1 => Side;
        public double Length2 => Side;

        public double Area => Side * Side;
        public bool isValid() => (Side > 0);
    }
}