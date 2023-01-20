namespace ShapesProject
{
    public class Rectangle : IShape
    {
        public Rectangle(double length, double width)
        {
            Length = length;
            Width = width;
        }

        public double Length { get; set; }
        public double Width { get; set; }

        public double Area => Length * Width;
    }
}