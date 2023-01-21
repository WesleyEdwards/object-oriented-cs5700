namespace ShapesProject
{
   
   
    public class Square : IShape
    {
        public QuadCoordinates Points { get; set; }
        public Square(QuadCoordinates points)
        { this.Points = points; }
        public Square()
        {
            this.Points = new QuadCoordinates();
        }

        public double Side { get; set; }

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