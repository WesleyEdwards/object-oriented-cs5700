namespace ShapesProject
{
    public class Square : IShape
    {
        public Square(double side)
        {
            Side = side;
        }

        public double Side { get; set; }

        public double Area => Side * Side;
    }
}