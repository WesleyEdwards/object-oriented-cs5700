namespace ShapesProject
{
    public class Rectangle : IShape
    {
        public QuadCoordinates Points { get; set; }
        public Rectangle(QuadCoordinates coordinates) { this.Points = coordinates; }
        public Rectangle() { this.Points = new QuadCoordinates(); }

        public double Area
        {
            get
            {
                var areaCalculator = new AreaCalculator();
                return areaCalculator.AreaOfQuad(this.Points.Point1, this.Points.Point2, this.Points.Point3, this.Points.Point4);
            }
        }
    }
}