namespace ShapesProject
{
    public class Rectangle : IShape
    {
        public Rectangle(double Length1, double Length2)
        {
            Length = Length1;
            Width = Length2;
        }
        public Rectangle() { Length = 0; Width = 0; }

        public double Length { get; set; }
        public double Width { get; set; }

        public double Area => Length * Width;
    }
}