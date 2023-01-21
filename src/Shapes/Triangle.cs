namespace ShapesProject
{
    public class Triangle : IShape
    {
        public ITriCoordinates points { get; set; }
        public Triangle(ICoordinates point1, ICoordinates point2, ICoordinates point3)
        {
            Console.WriteLine("Triangle Constructor");
            this.points = new TriCoordinates(point1, point2, point3);
        }
        public Triangle()
        {
            this.points = new TriCoordinates();
        }

        public double Area
        {
            get
            {
                var areaCalculator = new AreaCalculator();
                return areaCalculator.AreaOfTriangle(this.points.Point1, this.points.Point2, this.points.Point3);
            }
        }
    }
}