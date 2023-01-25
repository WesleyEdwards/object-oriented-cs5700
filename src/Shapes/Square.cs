namespace ShapesProject
{
    public class Square : IShape
    {
        public Square(double side)
        {
            Side = side;
        }
        public Square() { Side = 0; }

        public double Side { get; set; }

        public double Area => Side * Side;
        public bool isValid() => (Side > 0);
    }
}